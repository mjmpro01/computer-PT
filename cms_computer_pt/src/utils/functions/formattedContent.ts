import { Content } from "../../types/commom/content";

export const parseEditorValueToContent = (html: string): Content[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const parseElement = (element: HTMLElement): Content | null => {
    switch (element.tagName.toLowerCase()) {
      case "p": {
        const paragraphChildren = Array.from(element.childNodes)
          .map(parseTextNode)
          .filter((item): item is Content => item !== null);

        if (
          !paragraphChildren.some(
            (child) => child.type === "text" || child.type === "link"
          )
        ) {
          return null;
        }

        return {
          type: "paragraph",
          children: paragraphChildren,
        };
      }
      case "a": {
        const linkChildren = Array.from(element.childNodes)
          .map(parseTextNode)
          .filter((item): item is Content => item !== null);

        return {
          type: "link",
          url: element.getAttribute("href") || "#",
          children: linkChildren,
        };
      }
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6": {
        const headingChildren = Array.from(element.childNodes)
          .map(parseTextNode)
          .filter((item): item is Content => item !== null);

        return {
          type: "heading",
          level: parseInt(element.tagName.substring(1), 10),
          children: headingChildren,
        };
      }
      case "img": {
        return {
          type: "image",
          image: {
            ext: element.getAttribute("src")?.split(".").pop() || "",
            url: element.getAttribute("src") || "",
            hash: "",
            mime: "",
            name: element.getAttribute("alt") || "",
          },
        };
      }
      default:
        return null;
    }
  };

  const parseTextNode = (node: ChildNode): Content | null => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      // Trả về TextContent nếu nội dung không rỗng
      return {
        type: "text",
        text: node.textContent.trim(),
      };
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      return parseElement(node as HTMLElement);
    }
    return null;
  };

  return Array.from(doc.body.childNodes)
    .map((node) => parseElement(node as HTMLElement))
    .filter((item): item is Content => item !== null);
};

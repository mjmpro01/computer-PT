export type TextContent = {
  type: "text";
  text: string; // Nội dung văn bản
};

export type LinkContent = {
  type: "link";
  url: string; // URL của liên kết
  children: Content[]; // Nội dung bên trong liên kết (có thể là văn bản hoặc các phần tử khác)
};

export type HeadingContent = {
  type: "heading";
  level: number; // Mức độ tiêu đề (h1 = 1, h2 = 2, ...)
  children: Content[]; // Nội dung bên trong tiêu đề
};

export type ImageContent = {
  type: "image";
  image: {
    ext: string; // Định dạng file (e.g., "jpg", "png")
    url: string; // URL của hình ảnh
    hash: string; // Hash của file (nếu có)
    mime: string; // Loại MIME (e.g., "image/jpeg")
    name: string; // Tên hình ảnh
  };
};

export type ParagraphContent = {
  type: "paragraph";
  children: Content[]; // Nội dung bên trong đoạn văn (thường là văn bản hoặc liên kết)
};

export type Content =
  | TextContent
  | LinkContent
  | HeadingContent
  | ImageContent
  | ParagraphContent;

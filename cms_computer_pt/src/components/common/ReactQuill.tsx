/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import clsx from "clsx";
import { useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import urls from "../../utils/constants/urls";
import axiosInstance from "../../apis/axios/axiosInstance";

const BASE_URL = "http://localhost:1337/";
interface IReactQuillComponentProps {
  currentValue: string;
  setCurrentValue: (value: string) => void;
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  isRequired?: boolean;
  className?: string;
}
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image"],

  //   [{ header: 1 }, { header: 2 }, { header: 3 }, { header: 4 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  // [{ direction: 'rtl' }], // text direction

  //   [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  // ['Resize', 'DisplaySize'],

  // ['clean'], // remove formatting button
];
const ReactQuillComponent = (props: IReactQuillComponentProps) => {
  const {
    currentValue,
    setCurrentValue,
    containerClassName,
    label,
    labelClassName,
    isRequired,
    className,
  } = props;
  const quillRef = useRef<ReactQuill>(null);
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files !== null) {
        const file = input.files[0];
        console.log(file);

        try {
          const formData = new FormData();
          formData.append("files", file);

          const response = await axiosInstance.post(urls.UPLOAD, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          const imageUrl = `${BASE_URL}${response.data[0].url}`;
          console.log(`${BASE_URL}${response.data[0].url}`);
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection();

          // // Insert the uploaded image at the cursor position
          // if (range) {
          //   editor?.insertEmbed(range.index, 'image', imageUrl);
          // }
          // Yêu cầu người dùng nhập kích thước ảnh
          const width = prompt("Enter image width (px):", "auto");
          const height = prompt("Enter image height (px):", "auto");

          // Chèn hình ảnh với kích thước tùy chỉnh
          if (range) {
            editor?.clipboard.dangerouslyPasteHTML(
              range.index,
              `<img src="${imageUrl}" width="${width}" height="${height}" />`
            );
          }
          //   return `${BASE_API_URL}${response.data[0].url}`;
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            console.error("Error message:", error.message);
          } else {
            console.error("Unexpected error:", error);
          }
        }
      }
    };
  }, []);

  return (
    <div className={clsx("w-full", containerClassName)}>
      {!!label && (
        <div className="flex items-center gap-[0.8rem]">
          <label
            className={clsx(
              "font-[500] text-[1.4rem] leading-[2rem] text-[#484848]",
              labelClassName
            )}
          >
            {label}:
          </label>
          <div
            className={clsx(
              "flex items-center justify-center",
              isRequired ? "visible" : "invisible"
            )}
          >
            <span className="text-[red] font-bold text-[1.6rem]">*</span>
          </div>
        </div>
      )}
      <ReactQuill
        ref={quillRef}
        className={clsx("w-full", className)}
        theme="snow"
        value={currentValue}
        onChange={setCurrentValue}
        modules={{
          clipboard: {
            matchVisual: false,
          },
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: imageHandler,
            },
          },
        }}
      />
    </div>
  );
};

export default ReactQuillComponent;

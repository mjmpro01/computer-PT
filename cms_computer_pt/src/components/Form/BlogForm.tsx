/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "antd";
import { toast } from "sonner";
import { BlogRequestType } from "../../types/request/blog";
import { BaseData } from "../../types/base/baseData";
import { CategoriesType } from "../../types/commom/categories";
import { BlogCategoryType, BlogType } from "../../types/commom/blog";
import InputCustomComponent from "../common/InputCustomComponent";
import SelectComponent from "../common/SelectCustomConponent";
import UploadCustom from "../common/Upload";
import ReactQuillComponent from "../common/ReactQuill";
import { blogApi } from "../../apis/axios/blogApi";
import { parseEditorValueToContent } from "../../utils/functions/formattedContent";

interface BlogFormProps {
  onMutate: () => void;
  categories: BaseData<BlogCategoryType>[];
  category: BaseData<CategoriesType> | null;
  isEdit: boolean;
  editData?: BaseData<BlogType> | null;
}
export const convertContentToHtml = (content: any[]): string => {
  const convertNode = (node: any): string => {
    switch (node.type) {
      case "text":
        return node.text || "";
      case "paragraph":
        const paragraphChildren = node.children.map(convertNode).join("");
        return `<p>${paragraphChildren}</p>`;
      case "heading":
        const headingLevel = node.level || 1;
        const headingChildren = node.children.map(convertNode).join("");
        return `<h${headingLevel}>${headingChildren}</h${headingLevel}>`;
      case "link":
        const linkChildren = node.children.map(convertNode).join("");
        const href = node.url || "#";
        return `<a href="${href}">${linkChildren}</a>`;
      case "image":
        const { url, name, alt } = node.image || {};
        return `<img src="${url}" alt="${alt || name || ""}" />`;
      default:
        return "";
    }
  };

  return content.map(convertNode).join("");
};

function BlogForm({ onMutate, categories, isEdit, editData }: BlogFormProps) {
  const [editorValue, setEditorValue] = useState<string>("");
  const [avatarId, setAvatarId] = useState<number>(0);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BlogRequestType>();

  useEffect(() => {
    if (isEdit && editData) {
      console.log(editData);
      setValue("title", editData.attributes.title);
      setValue("blog_category", editData?.attributes?.blog_category?.data?.id);
      const htmlContent = convertContentToHtml(
        editData?.attributes?.content || []
      );
      setEditorValue(htmlContent); // Gán HTML vào editorValue
      setAvatarId(editData.attributes.avatar.data.id);
    }
  }, [isEdit, editData, setValue]);

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
  };

  const onSubmit: SubmitHandler<BlogRequestType> = async (data) => {
    if (!editorValue) {
      toast.error("Bài viết cần nhập nội dung để hoàn tất");
      return;
    }

    const parsedContent = parseEditorValueToContent(editorValue);

    const newData = {
      ...data,
      avatar: { id: avatarId },
      content: parsedContent,
    };

    try {
      if (isEdit && editData) {
        await blogApi.update(newData, editData?.id);
        toast.success("Cập nhật thành công");
      } else {
        await blogApi.create(newData);
        toast.success("Thêm thành công");
      }
      onMutate();
      reset();
    } catch (error) {
      toast.error("Lưu thất bại");
    }
  };

  const options =
    categories?.map((item) => ({
      label: item?.attributes?.name,
      value: item?.id,
    })) || [];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[12px]"
    >
      <InputCustomComponent
        control={control}
        label="Tên bài viết"
        placeholder="Nhập Tên bài viết"
        name="title"
        isRequired
        errors={errors.title}
      />
      <UploadCustom setId={setAvatarId} />
      <SelectComponent
        containerClasName="w-full"
        control={control}
        label="Danh mục bài viết"
        name="blog_category"
        options={options}
      />
      <ReactQuillComponent
        label="Nội dung"
        setCurrentValue={handleEditorChange}
        currentValue={editorValue}
      />
      <div className="sticky bottom-0 w-full">
        <Button htmlType="submit" type="primary" className="h-[40px] w-full">
          {isEdit ? "Cập nhật" : "Lưu"}
        </Button>
      </div>
    </form>
  );
}

export default BlogForm;

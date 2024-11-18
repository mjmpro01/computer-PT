/* eslint-disable react-hooks/exhaustive-deps */
import { SubmitHandler, useForm } from "react-hook-form";
import InputCustomComponent from "../common/InputCustomComponent";
import { Button } from "antd";
import { BaseData } from "../../types/base/baseData";
import { CategoriesType } from "../../types/commom/categories";

import { BlogRequestType } from "../../types/request/blog";
import Editor from "../common/Editor";
import { useState } from "react";
import { BlogCategoryType } from "../../types/commom/blog";
import SelectComponent from "../common/SelectCustomConponent";
import UploadCustom from "../common/Upload";
import { blogApi } from "../../apis/axios/blogApi";
import { toast } from "sonner";

interface BlogFormProps {
  onMutate: () => void;
  categories: BaseData<BlogCategoryType>[];
  category: BaseData<CategoriesType> | null;
  isEdit: boolean;
}
function BlogForm({ onMutate, categories, category, isEdit }: BlogFormProps) {
  const [editorValue, setEditorValue] = useState<string>("");
  const handleEditorChange = (value: string) => {
    setEditorValue(value);
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogRequestType>();

  const onSubmit: SubmitHandler<BlogRequestType> = async (data) => {
    console.log(data);
    const newData = {
      ...data,
      content: editorValue,
    };

    await blogApi
      .create(newData)
      .then((res) => {
        if (res) {
          toast.success("Lưu thành công");
          onMutate();
          setEditorValue("");
          reset();
        }
      })
      .catch(() => toast.error("Lưu thất bại"));
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
      <UploadCustom />
      <SelectComponent
        containerClasName="w-full"
        control={control}
        label="Danh mục bài viết"
        name="blog_category"
        // errors={errors.parent}
        options={options}
      />
      <Editor
        value={editorValue}
        onChange={handleEditorChange}
        className="text-[16px] text-black"
      />
      <Button htmlType="submit" type="primary" className="h-[40px]">
        Lưu
      </Button>
    </form>
  );
}

export default BlogForm;

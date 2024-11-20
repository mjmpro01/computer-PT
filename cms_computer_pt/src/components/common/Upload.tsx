/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import uploadApi from "../../apis/axios/uploadApi";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface UploadCustomProps {
  setId: (id: number) => void;
}
const UploadCustom = ({ setId }: UploadCustomProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  // Hàm xử lý upload file
  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const id = await uploadApi.upload(file); // Gọi API upload file và nhận `id`
      message.success(`Upload thành công! ID: ${id}`);
      // Cập nhật fileList với `id`
      setId(id?.[0]?.id);
      setFileList((prevList) =>
        prevList.map((item) =>
          item.uid === file.uid
            ? {
                ...item,
                status: "done",
                url: `https://your-server.com/images/${id}`,
                id,
              }
            : item
        )
      );

      onSuccess?.();
    } catch (error) {
      console.error("Error uploading file:", error);
      onError?.(error);
      message.error("Upload thất bại.");
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        customRequest={customRequest} // Sử dụng customRequest thay vì `action`
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadCustom;

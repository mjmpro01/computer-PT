/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Table } from "antd";
import { useEffect, useMemo, useState } from "react";

import { useFetchUser } from "../../apis/swr/useFetchUser";
import { formatDate } from "../../utils/functions/formatDate";
import SearchCustom from "../../components/common/SearchCustom";
import { filterData } from "../../utils/functions/filterData";
import { UserType } from "../../types/commom/user";
import InputCustomComponent from "../../components/common/InputCustomComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserRequestType } from "../../types/request/user";
import SelectComponent from "../../components/common/SelectCustomConponent";
import { userApi } from "../../apis/axios/userApi";
import { toast } from "sonner";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function Customers() {
  const { data, mutate } = useFetchUser();
  const [query, setQuery] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const filterFields: (keyof UserType)[] = [
    "fullname",
    "email",
    "phone",
    "address",
  ];
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserRequestType>();

  const onSubmit: SubmitHandler<UserRequestType> = async (data) => {
    const newData = {
      ...data,
      role: "Authenticated",
    };
    console.log(newData);
    if (!isEdit) {
      await userApi
        .create(newData)
        .then((res) => {
          if (res) {
            toast.success("Lưu thành công");
            mutate();
            reset();
            handleOk();
          }
        })
        .catch(() => toast.error("Lưu thất bại"));
    } else {
      if (user) {
        await userApi
          .update(newData, user?.id)
          .then((res) => {
            if (res) {
              toast.success("Lưu thành công");
              mutate();
              reset();
              handleOk();
            }
          })
          .catch(() => toast.error("Lưu thất bại"));
      }
    }
  };
  useEffect(() => {
    setValue("email", user?.email || "");
    setValue("fullname", user?.fullname || "");
    setValue("address", user?.address || "");
    setValue("is_admin", user?.is_admin || false);
    setValue("phone", user?.phone || "");
    setValue("username", user?.username || "");
  }, [isEdit, user?.id]);
  const filteredData = useMemo(() => {
    return data ? filterData(data, query, filterFields) : [];
  }, [data, query, filterFields]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày tạo",
      key: "createdAt",
      render: (record: UserType) => {
        const day = record?.createdAt;
        return <p>{day ? formatDate(day) : "N/A"}</p>;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: UserType) => (
        <div className="flex gap-[8px]">
          <button
            className="text-blue-500 hover:underline flex items-center gap-[4px]"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
            <p>Sửa</p>
          </button>
          <button
            className="text-red-500 hover:underline flex items-center gap-[4px]"
            onClick={() => handleDelete(record)}
          >
            <DeleteOutlined />
            <p>Xóa</p>
          </button>
        </div>
      ),
    },
  ];
  const handleEdit = (record: UserType) => {
    setIsEdit(true);
    setUser(record);
    showModal();
  };

  const handleDelete = async (record: UserType) => {
    await userApi
      .delete(record?.id)
      .then(() => {
        toast.success("Xóa thành công");
        mutate();
      })
      .catch(() => toast.error("Xóa thất bại"));
  };

  return (
    <div className="p-[10px] flex flex-col gap-[24px]">
      <h2 className="text-[20px] font-bold">Danh sách tài khoản</h2>

      <div className="flex items-center justify-between">
        <SearchCustom
          setValue={setQuery}
          value={query}
          className="max-w-[300px]"
        />
        <div className="flex items-center gap-[10px]">
          <Button
            className="w-[150px] h-[40px]"
            type="primary"
            onClick={() => window.location.reload()}
          >
            Làm mới
          </Button>
          <Button
            className="w-[150px] h-[40px]"
            type="primary"
            onClick={showModal}
          >
            Thêm tài khoản
          </Button>
        </div>
      </div>
      <Table dataSource={filteredData} columns={columns} />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <h2 className="text-[20px] font-bold text-center">
          Thêm tài khoản mới
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[12px]"
        >
          <div className="grid grid-cols-2 gap-[12px]">
            <InputCustomComponent
              control={control}
              label="Tên khách hàng"
              placeholder="Nhập Tên khách hàng"
              name="fullname"
              isRequired
              errors={errors.fullname}
            />
            <InputCustomComponent
              control={control}
              label="Tên đăng nhập"
              placeholder="Nhập Tên đăng nhập"
              name="username"
              isRequired
              errors={errors.username}
            />
          </div>
          <div className="grid grid-cols-2 gap-[12px]">
            <InputCustomComponent
              control={control}
              label="Email"
              placeholder="Nhập Email"
              name="email"
              isRequired
              errors={errors.email}
            />
            <InputCustomComponent
              control={control}
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              name="password"
              isRequired
              isPassword
              errors={errors.password}
            />
          </div>
          <div className="grid grid-cols-2 gap-[12px]">
            <InputCustomComponent
              control={control}
              label="Số điện thoại"
              placeholder="Nhập sđt"
              name="phone"
              errors={errors.phone}
            />
            <SelectComponent
              containerClasName="w-full"
              control={control}
              label="Phân quyền"
              name="is_admin"
              options={[
                {
                  label: "Admin",
                  value: true,
                },
                {
                  label: "User",
                  value: false,
                },
              ]}
            />
          </div>
          <InputCustomComponent
            control={control}
            label="Địa chỉ"
            placeholder="Nhập địa chỉ"
            name="address"
            errors={errors.address}
          />
          <Button htmlType="submit" type="primary" className="h-[40px]">
            Lưu
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default Customers;

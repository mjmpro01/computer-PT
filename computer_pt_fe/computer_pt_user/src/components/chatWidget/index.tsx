import chatApi from "@/api/chatApi";
import { roomChatApi } from "@/api/roomChatApi";
import socket from "@/api/socket";
import icons from "@/assets/icons";
import ChatFrame from "@/components/chatWidget/ChatFrame";
import variables from "@/utils/constants/variables";
import { getUserProfile } from "@/utils/functions/getUser";
import { Popover } from "antd";
import { useEffect, useState } from "react";

const ChatWidget = () => {
  const [openChat, setOpenChat] = useState(false);

  const dataUser = getUserProfile();
  useEffect(() => {
    if (!openChat) return;
    let dataRoom: {
      id: number;
      room_id: string;
    } = { id: -1, room_id: "" };
    const fetchUserRoom = async () => {
      try {
        const res = await chatApi
          .getUserRoom(dataUser.id)
          .then((res) => res.data);
        if (res.data?.length > 0) {
          const data = res.data?.[0];
          dataRoom = {
            id: data.id,
            room_id: data.attributes.room_id,
          };

          localStorage.setItem(variables.ROOM_ID, data.attributes.room_id);
        } else {
          try {
            const res = await roomChatApi.create({
              user: dataUser.id.toString(),
              seen_status: false,
            });

            dataRoom = {
              id: res?.data?.data?.id,
              room_id: res?.data?.data?.attributes?.room_id,
            };

            localStorage.setItem(
              variables.ROOM_ID,
              res?.data?.data?.attributes?.room_id
            );
          } catch (error) {
            console.log("error create room chat", error);
          }
        }
      } catch (error) {
        console.log("fetchUserRoom error", error);
      }
    };

    fetchUserRoom();
    socket.auth = {
      username: dataUser.username,
      user_id: dataUser.id,
      room: dataRoom.room_id,
    };
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [dataUser.id, openChat]);

  return (
    <Popover
      content={<ChatFrame />}
      trigger="click"
      placement="topLeft"
      arrow={false}
      open={openChat}
      onOpenChange={() => setOpenChat(true)}
      rootClassName="fixed bottom-[48px] right-[72px] [&_.ant-popover-title]:text-[16px] [&_.ant-popover-title]:py-[2px]"
      title={
        <div className="w-full flex justify-between items-center">
          <p className="color-[rgba(0, 0, 0, 0.88)] font-bold text-[16px]">
            Liên hệ với tư vấn viên
          </p>
          <div
            className="size-[24px] p-[4px] cursor-pointer hover:bg-[#f7f7f7] rounded-full"
            onClick={() => setOpenChat(false)}
          >
            <img src={icons.arrowRight} className="w-full h-full rotate-90" />
          </div>
        </div>
      }
    >
      <div
        className="rounded-[0.8rem] p-[1rem] w-[18rem] fixed bottom-[25%] border-[0.1rem] border-[#3333] shadow-md right-[2%] z-[100] flex justify-center items-center cursor-pointer bg-white"
        onClick={() => setOpenChat(!openChat)}
      >
        <div className="w-full flex justify-start items-center gap-[0.8rem]">
          <div className="size-[30px]">
            <img src={icons.chat} className="w-full h-full" />
          </div>
          <div>
            <p className="text-[1.4rem] font-medium text-[#1435C5]">
              Chat với nhân viên
            </p>
            <p className="text-[1.4rem] font-medium text-[#1435C5]">
              (8h - 22h30)
            </p>
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default ChatWidget;

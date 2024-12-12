import chatApi from "@/api/chatApi";
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
    let dataRoom: {
      id: number;
      room_id: string;
    } = { id: -1, room_id: "" };
    const fetchUserRoom = async () => {
      const res = await chatApi
        .getUserRoom(dataUser.id)
        .then((res) => res.data);
      const data = res.data?.[0];
      dataRoom = {
        id: data.id,
        room_id: data.attributes.room_id,
      };

      localStorage.setItem(variables.ROOM_ID, data.attributes.room_id);
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
  }, []);

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
        className="fixed bottom-[180px] right-[16px] w-[48px] h-[48px] p-[4px] z-[100] flex justify-center items-center rounded-full cursor-pointe bg-white"
        onClick={() => setOpenChat(!openChat)}
      >
        <img src={icons.chat} className="w-full h-full" />
      </div>
    </Popover>
  );
};

export default ChatWidget;

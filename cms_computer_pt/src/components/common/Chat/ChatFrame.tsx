import { useEffect, useState } from "react";
import icons from "../../../assets/icons";
import { BaseData } from "../../../types/base/baseData";
import { RoomChatType } from "../../../types/commom/roomChat";
import MessageWrapper from "./MessageWrapper";
import { useFetchMessages } from "../../../apis/swr/useFetchMessages";
import socket from "../../../apis/socket";
import { getUserProfile } from "../../../utils/functions/getUser";
import socketEvent from "../../../utils/constants/socketEvent";
import { useFetchRoomChats } from "../../../apis/swr/useFetchRoomChats";
import { MessageType } from "../../../types/commom/message";

interface IChatFrameProps {
  roomSelected?: BaseData<RoomChatType>;
}
export type NewMessageType = {
  sender: {
    id: number;
    name: string;
  };
  content?: string;
  createdAt: Date;
};
const ChatFrame = (props: IChatFrameProps) => {
  const { roomSelected } = props;
  const userData = getUserProfile();
  const [currentMessages, setCurrentMessages] = useState<NewMessageType[]>([]);
  const [message, setMessage] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [listMessage, setListMessage] = useState<BaseData<MessageType>[]>([]);

  const name =
    roomSelected?.attributes?.user?.data?.attributes?.fullname ||
    roomSelected?.attributes?.user?.data?.attributes?.email;

  const {
    data: messagesData,
    mutate: mutateMessages,
    pagination: paginationMessage,
    isLoading: isLoadingMessage,
  } = useFetchMessages(
    `filters[room][room_id]=${roomSelected?.attributes?.room_id}&sort[id]=desc&populate=deep,3&pagination[page]=${page}`
  );
  const { mutate: mutateRoomChats } = useFetchRoomChats(
    `sort[updatedAt]=desc&populate=deep,3&pagination[pageSize]=11`
  );

  useEffect(() => {
    if (roomSelected?.attributes?.room_id) {
      setPage(1);
      setCurrentMessages([]);
      mutateRoomChats();
      socket.auth = {
        username: userData.username,
        user_id: userData.id,
        room: roomSelected?.attributes?.room_id,
      };
      socket.connect();

      return () => {
        socket.disconnect();
      };
    }
  }, [roomSelected?.attributes?.room_id]);

  const handleSendMessage = () => {
    if (roomSelected?.attributes?.room_id) {
      socket.emit(socketEvent.PRIVATE_MESSAGE, {
        content: message || undefined,
        to: roomSelected?.attributes?.room_id,
      });

      const newMessage = {
        sender: {
          id: userData.id,
          name: userData.username,
        },
        content: message || undefined,
        createdAt: new Date(),
      };

      setCurrentMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  useEffect(() => {
    if (roomSelected?.attributes?.room_id) {
      const handleConnect = () => {
        socket.emit(socketEvent.ADMIN_JOIN_ROOM);
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleMessage = () => {
        console.log("handleMessage");
        setCurrentMessages([]);
        setTimeout(() => {
          mutateMessages();
          mutateRoomChats();
        }, 300);
      };

      socket.on(socketEvent.CONNECT, handleConnect);
      socket.on(socketEvent.PRIVATE_MESSAGE, handleMessage);

      return () => {
        socket.off(socketEvent.CONNECT, handleConnect);
        socket.off(socketEvent.PRIVATE_MESSAGE, handleMessage);
      };
    }
  }, [roomSelected?.attributes?.room_id]);

  useEffect(() => {
    if (!isLoadingMessage) {
      setListMessage((prev) => [...prev, ...messagesData]);
    }
  }, [isLoadingMessage, messagesData]);

  if (!roomSelected)
    return (
      <div className="h-screen w-full border-l flex justify-center items-center">
        <p>Vui lòng chọn tin nhắn!</p>
      </div>
    );
  return (
    <div className="h-screen w-full border-l">
      <div className="flex justify-start items-center gap-[12px] p-[6px] border-b">
        <div className="size-[48px] flex justify-center items-center rounded-full bg-[#f7f7f7] border">
          <p className="text-[16px] font-medium">{name?.slice(0, 1)}</p>
        </div>
        <p>{name}</p>
      </div>
      <MessageWrapper
        messagesData={listMessage}
        newMessageData={currentMessages}
        setPage={setPage}
        page={page}
        paginationMessage={paginationMessage}
      />

      <div className="w-full p-[12px] flex justify-between items-center gap-[12px]">
        <textarea
          placeholder="Aa"
          className="w-full bg-[#f0f0f0] resize-none p-[4px_12px] h-[40px] rounded-md focus:outline-none"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (message.trim() !== "") {
                handleSendMessage();
              }
            }
          }}
        />
        <div className="size-[32px] p-[5px] cursor-pointer hover:bg-[#f7f7f7] rounded-full">
          <img src={icons.send} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default ChatFrame;

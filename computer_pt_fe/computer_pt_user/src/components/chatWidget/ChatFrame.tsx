import chatApi from "@/api/chatApi";
import socket from "@/api/socket";
import icons from "@/assets/icons";
import WrapperMessage from "@/components/chatWidget/WrapperMessage";
import { BaseData } from "@/types/base/baseData";
import { MessageResponseType } from "@/types/reponse/message";
import socketEvent from "@/utils/constants/socketEvent";
import variables from "@/utils/constants/variables";
import { getUserProfile } from "@/utils/functions/getUser";
import { useEffect, useState } from "react";

export type NewMessageType = {
  sender: {
    id: number;
    name: string;
  };
  content?: string;
  createdAt: Date;
};

const ChatFrame = () => {
  const room_id = localStorage.getItem(variables.ROOM_ID);
  const dataUser = getUserProfile();
  const [currentMessages, setCurrentMessages] = useState<NewMessageType[]>([]);
  const [messageList, setMessageList] = useState<
    BaseData<MessageResponseType>[]
  >([]);
  const [message, setMessage] = useState<string>("");
  const [isChatReady, setIsChatReady] = useState(false);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await chatApi
          .getMessages(
            `filters[room][room_id]=${room_id}&sort[id]=asc&populate=deep,3`
          )
          .then((res) => res.data);
        setMessageList(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchMessages();
  }, [room_id]);

  const handleSendMessage = () => {
    socket.emit(socketEvent.PRIVATE_MESSAGE, {
      content: message || undefined,
      to: room_id,
    });

    const newMessage = {
      sender: {
        id: dataUser.id,
        name: dataUser.username,
      },
      content: message || undefined,
      createdAt: new Date(),
    };

    setCurrentMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  useEffect(() => {
    const handleConnect = () => {
      console.log("handleConnect");
      const timeout = setTimeout(() => {
        socket.emit(socketEvent.JOIN_MY_ROOM);

        console.log("Socket connected:", socket.id);
        setIsChatReady(true);
      }, 3000);

      return () => clearTimeout(timeout);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePrivateMessage = async (message: any) => {
      const newMsg = {
        sender: {
          id: message?.from === dataUser.id ? dataUser.id : -1,
          name: message?.from === dataUser.id ? dataUser.username : "admin",
        },
        content: message.content || undefined,
        createdAt: new Date(),
      };
      setCurrentMessages((prev) => [...prev, newMsg]);
    };

    // socket.on(socketEvent.CONNECT, handleConnect);
    handleConnect();
    socket.on(socketEvent.PRIVATE_MESSAGE, handlePrivateMessage);

    return () => {
      socket.off(socketEvent.CONNECT, handleConnect);
      socket.off(socketEvent.PRIVATE_MESSAGE, handlePrivateMessage);
    };
  }, [room_id]);

  return (
    <div className="min-w-[380px] max-w-[380px] min-h-[500px] max-h-[500px] bg-white">
      <WrapperMessage
        data={messageList}
        dateNew={currentMessages}
        isReadyChat={isChatReady}
      />

      <div className="w-full py-[12px] flex justify-between items-center gap-[12px]">
        <textarea
          placeholder="Aa"
          className="w-full bg-[#f0f0f0] resize-none p-[4px_12px] h-[35px] rounded-md focus:outline-none"
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
        <div
          className="size-[32px] p-[5px] cursor-pointer hover:bg-[#f7f7f7] rounded-full"
          onClick={handleSendMessage}
        >
          <img src={icons.send} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default ChatFrame;

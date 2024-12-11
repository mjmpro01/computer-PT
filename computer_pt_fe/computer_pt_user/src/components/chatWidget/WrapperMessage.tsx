import { NewMessageType } from "@/components/chatWidget/ChatFrame";
import Message from "@/components/chatWidget/Message";
import NewMessage from "@/components/chatWidget/NewMessage";
import { BaseData } from "@/types/base/baseData";
import { MessageResponseType } from "@/types/reponse/message";
import { Spin } from "antd";
import clsx from "clsx";
import { useEffect, useRef } from "react";

interface IWrapperMessageProps {
  data: BaseData<MessageResponseType>[];
  dateNew: NewMessageType[];
  isReadyChat?: boolean;
}
const WrapperMessage = (props: IWrapperMessageProps) => {
  const { data, dateNew, isReadyChat } = props;
  const wrapperMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReadyChat) {
      console.log("wrapperMessageRef.current!.scrollIntoView()");
      wrapperMessageRef.current!.scrollTo({
        top: wrapperMessageRef.current!.scrollHeight || 450,
        behavior: "smooth",
      });
    }
  }, [data, dateNew, isReadyChat]);

  if (!isReadyChat) {
    return (
      <div className="h-[450px] min-w-[380px] max-w-[380px] flex justify-center items-center">
        <Spin />
      </div>
    );
  }
  return (
    <div
      className="h-[450px] py-[12px] flex flex-col gap-[4px] border-t border-b overflow-x-auto"
      ref={wrapperMessageRef}
    >
      {data.map((mess, index) => (
        <Message key={index} data={mess} />
      ))}
      {dateNew.map((mess, index) => (
        <NewMessage key={index} data={mess} />
      ))}
    </div>
  );
};

export default WrapperMessage;

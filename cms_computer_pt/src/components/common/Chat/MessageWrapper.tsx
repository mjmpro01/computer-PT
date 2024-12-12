import { BaseData } from "../../../types/base/baseData";
import Message from "./Message";
import { MessageType } from "../../../types/commom/message";
import { useEffect, useRef } from "react";
import { NewMessageType } from "./ChatFrame";
import NewMessage from "./NewMessage";
import { PaginationResponseType } from "../../../types/commom/pagination";

interface IMessageWrapperProps {
  messagesData: BaseData<MessageType>[];
  newMessageData: NewMessageType[];
  setPage: (page: number) => void;
  paginationMessage?: PaginationResponseType;
  page: number;
}
const MessageWrapper = (props: IMessageWrapperProps) => {
  const { messagesData, newMessageData, setPage, paginationMessage, page } =
    props;
  const wrapperMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (page === 1) {
      wrapperMessageRef.current!.scrollTo({
        top: wrapperMessageRef.current!.scrollHeight || 450,
        behavior: "smooth",
      });
    }
  }, [messagesData, newMessageData]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.scrollTop === 0) {
      if (page < (paginationMessage?.pageCount || 0)) {
        setPage(page + 1);
      }
    }
  };
  return (
    <div
      className="h-[calc(100svh-130px)] flex flex-col gap-[4px] py-[12px] px-[6px] overflow-y-auto"
      ref={wrapperMessageRef}
      onScroll={handleScroll}
    >
      {messagesData.reverse().map((mess, index) => (
        <Message key={index} message={mess} />
      ))}
      {newMessageData.map((mess, index) => (
        <NewMessage key={index} message={mess} />
      ))}
    </div>
  );
};

export default MessageWrapper;

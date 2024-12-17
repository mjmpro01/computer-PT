import clsx from "clsx";
import { MessageType } from "../../../types/commom/message";
import { BaseData } from "../../../types/base/baseData";
import { getUserProfile } from "../../../utils/functions/getUser";

interface IMessageProps {
  message: BaseData<MessageType>;
}

const Message = (props: IMessageProps) => {
  const { message } = props;
  const userData = getUserProfile();

  const isUser = message?.attributes?.sender?.data?.id === userData?.id;
  if (!isUser)
    return (
      <div className="w-full flex justify-start items-center">
        <p
          className={clsx(
            "text-[14px] w-fit p-[4px_8px] text-[#000000] bg-[#f7f7f7] rounded-[12px] border mr-[30%]"
          )}
        >
          {message.attributes.content}
        </p>
      </div>
    );
  return (
    <div className="w-full flex justify-end items-center">
      <p
        className={clsx(
          "text-[14px] w-fit p-[4px_8px] text-[#FFFFFF] bg-[#1435C5] rounded-[12px] ml-[30%]"
        )}
      >
        {message.attributes.content}
      </p>
    </div>
  );
};

export default Message;

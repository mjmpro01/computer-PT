import { BaseData } from "@/types/base/baseData";
import { MessageResponseType } from "@/types/reponse/message";
import { getUserProfile } from "@/utils/functions/getUser";
import clsx from "clsx";
interface IMessageProps {
  data: BaseData<MessageResponseType>;
}
const Message = (props: IMessageProps) => {
  const { data } = props;
  const userData = getUserProfile();

  const isUser = data?.attributes?.sender?.data?.id === userData?.id;

  if (!isUser)
    return (
      <div className="w-full flex justify-start items-center">
        <p
          className={clsx(
            "text-[14px] w-fit p-[4px_8px] text-[#000000] bg-[#f7f7f7] rounded-[12px]"
          )}
        >
          {data.attributes.content}
        </p>
      </div>
    );
  return (
    <div className="w-full flex justify-end items-center">
      <p
        className={clsx(
          "text-[14px] w-fit p-[4px_8px] text-[#FFFFFF] bg-[#1435C5] rounded-[12px]"
        )}
      >
        {data.attributes.content}
      </p>
    </div>
  );
};

export default Message;

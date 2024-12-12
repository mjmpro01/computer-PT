import clsx from "clsx";
import { getUserProfile } from "../../../utils/functions/getUser";
import { NewMessageType } from "./ChatFrame";
interface IMessageProps {
  message: NewMessageType;
}
const NewMessage = (props: IMessageProps) => {
  const { message } = props;
  const userData = getUserProfile();

  const isUser = message?.sender?.id === userData?.id;

  if (!isUser)
    return (
      <div className="w-full flex justify-start items-center">
        <p
          className={clsx(
            "text-[14px] w-fit p-[4px_8px] text-[#000000] bg-[#f7f7f7] rounded-[12px] border"
          )}
        >
          {message.content}
        </p>
      </div>
    );
  return (
    <div className="w-full flex justify-end items-center">
      <p
        className={clsx(
          "text-[14px] w-fit p-[4px_8px] text-[#FFFFFF]  bg-black rounded-[12px]"
        )}
      >
        {message.content}
      </p>
    </div>
  );
};

export default NewMessage;

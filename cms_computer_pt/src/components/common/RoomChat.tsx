import clsx from "clsx";
import { BaseData } from "../../types/base/baseData";
import { RoomChatType } from "../../types/commom/roomChat";
import dayjs from "dayjs";

interface IRoomChatProps {
  room_chat: BaseData<RoomChatType>;
  onClick: () => void;
  roomSelectedID?: number;
}
const RoomChat = (props: IRoomChatProps) => {
  const { room_chat, onClick, roomSelectedID } = props;

  const name =
    room_chat?.attributes?.user?.data?.attributes?.fullname ||
    room_chat?.attributes?.user?.data?.attributes?.email;
  return (
    <div
      className={clsx(
        "flex justify-start items-center gap-[12px] cursor-pointer p-[4px_8px]",
        room_chat.id === roomSelectedID ? "bg-[#edf0ff]" : "bg-transparent"
      )}
      onClick={onClick}
    >
      <div className="size-[48px] min-h-[48px] min-w-[48px] flex justify-center items-center rounded-full bg-[#f7f7f7] border">
        <p className="text-[16px] font-medium">{name.slice(0, 1)}</p>
      </div>
      <div className="w-full flex flex-col items-start gap-[4px]">
        <div className="w-full flex justify-between items-center">
          <p
            className={clsx(
              "text-[16px] max-w-[140px] truncate",
              room_chat.id === roomSelectedID
                ? "text-[#1245c5] font-semibold"
                : "text-black"
            )}
          >
            {name}
          </p>
          <p className="text-[12px] font-[400] italic text-[#bcb7b7]">
            {dayjs(room_chat?.attributes?.updatedAt).format("DD-MM")}
          </p>
        </div>

        {!room_chat?.attributes?.seen_status && (
          <p
            className={clsx(
              "text-[10px] font-[400] italic ",
              !room_chat?.attributes?.seen_status
                ? "font-semibold text-black"
                : "font-normal text-[#bcb7b7]"
            )}
          >
            Tin nhắn mới
          </p>
        )}
      </div>
    </div>
  );
};

export default RoomChat;

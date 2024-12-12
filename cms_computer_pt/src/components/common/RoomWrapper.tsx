import { useEffect, useRef, useState } from "react";
import { useFetchRoomChats } from "../../apis/swr/useFetchRoomChats";
import { BaseData } from "../../types/base/baseData";
import { RoomChatType } from "../../types/commom/roomChat";
import RoomChat from "./RoomChat";

interface RoomWrapperProps {
  handleRoomSelected: (room: BaseData<RoomChatType>) => void;
  roomSelectedID?: number;
}
const RoomWrapper = (props: RoomWrapperProps) => {
  const { handleRoomSelected, roomSelectedID } = props;
  const roomWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const [currentRoomChat, setCurrentRoomChat] = useState<
    BaseData<RoomChatType>[]
  >([]);
  const { data, pagination, isLoading, isValidating } = useFetchRoomChats(
    `sort[updatedAt]=desc&populate=deep,3&pagination[pageSize]=200&pagination[page]=${page}`
  );

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const isAtBottom =
      target.clientHeight + target.scrollTop + 1 >= target.scrollHeight;

    console.log("isAtBottom", isAtBottom);
    if (isAtBottom && page < (pagination?.pageCount || 0)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    setCurrentRoomChat([]);
  }, []);
  useEffect(() => {
    if (!isLoading && !isValidating) {
      setCurrentRoomChat(data);
    }
  }, [isLoading, isValidating]);
  return (
    <div className="min-w-[300px] w-[300px] py-[24px]">
      <p className="text-center">Danh sách tin nhắn</p>
      <div
        className="h-[calc(100svh-90px)] flex flex-col pt-[12px] mt-[12px] border-t overflow-y-auto"
        ref={roomWrapperRef}
        onScroll={handleScroll}
      >
        {currentRoomChat.map((room, index) => (
          <RoomChat
            room_chat={room}
            key={index}
            onClick={() => handleRoomSelected(room)}
            roomSelectedID={roomSelectedID}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomWrapper;

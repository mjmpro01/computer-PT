import { useEffect, useState } from "react";
import ChatFrame from "../../components/common/Chat/ChatFrame";
import RoomWrapper from "../../components/common/RoomWrapper";
import { RoomChatType } from "../../types/commom/roomChat";
import { BaseData } from "../../types/base/baseData";
import { roomChatApi } from "../../apis/axios/roomCHAT";

function Chat() {
  const [roomSelected, setRoomSelected] = useState<BaseData<RoomChatType>>();

  const handleRoomSelected = (room: BaseData<RoomChatType>) => {
    setRoomSelected(room);
  };

  useEffect(() => {
    const updateSeenStatus = async () => {
      if (roomSelected) {
        try {
          await roomChatApi.update(
            {
              room_id: roomSelected?.attributes.room_id,
              user: roomSelected?.attributes.user.data.id.toString(),
              seen_status: true,
            },
            roomSelected?.id
          );
        } catch (error) {
          console.log("error update seen status", error);
        }
      }
    };
    if (!roomSelected?.attributes?.seen_status) {
      updateSeenStatus();
    }
  }, [roomSelected?.id]);

  return (
    <div className="w-full flex justify-start items-start">
      <RoomWrapper
        handleRoomSelected={handleRoomSelected}
        roomSelectedID={roomSelected?.id}
      />
      <ChatFrame roomSelected={roomSelected} />
    </div>
  );
}

export default Chat;

import { useEffect, useState } from "react";
import ChatFrame from "../../components/common/Chat/ChatFrame";
import RoomWrapper from "../../components/common/RoomWrapper";
import { RoomChatType } from "../../types/commom/roomChat";
import { BaseData } from "../../types/base/baseData";
import { roomChatApi } from "../../apis/axios/roomChat";

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

  // useEffect(() => {
  //   socket.auth = {
  //     username: userData.username,
  //     user_id: userData.id,
  //   };
  //   socket.connect();
  //   const handleConnect = () => {
  //     socket.emit(socketEvent.ADMIN_JOIN_ROOM);
  //   };
  //   const handleNewRoom = () => {
  //     console.log("handleNewRoom");
  //     mutateRoomChats();
  //   };

  //   socket.on(socketEvent.JOIN_MY_ROOM, handleNewRoom);
  //   // socket.on(socketEvent.NEW_USER_JOIN_ROOM, handleNewRoom);

  //   return () => {
  //     socket.disconnect();
  //     socket.off(socketEvent.JOIN_MY_ROOM, handleConnect);
  //     // socket.off(socketEvent.NEW_USER_JOIN_ROOM, handleNewRoom);
  //   };
  // }, [mutateRoomChats]);

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

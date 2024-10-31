/**
 * room-chat controller
 */

import { factories } from '@strapi/strapi';
export default factories.createCoreController('api::room-chat.room-chat', ({ strapi }) => ({
  async me(ctx) {
    const { id } = ctx.state.user;
    if (!id) {
      return ctx.badRequest('not_login', "need to login to using this feature")
    }
    let roomChat;
    roomChat = await strapi.entityService.findMany('api::room-chat.room-chat', {
      filters: {
        user: id
      },
      populate: '*'
    });
    roomChat = roomChat[0];
    if(!roomChat) {
      roomChat = await strapi.entityService.create('api::room-chat.room-chat', {
        data: {
          user: {
            id: id
          }
        },
      });
    };
    return {
      room_id: roomChat?.room_id,
      id: roomChat?.id
    }
  },
  async seen(ctx) {
    const { id } = ctx.state.user;
    const { room_id } = ctx.request.body;
    if (!id) {
      return ctx.badRequest('not_login', "need to login to using this feature")
    }
    // update room chat seen status
    const roomChat = await strapi.entityService.findMany('api::room-chat.room-chat', {
      filters: {
        room_id: room_id
      }
    });
    if(roomChat.length > 0) {
      return await strapi.entityService.update('api::room-chat.room-chat', roomChat[0].id, {
        data: {
          seen_status: true
        }
       });
    } else {
      return ctx.badRequest('room_id_not_valid', "room id not valid");
    }
  },

  async getAllRoom(ctx) {
    const { id } = ctx.state.user;
    const query = ctx.query;
    if (!id) {
      return ctx.badRequest('not_login', "need to login to using this feature")
    }
    const roomChat = await strapi.entityService.findMany('api::room-chat.room-chat', {
      ...query,
      sort: 'updatedAt:desc',
      populate: {
        user: {
          fields: ["id", "username", "email", "fullname"],
        }
      }
    });
    const messagePromises = roomChat.map(async (room) => {
      const message = await strapi.entityService.findMany('api::message.message', {
        filters: {
          room: {
            id: room.id
          }
        },
        sort: "createdAt:desc",
        limit: 1,
        populate: {
          media: {
            fields: ["url"]
          },
        }
      });
      return {
        room: room,
        last_message: message[0],
      };
    });

    const result = await Promise.all(messagePromises);
    return result;
  }
}));


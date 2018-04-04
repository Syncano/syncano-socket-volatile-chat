import Syncano from '@syncano/core';

import validateRequired from './utils/helpers';

export default async (ctx) => {
  const { response, channel } = new Syncano(ctx);
  const { username: sendingUser, message_text, room } = ctx.args;
  const { user } = ctx.meta;

  try {
    const username = (user) ? user.username : sendingUser;
    validateRequired({ message_text, room, username });

    const { payload, room: group } = await channel.publish(`group.${room}`, { message_from: username, message_text });
    return response.json({ group, payload }, 200);
  } catch ({ message, details }) {
    if (details) {
      return response.json({ message, details }, 400);
    }
    return response.json({ message: 'Failed to publish message' }, 400);
  }
};

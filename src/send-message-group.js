import Syncano from '@syncano/core';

import validateRequired from './utils/helpers';

export default async (ctx) => {
  const { response, channel } = new Syncano(ctx);
  const { username, message_text, room } = ctx.args;

  try {
    validateRequired({ username, message_text, room });

    const result = await channel.publish(`group.${room}`, { username, message_text });
    return response.json(result, 200);
  } catch ({ message, details }) {
    if (details) {
      return response.json({ message, details }, 400);
    }
    return response.json({ message: 'Failed to publish message' }, 400);
  }
};

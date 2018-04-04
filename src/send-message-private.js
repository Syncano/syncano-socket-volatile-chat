import Syncano from '@syncano/core';

import validateRequired from './utils/helpers';

export default async (ctx) => {
  const { response, channel } = new Syncano(ctx);
  const { message_text, message_to } = ctx.args;
  const { user } = ctx.meta;

  if (!user) {
    return response.json({ message: 'Unauthorized' }, 401);
  }

  try {
    validateRequired({ message_text, message_to });
    const { payload } = await channel.publish(`messages.${message_to}`,
      { message_text, message_to, message_from: user.username });
    return response.json(payload, 200);
  } catch ({ message, details }) {
    if (details) {
      return response.json({ message, details }, 400);
    }
    return response.json({ message: 'Failed to send message' }, 400);
  }
};

import Syncano from '@syncano/core';

import validateRequired from './utils/helpers';

export default async (ctx) => {
  const { response, users, channel } = new Syncano(ctx);
  const { chat_message, message_to } = ctx.args;

  if (users) {
    console.log(users.instance.meta.user, '>>>>>>>>');
  }

  try {
    validateRequired({ chat_message, message_to });
    const publishedMessage = await channel.publish(`messages.${message_to}`,
      { chat_message, message_to, author: 'user_key' });
    return response.json({ publishedMessage }, 200);
  } catch ({ message, details }) {
    if (details) {
      return response.json({ message, details }, 400);
    }
    return response.json({ message: 'Failed to send message' }, 400);
  }
};

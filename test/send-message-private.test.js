import { expect } from 'chai';
import { describe, it } from 'mocha';
import { run } from '@syncano/test';
import 'dotenv/config';

describe('send-message-private', () => {
  const { TEST_MESSAGE_TO } = process.env;
  const meta = {
    user: {
      id: 5,
      username: 'sendFrom@mail.com'
    }
  };
  const args = { message_to: TEST_MESSAGE_TO, message_text: 'I love JS' };

  it('should return detail of message sent if valid parameters supplied', async () => {
    const { data: chatResponse, code } = await run('send-message-private', { args, meta });
    expect(code).to.equal(200);
    expect(chatResponse).to.have.property('message_text');
    expect(chatResponse).to.have.property('message_to');
    expect(chatResponse).to.have.property('message_from');
    expect(chatResponse.message_from).to.equal('sendFrom@mail.com');
    expect(chatResponse.message_text).to.equal('I love JS');
  });

  it('should return "Validation error(s)" if empty message_to parameter sent', async () => {
    const argsValidation = { ...args, message_to: '' };
    const { data, code } = await run('send-message-private', { args: argsValidation, meta });
    expect(code).to.equal(400);
    expect(data).to.have.property('message');
    expect(data).to.have.property('details');
    expect(data.message).to.equal('Validation error(s)');
  });

  it('should fail to send private message if user not authenticated', async () => {
    const argsValidation = { ...args, message_to: '' };
    const { data, code } = await run('send-message-private', { args: argsValidation });
    expect(code).to.equal(401);
    expect(data).to.have.property('message');
    expect(data.message).to.equal('Unauthorized');
  });
});

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { run } from '@syncano/test';
import 'dotenv/config';

describe('send-message-group', () => {
  const args = { room: 'room-javascript', username: 'java@gmail.com', message_text: 'I love JS' };
  it('should return detail of message sent if valid parameters supplied', async () => {
    const { data: chatResponse, code } = await run('send-message-group', { args });
    expect(code).to.equal(200);
    expect(chatResponse).to.have.property('payload');
    expect(chatResponse).to.have.property('group');
    expect(chatResponse.group).to.equal('group.room-javascript');
    expect(chatResponse.payload.message_text).to.equal('I love JS');
    expect(chatResponse.payload.message_from).to.equal('java@gmail.com');
  });

  it('should return "Validation error(s)" if empty room parameter sent', async () => {
    const argsValidation = { ...args, room: '' };
    const { data, code } = await run('send-message-group', { args: argsValidation });
    expect(code).to.equal(400);
    expect(data).to.have.property('message');
    expect(data).to.have.property('details');
    expect(data.message).to.equal('Validation error(s)');
  });
});

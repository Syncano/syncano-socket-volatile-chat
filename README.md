# volatile-chat

[![CircleCI](https://circleci.com/gh/Syncano/syncano-socket-volatile-chat.svg?style=svg)](https://circleci.com/gh/Syncano/syncano-socket-volatile-chat)

`version:` **0.0.1**

Volatile chat socket using using Syncano realtime feature

To install, run:

```
npx s add volatile-chat
```

## Endpoints

### send-message-group

Endpoint to send message to a room

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| _user_key | string | Token of user sending message (Optional) | messageFrom@gmail.com
| username | string | Name of the User (Required only when user token not sent). | Nik
| message_text | string | Content of the message. | How are you doing.



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "message_text": "How are you doing",
  "username": "Nik"
}
```

##### Failed `400`

```
{
  "message": "Failed to publish message"
}
```

### send-message-private

Endpoint to send private message to user

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| message_text | string | Chat message | How are you
| _user_key | string | Token of user sending message | messageFrom@gmail.com
| message_to | string | Username of user to receive message | messageTo@gmail.com



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "message_text": "How are you doing",
  "message_to": "messageTo@gmail.com"
  "message_from": "messageFrom@gmail.com"
}
```

##### Failed `400`

```
{
  "message": "Failed to send message"
}
```

### group-chat

Endpoint to subcribe to poll for a group messages

### private-chat

Endpoint to listen to user private message


### Contributing

#### How to Contribute
  * Fork this repository
  * Clone from your fork
  * Make your contributions (Make sure your work is well tested)
  * Create Pull request from the fork to this repo

#### Setting up environment variables
  * Create a `.env` on parent folder
  * Copy contents of `.env-sample` file to newly created `.env` file and assign appropriate values to the listed variables.

#### Testing
  * Ensure all your test are written on the `test` directory
  * Use the command `npm test` to run test


const messageTable = `CREATE TABLE IF NOT EXISTS message (   
           messageId varchar(50) primary key,
           createdOn date NOT NULL,
           subject varchar(100),
           message varchar(250) NOT NULL,
           parentMessageId INTEGER,
           status varchar(10),
           userId varchar(100),
           foreign key(userId) REFERENCES useraccount
       )`;
const addMessage = `insert into message (
    messageId,
    subject,
    message,
    parentMessageId,
    status,
    createdOn,
    userId
    )VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING returning *`;

const returnMessages = 'select * from message where userid = ($1)';

export default {
  messageTable,
  addMessage,
  returnMessages,
};

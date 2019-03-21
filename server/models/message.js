// ===================================================== MESSAGE TABLE ==========================
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
// ====================================================== SENT TABLE ==============================

const sentTable = `CREATE TABLE IF NOT EXISTS sentMessage (   
        senderId varchar(50),
        messageId varchar(50),
        createdOn date NOT NULL,        
        foreign key(senderId) REFERENCES useraccount,
        foreign key(messageId) REFERENCES message
    )`;
// ========================================================= INBOX TABLE ==========================

const inboxTable = `CREATE TABLE IF NOT EXISTS inboxMessage (   
        receiverId varchar(50),
        messageId varchar(50),
        createdOn date NOT NULL,        
        foreign key(receiverId) REFERENCES useraccount,
        foreign key(messageId) REFERENCES message
    )`;
// ========================================================= ADD MESSAGE ==========================

const addMessage = `insert into message (
    messageId,
    subject,
    message,
    parentMessageId,
    status,
    createdOn,
    userId
    )VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING returning *`;
// ========================================================= ADD INBOX  ==========================

const addInbox = `insert into inboxMessage (
        receiverId,
        messageId,
        createdOn
    )VALUES($1,$2,$3) ON CONFLICT DO NOTHING returning *`;

// ========================================================= ADD SENT ==========================

const addSent = `insert into sentMessage (
    senderId,
    messageId,
    createdOn  
)VALUES($1,$2,$3) ON CONFLICT DO NOTHING returning *`;
// ===================================================== DISPLAY MESSAGE =======================
const returnMessages = 'select * from message where userid = ($1)';
const getInboxMessagesId = 'select messageid from inboxMessage where receiverid = ($1)';
const getInboxMessages = 'select * from message where status=\'inbox\' and userid=($1)';

const getSentMessagesId = 'select messageid from sentMessage where senderid = ($1)';
const getSentMessages = 'select * from message where status=\'sent\' and userid=($1)';
const getReadMessages = 'select * from message where status=\'read\' and userid=($1)';
const getUnreadMessages = 'select * from message where status=\'unread\' and userid=($1)';


export default {
  messageTable,
  addMessage,
  addSent,
  returnMessages,
  inboxTable,
  sentTable,
  addInbox,
  getInboxMessagesId,
  getInboxMessages,
  getSentMessages,
  getSentMessagesId,
  getReadMessages,
  getUnreadMessages,
};

import user from './server/models/user';
import messageModel from './server/models/message';
import groupModel from './server/models/group';
import con from './connection';

class setupDatabase {
  static createUserTable() {
    const userQuery = user.userTable;
    con.query(userQuery);
  }

  static createMessageTable() {
    const messageQuery = messageModel.messageTable;
    con.query(messageQuery);
  }

  static createInboxTable() {
    const inboxQuery = messageModel.inboxTable;
    con.query(inboxQuery);
  }

  static createSentTable() {
    const sentQuery = messageModel.sentTable;
    con.query(sentQuery);
  }

  static createGroupTable() {
    const groupQuery = `${groupModel.groupTable}; ${groupModel.groupMemberTable}`;
    con.query(groupQuery);
  }
}
setupDatabase.createUserTable();
setupDatabase.createMessageTable();
setupDatabase.createInboxTable();
setupDatabase.createSentTable();
setupDatabase.createGroupTable();

import user from './server/models/user';
import messageModel from './server/models/message';

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
}
setupDatabase.createUserTable();
setupDatabase.createMessageTable();

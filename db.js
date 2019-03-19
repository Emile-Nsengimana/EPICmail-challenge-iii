import user from './server/models/user';
import con from './connection';

class setupDatabase {
  static createUserTable() {
    const userQuery = user.userTable;
    con.query(userQuery);
  }
}
setupDatabase.createUserTable();

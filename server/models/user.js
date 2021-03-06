const userTable = `
CREATE TABLE IF NOT EXISTS
 userAccount (
        userId varchar(50) primary key,
        firstName varchar(30) NOT NULL,
        lastName varchar(25) NOT NULL,
        email varchar(30) UNIQUE,
        password varchar(100) NOT NULL,
        phoneNo varchar(12)
    )`;
const saveUser = `insert into userAccount (
        userId,
        firstName,
        lastName,
        email,
        password,
        phoneNo
    )VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING returning *`;

const removeUser = 'delete from userAccount where email = ($1)';
const returnUser = 'select * from userAccount where email = ($1)';
export default {
  userTable,
  saveUser,
  removeUser,
  returnUser,
};

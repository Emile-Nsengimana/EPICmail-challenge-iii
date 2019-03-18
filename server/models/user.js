const user = `
    CREATE TABLE user (
        userId UUID primary key,
        email varchar(30) NOT NULL,
        firstName varchar(30) NOT NULL,
        password varchar(20) NOT NULL,
        phoneNo varchar(12)
    )`;
const saveUser = `insert into user(
        userId,
        firstName,
        lastName,
        email,
        password,
        phoneNo
    )`;

export default {
  user,
  saveUser,
};

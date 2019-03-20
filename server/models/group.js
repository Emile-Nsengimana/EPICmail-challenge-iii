// ===================================================== GROUP TABLE ==========================
const groupTable = `CREATE TABLE IF NOT EXISTS groupTable (   
    groupId integer primary key,
    groupName varchar(25) NOT NULL,
    role varchar(30)
)`;
// =============================================== GROUP MEMBER TABLE ==========================
const groupMemberTable = `CREATE TABLE IF NOT EXISTS groupMember (   
    userId varchar(100),
    groupId integer,
    foreign key(userId) REFERENCES useraccount,
    foreign key(groupId) REFERENCES grouptable
)`;
const createGroup = `insert into groupTable (
    groupId,
    groupName,
    role
)VALUES($1,$2,$3) ON CONFLICT DO NOTHING returning *`;

const getAllGroup = 'select * from groupTable';
const changeGroupName = 'update table groupTable set groupName = ($1)';
const deleteGroup = 'delete from groupTable where groupId = ($1)';

export default {
  groupTable,
  createGroup,
  getAllGroup,
  changeGroupName,
  deleteGroup,
  groupMemberTable,
};

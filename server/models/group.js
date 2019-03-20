// ===================================================== GROUP TABLE ==========================
const groupTable = `CREATE TABLE IF NOT EXISTS groupTable (   
    groupId serial primary key,
    groupName varchar(25) NOT NULL,
    rolee varchar(30)
)`;
// =============================================== GROUP MEMBER TABLE ==========================
const groupMemberTable = `CREATE TABLE IF NOT EXISTS groupMember (   
    userId varchar(100),
    groupId integer,
    foreign key(userId) REFERENCES useraccount,
    foreign key(groupId) REFERENCES grouptable
)`;
const addGroupMember = `insert into groupMember (
    userId,
    groupId
)VALUES($1,$2) ON CONFLICT DO NOTHING returning *`;

const insertInGroup = `insert into groupTable (
    groupName,
    rolee
)VALUES($1,$2) ON CONFLICT DO NOTHING returning *`;


const getAllGroup = 'select * from groupTable';
const getOne = 'select * from groupTable where groupid = ($1)';
const changeGroupName = 'update table groupTable set groupName = ($1)';
const deleteGroup = 'delete from groupTable where groupId = ($1)';

export default {
  groupTable,
  insertInGroup,
  getAllGroup,
  changeGroupName,
  deleteGroup,
  groupMemberTable,
  getOne,
  addGroupMember,
};

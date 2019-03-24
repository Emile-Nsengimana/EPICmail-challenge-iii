/* eslint-disable max-len */
import con from '../../connection';
import groupModel from '../models/group';

class groupController {
  static async createGroup(req, res) {
    const {
      groupName,
      role,
    } = req.body;
    try {
      const result = await con.query(groupModel.insertInGroup, [groupName, role, req.user.id]);
      if (result.rowCount !== 0) {
        return res.status(201).json({
          status: 201,
          data: result.rows[0],
        });
      }
      return res.status(400).json({
        status: 400,
        message: ['Error'],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: [error.detail],
      });
    }
  }

  static async showGroups(req, res) {
    const allGroup = await con.query(groupModel.getAllGroup);
    if (allGroup.rowCount !== 0) {
      return res.status(200).json({
        status: 200,
        data: allGroup.rows,
      });
    }
    return res.status(404).json({
      status: 404,
      data: ['No group available'],
    });
  }

  static async getGroup(req, res) {
    try {
      const findGroup = await con.query(groupModel.getOne, [req.params.groupId]);
      if (findGroup.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: findGroup.rows[0],
        });
      }
      return res.status(404).json({
        status: 404,
        data: ['Group not found'],
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: 'Group not found',
      });
    }
  }

  static async deleteGroup(req, res) {
    try {
      const findGroup = await con.query(groupModel.getOne, [req.params.groupId]);
      if (findGroup.rowCount !== 0) {
        if (findGroup.rows[0].admin === req.user.id) {
          await con.query(groupModel.deleteGroup, [req.params.groupId]);
          return res.status(200).json({
            status: 200,
            message: 'group deleted',
          });
        }
        return res.status(401).json({
          status: 401,
          message: 'you are not allowed to delete this group!',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: [error.detail],
      });
    }
    return res.status(500).json({
      status: 500,
      error: 'unknown error',
    });
  }

  static async updateGroupName(req, res) {
    const findGroup = await con.query(groupModel.getOne, [req.params.groupId]);
    if (findGroup.rowCount !== 0) {
      const updateGroup = await con.query(groupModel.updateGroupName, [req.params.groupName, req.params.groupId, req.user.id]);
      if (updateGroup.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          message: `group name changed to ${req.params.groupName}`,
        });
      }
      return res.status(401).json({
        status: 401,
        message: 'you are not allowed to change group name',
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'group not found',
    });
  }
}
export default groupController;

/* eslint-disable max-len */
import con from '../../connection';
import groupModel from '../models/group';
import user from '../models/user';

class groupController {
  static async createGroup(req, res) {
    const {
      groupName,
      role,
    } = req.body;
    try {
      const result = await con.query(groupModel.insertInGroup, [groupName, role]);
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
          data: findGroup.rows,
        });
      }
      return res.status(404).json({
        status: 404,
        data: ['Group not found'],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: [error.detail],
      });
    }
  }

  static async deleteGroup(req, res) {
    try {
      const findGroup = await con.query(groupModel.deleteGroup, [req.params.groupId]);
      if (findGroup.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: ['group deleted'],
        });
      }
      return res.status(404).json({
        status: 404,
        data: ['Group not found'],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: [error.detail],
      });
    }
  }
}
export default groupController;

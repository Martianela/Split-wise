const express = require('express');
const {
  getAllGroups,
  createGroup,
  addMember,
  getGroupById,
  updateGroup,
  deleteGroup,
  deleteMember,
} = require('../controllers/groupController');
const groupRoutes = express.Router();

groupRoutes.get('/', getAllGroups);
groupRoutes.post('/', createGroup);
groupRoutes.put('/:id/members', addMember);
groupRoutes.get('/:id', getGroupById);
groupRoutes.put('/:id', updateGroup);
groupRoutes.delete('/:id', deleteGroup);
groupRoutes.delete('/:g_id/members/:username', deleteMember);

module.exports = groupRoutes;

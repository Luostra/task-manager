const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  toggleComplete,
  getUpcomingTasks
} = require('../controllers/tasks');

// Все маршруты защищены authMiddleware

// /api/tasks
router.route('/')
  .post(authMiddleware, createTask)
  .get(authMiddleware, getAllTasks);

// /api/tasks/:id
router.route('/:id')
  .get(authMiddleware, getTask)
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);

// /api/tasks/:id/toggle
router.put('/:id/toggle', authMiddleware, toggleComplete);

// /api/tasks/upcoming?days=3
router.get('/upcoming', authMiddleware, getUpcomingTasks);

module.exports = router;
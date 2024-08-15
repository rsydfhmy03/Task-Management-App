// const express = require('express');
// const router = express.Router();
// const TaskController = require('../controllers/taskController');
// const authenticate = require('../middleware/authMiddleware');

// router.post('/', authenticate, TaskController.createTask);
// // router.get('/', authenticate, TaskController.getAllTasks);
// // router.get('/:id', authenticate, TaskController.getTaskById);
// router.put('/:id', authenticate, TaskController.updateTask);
// router.delete('/:id', authenticate, TaskController.deleteTask);

// module.exports = router;
const express = require('express');
const { body } = require('express-validator');
const { createTaskHandler, getTasksHandler, updateTaskHandler, deleteTaskHandler } = require('../controllers/taskController');
const validateRequest = require('../utils/validateRequest');
const authenticate = require('../middleware/authentication');
const router = express.Router();

/**
 * Create a new task.
 *
 * @name POST /task
 */
router.post('/', authenticate, createTaskHandler);

/**
 * Get all tasks.
 *
 * @name GET /task
 */
router.get('/', authenticate, getTasksHandler);

/**
 * Update a task.
 *
 * @name PUT /task/:id
 */
router.put('/:id', authenticate, updateTaskHandler);

/**
 * Delete a task.
 *
 * @name DELETE /task/:id
 */
router.delete('/:id', authenticate, deleteTaskHandler);

module.exports = router;

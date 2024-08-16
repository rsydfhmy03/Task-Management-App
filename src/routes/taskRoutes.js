const express = require('express');
const { body } = require('express-validator');
const { createTaskHandler, getTasksHandler, updateTaskHandler, deleteTaskHandler, getTaskDetailHandler} = require('../controllers/taskController');
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
 * Get task detail.
 *
 * @name GET /task/:id
 */
router.get('/:id', authenticate, getTaskDetailHandler); 

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

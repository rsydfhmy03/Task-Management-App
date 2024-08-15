const { Task } = require('../models');
const ResponseFormatter = require('../utils/responseFormatter');

/**
 * Handler for creating a new task.
 *
 * @async
 * @function createTaskHandler
 */
async function createTaskHandler(req, res) {
  try {
    const { title, description, due_date, project_id } = req.body;
    const task = await Task.create({ title, description, due_date, project_id, user_id: req.user.id });

    return ResponseFormatter.created(res, 'Task created successfully', task);
  } catch (error) {
    return ResponseFormatter.fail(res, error.message, 400);
  }
}

/**
 * Handler for getting all tasks.
 *
 * @async
 * @function getTasksHandler
 */
async function getTasksHandler(req, res) {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user.id } });
    return ResponseFormatter.success(res, 'Tasks retrieved successfully', tasks);
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}

/**
 * Handler for updating a task.
 *
 * @async
 * @function updateTaskHandler
 */
async function updateTaskHandler(req, res) {
  try {
    const { id } = req.params;
    const { title, description, due_date, project_id } = req.body;
    const task = await Task.findByPk(id);
    
    if (!task) {
      return ResponseFormatter.fail(res, 'Task not found', 404);
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.due_date = due_date || task.due_date;
    task.project_id = project_id || task.project_id;
    await task.save();

    return ResponseFormatter.success(res, 'Task updated successfully', task);
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}

/**
 * Handler for deleting a task.
 *
 * @async
 * @function deleteTaskHandler
 */
async function deleteTaskHandler(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    
    if (!task) {
      return ResponseFormatter.fail(res, 'Task not found', 404);
    }

    await task.destroy();

    return ResponseFormatter.success(res, 'Task deleted successfully');
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}

module.exports = { createTaskHandler, getTasksHandler, updateTaskHandler, deleteTaskHandler };

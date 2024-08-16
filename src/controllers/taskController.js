const { Task } = require('../models');
const ResponseFormatter = require('../utils/responseFormatter');
const { isValidDate } = require('../utils/isValidDate'); 
const { generateSimpleIdTask } = require('../utils/generateUniqueId');
// /**
//  * Handler for creating a new task.
//  *
//  * @async
//  * @function createTaskHandler
//  */
// async function createTaskHandler(req, res) {
//   try {
//     const id =generateSimpleIdTask();
//     const { title, description, due_date, projectId } = req.body;
//     console.log(req.body)
//     const task = await Task.create({ id, title, description, due_date, projectId : projectId, userId: req.user.id });
//     const createdTask = {
//       id: task.id,
//       title: task.title,
//       description: task.description,
//       due_date: task.due_date,
//       projectId: task.project_id,
//       status: task.status,
//       userId: task.userId,
//       createdAt: task.createdAt,
//       updatedAt: task.updatedAt,
//     };
//     return ResponseFormatter.created(res, 'Task created successfully', createdTask);
//   } catch (error) {
//     return ResponseFormatter.fail(res, error.message, 400);
//   }
// }
/**
 * Handler for creating a new task.
 *
 * @async
 * @function createTaskHandler
 */
async function createTaskHandler(req, res) {
  try {
    const id = generateSimpleIdTask();
    const { title, description,status, due_date, projectId } = req.body;

    // Validasi due_date
    if (due_date && !isValidDate(due_date)) {
      return ResponseFormatter.fail(res, 'Invalid due date format', 400);
    }
    console.log("Pass 1")
    if (status != undefined ) task.status = status;
    const task = await Task.create({
      id,
      title,
      description,
      status,
      due_date: due_date ? new Date(due_date) : null,
      projectId,
      userId: req.user.id
    });
    console.log("pass 2")
    const createdTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      projectId: task.projectId,
      status: task.status,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
    console.log("pass 3")
    return ResponseFormatter.created(res, 'Task created successfully', createdTask);
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
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    const getTasks = tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      projectId: task.projectId,
      status: task.status,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));
    return ResponseFormatter.success(res, 'Tasks retrieved successfully', getTasks);
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
    const { title, description,status, due_date, projectId } = req.body;
    const task = await Task.findByPk(id);
    
    if (!task) {
      return ResponseFormatter.fail(res, 'Task not found', 404);
    }
    // Update hanya field yang disediakan dalam request body
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (due_date !== undefined) {
      if (isValidDate(due_date)) {
        task.due_date = due_date;
      } else {
        return ResponseFormatter.fail(res, 'Invalid due date format', 400);
      }
    }

    if (projectId !== undefined) task.projectId = projectId;

    await task.save();
    const updatedTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      projectId: task.project_id,
      status: task.status,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
    return ResponseFormatter.success(res, 'Task updated successfully', updatedTask);
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

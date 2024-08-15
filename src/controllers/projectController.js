const { Project } = require('../models');
const ResponseFormatter = require('../utils/responseFormatter');
const { generateSimpleIdProject } = require('../utils/generateUniqueId');
/**
 * Handler for creating a new project.
 *
 * @async
 * @function createProjectHandler
 */
async function createProjectHandler(req, res) {
  try {
    const id = generateSimpleIdProject();
    const { title, description } = req.body;
    const project = await Project.create({id, title , description, userId: req.user.id });

    return ResponseFormatter.created(res, 'Project created successfully', project);
  } catch (error) {
    return ResponseFormatter.fail(res, error.message, 400);
  }
}

/**
 * Handler for getting all projects.
 *
 * @async
 * @function getProjectsHandler
 */
async function getProjectsHandler(req, res) {
  try {
    // const projects = await Project.findAll({ where: { user_id: req.user.id } });
    
    const projects = await Project.findAll({ where: { userId: req.user.id } });
    return ResponseFormatter.success(res, 'Projects retrieved successfully', projects);
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}

/**
 * Handler for updating a project.
 *
 * @async
 * @function updateProjectHandler
 */
async function updateProjectHandler(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const project = await Project.findByPk(id);
    
    if (!project) {
      return ResponseFormatter.fail(res, 'Project not found', 404);
    }

    project.name = name || project.name;
    project.description = description || project.description;
    await project.save();

    return ResponseFormatter.success(res, 'Project updated successfully', project);
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}

/**
 * Handler for deleting a project.
 *
 * @async
 * @function deleteProjectHandler
 */
async function deleteProjectHandler(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    
    if (!project) {
      return ResponseFormatter.fail(res, 'Project not found', 404);
    }

    await project.destroy();

    return ResponseFormatter.success(res, 'Project deleted successfully');
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}

module.exports = { createProjectHandler, getProjectsHandler, updateProjectHandler, deleteProjectHandler };

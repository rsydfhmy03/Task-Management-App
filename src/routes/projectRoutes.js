// const express = require('express');
// const router = express.Router();
// const ProjectController = require('../controllers/projectController');
// const authenticate = require('../middleware/authMiddleware');

// router.post('/', authenticate, ProjectController.createProject);
// // router.get('/', authenticate, ProjectController.getAllProjects);
// // router.get('/:id', authenticate, ProjectController.getProjectById);
// router.put('/:id', authenticate, ProjectController.updateProject);
// router.delete('/:id', authenticate, ProjectController.deleteProject);

// module.exports = router;
const express = require('express');
const { body } = require('express-validator');
const { createProjectHandler, getProjectsHandler, updateProjectHandler, deleteProjectHandler } = require('../controllers/projectController');
const validateRequest = require('../utils/validateRequest');
const authenticate = require('../middleware/authentication');
const router = express.Router();

/**
 * Create a new project.
 *
 * @name POST /project
 */
router.post('/', authenticate, createProjectHandler);

/**
 * Get all projects.
 *
 * @name GET /project
 */
router.get('/', authenticate, getProjectsHandler);

/**
 * Update a project.
 *
 * @name PUT /project/:id
 */
router.put('/:id', authenticate, updateProjectHandler);

/**
 * Delete a project.
 *
 * @name DELETE /project/:id
 */
router.delete('/:id', authenticate, deleteProjectHandler);

module.exports = router;

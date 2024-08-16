const express = require('express');
const { body } = require('express-validator');
const { createProjectHandler, getProjectsHandler, updateProjectHandler, deleteProjectHandler, getProjectDetailHandler } = require('../controllers/projectController');
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
 * Get project detail.
 *
 * @name GET /project/:id
 */
router.get('/:id', authenticate, getProjectDetailHandler); 

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

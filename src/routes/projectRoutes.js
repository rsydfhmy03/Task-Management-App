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

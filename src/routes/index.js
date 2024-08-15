// const express = require('express');
// const router = express.Router();;
// const responseFormatter = require('../utils/responseFormatter');
// const messages = require('../constant/responseMessages');
// // const userRoutes = require('./userRoutes');
// const taskRoutes = require('./taskRoutes');
// const projectRoutes = require('./projectRoutes');

// // router.use('/users', userRoutes);
// router.use('/tasks', taskRoutes);
// router.use('/projects', projectRoutes);

// /**
//  * Welcome route.
//  *
//  * @name GET /
//  */
// router.get('/', (req, res) => {
//     return responseFormatter.success(res, messages.WELCOME_MESSAGE  )
//   })

// module.exports = router;
const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const projectRoutes = require('./projectRoutes');
const responseFormatter = require('../utils/responseFormatter');

/**
 * Use authentication routes.
 *
 * @name /auth
 * @memberof module:routes/authRoutes
 */
router.use('/auth', authRoutes);

/**
 * Use user routes.
 *
 * @name /user
 * @memberof module:routes/userRoutes
 */
router.use('/user', userRoutes);

/**
 * Use task routes.
 *
 * @name /task
 * @memberof module:routes/taskRoutes
 */
router.use('/task', taskRoutes);

/**
 * Use project routes.
 *
 * @name /project
 * @memberof module:routes/projectRoutes
 */
router.use('/project', projectRoutes);

/**
 * Welcome route.
 *
 * @name GET /
 */
router.get('/', (req, res) => {
    return responseFormatter.success(res, 'Welcome to the Task Management API');
});

module.exports = router;

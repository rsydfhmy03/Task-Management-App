const express = require('express');
const router = express.Router();;
const responseFormatter = require('../utils/responseFormatter');
const messages = require('../constant/responseMessages');


/**
 * Welcome route.
 *
 * @name GET /
 */
router.get('/', (req, res) => {
    return responseFormatter.success(res, messages.WELCOME_MESSAGE  )
  })

module.exports = router;
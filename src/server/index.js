/**
 * Server initialization script.
 *
 * @module server/index
 */
require('dotenv').config();
const app = require('../app.js');

/**
 * Immediately-invoked function expression (IIFE) to start the server.
 *
 * @async
 * @function
 * @memberof module:server/server
 */
(async () => {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
})();

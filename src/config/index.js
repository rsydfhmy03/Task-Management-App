/**
 * Configuration Module
 *
 * @module config
 */
const jwtConfig = require('./jwtConfig');
const storageConfig = require('./storageConfig');
const databaseConfig = require('./databaseConfig'); 

/**
 * Export configuration objects
 *
 * @type {Object}
 * @property {Object} jwtConfig - JSON Web Token configuration
 * @property {Object} storageConfig - Storage configuration
 * @property {Object} databaseConfig - Database configuration
 */
module.exports = {
  jwtConfig,
  storageConfig,
  databaseConfig, 
};
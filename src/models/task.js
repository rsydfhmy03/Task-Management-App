const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConfig');
const User = require('./user');
const Project = require('./project');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.CHAR(36), 
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
    defaultValue: 'pending',
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  userId: {  
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'Users', 
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  projectId: {  
    type: DataTypes.CHAR(36), 
    allowNull: false,
    references: {
      model: 'Projects', 
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  tableName: 'Tasks', 
  timestamps: true,
});

module.exports = Task;

  
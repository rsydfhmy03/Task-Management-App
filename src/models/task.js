// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/databaseConfig');
// const User = require('./user');
// const Project = require('./project');

// const Task = sequelize.define('Task', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.TEXT,
//   },
//   status: {
//     type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
//     defaultValue: 'pending',
//   },
// }, {
//   tableName: 'Task',
//   timestamps: true,
// });

// Task.belongsTo(User, { foreignKey: 'userId' });
// Task.belongsTo(Project, { foreignKey: 'projectId' });

// module.exports = Task;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConfig');
const User = require('./user');
const Project = require('./project');
const getNextProjectId = async () => {
  const latestProject = await Project.findOne({
    order: [['createdAt', 'DESC']],
    attributes: ['id']
  });

  if (!latestProject) {
    return 'T01'; // ID pertama jika tidak ada proyek
  }

  const lastId = latestProject.id;
  const lastNumber = parseInt(lastId.substring(1), 10);
  const newNumber = lastNumber + 1;

  return `T${String(newNumber).padStart(2, '0')}`;
};

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
  userId: {  // Foreign key
    type: DataTypes.INTEGER, // Menyesuaikan dengan int(11) dari query
    allowNull: false,
    references: {
      model: 'Users', // Nama tabel yang dirujuk
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  projectId: {  // Foreign key
    type: DataTypes.CHAR(36), // Menyesuaikan dengan tipe data CHAR(36) dari query
    allowNull: false,
    references: {
      model: 'Projects', // Nama tabel yang dirujuk
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  tableName: 'Tasks', // Nama tabel disesuaikan dengan yang ada di query
  timestamps: true,
});

module.exports = Task;

  
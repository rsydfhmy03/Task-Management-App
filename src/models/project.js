// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/databaseConfig');

// const Project = sequelize.define('Project', {
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
// }, {
//   tableName: 'projects',
//   timestamps: true,
// });

// module.exports = Project;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConfig');


const Project = sequelize.define('Project', {
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
}, {
  tableName: 'Projects', // Nama tabel disesuaikan dengan yang ada di query
  timestamps: true,
});

module.exports = Project;


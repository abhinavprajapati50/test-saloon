const Sequelize = require("sequelize");
const sequelizeDb = require("../utils/database");

// title, short_description, long_description, chr_delete, imageUrl });

const Manage_Appointment = sequelizeDb.define("appointment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  mobile: {
    type: Sequelize.STRING,
  },
  service_type: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.DATE,
  },
  time: {
    type: Sequelize.DATE,
  },
  remark: {
    type: Sequelize.STRING,
  },

  status: {
    type: Sequelize.INTEGER,
  },

  chr_delete: {
    type: Sequelize.TINYINT,
  },
});

module.exports = Manage_Appointment;

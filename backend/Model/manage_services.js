const Sequelize = require('sequelize')
const sequelizeDb = require("../utils/database");

// title, short_description, long_description, chr_delete, imageUrl });

 const Manage_Service = sequelizeDb.define("manage_services", {
   id: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true,
   },
   title: {
     type: Sequelize.STRING,
   },
   imageUrl: {
     type: Sequelize.BLOB,
   },
   short_description: {
     type: Sequelize.STRING,
   },
   long_description: {
     type: Sequelize.TEXT,
   },
   parent_id: {
     type: Sequelize.INTEGER,
     allowNull: true,
   },
   page_slug: {
     type: Sequelize.STRING,
   },
   chr_delete: {
     type: Sequelize.TINYINT,
   },
 });

module.exports = Manage_Service;
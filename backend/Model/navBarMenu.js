const Sequelize = require('sequelize')
const sequelizeDb = require("../utils/database");


const navbarMenu = sequelizeDb.define('navbars', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
    },
    parent_Menu: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    page_slug: {
        type: Sequelize.STRING,
    },
    chr_delete: {
        type: Sequelize.TINYINT,
    }
})

module.exports = navbarMenu
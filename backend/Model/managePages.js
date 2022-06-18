const Sequelize = require('sequelize')
const sequelizeDb = require("../utils/database");


 const MenuPages = sequelizeDb.define('pages', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
    },
    
    slug: {
        type: Sequelize.STRING,
    },
    image: {
        type: Sequelize.BLOB,
    },
    description: {
        type: Sequelize.STRING,
    },
    chr_delete: {
        type: Sequelize.TINYINT,
    }
})

module.exports = MenuPages;
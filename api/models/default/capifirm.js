module.exports = (sequelize, type) => {
    return sequelize.define('L_CAPIFIRM', {
        LOGICALREF: {
            type: type.INTEGER,
            primaryKey: true
        },
        nr: {
            type: type.INTEGER
        },
        name: {
            type: type.STRING
        },
        TITLE: {
            type: type.STRING
        }
    })
}

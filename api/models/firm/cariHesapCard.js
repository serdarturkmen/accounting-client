module.exports = (sequelize, type) => {
    return sequelize.define('LG_' + process.env.FIRM + '_' + 'CLCARD', {
        LOGICALREF: {
            type: type.INTEGER,
            primaryKey: true
        },
        ACTIVE: {
            type: type.BOOLEAN
        },
        CARDTYPE: {
            type: type.INTEGER
        },
        DEFINITION_: {
            type: type.STRING
        }
    })
}

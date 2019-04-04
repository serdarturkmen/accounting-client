module.exports = (sequelize, type) => {
    return sequelize.define('LG_' + process.env.FIRM + '_' + process.env.VERSION + '_' + 'CLTOTFIL', {
        LOGICALREF: {
            type: type.INTEGER,
            primaryKey: true
        },
        CARDREF: {
            type: type.INTEGER
        },
        TOTTYP: {
            type: type.INTEGER
        },
        MONTH_: {
            type: type.INTEGER
        },
        DEBIT: {
            type: type.DOUBLE
        },
        CREDIT: {
            type: type.DOUBLE
        },
        YEAR_: {
            type: type.INTEGER
        }
    })
}

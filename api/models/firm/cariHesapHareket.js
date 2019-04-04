//PAYDEFREF : 1 ALACAK 0 BORC
//LINEEXP : ACIKLAMA
module.exports = (sequelize, type) => {
    return sequelize.define('LG_' + process.env.FIRM + '_' + process.env.VERSION + '_' + 'CLFLINE', {
        LOGICALREF: {
            type: type.INTEGER,
            primaryKey: true
        },
        CLIENTREF: {
            type: type.INTEGER
        },
        PAYDEFREF: {
            type: type.INTEGER
        },
        LINEEXP: {
            type: type.STRING
        },
        DATE_: {
            type: type.DATE
        },
        AMOUNT: {
            type: type.DOUBLE
        },
        TRNET: {
            type: type.DOUBLE
        },
        CAPIBLOCK_CREADEDDATE: {
            type: type.DATE
        },
        CAPIBLOCK_CREATEDHOUR: {
            type: type.INTEGER
        },
        CAPIBLOCK_CREATEDMIN: {
            type: type.INTEGER
        },
        CAPIBLOCK_CREATEDSEC: {
            type: type.INTEGER
        },
        CAPIBLOCK_MODIFIEDDATE: {
            type: type.DATE
        },
        CAPIBLOCK_MODIFIEDHOUR: {
            type: type.INTEGER
        },
        CAPIBLOCK_MODIFIEDMIN: {
            type: type.INTEGER
        },
        CAPIBLOCK_MODIFIEDSEC: {
            type: type.INTEGER
        }
    })
}

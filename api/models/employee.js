module.exports = (sequelize, type) => {
    return sequelize.define('employee', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: type.STRING,
            allowNull: false
        },
        lastName: {
            type: type.STRING
            // allowNull defaults to true
        },
        age: {
            type: type.INTEGER
            // allowNull defaults to true
        }
    })
}

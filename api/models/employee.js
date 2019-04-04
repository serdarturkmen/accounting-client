module.exports = (sequelize, type) => {
    console.log("from model "+ process.env.PREFIX);
    return sequelize.define(process.env.PREFIX + 'employee', {
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

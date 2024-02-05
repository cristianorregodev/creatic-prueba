'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class product extends Model {
        static associate(models) {
            product.belongsTo(models.user, {
                foreignKey: 'user_id',
                as: 'user',
            })
        }
    }
    product.init(
        {
            name: DataTypes.STRING,
            price: DataTypes.STRING,
            stock: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'product',
        }
    )
    return product
}

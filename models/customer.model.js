const db = require("../database/database");

const {Model,DataTypes}= require("sequelize");

class Customer extends Model{}
//model of the customer table 
Customer.init({
    customer_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    F_name:{
        type:DataTypes.CHAR(100),
        allowNull:false

    },
    L_name:{
        type:DataTypes.CHAR(100)
    },
    contact:{
        type:DataTypes.CHAR(20)
    },
    email:{
        type:DataTypes.CHAR(100)
    },
    customer_type:{
        type:DataTypes.CHAR(50)
    }
 },
 { 
    sequelize: db,
    tableName:"customer",
    modelName:"Customer",
    timestamps: false,
    freezeTableName: true
}
)

module.exports = Customer;
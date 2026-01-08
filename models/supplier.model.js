const db = require("../database/database");

const {Model,DataTypes}= require("sequelize");

class Supplier extends Model{}

Supplier.init({
    supplier_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    f_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      
    },
    l_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
       
    },
    
    
    contact:{
        type:DataTypes.CHAR(20)
    },
    email:{
        type:DataTypes.CHAR(100)
    },
    address:{
        type:DataTypes.TEXT
    },
    product_supplied:{
        type:DataTypes.CHAR(255)
    }

},
{
    sequelize: db,
    tableName:"supplier",
    modelName:"Supplier",
    timestamps: false,

})

module.exports = Supplier;
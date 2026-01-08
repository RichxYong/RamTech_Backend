
const db = require("../database/database");

const Supplier = require("./supplier.model");

const {Model,DataTypes}= require("sequelize");

class Product extends Model{}

Product.init({
    product_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    product_name:{
        type:DataTypes.CHAR(50),
        allowNull:false
    },
    product_description:{
        type:DataTypes.STRING
    },
    category:{
        type:DataTypes.CHAR(50)
    },
    unit_price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    supplier_id:{
        type:DataTypes.CHAR(50)
    },
    current_stock:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
},
{
    sequelize: db,
    tableName:"product",
    modelName:"Product",
    timestamps: false,

}
)

Product.belongsTo(Supplier,{
    foreignKey: 'supplier_id',
    as:'supplier'
})


module.exports = Product;


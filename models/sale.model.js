const Customer = require("./customer.model");
const Product = require("./product.model"); 

const db = require("../database/database");

const {Model,DataTypes}= require("sequelize");

class Sale extends Model{}

Sale.init({
    sale_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true, 
        allowNull:false
    },
    customer_id:{
        type:DataTypes.INTEGER,
        allowNull:false 
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1 
    },
    unit_price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false 
    },
    total_amount:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false 
    },
    sale_date:{
        type:DataTypes.DATE,
        allowNull:false 
    
    },
    payment_method:{
        type:DataTypes.STRING(50), 
        defaultValue:'Cash'
    },
    status:{
        type:DataTypes.STRING(50),
        defaultValue:'Completed' 
    }
},
{
    sequelize: db,
    tableName:"sale",
    modelName:"Sale",
    timestamps:false

})

Sale.belongsTo(Customer,{
    foreignKey: 'customer_id',
    as:'customer',
   
})

Sale.belongsTo(Product,{ 
    foreignKey: 'product_id',
    as:'product',
   
})



module.exports = Sale;

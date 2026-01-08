const db =require("../database/database")

const {Model,DataTypes}= require("sequelize");

class Employee extends Model{}


Employee.init({
    employee_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement:true
    },
    f_name:{
        type:DataTypes.CHAR(50),
        allownull:false
    },
    l_name:{
        type:DataTypes.CHAR(50),
        allowNull:false
    },
    contact:{
        type:DataTypes.CHAR(20)
    },
    position:{
        type:DataTypes.CHAR(50)
    },
    salary:{
        type: DataTypes.DECIMAL(10, 2),
    },
    hire_date:{
        type:DataTypes.DATEONLY
    }
},
    {
        sequelize: db,
        tableName:"employee",
        modelName:"Employee",
        timestamps:false
    
    }

)

module.exports= Employee;
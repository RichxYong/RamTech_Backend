const Employee = require("../models/employee.model");

class EmployeeController {

    //To get all employees from the databse
    getAllEmployees = async (req,res)=>{
        const employee= await Employee.findAll();
        res.send({
            message:"List of Employees",
            data: employee,
        });
        
 };

     //To get one employee by ID
    getOneEmployee = async (req,res) =>{
        const employee_id= req.params.id;
        const employee = await Employee.findByPk(employee_id);
        if (!employee){
            return res.status(404).send({message:"Employee not found"})

        }

        res.send({message:"Specified Employee", data: employee});
    };
    
    //To add an employee to the database
    createEmployee = async(req,res) =>{
        const {f_name, l_name, contact, position, salary, hire_date} = req.body;
        const employee= await Employee.create({f_name, l_name, contact, position, salary, hire_date} );
        res.status(201)
        res.send({message:"Employee added successfully",data:employee});
    };

    //To delete an employee from the database
    deleteEmployee = async (req, res) => {
        const employee_id = req.params.id;
        const employee = await Employee.findByPk(employee_id);
        if (!employee) {
            return res.status(404).send({
                message: "Employee not found"
            });
        }
        await employee.destroy();
             res.send({
                message: "Employee with Infomation",data:employee, "deleted successfully"
        :employee_id});
    };


    editEmployee = async (req, res) => {
        try {
            const employee_id = req.params.id;
            const { f_name, l_name, contact, position, salary, hire_date } = req.body;

            // Find the employee
            const employee = await Employee.findByPk(employee_id);
            if (!employee) {
                return res.status(404).send({
                    success: false,
                    message: "Employee not found"
                });
            }

            // Prepare update data (only update provided fields)
            const updateData = {};
            if (f_name !== undefined) updateData.f_name = f_name;
            if (l_name !== undefined) updateData.l_name = l_name;
            if (contact !== undefined) updateData.contact = contact;
            if (position !== undefined) updateData.position = position;
            if (salary !== undefined) updateData.salary = salary;
            if (hire_date !== undefined) updateData.hire_date = hire_date;

            // Update the employee
            await employee.update(updateData);

            res.send({
                success: true,
                message: "Employee updated successfully",
                data: employee
            });

        } catch (error) {
            console.error("Error updating employee:", error);
            res.status(500).send({
                success: false,
                message: "Error updating employee",
                error: error.message
            });
        }
    };

}

module.exports = new EmployeeController(); 
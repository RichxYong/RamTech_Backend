const Customer = require("../models/customer.model");

class CustomerController {


   //To get all customers from the database
    getAllCustomers = async (req,res)=>{
        const customer = await Customer.findAll();
        res.send({
            message:"List of Customers",
            data: customer,
        });
        
 };
    // To get one customer by ID
    getOneCustomer = async (req,res) =>{
        const customer_id= req.params.id;
        const customer = await Customer.findByPk(customer_id);
        if (!customer){
            return res.status(404).send({message:"Customer not found"})

        }

        res.send({message:"Specified Customer", data: customer});
    };
    
    //To add a customer to the database
    createCustomer = async(req,res) =>{
        const {F_name, L_name, contact, email, customer_type } = req.body;
        const customer = await Customer.create({F_name, L_name, contact, email, customer_type });
        res.status(201)
        res.send({message:"Customer added successfully",data:customer});
    };

    //To delete a customer from the database
    deleteCustomer = async (req, res) => {
            const customer_id = req.params.id;
            const customer = await Customer.findByPk(customer_id);
            if (!customer) {
                return res.status(404).send({
                    message: "Customer not found"
                });
            }
            await customer.destroy();
             res.send({
                message: "Customer with Infomation", id:customer, "deleted successfully"
        :customer_id});
            
        }
        
        editCustomer = async (req, res) => {
            try {
                const customer_id = req.params.id;
                const { F_name, L_name, contact, email, customer_type } = req.body;
    
                // Find the customer
                const customer = await Customer.findByPk(customer_id);
                if (!customer) {
                    return res.status(404).send({
                        success: false,
                        message: "Customer not found"
                    });
                }
    
                // Update customer fields
                const updatedFields = {};
                if (F_name !== undefined) updatedFields.F_name = F_name;
                if (L_name !== undefined) updatedFields.L_name = L_name;
                if (contact !== undefined) updatedFields.contact = contact;
                if (email !== undefined) updatedFields.email = email;
                if (customer_type !== undefined) updatedFields.customer_type = customer_type;
    
                // Update the customer
                await customer.update(updatedFields);
    
                res.send({
                    success: true,
                    message: "Customer updated successfully",
                    data: customer
                });
    
            } catch (error) {
                console.error("Error updating customer:", error);
                res.status(500).send({
                    success: false,
                    message: "Error updating customer",
                    error: error.message
                });
            }
        };
    
    

};


module.exports = new CustomerController(); 


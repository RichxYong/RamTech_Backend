const Supplier= require("../models/supplier.model");

class SupplierController {

    getAllSuppliers= async (req,res)=>{
        const supplier = await Supplier.findAll();
        res.send({
            message:"List of Suppliers",
            data: supplier,
        });
        
 };

    getOneSupplier = async (req,res) =>{
        const supplier_id= req.params.id;
        const supplier = await Supplier.findByPk(supplier_id);
        if (!supplier){
            return res.status(404).send({message:"Supplier not found"})

        }

        res.send({message:"Specified Supplier", data: supplier});
    };
    
    createSupplier = async(req,res) =>{
        const {f_name, l_name ,contact, email,address, roduct_supplied } = req.body;
        const supplier= await Supplier.create({f_name, l_name, contact, email,address, roduct_supplied }  );
        res.status(201)
        res.send({message:"Supplier added successfully",data:supplier});
    };

    deleteSupplier = async (req, res) => {
        const supplier_id = req.params.id;
        const supplier = await Supplier.findByPk(supplier_id);
        if (!supplier) {
            return res.status(404).send({
                message: "Supplier not found"
            });
        }
        await supplier.destroy();
             res.send({
                message: "Supplier with Infomation",data:supplier, "deleted successfully"
        :supplier_id});
    };

    editSupplier = async (req, res) => {
        const supplier_id = req.params.id;
        const {f_name, l_name, contact, email, address, roduct_supplied} = req.body;
        
        const supplier = await Supplier.findByPk(supplier_id);
        if (!supplier) {
            return res.status(404).send({
                message: "Supplier not found"
            });
        }

        // Update supplier fields
        supplier.f_name = f_name !== undefined ? f_name : supplier.f_name;
        supplier.l_name = l_name !== undefined ? l_name : supplier.l_name;
        supplier.contact = contact !== undefined ? contact : supplier.contact;
        supplier.email = email !== undefined ? email : supplier.email;
        supplier.address = address !== undefined ? address : supplier.address;
        supplier.roduct_supplied = roduct_supplied !== undefined ? roduct_supplied : supplier.roduct_supplied;

        await supplier.save();

        res.send({
            message: "Supplier updated successfully",
            data: supplier
        });
    };

}

module.exports = new SupplierController(); 
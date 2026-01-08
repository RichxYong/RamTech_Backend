 
const Product = require("../models/product.model");

class ProductController {

    getAllProducts= async (req,res)=>{
        const product= await Product.findAll();
        res.send({
            message:"List of Products",
            data: product,
        });
        
  };

    getOneProduct = async (req,res) =>{
        const product_id= req.params.id;
        const product= await Product.findByPk(product_id);
        if (!product){
            return res.status(404).send({message:"Product with id",id:product_id ,"is not found":product_id})
        }

        res.send({message:"Specified Product", data: product});
    };
    
    createProduct = async(req,res) =>{
        const { product_name,   product_descripion,  category,   unit_price, pplier_id, current_stock  } = req.body;
        const product= await Product.create({ product_name,   product_descripion,  category,   unit_price, pplier_id, current_stock  } );
        res.status(201)
        res.send({message:"Product added successfully",data:product});
    };

    deleteProduct = async (req, res) => {
        const product_id = req.params.id;
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).send({
                message: {message:"Product with id",id:product_id ,"is not found":product_id}
            });
        }
        await product.destroy();
             res.send({
                message: "Product with Infomation",data:product, "deleted successfully"
        :product_id});
    };

    editProduct = async (req, res) => {
        const product_id = req.params.id;
        const { product_name, product_descripion, category, unit_price, pplier_id, current_stock } = req.body;
        
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).send({
                message: "Product with id",
                id: product_id,
                "is not found": product_id
            });
        }

        // Update product fields
        product.product_name = product_name || product.product_name;
        product.product_descripion = product_descripion || product.product_descripion;
        product.category = category || product.category;
        product.unit_price = unit_price || product.unit_price;
        product.pplier_id = pplier_id || product.pplier_id;
        product.current_stock = current_stock || product.current_stock;

        await product.save();

        res.send({
            message: "Product updated successfully",
            data: product
        });
    };
}

module.exports = new ProductController(); 

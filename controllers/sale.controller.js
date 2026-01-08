const Sale = require("../models/sale.model");
const Customer = require("../models/customer.model");
const Product = require("../models/product.model");

class SaleController {

    getAllSales = async (req, res) => {
        try {
            const sales = await Sale.findAll();
            res.send({
                message: "List of All Sales",
                data: sales
            });
        } catch (error) {
            res.status(500).send({
                message: "Error fetching sales",
                error: error.message
            });
        }
    };

    getOneSale = async (req, res) => {
        try {
            const sale_id = req.params.id;
            const sale = await Sale.findByPk(sale_id);
            if (!sale) {
                return res.status(404).send({ message: "Sale not found" });
            }
            res.send({ message: "Sale details", data: sale });
        } catch (error) {
            res.status(500).send({
                message: "Error fetching sale",
                error: error.message
            });
        }
    };

    createSale = async (req, res) => {
        const  {
                customer_id,
                product_id,
                quantity,
                unit_price,
                total_amount,
                sale_date,
                payment_method,
                status
            } = req.body;
        const sale = await Sale.create(  {
            customer_id,
            product_id,
            quantity,
            unit_price,
            total_amount,
            sale_date,
            payment_method,
            status
        } )  ;
            res.status(201).send({
                message: "Sale addedsuccessfully",
                data: Sale
            });
        
        
    };

    deleteSale = async (req, res) => {
        const sale_id = req.params.id;
            const sale = await Sale.findByPk(sale_id);
            
            if (!sale) {
                return res.status(404).send({
                    message: "Sale not found"
                });
            }

            await sale.destroy();
            
            res.send({
                message: `Sale deleted successfully`,
                data: sale});
        } ;

        editSale = async (req, res) => {
            try {
                const sale_id = req.params.id;
                const {
                    customer_id,
                    product_id,
                    quantity,
                    unit_price,
                    total_amount,
                    sale_date,
                    payment_method,
                    status
                } = req.body;
                
                const sale = await Sale.findByPk(sale_id);
                
                if (!sale) {
                    return res.status(404).send({
                        message: "Sale not found"
                    });
                }
    
                // Update sale fields
                sale.customer_id = customer_id !== undefined ? customer_id : sale.customer_id;
                sale.product_id = product_id !== undefined ? product_id : sale.product_id;
                sale.quantity = quantity !== undefined ? quantity : sale.quantity;
                sale.unit_price = unit_price !== undefined ? unit_price : sale.unit_price;
                sale.total_amount = total_amount !== undefined ? total_amount : sale.total_amount;
                sale.sale_date = sale_date !== undefined ? sale_date : sale.sale_date;
                sale.payment_method = payment_method !== undefined ? payment_method : sale.payment_method;
                sale.status = status !== undefined ? status : sale.status;
    
                await sale.save();
                
                res.send({
                    message: "Sale updated successfully",
                    data: sale
                });
            } catch (error) {
                res.status(500).send({
                    message: "Error updating sale",
                    error: error.message
                });
            }
        }
            
        }
    

   

module.exports = new SaleController();
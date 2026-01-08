// file to start the server

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ========== MIDDLEWARE ==========
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== ROUTES ==========
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to RAMTECH ELECTRICALS' });
}); 

const AuthRoutes = require("./routes/auth.route");
app.use("/auth", AuthRoutes);

const CustomerRoutes = require("./routes/customer.route");
app.use("/customers",CustomerRoutes);

const EmployeeRoutes  = require("./routes/employee.route");
app.use("/employees",EmployeeRoutes)

const ProductRoutes = require("./routes/product.route");
app.use("/products", ProductRoutes);

const SaleRoutes = require("./routes/sale.route");
app.use("/sales" , SaleRoutes);
 
const SupplierRoutes = require("./routes/supplier.route");
app.use("/suppliers" ,SupplierRoutes);

const userRoutes = require("./routes/user.route");
app.use("/users",userRoutes);


app.listen("3000",()=>{
    console.log("Server running on port 3000");

    
});
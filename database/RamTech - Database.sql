
-- RAMTECH ELECTRICALS DATABASE SCRIPT-- 

-- Creating the  database --
CREATE DATABASE  ramtech_electricals;
USE ramtech_electricals;

-- SUPPLIERS TABLE 
CREATE TABLE supplier (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    product_supplied VARCHAR(255) 
);

-- CUSTOMERS TABLE
CREATE TABLE customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    F_name VARCHAR(100) NOT NULL,
    L_name VARCHAR(100),
    contact VARCHAR(20),
    email VARCHAR(100),
    customer_type VARCHAR(50) -- Retail, Contractor, Business
    ) ;

-- EMPLOYEES TABLE--
CREATE TABLE employee (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    f_name VARCHAR(50) NOT NULL,
    l_name VARCHAR(50) NOT NULL,
    contact VARCHAR(20),
    position VARCHAR(50),
    salary VARCHAR(50),
    hire_date DATE
    
);

-- PRODUCTS TABLE
CREATE TABLE product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    product_description TEXT,
    category VARCHAR(50), 
    unit_price DECIMAL(10,2) NOT NULL,
    supplier_id INT,
    current_stock INT DEFAULT 0,
    
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    
    -- Check constraints
    CHECK (unit_price >= 0),
    CHECK (current_stock >= 0)
);

--  SALES TABLE --
CREATE TABLE sale (
    sale_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    sale_date DATE NOT NULL ,
    payment_method VARCHAR(50) DEFAULT 'Cash',
    status VARCHAR(50) DEFAULT 'Completed',
    
	FOREIGN KEY (customer_id) REFERENCES customer(customer_id) 
        ON DELETE RESTRICT 
        ON UPDATE CASCADE,
    
   FOREIGN KEY (product_id) REFERENCES product(product_id) 
        ON DELETE RESTRICT 
        ON UPDATE CASCADE
);

-- USERS TABLE --
CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role ENUM('admin', 'manager', 'employee') DEFAULT 'employee',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL);

-- INDEXES FOR BETTER PERFORMANCE
-- ============================================
CREATE INDEX idx_product_supplier ON product(supplier_id);
CREATE INDEX idx_sale_product ON sale(product_id);
CREATE INDEX idx_sale_customer ON sale(customer_id);
CREATE INDEX idx_customer_type ON customer(customer_type);
CREATE INDEX idx_sale_customer ON sale(customer_id);
CREATE INDEX idx_sale_product ON sale(product_id);

-- INSERTING SAMPLE DATA--
INSERT INTO supplier (name, contact, email, address, product_supplied) VALUES
('Philips Ghana Ltd', '0241234567', 'info@philips.com.gh', 'Accra, Spintex ', 'LED Bulbs, Lighting'),
('Havells Ghana', '0242345678', 'sales@havellsghana.com', 'Kumasi, Adum', 'Electrical Wires, Cables'),
('Anchor Electricals', '0243456789', 'anchor@electricals.com', 'Tema, Community 1', 'Switches, Sockets'),
('Stanley Tools', '0244567890', 'stanley.tools@gmail.com', ' Industrial Area', 'Tools, Safety Equipment');

INSERT INTO customer (F_name, L_name, contact, email, customer_type) VALUES
('Kwame',' Mensah', '0241112233', 'kwame.mensah@gmail.com', 'Retail'),
('Mensah',' Construction Ltd', '0242223344', 'info@mensahconstruction.com', 'Business'),
('Ama','Electrical Works', '0243334455', 'ama.electrical@yahoo.com', 'Contractor'),
('Grace',' Ofori', '0244445566', 'grace.ofori@hotmail.com', 'Retail');

INSERT INTO employee (f_name, l_name, contact, position, hire_date) VALUES
('David', 'Asante', '0245556677', 'Manager', '2023-01-10'),
('Comfort', 'Agyeman', '0246667788', 'Salesperson', '2023-03-15'),
('Samuel', 'Tetteh', '0247778899', 'Technician', '2023-06-20'),
('Akua', 'Addo', '0248889900', 'Storekeeper', '2023-08-05');

INSERT INTO product (product_name, product_description, category, unit_price, supplier_id, current_stock) VALUES
('Philips LED Bulb 10W', 'Energy saving LED light bulb', 'Lighting', 25.00, 1, 100),
('Havells Copper Wire 2.5mm', '2.5mm copper electrical wire', 'Wiring', 55.00, 2, 50),
('Anchor Switch 6A', 'Single pole electrical switch', 'Switches', 12.50, 3, 200),
('Stanley Screwdriver Set', '6-piece screwdriver set', 'Tools', 85.00, 4, 40),
('Orient Ceiling Fan 56"', '56 inch ceiling fan with remote', 'Fans', 280.00, 1, 25);

INSERT INTO sale (customer_id, product_id, quantity, unit_price, total_amount, sale_date, payment_method, status) VALUES
(2, 1, 2, 299.99, 599.98, '2024-01-15', 'Credit Card', 'Completed'),
( 3, 3, 1, 89.99, 89.99, '2024-01-20', 'Cash', 'Completed'),
(5, 3, 5, 89.99, 449.95, '2024-02-12', 'Credit Card', 'Completed'),
(10, 2, 129.99, 259.98, '2024-02-15', 'Cash', 'Completed');

INSERT INTO user (username, email, password_hash, first_name, last_name, role) VALUES
('admin','admin@gmail.com','admin123', 'Admin','User','Admin'),
 ('Richard','rich@ramtech.com','rich123', 'Richard','Ayong','Admin');

-- END HERE --
-- -------------------------------- --

--SET FOREIGN_KEY_CHECKS = 0;
--SET FOREIGN_KEY_CHECKS = 1;




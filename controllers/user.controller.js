// controllers/user.controller.js
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { Op } = require('sequelize'); // ADD THIS!

class UserController {
    // Get all users
    getAllUsers = async (req, res) => {
        try {
            console.log('Fetching all users...');
            const users = await User.findAll({
                attributes: { exclude: ['password_hash'] }
            });
            
            console.log(`Found ${users.length} users`);
            
            res.status(200).json({
                success: true,
                message: "Users retrieved successfully",
                data: users
            });
            
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({
                success: false,
                message: "Error fetching users",
                error: error.message
            });
        }
    };
     
    // Get single user by ID
    getOneUser = async (req, res) => {
        try {
            const userId = req.params.id;
            console.log(`Fetching user ID: ${userId}`);
            
            const user = await User.findByPk(userId, {
                attributes: { exclude: ['password_hash'] }
            });
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "User retrieved successfully",
                data: user
            });
            
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({
                success: false,
                message: "Error fetching user",
                error: error.message
            });
        }
    };

    // Create new user
    createUser = async (req, res) => {
        try {
            console.log('=== CREATE USER REQUEST ===');
            console.log('Request body:', req.body);
            
           
            const { 
                username, 
                email, 
                password,  
                first_name, 
                last_name, 
                role = 'employee' 
            } = req.body;

            // Validate required fields
            console.log('Validating fields...');
            if (!username || !email || !password || !first_name || !last_name) {
                console.log('Missing fields:', { username, email, password, first_name, last_name });
                return res.status(400).json({
                    success: false,
                    message: "All required fields must be provided"
                });
            }

            // Check if user already exists
            console.log('Checking for existing user...');
            const existingUser = await User.findOne({
                where: { 
                    [Op.or]: [
                        { email: email },
                        { username: username }
                    ]
                }
            });

            if (existingUser) {
                console.log('User already exists');
                return res.status(409).json({
                    success: false,
                    message: "User with this email or username already exists"
                });
            }

            // Hash the password - FIXED THIS LINE!
            console.log('Hashing password...');
            const saltRounds = 10;
            const password_hash = await bcrypt.hash(password, saltRounds);
            console.log('Password hashed successfully');

            // Create new user
            console.log('Creating user in database...');
            const newUser = await User.create({
                username,
                email,
                password_hash, // Use the hashed password
                first_name,
                last_name,
                role,
                is_active: true
            });

            console.log('User created:', newUser.user_id);

            // Remove password from response
            const userResponse = newUser.toJSON();
            delete userResponse.password_hash;

            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: userResponse
            });
            
        } catch (error) {
            console.error('❌ Error creating user:', error);
            console.error('Error stack:', error.stack);
            res.status(500).json({
                success: false,
                message: "Error creating user",
                error: error.message
            });
        }
    };

    // Update user
    editUser = async (req, res) => {
        try {
            const userId = req.params.id;
            const { username, email, first_name, last_name, role, password } = req.body;

            const user = await User.findByPk(userId);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            // Update fields
            const updateData = {
                username: username || user.username,
                email: email || user.email,
                first_name: first_name || user.first_name,
                last_name: last_name || user.last_name,
                role: role || user.role
            };

            // If password is provided, hash it
            if (password) {
                const saltRounds = 10;
                updateData.password_hash = await bcrypt.hash(password, saltRounds);
            }

            // Check for duplicate email/username (if changing)
            if (email && email !== user.email) {
                const existingEmail = await User.findOne({ where: { email } });
                if (existingEmail) {
                    return res.status(409).json({
                        success: false,
                        message: "Email already in use"
                    });
                }
            }

            if (username && username !== user.username) {
                const existingUsername = await User.findOne({ where: { username } });
                if (existingUsername) {
                    return res.status(409).json({
                        success: false,
                        message: "Username already in use"
                    });
                }
            }

            await user.update(updateData);

            // Get updated user without password
            const updatedUser = await User.findByPk(userId, {
                attributes: { exclude: ['password_hash'] }
            });

            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: updatedUser
            });
            
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({
                success: false,
                message: "Error updating user",
                error: error.message
            });
        }
    };

    // Delete user
    deleteUser = async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            await user.destroy();

            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });
            
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({
                success: false,
                message: "Error deleting user",
                error: error.message
            });
        }
    };

    // Toggle user status (activate/deactivate)
    toggleUserStatus = async (req, res) => {
        try {
            const userId = req.params.id;
            const { is_active } = req.body;

            const user = await User.findByPk(userId);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            await user.update({ is_active });

            res.status(200).json({
                success: true,
                message: `User ${is_active ? 'activated' : 'deactivated'} successfully`,
                data: { is_active }
            });
            
        } catch (error) {
            console.error('Error updating user status:', error);
            res.status(500).json({
                success: false,
                message: "Error updating user status",
                error: error.message
            });
        }
    };

    // User login
    login = async (req, res) => {
        try {
            console.log('=== LOGIN REQUEST ===');
            console.log('Request body:', req.body);
            
            const { email, password } = req.body;

            // Validate input
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Email and password are required"
                });
            }

            // Find user by email
            console.log(`Looking for user with email: ${email}`);
            const user = await User.findOne({ where: { email } });
            
            if (!user) {
                console.log('User not found');
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            // Check if user is active
            if (!user.is_active) {
                console.log('User account is inactive');
                return res.status(401).json({
                    success: false,
                    message: "Account is deactivated"
                });
            }

            // Verify password
            console.log('Verifying password...');
            const isValidPassword = await bcrypt.compare(password, user.password_hash);
            
            if (!isValidPassword) {
                console.log('Invalid password');
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            // Update last login
            await user.update({ last_login: new Date() });

            // Remove password from response
            const userResponse = user.toJSON();
            delete userResponse.password_hash;

            console.log('Login successful for user:', userResponse.username);

            // For now, return user data
            // In production, generate JWT token
            res.status(200).json({
                success: true,
                message: "Login successful",
                data: userResponse
            });
            
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: "Error during login",
                error: error.message
            });
        }
    };
}

module.exports = new UserController();
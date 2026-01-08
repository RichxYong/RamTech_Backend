
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ========== SIMPLE LOGIN ==========
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        console.log('🔐 Login attempt:', username);
        
        // 1. Validate input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password required'
            });
        }
        
        // 2. Import User model
        const User = require('../models/user.model');
        
        // 3. Find user in database
        const user = await User.findOne({
            where: { username: username }
        });
        
        // 4. Check if user exists
        if (!user) {
            console.log('❌ User not found:', username);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        // 5. Check if user is active
        if (!user.is_active) {
            console.log('❌ User inactive:', username);
            return res.status(401).json({
                success: false,
                message: 'Account is disabled'
            });
        }
        
        // 6. DEBUG: Show what we found
        console.log('📊 Found user:', {
            id: user.user_id,
            username: user.username,
            role: user.role,
            passwordHash: user.password_hash ? 'exists' : 'missing'
        });
        
        // 7. Verify password
        let isValidPassword = false;
        
        // If password_hash is bcrypt hash (starts with $2)
        if (user.password_hash && user.password_hash.startsWith('$2')) {
            console.log('🔑 Using bcrypt comparison');
            isValidPassword = await bcrypt.compare(password, user.password_hash);
        } else {
            // If stored as plain text (for testing)
            console.log('⚠️ Using plain text comparison (not secure)');
            isValidPassword = (user.password_hash === password);
        }
        
        console.log('🔑 Password valid:', isValidPassword);
        
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        // 8. Update last login
        await user.update({ last_login: new Date() });
        
        // 9. Generate JWT token
        const token = jwt.sign(
            { 
                user_id: user.user_id, 
                username: user.username, 
                role: user.role 
            },
            process.env.JWT_SECRET || 'ramtech-secret-key-2024',
            { expiresIn: '24h' }
        );
        
        // 10. Return success
        console.log('✅ Login successful for:', username);
        
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    user_id: user.user_id,
                    username: user.username,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role: user.role
                },
                token: token
            }
        });
        
    } catch (error) {
        console.error('💥 Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message
        });
    }
});

// ========== TEST ENDPOINTS ==========
router.get('/test', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Auth route is working!',
        timestamp: new Date().toISOString()
    });
});

router.post('/test-login', (req, res) => {
    // Always returns success for testing
    const token = jwt.sign(
        { user_id: 999, username: 'testuser', role: 'admin' },
        process.env.JWT_SECRET || 'ramtech-secret-key-2024',
        { expiresIn: '24h' }
    );
    
    res.json({
        success: true,
        message: 'Test login always works',
        data: {
            user: { 
                user_id: 999, 
                username: 'testuser', 
                role: 'admin' 
            },
            token: token
        }
    });
});

// ========== LOGOUT ==========
router.post('/logout', (req, res) => {
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

module.exports = router;
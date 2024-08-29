const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SignUp Controller
const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ msg: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get User Data Controller with Dummy Data
const getUserData = async (req, res) => {
    try {
        // Extract user ID from the JWT token (assuming you have middleware that attaches the user ID to the request)
        const userId = req.user.id;

        // Query to fetch the user data
        const userResult = await pool.query('SELECT username FROM users WHERE id = $1', [userId]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const username = userResult.rows[0].username;

        // Dummy data for the dashboard
        const summary = {
            totalVehicles: 220,
            totalTyres: 456,
            tyresOnWheel: 345,
            availableStock: 276,
            totalScrap: 179,
            cpkTyres: 225,
            sentToRetread: 156,
            retreadedTyres: 314,
            reusableTyres: 234,
        };

        const alerts = {
            unidentifiedTyre: 351,
            missingTyre: 122,
            lowNSD: 105,
            vehiclePending: 245,
            pendingAlignment: 455,
            pendingRotation: 465,
            tyreDefects: 257,
        };

        const tyreInventory = [
            { type: 'NSD', new: 51, retreaded: 25, scrap: 25, total: 101 },
            { type: '4-8', new: 45, retreaded: 69, scrap: 69, total: 185 },
            { type: '8-12', new: 56, retreaded: 14, scrap: 14, total: 84 },
            { type: '12-16', new: 84, retreaded: 41, scrap: 41, total: 166 },
            { type: '16-20', new: 26, retreaded: 23, scrap: 23, total: 72 },
            { type: '20-24', new: 72, retreaded: 21, scrap: 21, total: 114 },
        ];

        const pendingActions = [
            { date: '22 Aug 24', category: 'Inspection', tyreSNo: 'CZ8903131021', brand: 'Bridgestone', model: 'XYZ123PQR', size: '1000/20', vehicleNo: 'RJ 13 SR 2299', status: 'Completed' },
            { date: '22 Aug 24', category: 'Alignment', tyreSNo: 'CZ8903131021', brand: 'Bridgestone', model: 'XYZ123PQR', size: '1000/20', vehicleNo: 'RJ 13 SR 2299', status: 'Completed' },
            { date: '22 Aug 24', category: 'Rotation', tyreSNo: 'CZ8903131021', brand: 'Bridgestone', model: 'XYZ123PQR', size: '1000/20', vehicleNo: 'RJ 13 SR 2299', status: 'Completed' },
            { date: '22 Aug 24', category: 'Defects Correction', tyreSNo: 'CZ8903131021', brand: 'Bridgestone', model: 'XYZ123PQR', size: '1000/20', vehicleNo: 'RJ 13 SR 2299', status: 'Completed' },
            { date: '22 Aug 24', category: 'Removal', tyreSNo: 'CZ8903131021', brand: 'Bridgestone', model: 'XYZ123PQR', size: '1000/20', vehicleNo: 'RJ 13 SR 2299', status: 'Completed' },
            { date: '22 Aug 24', category: 'Fitment', tyreSNo: 'CZ8903131021', brand: 'Bridgestone', model: 'XYZ123PQR', size: '1000/20', vehicleNo: 'RJ 13 SR 2299', status: 'Completed' },
        ];

        const completedActions = [
            { date: '21 Aug 24', category: 'Inspection', tyreSNo: 'CZ8903131020', brand: 'Bridgestone', model: 'XYZ123PQR', size: '1000/20', vehicleNo: 'RJ 13 SR 2298', status: 'Completed' },
            { date: '21 Aug 24', category: 'Alignment', tyreSNo: 'CZ8903131020', brand: 'Bridgestone', model: 'XYZ123PQR', size: '1000/20', vehicleNo: 'RJ 13 SR 2298', status: 'Completed' },
            { date: '21 Aug 24', category: 'Rotation', tyreSNo: 'CZ8903131020', brand: 'Bridgestone', model: 'XYZ123PQR', size: '1000/20', vehicleNo: 'RJ 13 SR 2298', status: 'Completed' },
            { date: '21 Aug 24', category: 'Defects Correction', tyreSNo: 'CZ8903131020', brand: 'Bridgestone', model: 'XYZ123PQR', size: '1000/20', vehicleNo: 'RJ 13 SR 2298', status: 'Completed' },
            { date: '21 Aug 24', category: 'Removal', tyreSNo: 'CZ8903131020', brand: 'Bridgestone', model: 'XYZ123PQR', size: '1000/20', vehicleNo: 'RJ 13 SR 2298', status: 'Completed' },
            { date: '21 Aug 24', category: 'Fitment', tyreSNo: 'CZ8903131020', brand: 'Bridgestone', model: 'XYZ123PQR', size: '1000/20', vehicleNo: 'RJ 13 SR 2298', status: 'Completed' },
        ];

        const financialSummary = [
            { date: '20 Aug 24', category: 'Purchase', tyreSNo: 'CZ8903131019', brand: 'Apollo', model: 'ABC987XYZ', size: '900/16', vehicleNo: 'RJ 13 SR 2297', status: 'Completed' },
            { date: '20 Aug 24', category: 'Repair', tyreSNo: 'CZ8903131019', brand: 'Apollo', model: 'ABC987XYZ', size: '900/16', vehicleNo: 'RJ 13 SR 2297', status: 'Completed' },
            { date: '20 Aug 24', category: 'Maintenance', tyreSNo: 'CZ8903131019', brand: 'Apollo', model: 'ABC987XYZ', size: '900/16', vehicleNo: 'RJ 13 SR 2297', status: 'Completed' },
            { date: '20 Aug 24', category: 'Inspection', tyreSNo: 'CZ8903131019', brand: 'Apollo', model: 'ABC987XYZ', size: '900/16', vehicleNo: 'RJ 13 SR 2297', status: 'Completed' },
            { date: '20 Aug 24', category: 'Replacement', tyreSNo: 'CZ8903131019', brand: 'Apollo', model: 'ABC987XYZ', size: '900/16', vehicleNo: 'RJ 13 SR 2297', status: 'Completed' },
        ];

        const tyrePurchases = [
            { brand: 'JK Tyres', lastMonth: 300, newTyres: 100 },
            { brand: 'CEAT', lastMonth: 400, newTyres: 200 },
            { brand: 'Apollo', lastMonth: 500, newTyres: 345 },
            { brand: 'Bridgestone', lastMonth: 450, newTyres: 220 },
            { brand: 'Vikrant', lastMonth: 200, newTyres: 80 },
            { brand: 'MRF', lastMonth: 100, newTyres: 50 },
        ];

        const monthWise = [
            { month: 'Jan', purchased: 640, retreaded: 340, scrap: 150, currentYear: 100 },
            { month: 'Feb', purchased: 540, retreaded: 240, scrap: 120, currentYear: 90 },
            { month: 'Mar', purchased: 700, retreaded: 380, scrap: 170, currentYear: 130 },
            { month: 'Apr', purchased: 620, retreaded: 320, scrap: 140, currentYear: 110 },
            { month: 'May', purchased: 680, retreaded: 360, scrap: 160, currentYear: 120 },
        ];

        res.json({
            username,
            summary,
            alerts,
            tyreInventory,
            pendingActions,
            completedActions,
            financialSummary,
            tyrePurchases,
            monthWise,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Exporting the controllers
module.exports = {
    signUp,
    login,
    getUserData
};

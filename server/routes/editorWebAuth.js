const router = require("express").Router();
const pool = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");



// module.exports = router;


//Login user

router.post("/login", validInfo, async (req, res) => {
    try {
        const {email, password} = req.body;
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        const user = result.rows[0];
        if (!user) {
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const token = jwt.sign({userId : user.id}, process.env.SECRET_KEY, {expiresIn : "1h"});

        res.json({token});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
})

//Register user

router.post("/register", validInfo, async (req, res) => {
    const {email, password, name} = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email]);
        if (user.rows.length > 0) {
            return res.status(400).json({message : "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const result = await pool.query("INSERT INTO users (email, password, name) VALUES($1, $2, $3) RETURNING *", [email, bcryptPassword, name]);
        
        const token = jwt.sign({userId : result.rows[0].id}, process.env.SECRET_KEY, {expiresIn : "1h"});

        res.status(201).json({token});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
})

// Token verification

function verifyToken(req, res, next) {
    const token = res.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({message : "Missing token"});
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({message : "Invalid token"});
    }
}

router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [req.user.userId]);
        res.json(user.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
})

router.get("/is-verify",authorization,async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
})



module.exports = router;
const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/", authorization, async (req, res) => {
    try {
        // res.json(req.user);
        const user = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [req.user.id]);
        res.json(user.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
})

router.post("/add-file", async (req, res) => {
    try {
        const {user_id, document_id, document_title, created_at, updated_at} = req.body;
        const reult = await pool.query("INSERT INTO documents (owner_id, id, title, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING *", [user_id, document_id, document_title, created_at, updated_at]);
        res.json(reult.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;
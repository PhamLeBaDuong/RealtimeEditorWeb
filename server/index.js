const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

//middleware

app.use(cors());
app.use(express.json());

//ROUTES//

//Create post

app.use("/auth", require("./routes/editorWebAuth"))
app.use("/homepage", require("./routes/homepage"))


app.post("/editorweb", async (req, res) => {
    try {
        const {description} = req.body;
        const newField = await pool.query("INSERT INTO soccerfield (description) VALUES($1) RETURNING *", [description]);

        res.json(newField.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})



//get all post

// app.get("/editorweb", async (req, res) => {
//     try {
//         const allFields = await pool.query("SELECT * FROM editorweb");
//         res.json(allFields.rows);
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //get a post

// app.get("/editorweb/:id", async (req, res) => {
//     try {
//         const {id} = req.params;
//         const field = await pool.query("SELECT * FROM editorweb WHERE id = $1", [id]);
//         res.json(field.rows[0]);
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //update post

// app.put("/editorweb/:id", async (req, res) =>{
//     try {
//         const {id}  = req.params;
//         const {description} = req.body;
//         const updateSoccerField = await pool.query("UPDATE editorweb SET description = $1 WHERE id = $2", [description, id]);
//         res.json("Soccer field was updated")
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //delete post

// app.delete("/editorweb/:id", async (req, res) => {
//     try { 
//         const {id} = req.params;
//         const deleteSoccerField = await pool.query("DELETE FROM editorweb WHERE id = $1", [id]);
//         res.json("Soccer field was deleted");
//     } catch (error) {
//         console.log(error.message);
//     }
// })
 
app.listen(5000, () => {
    console.log("ser has started on port 5000");
})
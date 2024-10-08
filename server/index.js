const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Document = require('./document');

const defaultDocumentData = "";

mongoose.connect("mongodb://localhost:27017/test").then(() => {
    console.log('Connected!');
  })


dotenv.config();

//middleware

app.use(cors());
app.use(express.json());

//ROUTES//

//Create post

app.use("/auth", require("./routes/editorWebAuth"))
app.use("/homepage", require("./routes/homepage"))


// app.post("/editorweb", async (req, res) => {
//     try {
//         const {description} = req.body;
//         const newField = await pool.query("INSERT INTO soccerfield (description) VALUES($1) RETURNING *", [description]);

//         res.json(newField.rows[0]);
//     } catch (error) {
//         console.log(error.message);
//     }
// })



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

const io = require("socket.io")(5001, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on("connection", socket => {
    socket.on("get-document", async fileID => {
        const document = await findOrCreateDocument(fileID);
        socket.join(fileID)
        socket.emit("load-document", document.data ) 
        socket.on("send-changes", delta => {
            socket.broadcast.to(fileID).emit("receive-changes", delta)
        })
        socket.on("save-document", async data => {
            await Document.findByIdAndUpdate(fileID, {data})
        })
    })
})

async function findOrCreateDocument(id) {
    if(id == null) return 

    const document = await Document.findById(id)
    if(document) return document
    return await Document.create({_id: id, data: defaultDocumentData})

}
 
app.listen(5000, () => {
    console.log("ser has started on port 5000");
})
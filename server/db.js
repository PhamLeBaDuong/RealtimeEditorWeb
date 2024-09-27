const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "@Plbd20052011",
    host: "localhost",
    port: 5432,
    database: "editorweb"
});

module.exports = pool;
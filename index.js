const express = require('express');
const router = require('./routes');
const db = require('./db/db');
const app = express();
const modelsJSON = require('./models.json');

app.use(router);

(async () => {
    try {
        await db.connectDB();
        app.listen(4000, () => console.log("Server UP"));
    } catch (error) {
        console.log(error);
    }
})();
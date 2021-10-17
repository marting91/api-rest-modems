const express = require('express');
const router = require('./routes');
const db = require('./db/db');
const app = express();

app.use(express.json());

app.use(express.static('public'));

app.use('/api/v1', router);

(async () => {
    try {
        await db.connectDB();
        app.listen(4000, () => console.log("Server UP"));
    } catch (error) {
        console.log(error);
    }
})();
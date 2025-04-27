const express = require('express');
const mysql = require('mysql2');
const app = express();

const db = mysql.createConnection({
    host: 'mysql.core-infrastructure.svc.cluster.local',
    user: 'igrwijaya',
    password: 'igrwijaya',
    database: 'appdb'
});

app.get('/', (req, res) => {
    db.query('SELECT NOW() as now', (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.send('Hello from MySQL! Time is: ' + results[0].now);
    });
});

app.listen(3000, () => console.log('Server running'));
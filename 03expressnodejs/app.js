const express = require('express');
const app = express();
const router = express.Router();
const routes = require('./routes');
const settings = require('./settings');
const data = require('./data');
const mysql = require('mysql');


const connection = mysql.createConnection(settings.database);

router.get('/employees', routes.employees.listAllEmployees);

// router.get('/employees', (req, res) => res.send(data));

// router.get('/employees/:id', (req, res) => {
//     const id = +req.params.id;
//     const employee = data.filter(d => d.id === id);
//     res.send(employee);
// });

// router.get('/employees', (req, res) => res.send('Hello World!'));
app.use('/api', router)
    // app.use(express.static('images'));

app.use('/static', express.static('images'));



// app.get('/api/employees', (req, res) => res.send('Hello World!'));
// app.post('/api/employees', (req, res) => res.send('Http POST in action'));

connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return process.exit();
    }
    app.locals.connection = connection;
    app.listen(settings.APIServerPort,
        () => console.info(`server is listening on ${settings.APIServerPort}`));
})
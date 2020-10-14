const express = require('express');
const app = express();
const router = express.Router();
const routes = require('./routes');
const settings = require('./settings');
const middlewares = require('./middlewares');
const bodyParser = require('body-parser');
// const data = require('./data');
// const mysql = require('mysql');
const jsonParser = bodyParser.json();

const knex = require('knex')({
    client: 'mysql',
    connection: settings.database
});
app.locals.knex = knex;

// const connection = mysql.createConnection(settings.database);

router.get('/employees', routes.employees.listAllEmployees);
router.get('/employees/:id', middlewares.authenticate, middlewares.getIDAsInteger, routes.employees.listOneEmployee);

router.post('/employees', jsonParser, routes.employees.createEmployee);
router.patch('/employees/:id', jsonParser, middlewares.getIDAsInteger, routes.employees.updateEmployee);
router.delete('/employees/:id', middlewares.getIDAsInteger, routes.employees.deleteEmployee);

router.get('/departments', routes.departments.listAllDepartments);
router.get('/departments/:id', middlewares.getIDAsInteger, routes.departments.listOneDepartment);
router.get('/departments/:id/employees', middlewares.getIDAsInteger, routes.departments.getDepartmentEmployees);
router.post('/departments', jsonParser, routes.departments.createDepartment);
router.patch('/departments/:id', jsonParser, middlewares.getIDAsInteger, routes.departments.updateDepartment);
router.delete('/departments/:id', middlewares.getIDAsInteger, routes.departments.deleteDepartment);
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

// connection.connect(error => {
//     if (error) {
//         console.error('Error connecting to the database:', error);
//         return process.exit();
//     }
//     app.locals.connection = connection;
//     app.listen(settings.APIServerPort,
//         () => console.info(`server is listening on ${settings.APIServerPort}`));
// })

app.listen(settings.APIServerPort,
    () => console.info(`server is listening on ${settings.APIServerPort}`));
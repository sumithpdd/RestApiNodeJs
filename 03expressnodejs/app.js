const express = require('express');
const app = express();
const router = express.Router();

const data = require('./data');

router.get('/employees', (req, res) => res.send(data));

router.get('/employees/:id', (req, res) => {
    const id = +req.params.id;
    const employee = data.filter(d => d.id === id);
    res.send(employee);
});

// router.get('/employees', (req, res) => res.send('Hello World!'));
app.use('/api', router)
    // app.use(express.static('images'));

app.use('/static', express.static('images'));


const port = 3000;
// app.get('/api/employees', (req, res) => res.send('Hello World!'));
// app.post('/api/employees', (req, res) => res.send('Http POST in action'));

app.listen(port,
    () => console.info(`server is listening on ${port}`));
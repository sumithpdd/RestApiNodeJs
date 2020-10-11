const express = require('express');
const app = express();

const port = 3000;
app.get('/api/employees', (req, res) => res.send('Hello World!'));
app.post('/api/employees', (req, res) => res.send('Http POST in action'));

app.listen(port,
    () => console.info(`server is listening on ${port}`));
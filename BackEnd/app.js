const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 2020;
const host = '0.0.0.0';

const routes = require('./Routes/index');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

app.use('/', routes);

mongoose.connect('mongodb+srv://anshu_chowdary:Amma@1234@cluster0.th9aj.mongodb.net/TestDB?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(res => {
    app.listen(port, host, () => {
        console.log(`Server Running at - ${host}:${port}`);
    })
}).catch(err => { console.log(err) })
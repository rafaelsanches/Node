const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {

    var date = new Date().toString();
    var log = `${date} | Url: ${req.path} | Method: ${req.method} `;

    console.log(log);
    fs.appendFile('server.log',log + '\n' , (erro) => {
        console.log(erro);
    });
    next();
});

var dinamicData = {
    year : new Date().getFullYear(),
    titulo : 'Dinamic title'
}

app.get('/json',(req,res)=> {

    var json = {
        nome: 'Rafael',
        likes: [
            'natação',
            'Piano'
        ],
        age: 32
    };

    res.send(json);
});

app.get('/about',(req,res)=> {
    
        res.render('about.hbs',dinamicData);
    });

app.listen(3000);
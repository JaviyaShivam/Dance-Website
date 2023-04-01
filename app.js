const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const { urlencoded } = require('body-parser');
const { Console } = require('console');
const { stringify } = require('querystring');
const app = express();
const port = 5000;

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('vievs', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
    const params = { };
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = { };
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res)=>{
    // console.log(req.body)     //Gives whole body responce of form in terms of object
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const adress = req.body.adress;
    const dance_exp = req.body.dance_exp;
    const consern = req.body.consern;
    const form_responce = `Name = ${name} \nEmail = ${email} \nPhone Number = ${phone} \nAdress = ${adress} \nPrevious Dance Exp. = ${dance_exp} \nConsern = ${consern}`  
    console.log(form_responce);
    fs.writeFileSync('output.txt', form_responce);
    const params = {'Message':'Form Submitted...'};
    res.status(200).render('contact.pug', params);
});

app.listen(port, ()=>{
    console.log(`The Application is started on port ${port}`);
});
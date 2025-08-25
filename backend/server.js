const express = require('express');
const cors = require('cors');
const path = require('path');
const { timeStamp, count } = require('console');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

let contactSubmissions = [];
let visitCount = 0;

app.get('/api/health', (req,res)=>{
    res.join({status: 'Server is running!', timeStamp: new Date().toISOString()});
})

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if(!name || !email || !message){
        return res.status(400).json({error: 'All fields are required'});
    }

    const submission = {
        id: contactSubmissions.length + 1,
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timeStamp: new Date().toISOString()
    }

    contactSubmissions.push(submission);

    res.status(201).json({
        message: 'Contact form submitted successfully!',
        id: submission.id
    })
})

app.get('/api/contact', (req, res)=>{
    res.json(contactSubmissions);
});

app.get('/api/visit-count', (req, res)=>{
    visitCount++;
    res.json({ count: visitCount });
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../frontend/index.html'))
})

app.listen(PORT, ()=>{
    
})
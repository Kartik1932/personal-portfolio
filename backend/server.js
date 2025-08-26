const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./database/db');
const { timeStamp, count, time } = require('console');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

let contactSubmissions = [];
let visitCount = 0;

app.get('/api/health', async(req,res)=>{
    try{
        const result = await pool.query('SELECT NOW()');
        res.json({
            status: 'Server is running',
            database: 'Connected',
            timeStamp: result.rows[0].now
        });
    } catch(error){
        res.status(500).json({
            status: 'Server running',
            database: 'Database disconnected',
            error: error.message
        })
    }
})

app.post('/api/contact', async(req, res) => {
    const { name, email, message } = req.body

    if(!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id, created_at',
            [name.trim(), email.trim(), message.trim()]
        );
        res.status(201).json({
            message: 'Contact form updated successfullly!',
            id: result.rows[0].id,
            timeStamp: result.rows[0].created_at
        });
    } catch(error) {
        console.error('Database error: ', error);
        res.status(500).json({ error: 'Failed to save contact form '});
    }
})

app.get('/api/contact', async (req, res)=>{
    try {
        const result = await pool.query(
            'SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch(error){
        console.error('Database error: ', error);
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

app.get('/api/visit-count', async (req, res)=>{
    try {
        await pool.query(
            'UPDATE visits SET count = count + 1 WHERE id = 1'
        )

        const result = await pool.query('SELECT count FROM visits WHERE id = 1')
        const count = result.rows[0]?.count || 0;

        res.json({ count });
    } catch(error) {
        console.error("Som error occured: ", error);
        res.status(500).json({ error: 'Failed to update visit count'})
    }
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../frontend/index.html'))
})

app.listen(PORT, ()=>{
    
})
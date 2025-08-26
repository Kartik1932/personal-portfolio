const { Pool } = require('pg')
require('dotenv').config({ path: '../.env'});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

pool.connect((err, client, release) => {
    if(err){
        console.error('Error connecting to db');
    }else{
        console.log('Connected')
        release();
    }
})

module.exports = pool
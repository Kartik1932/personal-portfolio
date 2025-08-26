const { Pool } = require('pg')
require('dotenv').config();

console.log('Environment variables:');

console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
console.log('POSTGRES_DB:', process.env.POSTGRES_DB);

const DATABASE_URL = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5432/${process.env.POSTGRES_DB}`;
console.log('DATABASE_URL:', DATABASE_URL);
const pool = new Pool({
    connectionString: DATABASE_URL,
});
pool.connect((err, client, release) => {
    if(err){
        console.error('Error connecting to db', err.message);
    }else{
        console.log('Connected')
        release();
    }
})

module.exports = pool
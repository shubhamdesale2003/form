
const express = require('express')
const app = express()
const path = require('path')
const pg = require('pg')
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

const pool = new pg.Pool({
    user:'postgres',
    host:'localhost',
    database:'sampledb',
    password:'root',
    port:5432
})

pool.connect((err)=>{
    if(err){
        console.log("Error here")
    }
    else{
        console.log('server is running')
    }
})
// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Insert the data into the database
    const query = 'INSERT INTO users (name, email, message) VALUES ($1, $2, $3)';
    pool.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            res.status(500).send('Error saving data');
        } else {
            console.log('Data saved successfully');
            res.send('Form submitted successfully!');
        }
    });
});

const home2 = path.join(__dirname + '/index.html')
app.get('/',(req,res)=>{
    res.sendFile(home2)
})

app.listen(process.env.PORT || 2000,()=>{
    console.log("sucsess")
})



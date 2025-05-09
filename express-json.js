import dotenv from "dotenv";
import express from "express";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express(); // create express server app

// STARTING MIDDLEWARES
// app.use((req,res,next)=>{}) // custom middleware function
app.use(express.json()); // body from request  parse json to object

// ROUTES:
app.get('/hello', (req, res) => {
    const name = req.query.name || "Anonymous";
    res.type('text/plain; charset=utf-8').send(`Hello, ${name}!`);
})

app.post('/hello', (req, res) => {
    const {firstName, lastName} = req.body;
    if (!firstName || !lastName) {
        return res.status(400).type('text/plain;charset=utf-8').send('Invalid JSON');
    }
    res.type('text/plain; charset=utf-8').send(`Hello, ${firstName} ${lastName}!`);
})

app.post('/feed', (req, res) => {
    const {firstName, lastName} = req.body;
    if (!firstName || !lastName) {
        return res.status(400).type('text/plain;charset=utf-8').send('Invalid JSON');
    }
    const personFeed = {
        fullName: `${firstName} ${lastName}`,
        foods: ['Candies', 'Cookies', 'Cakes']
    }
    // res.status(200).type('application/json; charset=utf-8').send(JSON.stringify(personFeed));
    res.json(personFeed) // для json  можно сократить верхнюю запись до такой
})

// ENDING MIDDLEWARE
app.use((req, res) => {
    res.status(404).type('text/plain;charset=utf-8').send('Not Found');
})

// LISTENER
app.listen(port, () => {
    console.log(`Listening on port ${port}. Press CTRL+C to finish.`);
})
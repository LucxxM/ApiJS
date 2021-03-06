const express = require('express');
const app = express();

app.use(express.static('public'));

const events = [
    { 
        id: 1,
        name: 'Event 1',
        date: '2020-01-01',
        time: '12:00',
        location: 'Location 1',
        description: 'Description 1'
    },
    {
        id: 2,
        name: 'Event 2',
        date: '2020-01-02',
        time: '12:00',
        location: 'Location 2',
        description: 'Description 2'
    },
    {
        id: 3,
        name: 'Event 3',
        date: '2020-01-03',
        time: '12:00',
        location: 'Location 3',
        description: 'Description 3'
    }
];

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.get('/contact', (req, res) => {
//     res.send(`Contact me at: <a href="mailto:">luchio83@gmail.com
//     </a>`);    
// });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.get('/events/:id', (req, res) => {
    const event = events.find(event => event.id === parseInt(req.params.id));
    if (!event) {
        res.status(404).send({ message: 'Event not found' });
    }
    res.send(event);
});

app.post('/events', (req, res) => {
    const event = {
        id: events.length + 1,
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        description: req.body.description
        // ...req.body
    };
    events.push(event);
    res.status(200).send(event);
});

app.patch('/events/:id', (req, res) => {
    const event = events.find(event => event.id === parseInt(req.params.id));
    if (!event) {
        res.status(404).send({ message: 'Event not found' });
    }
    if(req.body.name) event.name = req.body.name;
    if(req.body.date) event.date = req.body.date;
    if(req.body.time) event.time = req.body.time;
    if(req.body.location) event.location = req.body.location;
    if(req.body.description) event.description = req.body.description;
    res.send(event);
});



app.listen(8000, () => {
    console.log('app listening on port:8000');
});


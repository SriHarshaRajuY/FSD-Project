const express = require('express');
const path = require('path');

const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, '/')));

// Define routes
app.get('/', (req, res) => {
    res.render('homepage'); // This will render indextest.ejs
});

app.get('/seeds', (req, res) => {
    res.render('seeds'); // This will render indextest.ejs
});

app.get('/register', (req, res) => {
    res.render('register'); // This will render indextest.ejs
});

app.get('/pots', (req, res) => {
    res.render('pots'); // This will render indextest.ejs
});

app.get('/plants', (req, res) => {
    res.render('plants'); // This will render indextest.ejs
});

app.get('/pebbles', (req, res) => {
    res.render('pebbles'); // This will render indextest.ejs
});
app.get('/tools', (req, res) => {
    res.render('tools'); // This will render indextest.ejs
});

app.get('/login', (req, res) => {
    res.render('login'); // This will render indextest.ejs
});

app.get('/fertilizers', (req, res) => {
    res.render('fertilizers'); // This will render indextest.ejs
});

app.get('/expert_support', (req, res) => {
    res.render('expert_support'); // This will render indextest.ejs
});

app.get('/seller', (req, res) => {
    res.render('seller'); // This will render indextest.ejs
});

app.get('/article1', (req, res) => {
    res.render('blogs/article1'); // This will render indextest.ejs
});

app.get('/article2', (req, res) => {
    res.render('blogs/article2'); // This will render indextest.ejs
});

app.get('/article3', (req, res) => {
    res.render('blogs/article3'); // This will render indextest.ejs
});

app.get('/article4', (req, res) => {
    res.render('blogs/article4'); // This will render indextest.ejs
});

app.get('/basics', (req, res) => {
    res.render('blogs/basics'); // This will render indextest.ejs
});

app.get('/blog', (req, res) => {
    res.render('blogs/blog'); // This will render indextest.ejs
});

app.get('/kitchen', (req, res) => {
    res.render('blogs/kitchen'); // This will render indextest.ejs
});

app.get('/maintenance', (req, res) => {
    res.render('blogs/maintenance'); // This will render indextest.ejs
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

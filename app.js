// server.js (or whatever you named your main file)
const express = require('express');
const path = require('path');
const users = require('./database.js');
const app = express();

// Middleware setup
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views')); // Added views directory specification
app.use(express.static(path.join(__dirname, '/'))); // Changed to public directory
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/seeds', (req, res) => {
    res.render('seeds');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/pots', (req, res) => {
    res.render('pots');
});

app.get('/plants', (req, res) => {
    res.render('plants');
});

app.get('/pebbles', (req, res) => {
    res.render('pebbles');
});

app.get('/tools', (req, res) => {
    res.render('tools');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/fertilizers', (req, res) => {
    res.render('fertilizers');
});

app.get('/expert_support', (req, res) => {
    res.render('expert_support');
});

app.get('/seller', (req, res) => {
    res.render('seller');
});

app.get('/article1', (req, res) => {
    res.render('blogs/article1');
});

app.get('/article2', (req, res) => {
    res.render('blogs/article2');
});

app.get('/article3', (req, res) => {
    res.render('blogs/article3');
});

app.get('/article4', (req, res) => {
    res.render('blogs/article4');
});

app.get('/basics', (req, res) => {
    res.render('blogs/basics');
});

app.get('/blog', (req, res) => {
    res.render('blogs/blog');
});

app.get('/kitchen', (req, res) => {
    res.render('blogs/kitchen');
});

app.get('/maintenance', (req, res) => {
    res.render('blogs/maintenance');
});

app.get('/admindashboard', (req, res) => {
    res.render('admindashboard');
});

app.get('/sellerdashboard', (req, res) => {
    res.render('sellerdashboard');
});

app.post('/login', (req, res) => {
    const { username, password, role } = req.body;
    
    console.log('Login attempt:', { username, role }); // For debugging
    
    // Find the user with matching credentials
    const user = users.find(user => 
        user.username === username && 
        user.password === password && 
        user.role === role
    );

    if (user) {
        console.log('User found:', user.role); // For debugging
        
        if (role === 'Seller') {
            return res.redirect('/sellerdashboard');
        } else if (role === 'Buyer') {
            return res.redirect('/'); // Redirect to homepage for buyers
        } else if (role === 'Admin') {
            return res.redirect('/admindashboard');
        }
    } else {
        console.log('Invalid login'); // For debugging
        return res.status(401).render('login', { error: 'Invalid username or password' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
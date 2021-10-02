const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();

app.use(express.json({ extended: false  }))

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
});
  
process.on('SIGINT', function () {
// this is only called on ctrl+c, not restart
    process.kill(process.pid, 'SIGINT');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Listening on port 3000...');
});
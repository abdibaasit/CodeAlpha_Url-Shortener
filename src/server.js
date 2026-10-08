require ('dotenv').config();

const app = require('./app');
const connectDatabase = require('./config/database');

const PORT = process.env.PORT || 4000;

const startServer = async()=>{
    await connectDatabase();

app.listen(PORT, ()=>{
    console.log(`URL Shortener API running on http://localhost:${PORT}`);
})
};

startServer();
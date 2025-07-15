const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const studentRoutes = require('./Routes/students_route');
const logRoutes = require('./Routes/logRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api', studentRoutes);
app.use('/api/logs', logRoutes);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

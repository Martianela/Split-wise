const express = require('express');
const userRoute = require('./routes/UserRoutes');
const authRoutes = require('./routes/authRoutes');
const { validateUser } = require('./middlewere/userValidation');
const groupRoutes = require('./routes/groupRoutes');
const expanseRouter = require('./routes/expanseRoute');
const transactionRoutes = require('./routes/transactionRoutes');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', validateUser, userRoute);
app.use('/api/group', validateUser, groupRoutes);
app.use('/api/expanse', validateUser, expanseRouter);
app.use('/api/transaction', validateUser, transactionRoutes);

module.exports = app;

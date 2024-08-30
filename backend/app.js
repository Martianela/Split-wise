const express = require('express');
const userRoute = require('./routes/UserRoutes');
const authRoutes = require('./routes/authRoutes');
const { validateUser } = require('./middlewere/userValidation');
const groupRoutes = require('./routes/groupRoutes');
const expanseRouter = require('./routes/expanseRoute');
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', validateUser, userRoute);
app.use('/api/group', groupRoutes);
app.use('/api/expanse', validateUser, expanseRouter);
module.exports = app;

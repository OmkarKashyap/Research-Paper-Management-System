const express = require('express');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', apiRoutes);

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

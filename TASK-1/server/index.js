const express = require('express');
const app = express();
const cors = require('cors');
const averageRoute = require('./routes/averageRoute');
const correlationRoute = require('./routes/correlationRoute');

app.use(cors());
app.use(express.json());

app.use('/stocks', averageRoute);
app.use('/stockcorrelation', correlationRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

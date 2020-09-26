const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const taskslist = require('./routes/api/tasklist');
app.use('/api/taskslist', taskslist);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(_dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendFile(_dirname + '/public/index.html'));
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

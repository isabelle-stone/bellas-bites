const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

// if anyone is reading this please know this is the one and only time I would put a connection string here (for hw assignment)
const uri = "mongodb+srv://admin:HFnaN0XAdnOZsU6d@cluster0.agwnq69.mongodb.net/?appName=Cluster0";

mongoose.connect(uri)
    .then(() => console.log('hiya mongodb'))
    .catch(err => console.error('NOOOOOooooooo ', err));

app.use(cors());

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: "hiiiii" });
});

app.get('/api/test', (req, res) => {
    res.json({ message: "byeeeeee", timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
    console.log(`AHHHHHHHHHHHHHHhhhhhh`);
});


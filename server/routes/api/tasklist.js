const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Tasks
router.get('/', async (req, res) => {
    const tasks = await loadTasksCollection();
    res.send(await tasks.find({}).toArray());
});

//Add Task
router.post('/', async (req, res) => {
    const tasks = await loadTasksCollection();
    await tasks.insertOne({
        task: req.body.task,
        dateCreated: req.body.dateCreated
    });
    res.status(201).send();
});

//Delete Task
router.delete('/:id', async (req, res) => {
    const tasks = await loadTasksCollection();
    await tasks.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadTasksCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://Senrith:1234@senrith.czumf.gcp.mongodb.net/my_tasklist?retryWrites=true&w=majority', {useNewUrlParser: true});
    return client.db('my_tasklist').collection('mytasks');
}

module.exports = router;
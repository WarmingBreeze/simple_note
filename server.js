require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

//DataBase
const mongo_Key = process.env.MONGO_KEY;
mongoose.connect(`mongodb+srv://admin-shawn:${mongo_Key}@cluster0.incuboj.mongodb.net/webnoteDB`);

const noteSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Note = mongoose.model('Note', noteSchema);

//Dealing with requests
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.options('*', cors());
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.get('/allNotes', function(req,res) {
    const queryResult = Note.find({}, function(err, docs){
        if (!err){
            res.send(docs);
        } else {
            console.log(err);
        }
    });
});

app.post('/writeNote', function(req, res) {
    req.on('data', function(data){
        const newItem = JSON.parse(data);
        const {newNote} = newItem;
        const addNewItem = new Note(newNote);
        addNewItem.save();
        res.send(addNewItem.id);
    });
});

app.post('/delete', function(req,res){
    req.on('data', function(data) {
        const target = JSON.parse(data);
        const {sn} = target;
        Note.findByIdAndDelete(sn, function(err, docs){
            if (!err) {
                res.send(docs.id);
            } else {
                console.log(err);
            }
        });
    });
    
});

app.listen(9000, () => console.log('Server starts on port 9000.'));






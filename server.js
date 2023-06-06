const express = require('express');
const http = require('http')
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Person = require('./personModel');

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/get/all/', async(req, res) => {
    try{
        res.send(await Person.find({}))
    }catch(error){
        res.status(500).json({message: error})
    }
})

app.get('/get/:id/', async(req, res) => {
    try{
        const {id} = req.params
        res.send(await Person.findById(id))
    }catch(error){
        res.status(500).json({message: error})
    }
})

app.put('/put/:id/', async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Person.findByIdAndUpdate(id, req.body);
    if (check) {
      res.status(200).json(await Person.findById(id));
    } else {
      res.status(404).json({ message: "Can not find the person with id " + id });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.delete('/delete/:id/', async (req, res) => {
    try {
      const { id } = req.params;
      const check = await Person.findByIdAndDelete(id, req.body);
      if (check) {
        res.status(200).json(check);
      } else {
        res.status(404).json({ message: "Can not find the person with id " + id });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });

app.post('/post', async(req, res) => {
    try{
        const p = await Person.create(req.body)
        res.status(201).json(p);
    }catch(error){
        res.status(500);
    }
})


mongoose
.connect('mongodb+srv://admin:admin123@cluster0.4ks8hma.mongodb.net/')
.then(() => {
    console.log("MongoDb is connected");
    app.listen(3000, () => {console.log("Server is working")});
})
.catch((error) => {
    console.log(error)
})


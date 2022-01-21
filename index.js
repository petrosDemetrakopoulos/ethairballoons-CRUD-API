const ethAirBalloons = require('ethairballoons');
const path = require('path');
const savePath = path.resolve(__dirname + '/contracts');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.json())

const ethAirBalloonsProvider = ethAirBalloons('http://localhost:8545', savePath); 

const Car = ethAirBalloonsProvider.createSchema({
        name: "Car",
        contractName: "carsContract",
        properties: [
            {
                name: "model",
                type: "bytes32",
                primaryKey: true
            },
            {
                name: "engine",
                type: "bytes32",
            },
            {   name: "cylinders",
                type: "uint"
            }
        ]
    });

app.get('/', (req, res) => {
  res.send('EthairBalloons CRUD API!')
})

app.get('/deploy', (req, res) => {
    Car.deploy(function (err, success) {
        if (!err) {
            res.send("Contract deployed successfully!")
        } else {
            res.send("Contract deployment error" + err)
    }
  })
})

app.post('/create', (req,res) => {
    const newCarObject = req.body;
    Car.save(newCarObject, function (err, objectSaved) {
        if (!err) {
            res.json(objectSaved);
        } else {
            res.send(err)
        }
});
})

app.patch('/update/:id', (req,res) => {
    const newCarObject = req.body;
    Car.updateById(req.params.id, newCarObject, function (err, objectSaved) {
        if (!err) {
            res.json(objectSaved);
        } else {
            res.send(err)
        }
});
})

app.get('/find', (req,res) => {
    Car.find(function (err, allObjects) {
        if (!err) {
            res.json(allObjects);
        } else {
            res.send(err)
        }
});
})

app.get('/find/:id', (req,res) => {
    Car.findById(req.params.id, function (err, found) {
        if (!err) {
            res.json(found);
        } else {
            res.send(err)
        }
});
})

app.delete('/delete/:id', (req,res) => {
    Car.deleteById(req.params.id, function (err, found) {
        if (!err) {
            res.json({message: "Object deleted successfully"});
        } else {
            res.send(err)
        }
});
})


app.listen(port, () => {
  console.log(`EthairBalloons API listening at http://localhost:${port}`)
})
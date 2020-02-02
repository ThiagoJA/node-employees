var express = require('express');
const app = express();
var _ = require('lodash');

var fs = require('fs');

app.use(express.json());
let port = process.env.PORT || 8080
app.listen(port)

app.get('/employees', (req, res) => {
  fs.readFile('./src/employees.json', 'utf8', (err, data) => {
    if(err) {
      res.json(err)
    }
    let emp = JSON.parse(data)
    res.json(emp)
});
})

app.post('/employees', (req, res) => {
  fs.readFile("./src/employees.json", 'utf8', (err, data) => {
    if(err) {
      res.json(err)
    }
    let emp = JSON.parse(data)
    let employee = {
      "firstName":req.body.firstName,
      "lastName":req.body.lastName,
      "participation":Number(req.body.participation)
    }

    emp.employees.push(employee)
    fs.writeFile("./src/employees.json", JSON.stringify(emp), err => {
      if (err) {
        res.json(err)
      }
      res.json("Success")
    })
  })
});

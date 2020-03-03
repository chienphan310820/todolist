var express = require('express');
var router = express.Router();
var db = require("../DB/connectDB")
var path = require("path")


router.get('/user/count', function (req, res, next) {
  db.estimatedDocumentCount()
    .exec()
    .then(function (data) {
      res.json(data)
    })
})

router.get('/user', function (req, res, next) {
  var page = parseInt(req.query.page)
  var start = (page - 1) * 3
  db.find()
    .skip(start)
    .limit(3)
    .exec()
    .then(function (data) {
      res.json(data)
    })
});

//midleware
router.delete('/user/delete', function (req, res, next) {
  db.deleteOne({ _id: req.body.id }).then(function () {
    res.json("success")
  })
})

router.post('/user/add', function (req, res, next) {
  console.log(req.body);
  db.create({
    name: req.body.Name,
    avatar: req.body.Avatar
  }).then(function () {
    res.redirect('/')
  })
})

router.put('/user/update/:id', function(req, res, next){
  let id= req.params.id
  let name= req.body.name
  db.updateOne({
    _id: id,
  },{
    name: name
  }).then(function(){
    res.json("success")
  })
})
module.exports = router;

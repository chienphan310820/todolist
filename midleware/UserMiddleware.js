var jwt = require("jsonwebtoken");

function checkData(req, res, next) {
    //token laays tiwf client guiwr leen server 
    console.log(req.headers.cookie.split("=")[1]);
    var token = req.cookies.token || req.body.token;
    if (token) {
        var baomat = jwt.verify(token, "chienphan",function (err, data) {
            if(err){
                res.json("token FAKE")
            }
            res.data= data;
        });
        // gui sang server để server đọc 
        res.locals = baomat
        next()
    } else {
        res.json('sai thong tin')
    }
}


module.exports = { 
    checkData : checkData,
 }
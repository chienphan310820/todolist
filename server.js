var express = require("express")
var server = express();
var path = require("path")
var UserModel = require("./config/connectDB.js")
var jwt = require('jsonwebtoken')
var UserMiddleware = require('./midleware/UserMiddleware')  /*middleware  */
var cookieParser = require('cookie-parser')  /*cookie paser  */
const bcrypt = require('bcrypt');  /*mã hóa mật khẩu  */
const saltRounds = 10; /*số lần băm (hash)  */
server.use('/public', express.static(path.join(__dirname, './views')))
server.use('/public', express.static(path.join(__dirname, './public')))
server.use(cookieParser())

server.use(express.urlencoded());

server.get("/api1", UserMiddleware.checkData, function (req, res, next) {
    res.json('get data ok')
})

server.get("/", UserMiddleware.checkData, function (req, res, next) {
    res.sendFile(path.join(__dirname, "./public/home.html"))
})
server.get("/signup", function (req, res, next) {
    res.sendFile(path.join(__dirname, "./views/signup.html"))
})
server.get("/signin", function (req, res, next) {
    res.sendFile(path.join(__dirname, "./views/signin.html"))
})

// let token= jwt.sign({       })
server.get("/home1", UserMiddleware.checkData, function(req,res, next){
    res.sendFile(path.join(__dirname,"./public/index.html"))
})
server.post("/signup", function (req, res, next) {
    // let name= req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    /*mã hóa mật khẩu  */
    bcrypt.hash(password, saltRounds, function (err, hash) {
        UserModel.create({
            email: email,
            password: hash
        }).then(function () {
            res.json("success")
        });

    });
});
server.post('/signin', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    UserModel.find({
        email: email,
        // password: password
    }).then(function (data) {
        if (data.length === 0) {
            res.json("tk, mk khong dung")
        }
        // lấy lại mật khẩu khi mã hóa bằng bcrypt
        bcrypt.compare(password, data[0].password, function (err, value) {
            // console.log(value);

            if (err) {
                // console.log(err);
            }
            if (value) {
                // console.log(value);
                let token = jwt.sign({ email: data[0].email }, "chienphan", { expiresIn: "1d" })
              return res.json(token)

            }
            // res == true
            res.json(" lại sai mật khẩu r (FAKE À)")
        });
        console.log(value);
        //  phân quyền người dùng

        // else if (data[0].type === "1") {
        //     res.json('nguoi')
        // } else if (data[0].type === "3") {
        //     res.json('admin')
        // }
    });

})

server.get("/token", UserMiddleware.checkData, function (req, res, next) {
    res.json(res.data)
})



server.listen(3000, function () {
    console.log("success");
})
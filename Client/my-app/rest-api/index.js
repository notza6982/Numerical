var express = require('express');
var app = express();
var fs = require("fs"); // read user.json 
var cors = require('cors');
app.use(cors());
const mongoose = require('mongoose')
//const Product = require('./models/product')
app.use(express.json())

mongoose.connect('mongodb+srv://not:1234@cluster0-ptdr8.mongodb.net/testcase');
var Schema = mongoose.Schema;

var mySchema = mongoose.Schema({
	key : String,
	fx : String,
	xl : Number,
	xr : Number,
});

var MyModel = mongoose.model('MyModel', mySchema, 'rootofequation');
console.log('connect')
// ดึงข้อมูลมาทั้งหมด
app.get('/1', function (req, res, next) {
    var obj = [{ name: 1, fx: 'x+1' }]
    console.log(obj);
	res.json(obj);
});

app.get('/bisection', function (req, res, next) {
	MyModel.find({ key: 'bisection' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});
app.get('/falseposition', function (req, res, next) {
	MyModel.find({ key: 'falseposition' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});
app.get('/newthon', function (req, res, next) {
	MyModel.find({ key: 'newthon' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});
app.get('/secant', function (req, res, next) {
	MyModel.find({ key: 'secant' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});
app.get('/onepoint', function (req, res, next) {
	MyModel.find({ key: 'onepoint' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});






/*router.get('/getUsers',function (req,res){
    data = MyModel.find({ name : 'Bisection'} ,function (err, docs) {
		console.log(docs)
		res.json(docs)
	});
    //console.log(data);
    //res.end(data);
});*/
/*
// ดึงข้อมูลแบบมีเงื่อนไข
app.get('/getUsers/:id',function (req,res){
    fs.readFile( __dirname + "/" + "user.json", 'utf8' , function (err, data){
    var users = JSON.parse(data); //แปลงข้อมูลให้เป็นก้อน
    var user = users["user" + req.params.id]; //เพิ่มเงื่อนไข
    console.log(user);
    res.end(JSON.stringify(user));
    });
});
app.delete('/delUsers/:index',function (req,res){
    fs.readFile( __dirname + "/" + "user.json", 'utf8' , function (err, data){
    data = JSON.parse(data);
    delete data["user" + req.params.index];
    console.log(data);
    res.end(JSON.stringify(data));
    });
});
var user = {
    "user3" : {
        "name" : "not3",
        "password" : "1234",
        "occupation" : "student",
        "id" : 3
    }
}
app.post('/addUser',function (req,res){
    fs.readFile( __dirname + "/" + "user.json", 'utf8' , function (err, data){
    data = JSON.parse(data); 
    data["user3"] = user["user3"]; //เพิ่มข้อมูลใหม่ต่อข้อมูลเดิม
    console.log(data);
    res.end(JSON.stringify(data));
    });
});*/
var server = app.listen(4000, function (){
    var host = server.address().address
    var port = server.address().port
    console.log("Application Run At http://%s:%s",host,port)
})
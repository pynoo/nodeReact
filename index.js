const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const config = require('./config/key');
const { User } = require("./models/User");

// applicaion/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// applicaion/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
    // 회원가입할때 필요한 정보들을 client에서 가져오면
    // db에 넣는다
    const user = new User(req.body);

    user.save((err, userinfo) =>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
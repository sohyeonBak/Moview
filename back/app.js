const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet =require('helmet')
const hpp =require('hpp')

const cardRouter = require('./routes/card');
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();

db.sequelize.sync()
.then(() => {
    console.log('db success!')
})
.catch(console.error);

passportConfig();

if(process.env.NODE_ENV === 'production'){
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet());
}else{
    app.use(morgan('dev'));   
}
app.use(cors({
    origin: ['http://localhost:3060', 'http://fromtulip.com'],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: process.env.NODE_ENV === 'production' && '.fromtulip.com'
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('hello express');
  });

app.use('/card', cardRouter);
app.use('/cards', cardsRouter);
app.use('/user', userRouter);

app.listen(80, () => {
    console.log('서버 실행 중')
})

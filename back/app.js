const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')

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

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('hello express');
  });

app.use('/card', cardRouter);
app.use('/cards', cardsRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
    console.log('서버 실행 중')
})

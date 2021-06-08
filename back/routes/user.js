const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Card } = require('../models');
const router = express.Router();


router.get('/', async (req, res, next) => {
  try{
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Card,
          order: [['createdAt','DESC']],
          attributes: ['id', 'title', 'content'],
        }]
      })
      console.log(fullUserWithoutPassword)
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  }catch (error){
    console.error(error);
    next(error)
  }
})

router.post('/', async (req, res, next) => {
    try {
        const exUser = await User.findOne({
          where: {
            email: req.body.email,
          }
        });
        if (exUser) {
          return res.status(403).send('이미 사용 중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
          email: req.body.email,
          nickname: req.body.nickname,
          password: hashedPassword,
        });
        res.status(201).send('ok');
      } catch (error) {
        console.error(error);
        next(error); // status 500
      }
});


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Card,
          attributes: ['id', 'title', 'content'],
          
        }]
      })
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});


router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).send('ok');
});


router.patch('/nickname', async (req, res, next) => {
  try{
    await User.update({
      nickname : req.body.nickname
    },{
      where: {id: req.user.id}
    })
    console.log(req.body.nickname)
    res.status(200).json({ nickname: req.body.nickname })
  } catch(error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;
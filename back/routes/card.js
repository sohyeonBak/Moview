const express = require('express');
const { Card, User, Comment, Image } = require('../models');
// const {isLoggedIn} =require('./middlewares');

const router = express.Router()


router.get('/:cardId', async (req, res, next) => {
    try{
        const card = await Card.findOne({
            where: { id: req.params.cardId },
          });
          if (!card) {
            return res.status(404).send('존재하지 않는 게시글입니다.');
          }
        const fullCard = await Card.findOne({
            where: {id : card.id},
            include: [{
                model: User,
                attributes: ['id', 'nickname']
            },{
                model: User,
                as: 'Likers',
                attributes:['id']
            },{
                model: User,
                as: 'UnLikers',
                attributes:['id']
            },{
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                    order: [['createdAt','DESC']]
                }]
            }]
        })
        console.log(fullCard)
        res.status(201).json(fullCard)
    }catch(error) {
        console.error(error);
        next(error);
    }
})


router.post('/', async (req, res, next) => {
    try {
        const card = await Card.create({
            content: req.body.content,
            title: req.body.title,
            star: req.body.star,
            UserId :req.body.User.id
        })
        const cardContent = await Card.findOne({
            where: {id : card.id},
            attributes: {
                exclude: ['createdAt', 'updatedAt']
              },
            include: [{
                model: User,
                attributes: ['id', 'nickname']
            },{
                model: Comment,
                include : [{
                    model: User,
                    attributes: ['id', 'nickname']
                }]
            }]
        })
        
        res.status(201).json(cardContent);
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:cardId', async (req, res, next) => {
    try{
        await Card.destroy({
            where: {
                id: req.params.cardId,
                UserId: req.user.id
            }
        })
        res.json({CardId: req.params.cardId,})
    }catch(error) {
        console.error(error);
        next(error)
    }
})

router.post('/:cardId/comment', async (req, res, next) => {
    try{
        const card = await Card.findOne({
            where: { id: req.params.cardId}
        })
        if(!card) {
            return res.status(403).send('존재하지 않는 게시물입니다.')
        }
        const comment = await Comment.create({
            content: req.body.content,
            CardId: parseInt(req.params.cardId, 10),
            UserId: req.body.User.id
        })
        const CardComment = await Comment.findOne({
            where: {id: comment.id},
            include : [{
                model: User,
                attributes: ['id', 'nickname']
            }]
        })
        
        res.status(201).json(CardComment)
    } catch(error) {
        console.error(error);
        next(error);
    }
})

router.patch('/:cardId/agree', async (req, res, next) => {
    try{
        const card = await Card.findOne({
            where: { id: req.params.cardId}
        })
        if(!card) {
            return res.status(403).send('존재하지 않는 게시물입니다.')
        }
        
        await card.addLikers(req.user.id)
        await card.removeUnLikers(req.user.id)
        res.json({CardId: card.id, UserId: req.user.id})
    } catch(error) {
        console.error(error);
        next(error);
    }
})

router.delete('/:cardId/agree', async (req, res, next) => {
    try{
        const card = await Card.findOne({
            where: { id: req.params.cardId}
        })
        if(!card) {
            return res.status(403).send('존재하지 않는 게시물입니다.')
        }
        await card.removeLikers(req.user.id)
        res.json({CardId: card.id, UserId: req.user.id})
    } catch(error) {
        console.error(error);
        next(error);
    }
})

router.patch('/:cardId/disagree', async (req, res, next) => {
    try{
        const card = await Card.findOne({
            where: { id: req.params.cardId}
        })
        if(!card) {
            return res.status(403).send('존재하지 않는 게시물입니다.')
        }
        await card.addUnLikers(req.user.id)
        await card.removeLikers(req.user.id)
        res.json({CardId: card.id, UserId: req.user.id})
    } catch(error) {
        console.error(error);
        next(error);
    }
})

router.delete('/:cardId/disagree', async (req, res, next) => {
    try{
        const card = await Card.findOne({
            where: { id: req.params.cardId}
        })
        if(!card) {
            return res.status(403).send('존재하지 않는 게시물입니다.')
        }
        console.log(card)
        await card.removeUnLikers(req.user.id)
        res.json({CardId: card.id, UserId: req.user.id})
    } catch(error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;
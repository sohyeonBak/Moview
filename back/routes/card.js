const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const { Card, User, Comment, Image } = require('../models');
const {isLoggedIn} =require('./middlewares');

const router = express.Router()

try{
    fs.accessSync('uploads');
}catch (error) {
    console.log('uploads폴더가 없음으로 생성합니다.');
    fs.mkdirSync('uploads');
}

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2'
})

const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'moview-s3',
        key(req, file, cb){
            cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`)
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
})

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const card = await Card.create({
            content: req.body.content,
            title: req.body.title,
            star: req.body.star,
            UserId :req.user.id
        })
        if(req.body.image){
            const image = await Image.create({ src: req.body.image });
            await card.addImages(image)
        }
        const cardContent = await Card.findOne({
            where: {id : card.id},
            attributes: {
                exclude: ['createdAt', 'updatedAt']
              },
            include: [{
                model: Image,
            },{
                model: User,
                attributes: ['id', 'nickname']
            },{
                model: Comment,
                include : [{
                    model: User,
                    attributes: ['id', 'nickname']
                }]
            },{
                model: User,
                as: 'Likers',
                attributes: ['id']
            },{
                model: User,
                as: 'UnLikers',
                attributes: ['id']
            }]
        })
        
        res.status(201).json(cardContent);
    } catch(error) {
        console.error(error);
        next(error);
    }
});


router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
    console.log(req.files);
    res.json(req.files.map((v) => v.location))
})

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

router.post('/:cardId/comment', isLoggedIn, async (req, res, next) => {
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
            UserId: req.user.id
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

router.delete('/:cardId', isLoggedIn, async (req, res, next) => {
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

module.exports = router;
const express = require('express');
const { Op } = require('sequelize');
const { Card, User, Comment} = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const where = {}
        if(parseInt(req.query.lastId, 10)){
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
        }
        const cards = await Card.findAll({
            where,
            limit: 10,
            order: [['createdAt', 'DESC']],
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
        res.status(201).json(cards)
    }catch(error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;
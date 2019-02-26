var express = require('express');
var router = express.Router();

import { 
    getUsersInfo,
    createUser,
    removeUser,
    userSignIn
} from '../bin/logic/gifts/users'

import { 
    giveUserGift,
    removeGiftRecord,
    getUerGifts,
} from '../bin/logic/gifts/userGifts'

router.get('/users', (req, res, next) => {
    getUsersInfo(req, res);
    //res.send('test hello');
});

//获取用户礼包列表
router.get('/userGifts', (req, res, next) => {
    getUerGifts(req, res);
});

router.post('/addUsers', (req, res, next) => {
    //res.send('test hello');
    createUser(req, res);
});

router.post('/removeUser', (req, res, next) => {
    removeUser(req, res);
});

router.post('/giveUserGift', (req, res, next) => {
    removeUser(req, res);
});

router.post('/removeUserGift', (req, res, next) => {
    removeUser(req, res);
});

//给用户发礼包
router.post('/addGift', (req, res, next) => {
    giveUserGift(req, res);
});

router.post('/removeGiftRecord', (req, res, next) => {
    removeGiftRecord(req, res);
});

router.post('/userSignIn', (req, res, next) => {
    userSignIn(req, res);
});


module.exports = router;
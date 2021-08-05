const mongoose = require('mongoose');
const userService = require('../service/users.service');



const isAdmin = async (req, res, next) => {
    try {

        if (req.user && req.user.role === 'admin') {
            return next()
        }
        return res.sendStatus(401);

    } catch (err) {
        console.log('validation:isAuth err', err.message);
        throw err;

    }
}

const isClient = async (req, res, next) => {
    try {

        if (req.user && req.user.role === 'client') {
            return next()
        }
        return res.status(401).json;

    } catch (err) {
        console.log('validation:isClient err', err.message);
        throw err;


    }
}



module.exports = { isAdmin, isClient };
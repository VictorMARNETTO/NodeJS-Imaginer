const User = require('../database/models/User')

module.exports = (req, res, next) => {

    // Connecte toi dans la Database

    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            return res.redirect('/user/login')
        }
        next()
    })

    // Verifie l'user

    // Si il est dans la Database 

    // Sinon tu de redirige
}
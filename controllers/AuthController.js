const User = require("../models/User");
const bcrypt = require('bcryptjs');

module.exports = class AuthController {
    static async login(req, res) {
        res.render('auth/login');
    }

    static async register(req, res) {
        res.render('auth/register');
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmPassword } = req.body

        // password match validation
        if (password != confirmPassword) {
            req.flash('message', 'Passwords not equals!');
            res.render('auth/register');
            return;
        }

        
    }
}
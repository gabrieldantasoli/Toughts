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

        // check if user exists
        const checkIfUserExists = await User.findOne({ where: {email: email} });

        if (checkIfUserExists) {
            req.flash('message', 'E-mail already exists!');
            res.render('auth/register');
            return;
        }

        // create a password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createUser = await User.create(user);

            // Initialize session
            req.session.userid = createUser.id;

            req.flash('message', 'User Registered!')

            req.session.save(() => {
                res.redirect('/');
            });
            
        }catch (err) {
            console.log(err);
        }
    }
}
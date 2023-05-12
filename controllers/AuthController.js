const User = require("../models/User");
const bcrypt = require('bcryptjs');

module.exports = class AuthController {
    static async login(req, res) {
        res.render('auth/login');
    }

    static async loginPost(req, res) {
        const {email, password} = req.body;

        // find user
        const user = await User.findOne({wher: {email: email}});

        if (!user) {
            req.flash('message', 'User not Found"!');
            res.render('auth/login');
            return;
        }
        //check if password match
        const passwordMatch = bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            req.flash('message', 'Incorrect password!');
            res.render('auth/login');
            return;
        }

        req.session.userid = user.id;

        req.flash('message', 'Autenticação realixada com sucesso!');

        req.session.save(() => {
            res.redirect('/');
        })
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

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/auth/login');
    }

}
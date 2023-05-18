const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtController {
    static async showToughts(req, res) {
        res.render('toughts/home');
    }

    static async dashboard(req, res) {
        const userId1 = req.session.userid;
        const user = await User.findOne(
            { 
                where: {id: userId1},
                include: Tought,
                plain: true,
            }
        );

        // Check if user exists
        if (!user) {
            res.redirect('/login');
        }

        const toughts = user.Toughts.map((result) => result.dataValues);

        let emptyToughts = (toughts.length == 0);
        console.log(emptyToughts);

        res.render('toughts/dashboard', { toughts , emptyToughts });
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtSave(req, res) {
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }


        await Tought.create(tought);

        try {
            req.flash('message', 'Pensamento criado com sucesso!');

            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async removeToughtSave(req, res) {
        const id = req.body.id;
        const UserId = req.session.userid;

        try {
            await Tought.destroy({where: {id:id, UserId: UserId}});

            req.flash('message', 'Pensamento removido com sucesso!');

            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            })
        } catch (error) {
            console.log('Aconteceu um erro:' + error);
        }
    }
}
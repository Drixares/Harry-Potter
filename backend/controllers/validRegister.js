import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { myPool } from '../database.js';
import session from 'express-session';

const validRegister = (req, res) => {

    const regExUser = /^\S/
    const regExPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-])/;

    if (validator.isEmail(req.body.email) && regExPassword.test(req.body.password) && regExUser.test(req.body.user)){
        
        const values = [
            uuidv4(),
            req.body.user,
            req.body.email,
            bcryptjs.hashSync(req.body.password, 10)
        ]

        myPool.query('SELECT * FROM user WHERE email = ?', req.body.email, (err, data) => {
            if (err) throw err;

            if (data.length === 0) {
                const q = `INSERT INTO user (idUser, username, email, password) VALUES (?, ?, ?, ?);`
        
                myPool.query(q, [...values], (err, data) => {
                    if (err) throw err;
                    req.session.userId = values[0];
                    res.redirect("/user/dashboard")
                })

            } else {
                res.status(400).json({message: "Un compte existe déjà avec cette adresse mail."})
            }
        })

    } else {
        res.status(400).json({message: "Les informations saisies ne sont pas valides. Veuillez réessayer."})
    }

}


export default validRegister;

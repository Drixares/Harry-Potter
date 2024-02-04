import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { myPool } from '../database.js';

const validRegister = (req, res) => {

    if (validator.isEmail(req.body.email)) {
        
        const values = [
            uuidv4(),
            req.body.user,
            req.body.email,
            req.body.password,
        ]

        myPool.query('SELECT * FROM user WHERE email = ?', req.body.email, (err, data) => {
            if (err) throw err;

            if (data.length === 0) {
                const q = `INSERT INTO user (idUser, username, email, password) VALUES (?, ?, ?, ?);`
        
                myPool.query(q, [...values], (err, data) => {
                    if (err) throw err;
                    res.redirect("/user/dashboard")
                })

            } else {
                res.status(400).json({message: "Un compte existe déjà avec cette adresse mail."})
            }
        })

    } else {
        res.status(400).json({message: "L'email est invalide."})
    }

}


export default validRegister;

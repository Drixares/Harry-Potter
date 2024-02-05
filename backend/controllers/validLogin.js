import bcryptjs from 'bcryptjs';
import validator from 'validator';
import { myPool } from '../database.js';

const validLogin = (req, res) => {

    if (validator.isEmail(req.body.email)) {
        const q = `SELECT * FROM user WHERE email = ?;`

        const values = [
            req.body.email,
            req.body.password,
        ]
        
        myPool.query(q, [...values], (err, data) => {
            if (err) throw err
            
            if (data.length === 0) {
                return res.status(400).json({message: "Identifiants incorrects."})
            } else {

                bcryptjs.compare(req.body.password, data[0].password, (err, result) => {
                    if (err) throw err;

                    if (result) {
                        req.session.userId = data[0].idUser;
                        res.redirect("/user/dashboard");
                    } else {
                        res.json({message: "Identifiants incorrects."})
                    }
                })
            }
        })

    } else {
        res.json({message: "Identifiants incorrects."})
    }
}

export default validLogin;
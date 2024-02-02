import validator from 'validator';
import { myPool } from '../database.js';

const validLogin = (req, res) => {

    if (validator.isEmail(req.body.email)) {
        const q = `SELECT * FROM user WHERE email = ? AND password = ? ;`

        const values = [
            req.body.email,
            req.body.password,
        ]
        
        myPool.query(q, [...values], (err, data) => {
            if (err) throw err
            
            if (data.length === 0) {
                return res.status(400).json({message: "Identifiant invalide."})
            } else {
                return res.status(201).json({message: "Trouvé !", data: data})    
            }
        })

    } else {
        res.json({message: "L'email est invalide."})
    }
}

export default validLogin;
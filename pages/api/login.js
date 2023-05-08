import User from '../../models/User';
import connectDB from '../../middleware/mongoose';
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body);

        let user = await User.findOne({ "email": req.body.email });

        let bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
        console.log(bytes);

        let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (user) {
            if (req.body.email === user.email && req.body.password === decryptedPassword) {
                let token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, {expiresIn: '2d'});
                res.status(200).json({ success: true, token, email: user.email });
            }
            else {
                res.status(404).json({ success: false, error: "You have entered an invalid credentials !" });
            }
        }
        else {
            res.status(404).json({ success: false, error: "The user does not exist !" });
        }
    }
    else {
        res.status(400).json({ error: 'This method is not allowed !' });
    }
}

export default connectDB(handler);
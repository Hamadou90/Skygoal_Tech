import User from '../../models/User';
import connectDB from '../../middleware/mongoose';
import jwt from 'jsonwebtoken';
import cryptoJS from 'crypto-js';

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token;
        let user = jwt.verify(token, process.env.JWT_SECRET);
        
        let dbUser = await User.findOne({ email: user.email });

        const bytes = cryptoJS.AES.decrypt(dbUser.password, process.env.AES_SECRET);
        let decryptedPassword = bytes.toString(cryptoJS.enc.Utf8);

        if ((decryptedPassword == req.body.password) && (req.body.npassword == req.body.cnpassword)) {
            let dbUserUpdation = await User.findOneAndUpdate({ email: dbUser.email }, { password: cryptoJS.AES.encrypt(req.body.npassword, process.env.AES_SECRET).toString() });

            res.status(200).json({ success: true });
            return ;
        }
        res.status(200).json({ success: false, error: "User not Found !" });
    }
    else {
        res.status(400).json({ error: "Error Request method !" });
    }
}

export default connectDB(handler);

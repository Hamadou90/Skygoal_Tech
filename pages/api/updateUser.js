import User from '../../models/User';
import connectDB from '../../middleware/mongoose';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token;
        let user = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(user);
        let dbUser = await User.findOneAndUpdate({ email: user.email }, { name: req.body.name, address: req.body.address, pincode: req.body.pincode, phone: req.body.phone });
        // console.log(dbUser);

        res.status(200).json({ success: true });
    }
    else {
        res.status(400).json({ error: "User not Found !!!" });
    }
}

export default connectDB(handler);

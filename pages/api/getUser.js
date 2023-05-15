import User from '../../models/User';
import connectDB from '../../middleware/mongoose';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token;
        let user = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(user);
        let dbUser = await User.findOne({ email: user.email });
        // console.log(dbUser);

        const { name, email, address, pincode, phone } = dbUser;

        res.status(200).json({ name, email, address, pincode, phone });
    }
    else {
        res.status(400).json({ error: "User not Found !!!" });
    }
}

export default connectDB(handler);
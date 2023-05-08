import Forgot from "../../models/Forgot";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.body.sendMail) {
    let token = `13sdqfretyhbvccvgvcbgnfjjrgfvfvdvgf324356gbfvrgthy`;
    let forgot = new Forgot({
      email: req.body.email,
      token: token
    });
    let email = `We have sent you this email in response to your request to reset your password on Skygoal Tech 
  
      To reset your password plaese follow the link below:
      <a href="${`http://localhost:3000/forgot?token=${token}`}">Click here to reset your password</a>
      
      <br /> <br />

      We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your "My Account" page and change it.

      <br /> <br />`;
  }
  else {
    
  }

  res.status(200).json({ success: true })
}

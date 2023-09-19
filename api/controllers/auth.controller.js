import User from '../models/user.model.js';
import  bcryptjs  from 'bcryptjs';


export const signup =  async (req, res) => {
    const { username, email, password } = req.body; 

    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);

    const newUser = new User({ username, email, password: hashedPassword })

    try {
        await newUser.save()
    res.status(201).json({ message: "User created successfully" });

    } catch (error) {
       res.status(500).json(error.message) 
    }
    
}








// import User from '../models/user.model.js';
// import  bcryptjs  from 'bcryptjs';
// import { errorHandler } from '../utils/error.js';
// import jwt from 'jsonwebtoken';

// export const signup = async (req, res, next) => {
//     try {
//         const { username, email, password } = req.body;

//         const saltRounds = 10;
//         const hashedPassword = await bcryptjs.hash(password, saltRounds);

//         const newUser = new User({username, email, password: hashedPassword});
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         next(error);
//     }
    
// };


// export const signing = async (req, res, next) => {
//     const {email, password} = req.body;
//     try {
//        const validUser = await User.findOne({ email }); 
//        if (!validUser) return next(errorHandler(404, 'User not found '));
//        const validPassword = bcryptjs.compareSync(password, validUser.password);
//        if (!validPassword) return next(errorHandler(401, 'Invalid credentials'));
//        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
//        const {password: hashedPassword, ...rest} = validUser._doc;
//        const expiryData = new Date(Date.now() + 3600000); 
//        res
//        .cookie('access_token', token,  {httpOnly: true, expires: expiryData})
//        .status(200)
//        .json(rest);
//     } catch (error) {
//         next(error);
//     }
// };
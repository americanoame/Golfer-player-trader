import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcryptjs.hash(password, saltRounds);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const signing = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found '));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Invalid credentials'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const {password: hashedPassword, ...rest} = validUser._doc;
    const expiryData = new Date(Date.now() + 3600000); 
    res.cookie('access_token', token, { httpOnly: true, expires: expiryData}).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// this is the third part

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
 

    
      const generatedPassword =
        Math.random().toString(36).slice(-8) +  // It generates a random password for the new user
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10); //function takes the generated password and a salt round (in this case, 10) to generate a hashed password.
       
          const newUser = new User({

       
         // The username property is generated based on the user's name. It removes spaces, converts the name 
         // to lowercase, and appends a random string to ensure uniqueness.

        username: 
        req.body.name.split(' ').join('').toLowerCase() +
        Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);

    }
  } catch (error) {
    next(error);
  }
};




















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
//        c
//     } catch (error) {
//         next(error);
//     }
// };

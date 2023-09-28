import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
// import transporter from '../email.js';

import { sendMail } from '../email.js';


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
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryData = new Date(Date.now() + 3600000);
    res.cookie('access_token', token, { httpOnly: true, expires: expiryData }).status(200).json(rest);
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
        Math.random().toString(36).slice(-8) + // It generates a random password for the new user
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10); //function takes the generated password and a salt round (in this case, 10) to generate a hashed password.

      const newUser = new User({
        // The username property is generated based on the user's name. It removes spaces, converts the name
        // to lowercase, and appends a random string to ensure uniqueness.

        username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });

      await newUser.save();
      console.log('User created successfully (Google Auth):', newUser);

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
    console.error('Error during Google authentication:', error);
    next(error);
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });


    if (!user) {
      console.error('User not found for forgot password:', email);
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate a temporary password
    const temporaryPassword = Math.random().toString(36).slice(-8); // Generate a random password
    user.temporaryPassword = temporaryPassword;
    await user.save();


    // Send a password reset email
    const subject = 'Password Reset Request';
    const text = `Your temporary password is: ${temporaryPassword}`;
    await sendMail(email, subject, text);


    res.status(200).json({ message: 'Temporary password sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Send a reset password email
    await sendResetPasswordEmail(email);

    
    res.status(200).json({ message: 'Reset password email sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const signOut = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success');
};



// this code i will use but im not sure if i have to use line 132 
// and change findOne because i thing that i don't have to hash the passwor
// again 

// const user = await User.findOneAndUpdate(
//   { email },
//   { temporaryPassword: hashedTemporaryPassword },
//   { new: true }
// );

// or should i do like this 
// so the code will be consistent with the previous code

// const resetPassword = await User.findByIdAndUpdate(
//   req.params.id,
//   {
//     $set: {
//       username: req.body.username,
//        emal: req,body.email,
//        password: req.body.password,

//     }
//   }
  
// )
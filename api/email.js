import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'andrenations@gmail.com',
    pass: '150482', 
  },
});

function sendMail(to, subject, text) {
  const mailOptions = {
    from: 'andrenations@gmail.com',
    to: 'veigaalmeida820@gmail.com',
    subject: 'Reset your password Link',
    text: `http://localhost:5173/reset-password/${user._id}/${token}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

export { sendMail };

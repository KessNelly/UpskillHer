const nodemailer = require ("nodemailer");
const asyncHandler = require ("express-async-handler");



const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
      console.log(error);
  }
  else {
      console.log('Ready for messages');
      console.log(success);
  }
});





const sendEmail = asyncHandler(async(data,req,res)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user:  process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

   

      
     
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Hey" <abc@gmail.com>'  , // sender address
          to: data.to, // list of receivers
          subject: data.subject, // Subject line
          text: data.text, // plain text body
         html: data.htm, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
    }




);

    

module.exports = sendEmail
// require('dotenv').config({path:'../.env'})
// const { createTransport } = require("nodemailer");

// const sendMail = async (user, id, token, email) => {
//   try {
//     const setup = await createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.User_Email,
//         pass: process.env.User_Password,
//       },
//     });
//     const link = `http://localhost:3004/admin/reset-password/${id}/${token}`;

//   console.log("link", link);
 
//     let mailOption = {
//       to: email,
//       subject: "Hello",
//       html: link,
//       from: process.env.User_Email,
//     };
//     await setup.sendMail(mailOption, (error, info) => {
//       if (error) {
//         console.log(error);
//         return  error.message
//       }
//       console.log(`Email sent: ${info.response}`);
//       return info.response
//     });
//   } catch (err) {
//     return err.message;
//   }
// };
// module.exports = {sendMail};

const nodemailer = require("nodemailer");
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId,
        { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId,
        { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "738916e07f4b0c",
        pass: "753d5dc4ee8da6",
      },
    });

    const mailOptions = {
      from: "sadiq@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN
        }/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"
        }
          or copy and paste the link below in your browser. <br> ${process.env.DOMAIN
        }/verifyemail?token=${hashedToken}
          </p>`,
    };

    const mailresponse = await transport.sendMail
      (mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

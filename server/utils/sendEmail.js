const nodemailer =require( 'nodemailer');
const sendEmail=async(options)=>{

    const  transporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service:"gmail",
        auth:{
            user:"bibliophilemuffie@gmail.com",
            pass:"bkcoaedzcvbonqen",
        }
    });

    const mailOptions={
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };

    await transporter.sendMail(mailOptions);
}


module.exports=sendEmail;
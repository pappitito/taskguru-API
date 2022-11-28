const nodemailer = require('nodemailer')

function sendMail(recipient, mailbody){
    return new Promise((resolve,reject)=> {
        const transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    user: '',
                    pass: ''
                    
                }
            }
        )
        const mailOption = {
            from: '',
            to: recipient,
            subject: '',
            text: mailbody
        }
    
        transporter.sendMail(mailOption, (error,info)=>{
            if(error){
                return reject({message: 'An error occured'})
            }
            return resolve({message: 'email sent successfully'})
        })
    })
}
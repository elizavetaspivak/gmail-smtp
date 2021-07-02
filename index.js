const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const nodemailer = require("nodemailer");
const app = express()

app.use(cors({origin: 'https://elizavetaspivak.github.io'}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: 'lizawebdev@gmail.com', // generated ethereal user
        pass: 'lizawebdev111', // generated ethereal password
    }, tls: {
        rejectUnauthorized: false
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async function (req, res) {
    let {name, email, text} = req.body

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'my portfolio', // sender address
        to: "elizabethspivak99@gmail.com", // list of receivers
        subject: name, // Subject line
        // text: "Приветиииик", // plain text body
        html: `<b>Сообщение с вашего портфолио лендинга</b>
<div> ${name} </div>
<div> ${email} </div>
<div> ${text} </div>`, // html body
    });

    res.send('Ok!')
})

let port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
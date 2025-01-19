const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer")

app.use(bodyParser.json())
app.use(cors());
app.use(express.json());

let data = {
  email: "",
  name: "",
  message: "",
}
let data2 = {
  name: "",
  message: "",
}

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/send/', async (req, res) => {
  const { to, message, name } = req.body;

  if(!to || !message || !name) {
    return res.status(400).send("Отсутствуют некоторые поля!")
  }
 
  data.email = to;
  data.name = name;
  data.message = message;

  
  const mailOptions = {
    from: `${process.env.EMAIL_USER} Тайный Cанта`,
    to: to,
    subject: `Поздравление с Новым годом для ${name.charAt(0).toUpperCase() + name.slice(1)}`,
    html: `
   <style>
    h2 {
      font-weight: bold;
      font-size: 50px;
      color: rgb(59, 57, 57);
    }
      p {
        font-size: 30px;
        color: yellow;
      }
    h2, p {
        font-family: Verdana, sans-serif;
        text-align: center;
    }
    body {
      min-height: 600px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
     background-color: blue;
      background-repeat: no-repeat;
      background-size: cover;
    }
  </style>
  <body style="background-color: red">
      <p>Для ${name.charAt(0).toUpperCase() + name.slice(1)}</p>
      <h2>${message}</h2>
  </body>
    `,
    date: new Date().toUTCString(),
    messageId: `<${new Date().getTime()}@mail.ru>`, 
    mimeVersion: '1.0',
    contentType: 'text/html; charset=utf-8'
  };


    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Сообщение отправлено');
    } catch (error) {
      console.error('Ошибка при отправке email:', error);
      res.status(500).send('Ошибка при отправке');
    }
  
});

app.post('/api/to-santa/', async (req,res)=> {
  const {name, message} = req.body;

  if(!name || !message) {
    res.status(400).send("Не все поля заполнены!")
  }

  const mailOptions = {
    from: `${process.env.EMAIL_USER}`,
    to: process.env.EMAIL_USER2,
    subject: `Письмо Деду Морозу. Автор письма ${name}.`,
    html: `
    <style>
      h2 {
        font-weight: bold;
        font-size: 50px;
        color: rgb(59, 57, 57);
      }
        p {
          font-size: 30px;
          color: yellow;
        }
      h2, p {
          position: absolute;
          font-family: Verdana, sans-serif;
      }
      body {
        min-height: 600px;
        position: absolute;
        top: 50%;
        left: 50%; 
        transform: translate(-50%, -50%);
        text-align: center;
        align-items: center;
        background-image: url('https://img.goodfon.ru/original/2560x1600/2/41/kolokolchiki-elochnye-igrushki.jpg');
        background-repeat: no-repeat;
       background-size: cover;
    }
    </style>
    <body>
        <p>Написал ${name.charAt(0).toUpperCase() + name.slice(1)}</p>
        <h2>${message}</h2>
    </body>
    `,
    date: new Date().toUTCString(),
    messageId: `<${new Date().getTime()}@mail.ru>`, 
    mimeVersion: '1.0',
    contentType: 'text/html; charset=utf-8'
  };



  data2.name = name;
  data2.message = message;

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Письмо отправлено!")
  } catch (error) {
    console.error("Ошибка при отправке письма", error)
    res.status(500).send("Ошибка при отправке письма Деду Морозу!")
  }

  

})

app.listen(process.env.PORT, ()=> {
  try {
    console.log(
       `\x1b[1m\x1b[35mEXPRESS SERVER\x1b[0m started to`,
      `\n\x1b[34mhttp://localhost:${process.env.PORT}/api/`
       )
  } catch (error) {
    console.log( "Ошибка!", error)
  }
})
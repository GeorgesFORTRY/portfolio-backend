const contactRouter = require('express').Router();

const Joi = require('joi');
const nodemailer = require('nodemailer');

const contactEmail = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.CONTACT_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

contactRouter.post('/', (req, res) => {
  const { firstname, lastname, structure, phonenumber, email, message } =
    req.body;

  const { error } = Joi.object({
    email: Joi.string().email().max(255).required(),
  }).validate({ email }, { abortEarly: false });
  const mail = {
    from: { firstname, lastname },
    to: process.env.CONTACT_EMAIL,
    subject: 'Contact Portfolio',
    html: `<p>Prénom: ${firstname}</p>
          <p>Nom: ${lastname}</p>
          <p>Structure: ${structure || 'Non renseignée'}</p>
          <p>Numéro de téléphone: ${phonenumber || 'Non renseigné'} 
          <p>Email: ${email}</p>
          <p>Validation RGPD : Oui</p>
          <p>Message: ${message}</p>`,
  };

  if (error) {
    res.status(422).send({ validationErrors: error.details });
  } else {
    contactEmail.sendMail(mail, (err) => {
      if (err) {
        res.json({ status: 'Error' });
      } else {
        res.json({ status: 'Message sent' });
      }
    });
  }
});

module.exports = contactRouter;

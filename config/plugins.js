module.exports = ({ env }) => ({
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "anhdt.qwerty@gmail.com",
        pass: "Yeuhuyen1!",
      },
    },
    settings: {
      defaultFrom: "anhdt.qwerty@gmail.com",
      defaultReplyTo: "anhdt.qwerty@gmail.com",
    },
  },
});

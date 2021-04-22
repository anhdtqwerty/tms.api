module.exports = ({ env }) => ({
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "tms.skymore@gmail.com",
        pass: "Skymore@123",
      },
    },
    settings: {
      defaultFrom: "tms.skymore@gmail.com",
      defaultReplyTo: "Skymore@123",
    },
  },
});

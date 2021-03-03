module.exports = ({ env }) => ({
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "service.skymore@gmail.com",
        pass: "DefaultPassword@123",
      },
    },
    settings: {
      defaultFrom: "service.skymore@gmail.com",
      defaultReplyTo: "service.skymore@gmail.com",
    },
  },
});

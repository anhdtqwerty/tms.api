module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "mssql",
        host: "tms.crb7bc7c7smh.ap-southeast-1.rds.amazonaws.com",
        port: 1433,
        database: "tms",
        username: "admin",
        password: "123123123",
      },
      options: {},
    },
  },
});

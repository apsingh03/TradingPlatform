const { Sequelize, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: "mysql",
    operatorsAliases: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize Connected");
  })
  .catch((error) => {
    console.log("/n /n sequelize Authenticate Error - ", error);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// table name
db.users = require("./UserModel.js")(sequelize, DataTypes);
db.orderBook = require("./OrderBookModel.js")(sequelize, DataTypes);
db.userOrder = require("./UserOrderModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("------------ Congratulation You are in Sync -------------- ");
});

db.users.hasMany(db.userOrder, {
  foreignKey: "user_id",
  as: "user",
});

db.userOrder.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = db;

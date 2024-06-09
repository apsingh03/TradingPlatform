const { where } = require("sequelize");
const db = require("../models/");

// Tables
const Users = db.users;
const OrderBook = db.orderBook;
const UserOrders = db.userOrder;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const getOrderBook = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log("Req.body - ", req.body);
    const OrderBookquery = await OrderBook.findAll({
      transaction: t,
    });
    const UserOrdersquery = await UserOrders.findAll({
      include: [
        {
          model: Users,
          as: "user",
          required: true,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
      transaction: t,
    });

    await t.commit();
    return res
      .status(200)
      .send({ orderBook: OrderBookquery, userOrders: UserOrdersquery });
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

const createOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log( req.user )

    const priceExist = await OrderBook.findOne({
      where: { price: req.body.orderPrice, type: req.body.orderType },
      transaction: t,
    });

    const userOrdersQuery = await UserOrders.create(
      {
        price: req.body.orderPrice,
        qty: req.body.orderQty,
        type: req.body.orderType,
        createdAt: new Date(),
        user_id: req.user.id,
      },
      { transaction: t }
    );

    if (priceExist) {
      // console.log("------- priceExist ----------");
      const newQty = parseInt(priceExist.qty) + parseInt(req.body.orderQty);
      // console.log(`old - ${req.body.orderQty} new Qty - ${newQty}`);
      const updateQtyQuery = await OrderBook.update(
        { qty: newQty, updatedAt: new Date() },
        { where: { price: req.body.orderPrice }, transaction: t }
      );

      const resultAfterUpdateQtyQuery = await OrderBook.findOne({
        where: { id: priceExist.id },
        transaction: t,
      });

      await t.commit();
      // .send({ orderBook: OrderBookquery, userOrders: userOrdersQuery });
      return res.status(200).send({
        msg: "Order Appended",
        orderBook: resultAfterUpdateQtyQuery,
        userOrders: userOrdersQuery,
      });
    } else {
      // console.log("--------- New Order ----------- ");
      const createOrderBookQuery = await OrderBook.create(
        {
          price: req.body.orderPrice,
          qty: req.body.orderQty,
          type: req.body.orderType,
          createdAt: new Date(),
        },
        {
          transaction: t,
        }
      );

      await t.commit();
      return res.status(200).send({
        msg: "Order Created",
        orderBook: createOrderBookQuery,
        userOrders: userOrdersQuery,
      });
    }
    // console.log("Req.body - ", req.body);
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getOrderBook,
  createOrder,
};

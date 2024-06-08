const { where } = require("sequelize");
const db = require("../models/");

// Tables
const Users = db.users;
const Orders = db.orders;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const getOrder = async (req, res) => {
  try {
    // console.log("Req.body - ", req.body);
    const query = await Orders.findAll({
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
    });
    return res.status(200).send(query);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    // console.log( req.user )
    const data = {
      price: req.body.orderPrice,
      qty: req.body.orderQty,
      type: req.body.orderType,
      createdAt: Date.now(),
      user_id: req.user.id,
    };

    const priceExist = await Orders.findOne({
      where: { price: req.body.orderPrice },
    });

    if (priceExist) {
      const newQty = parseInt(priceExist.qty) + parseInt(req.body.orderQty);
      console.log(`old - ${req.body.orderQty} new Qty - ${newQty}`);
      const query = await Orders.update(
        { qty: newQty, updatedAt: Date.now() },
        { where: { price: req.body.orderPrice } }
      );
      const resultAfterQuery = await Orders.findOne({
        where: { id: priceExist.id },
      });

      return res
        .status(200)
        .send({ msg: "Order Appended", order: resultAfterQuery });
    } else {
      const query = await Orders.create(data);
      return res.status(200).send({ msg: "Order Created", order: query });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getOrder,
  createOrder,
};

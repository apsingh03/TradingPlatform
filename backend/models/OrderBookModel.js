module.exports = (sequelize, DataTypes) => {
  const OrderBook = sequelize.define(
    "orderBook",
    {
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return OrderBook;
};

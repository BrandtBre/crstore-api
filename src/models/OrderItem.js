import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Item from "./Item";
import Order from "./Order";

const OrderItem = sequelize.define(
  'order_items',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Item.belongsToMany(Order, {
  through: OrderItem,
  as: 'orders',
  foreignKey: {
    name: 'itemId',
    field: 'item_id',
    allowNull: false
  }
});

Order.belongsToMany(Item, {
  through: OrderItem,
  as: 'items',
  foreignKey: {
    name: 'orderId',
    field: 'order_id',
    allowNull: false
  }
});

export default OrderItem;

import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import User from "./User";

const Cart = sequelize.define(
  'cart',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    items: {
      type: DataTypes.JSONB,
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Cart.belongsTo(User, {
  as: 'customer',
  foreignKey: {
    name: 'customerId',
    allowNull: false,
    field: 'customer_id'
  }
});

export default Cart;

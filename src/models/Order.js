import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import User from "./User";
import Coupon from "./Coupon";
import PaymentMethod from "./PaymentMethod";

const Order = sequelize.define(
  'orders',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: { 
      type: DataTypes.BOOLEAN,
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

Order.belongsTo(User, {
  as: 'customer',
  foreignKey: {
    name: 'customerId',
    allowNull: false,
    field: 'customer_id'
  }
});

Order.belongsTo(User, {
  as: 'employee',
  foreignKey: {
    name: 'employeeId',
    allowNull: false,
    field: 'employee_id'
  }
});

Order.belongsTo(PaymentMethod, {
  as: 'paymentMethod',
  foreignKey: {
    name: 'paymentMethodId',
    allowNull: false,
    field: 'payment_method_id'
  }
});

Order.belongsTo(Coupon, {
  as: 'coupon',
  foreignKey: {
    name: 'couponId',
    allowNull: true,
    field: 'coupon_id'
  }
});


export default Order;

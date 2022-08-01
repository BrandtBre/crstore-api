import { DATE } from "sequelize";
import { NUMERIC } from "sequelize";
import { DataTypes } from "sequelize";
import { sequelize } from "../config";

const Coupon = sequelize.define(
  'coupons',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    limit_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    discount_percentage: {
      type: DataTypes.NUMERIC,
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

export default Coupon;

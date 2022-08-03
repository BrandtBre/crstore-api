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
    limitDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "limit_date"
    },
    discountPercentage: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      field: "discount_percentage"
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

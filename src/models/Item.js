import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Category from "../models/Category"

const Item = sequelize.define(
  'items',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.NUMERIC(15,2),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Item.belongsTo(Category, {
  as: "category",
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'categoryId',
    allowNull: false,
    field: 'category_id'
  }
});

export default Item;

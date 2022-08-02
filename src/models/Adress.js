import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import User from "./User";

const Adress = sequelize.define(
  'adresses',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false      
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Adress.belongsTo(User, {
  as: 'user',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'userId',
    allowNull: false,
    field: 'user_id'
  }
});

export default Adress;

import { sequelize, DataTypes } from '../../db'

const UserModel = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isFriend: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  following: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  followers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
})

export default UserModel

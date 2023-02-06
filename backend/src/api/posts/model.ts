import { sequelize, DataTypes } from '../../db'

const PostModel = sequelize.define('post', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    },
})

export default PostModel
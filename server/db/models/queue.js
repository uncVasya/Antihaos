const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Queue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Queue.init({
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Queue',
  });
  return Queue;
};

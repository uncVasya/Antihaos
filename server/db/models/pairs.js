const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ QueueDuo, User }) {
      // define association here
      this.hasOne(QueueDuo, { foreignKey: 'pair_id' });
      this.belongsTo(User, { foreignKey: 'user1_id', as: 'user1' });
      this.belongsTo(User, { foreignKey: 'user2_id', as: 'user2' });
    }
  }
  Pair.init({
    user1_id: DataTypes.INTEGER,
    user2_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pair',
  });
  return Pair;
};

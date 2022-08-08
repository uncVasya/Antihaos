const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QueueDuo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Pair }) {
      // define association here
      this.belongsTo(Pair, { foreignKey: 'pair_id' });
    }
  }
  QueueDuo.init({
    pair_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'QueueDuo',
  });
  return QueueDuo;
};

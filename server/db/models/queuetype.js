const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QueueType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QueueType.init({
    mode: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'QueueType',
  });
  return QueueType;
};

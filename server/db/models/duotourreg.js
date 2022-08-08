const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DuoTourReg extends Model {
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
  DuoTourReg.init({
    user_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'DuoTourReg',
  });
  return DuoTourReg;
};

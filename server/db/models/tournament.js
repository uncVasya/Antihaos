const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ TourGame }) {
      // define association here
      this.hasMany(TourGame, { foreignKey: 'tour_id' });
    }
  }
  Tournament.init({
    name: DataTypes.STRING,
    date: DataTypes.STRING,
    mode: DataTypes.STRING,
    reg: DataTypes.BOOLEAN,
    first_round: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tournament',
  });
  return Tournament;
};

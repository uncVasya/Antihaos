const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TourGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Tournament }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Tournament, { foreignKey: 'tour_id' });
    }
  }
  TourGame.init({
    tour_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    got_to: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'TourGame',
  });
  return TourGame;
};

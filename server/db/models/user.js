const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Queue, TourGame, Pair }) {
      // define association here
      this.hasMany(Queue, { foreignKey: 'user_id' });
      this.hasMany(TourGame, { foreignKey: 'user_id' });
      this.hasMany(Pair, { foreignKey: 'user1_id', as: 'user1' });
      this.hasMany(Pair, { foreignKey: 'user2_id', as: 'user2' });
    }
  }
  User.init({
    role: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    nickName: DataTypes.STRING,
    pass: DataTypes.STRING,
    solorank: DataTypes.INTEGER,
    duorank: DataTypes.INTEGER,
    solowon: DataTypes.INTEGER,
    sololost: DataTypes.INTEGER,
    duowon: DataTypes.INTEGER,
    duolost: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    ban: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category }) {
      this.belongsTo(Category, { as: 'category' });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        categoryId: undefined,
      };
    }
  }
  article.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'Opps!. Name must specified.' },
          notEmpty: { msg: "Opps!. Name can't be empty." },
        },
      },
      nanoid: DataTypes.STRING,
      image: { type: DataTypes.STRING, unique: true },
      url: { type: DataTypes.STRING, unique: true },
      source: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        references: 'category',
        refrencesKey: 'id',
      },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
      expiresAt: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: 'Article',
      tableName: 'articles',
      underscored: true,
    }
  );
  return article;
};
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: false,
      },
      entries: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },
      depth: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        unique: false,
      },
      parent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },
    },
    {
      charset: "utf8mb4", // mb4는 이모티콘까지 담을 수 있도록..
      collate: "utf8mb4_general_ci", // 한글 저장
    }
  );
  Category.associate = (db) => {
    db.Category.belongsTo(db.User);
    db.Category.hasMany(db.Post);
  };
  return Category;
};

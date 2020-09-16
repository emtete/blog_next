module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      author: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: false,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      categoryId: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: false,
      },
      categoryName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", // mb4는 이모티콘까지 담을 수 있도록..
      collate: "utf8mb4_general_ci", // 한글 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
  };
  return Post;
};

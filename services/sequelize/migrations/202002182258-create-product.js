module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "product",
    {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED
      },
      ProductName: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      charset: "utf8"
    }
  );
};

module.exports.down = queryInterface => queryInterface.dropTable("product");

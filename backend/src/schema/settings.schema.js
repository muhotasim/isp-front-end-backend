module.exports = async function (db) {
  db.schema.hasTable("settings").then(async function (exists) {
    if (!exists) {
      console.log("creating settings table");
      return await db.schema.createTable("settings", function (table) {
        table.string("name", 80).index().primary();
        table.unique("name");
        table.json("value");
      });
    } else {
      console.log("settings table already exists");
    }
  });
};

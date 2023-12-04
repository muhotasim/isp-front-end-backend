module.exports = function (db) {
  db.schema.hasTable("menus").then(async function (exists) {
    if (!exists) {
      console.log("creating memu table");
      return await db.schema.createTable("menus", function (table) {
        table.increments().primary();
        table.string("name");
        table.string("link");
        table.integer("parent", 4).unsigned();
        table.enu("type", ["header", "footer"]);
        table.tinyint("status", 1);
        table.timestamps();

        table.foreign("parent").references("menus.id").onDelete("SET NULL");
      });
    } else {
      console.log("memu table already exists");
    }
  });
};

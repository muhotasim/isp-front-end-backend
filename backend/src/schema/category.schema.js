module.exports = function (db) {
  db.schema.hasTable("categories").then(async function (exists) {
    if (!exists) {
      console.log("creating categories table");
      return await db.schema.createTable("categories", function (table) {
        table.increments().primary();
        table.string("title");
        table.text("content_body");
        table.integer("created_by").unsigned();
        table.integer("last_updated_by").unsigned();
        table
          .foreign("last_updated_by")
          .references("users.id")
          .onDelete("SET NULL");
        table.string("meta_title");
        table.string("meta_key");
        table.string("meta_description");
        table.tinyint("no_follow", 1);
        table.tinyint("no_index", 1);
        table.tinyint("status", 1);
        table.timestamps();

        table.foreign("created_by").references("users.id").onDelete("SET NULL");
      });
    } else {
      console.log("categories table already exists");
    }
  });
};

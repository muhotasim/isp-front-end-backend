module.exports = function (db) {
  db.schema.hasTable("files").then(async function (exists) {
    if (!exists) {
      console.log("creating files table");
      return await db.schema.createTable("files", function (table) {
        table.increments().primary();
        table.enu("type", ["image", "file"]);
        table.string("location");
        table.string("original_name");
        table.string("uri");
        table.integer("created_by").unsigned().nullable();
        table.integer("last_updated_by").unsigned();
        table
          .foreign("last_updated_by")
          .references("users.id")
          .onDelete("SET NULL");
        table.string("ext");
        table.timestamps();

        table.foreign("created_by").references("users.id").onDelete("SET NULL");
      });
    } else {
      console.log("files table already exists");
    }
  });
};

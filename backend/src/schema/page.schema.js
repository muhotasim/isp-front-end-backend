module.exports = function (db) {
  db.schema.hasTable("pages").then(async function (exists) {
    if (!exists) {
      console.log("creating pages table");
      return await db.schema.createTable("pages", function (table) {
        table.increments().primary();
        table.string("title");
        table.enu("type", ["system", "user_created"]);
        table.text("content_body");
        table.text("p_css").defaultTo('');
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
      console.log("pages table already exists");
    }
  });
};

module.exports = function (db) {
  db.schema.hasTable("users").then(async function (exists) {
    if (!exists) {
      console.log("creating user table");
      return await db.schema.createTable("users", function (table) {
        table.increments().primary();
        table.string("user_name");
        table.string("email", 128);
        table.unique("email");
        table.string("phone", 14);
        table.unique("phone");
        table.enu("user_type", ["internal", "external"]).defaultTo("internal");
        table.integer("created_by").unsigned().nullable();
        table.integer("last_updated_by").unsigned();
        table
          .foreign("last_updated_by")
          .references("users.id")
          .onDelete("SET NULL");
        table.string("password");
        table.text("details");
        table.tinyint("status", 1).defaultTo(1);
        table.timestamps();

        table.foreign("created_by").references("users.id").onDelete("SET NULL");
      });
    } else {
      console.log("user table already existes");
    }
  });
};

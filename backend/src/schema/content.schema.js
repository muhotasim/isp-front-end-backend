module.exports = async function (db) {
  db.schema.hasTable("contents").then(async function (exists) {
    if (!exists) {
      console.log("creating contents table");
      // 'slider','post','address','package','popular-package','client','section-title'
      return await db.schema.createTable("contents", function (table) {
        table.increments().primary();
        table.string("title");
        table
          .enu("type", [
            "slider",
            "post",
            "address",
            "package",
            "popular-package",
            "client",
            "section-title"
          ])
          .defaultTo("post");
        table.string("caption");
        table.text("content_body");
        table.integer("file_id").unsigned();
        table.integer("created_by").unsigned().nullable();
        table.integer("last_updated_by").unsigned();
        table
          .foreign("last_updated_by")
          .references("users.id")
          .onDelete("SET NULL");
        table.tinyint("status", 1).defaultTo(1);
        table.timestamps();

        table
          .foreign("created_by")
          .references("id")
          .inTable("users")
          .onDelete("SET NULL");
        table
          .foreign("file_id")
          .references("id")
          .inTable("files")
          .onDelete("SET NULL");
      });
    } else {
      console.log("contents table already exists");
    }
  });
};

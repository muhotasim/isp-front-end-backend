module.exports = async function (db) {
  db.schema.hasTable("sections").then(async function (exists) {
    if (!exists) {
      console.log("creating section table");
      // 'slider','post','address','package','popular-package','client','section-title'
      return await db.schema.createTable("sections", function (table) {
        table.increments().primary();
        table.string("name");
        table.string("title");
        table
          .enu("type", [
            "slider",
            "post",
            "address",
            "package",
            "section-title",
            "popular-package",
            "client",
            'page-title-section',
            'section-title-with-content',
            'details-only'
          ])
          .defaultTo("post");
        table.integer("created_by").unsigned().nullable();
        table.integer("last_updated_by").unsigned();
        table.tinyint("status", 1).defaultTo(1);
        table.timestamps();
        table
          .foreign("created_by")
          .references("id")
          .inTable("users")
          .onDelete("SET NULL");
      });
    } else {
      console.log("sections table already exists");
    }
  });
};

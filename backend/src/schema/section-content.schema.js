module.exports = async function (db) {
  db.schema.hasTable("section_content").then(async function (exists) {
    if (!exists) {
      console.log("creating section table");
      return await db.schema.createTable("section_content", function (table) {
        table.integer("section_id").unsigned().nullable();
        table.integer("content_id").unsigned().nullable();
        table.integer("serial").unsigned().nullable();
        table
          .foreign("content_id")
          .references("id")
          .inTable("contents")
          .onDelete("SET NULL");
        table
          .foreign("section_id")
          .references("id")
          .inTable("sections")
          .onDelete("SET NULL");
        table.unique(["content_id","section_id"]);
        });
    } else {
      console.log("section_content table already exists");
    }
  });
};

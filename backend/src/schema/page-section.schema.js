module.exports = async function (db) {
  db.schema.hasTable("page_section").then(async function (exists) {
    if (!exists) {
      console.log("creating section table");
      return await db.schema.createTable("page_section", function (table) {
        table.integer("page_id").unsigned().nullable();
        table.integer("section_id").unsigned().nullable();
        table.integer("serial").unsigned().nullable();
        table
          .foreign("page_id")
          .references("id")
          .inTable("pages")
          .onDelete("SET NULL");
        table
          .foreign("section_id")
          .references("id")
          .inTable("sections")
          .onDelete("SET NULL");
        table.unique(["page_id","section_id"]);
        });
    } else {
      console.log("page_section table already exists");
    }
  });
};

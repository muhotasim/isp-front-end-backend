module.exports = function (db) {
  db.schema.hasTable("tokens").then(async function (exists) {
    if (!exists) {
      console.log("creating token table");
      return await db.schema.createTable("tokens", function (table) {
        table.string("token");
        table.integer("created_by").unsigned();
        table.timestamps();

        table.foreign("created_by").references("users.id").onDelete("CASCADE");
      });
    } else {
      console.log("token table already exists");
    }
  });
};

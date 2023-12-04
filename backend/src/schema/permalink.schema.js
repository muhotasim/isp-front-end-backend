module.exports = function (db) {
  db.schema.hasTable("permalinks").then(async function (exists) {
    if (!exists) {
      console.log("creating permalinks table");
      return await db.schema.createTable("permalinks", function (table) {
        table.string("permalink").index();
        table.enu("type", ["page", "category", "tag"]).index();
        table.integer("id").unsigned().index();
        table.unique(["type", "id"]);
      });
    } else {
      console.log("permalinks table already exists");
    }
  });
};

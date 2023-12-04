const { config } = require("dotenv");
const { resolve } = require("path");
config({ path: resolve(__dirname, "../../.env") });
const { db } = require("../utils");
// const categorySchema = require("./category.schema");
const contentSchema = require("./content.schema");
const fileSchema = require("./file.schema");
const menuSchema = require("./menu.schema");
const pageSectionSchema = require("./page-section.schema");
const pageSchema = require("./page.schema");
const permalinkSchema = require("./permalink.schema");
const sectionContentSchema = require("./section-content.schema");
const sectionSchema = require("./section.schema");
const settingsSchema = require("./settings.schema");
// const tagsSchema = require("./tags.schema");
const tokenSchema = require("./token.schema");
const userSchema = require("./user.schema");

userSchema(db);
menuSchema(db);
tokenSchema(db);
contentSchema(db);
sectionSchema(db);
pageSchema(db);
fileSchema(db);
settingsSchema(db);
// categorySchema(db);
// tagsSchema(db);
permalinkSchema(db);
sectionContentSchema(db);
pageSectionSchema(db);

setTimeout(() => {
  process.exit(1);
}, 10000);

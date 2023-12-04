const { config } = require("dotenv");
const md5 = require("md5");
const { resolve } = require("path");
config({ path: resolve(__dirname, "../../.env") });
const { db } = require("../utils");
async function seedData() {
  await db("users").insert({
    user_name: "Admin",
    email: "admin@gmail.com",
    phone: 123456,
    phone: "internal",
    password: md5("amd123123"),
    status: 1,
  });

  await db("settings").insert([
    {
      name: "COMPANY_NAME",
      value: JSON.stringify({
        value: ""
      }),
    },
    {
      name: "HOME_PAGE_CACHE_TIME",
      value: JSON.stringify({
        value: "5000"
      }),
    },
    {
      name: "DOAMIN",
      value: JSON.stringify({
        value: "5000"
      }),
    },
    {
      name: "HEADER_MENU",
      value: "[]",
    },
    {
      name: "FOOTER_MENU",
      value: "[]",
    },
    {
      name: "SITE_VERIFICATION_CODES",
      value: JSON.stringify({
        value: ""
      }),
    },
    {
      name: "GOOGLE_TRACKING_ID",
      value: JSON.stringify({
        value: ""
      }),
    },
    {
      name: "ADITIONAL_SCRIPTS",
      value: JSON.stringify({
        value: ""
      }),
    },
    {
      name: "FB_LINK",
      value: JSON.stringify({
        value: ""
      }),
    },
    {
      name: "GOOGLE_LINK",
      value: JSON.stringify({
        value: ""
      }),
    },
    {
      name: "YOUTUBE_LINK",
      value: JSON.stringify({
        value: ""
      }),
    },
    {
      name: "CONTACT_PHONE",
      value: JSON.stringify({
        value: ""
      }),
    },
    {
      name: "SUPPORT_EMAIL",
      value: JSON.stringify({
        value: ""
      }),
    },
    {
      name: "LOGO_IMAGE_LINK",
      value: JSON.stringify({
        value: ""
      }),
    },
  ]);
}
seedData();

const { config } = require("dotenv");
const md5 = require("md5");
const { resolve } = require("path");
config({ path: resolve(__dirname, "../../.env") });
const { db } = require("../utils");
const { faker } = require('@faker-js/faker');
const {Page} = require('../model/Page')
const pageModal = new Page();
async function generateFakeData() {
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
//   let users = [];


//   for(let i=1;i<10000;i++ ){
//     users.push({
//         user_name:  faker.name.fullName(),
//         email: faker.internet.email(),
//         phone: faker.phone.number(),
//         user_type: "internal",
//         password: md5("amd123123"),
//         status: 1,
//     })
//   }
//   await db("users").insert(users);
//   let types = []; 
//   for(let i=1;i<5000;i++ ){
//     types.push({
//       title: faker.lorem.paragraph(),
//       type: "post",
//       content_body: faker.lorem.text(),
//       status: 1,
//       caption: faker.lorem.sentence()
//     })
//   }
// await db("contents").insert(types);


// let sections = []; 
// for(let i=1;i<50;i++ ){
//     sections.push({
//     title: faker.lorem.paragraph(),
//     status: 1,
//   })
// }
// await db("sections").insert(sections);


// for(let i=1;i<50000;i++ ){
//    await pageModal.create({
//     title: faker.internet.domainWord()+'-' + i, type: 'user_created', content_body:faker.lorem.text(), meta_title: faker.lorem.sentence(),
//     meta_key: faker.lorem.sentence(), meta_description: faker.lorem.sentence(), no_follow:0, no_index: 0, status : 1
//    })
// }

}
generateFakeData();

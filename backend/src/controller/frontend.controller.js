const { Page } = require("../model/Page");
const { sqlLiteCache, SYSTEM_GLOBALS, CACHE_TIMES } = require("../utils");
const page = new Page();
module.exports.page = async (req, res, next) => {
  try {
    const pageData = await page.getPageDataByPermalink(req.url.replace('/',''));
    if(!pageData) return next(404);
    const data = {
      title: pageData.title,
      meta_title: pageData.meta_title,
      meta_key: pageData.meta_key,
      meta_description: pageData.meta_description,
      content_body: pageData.content_body,
      site_url: process.env.SITE_URL,
      config: req.app.locals.settings,
      sectionData: pageData.sectionsData,
      pageCss:pageData.p_css 
    };
    return res.render("page", data);
  } catch (e) {
    return next(404);
  }
};

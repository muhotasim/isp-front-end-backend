const { Router } = require('express');
const { page } = require('./controller/frontend.controller');
const { fileUploader, FILE_FIELD } = require('./utils');
const API_VERSION = process.env.API_VERSION;
const router = Router();
// middlewares
const { apiErrorAnd404Handeler, webErrorAnd404Handeler, authorizationMiddleware } = require('./middlewares');
// controllers
const userController = require('./controller/user.controller');
const fileController = require('./controller/file.controller');
const pageController = require('./controller/page.controller');
const contentController = require('./controller/contents.controller');
const sectionsController = require('./controller/section.controller');
const pageSectionController = require('./controller/page-section.controller');
// const categoriesController = require('./controller/categories.controller');
// const tagsController = require('./controller/tags.controller');
const utilsController = require('./controller/utils.controller');
const settingsController = require('./controller/settings.controller');
const sectionContentController = require('./controller/section-content.controller');


router.post('/api/' + API_VERSION + '/login', userController.login);
// 404 and error handeler
router.get('/api/' + API_VERSION + '/users', authorizationMiddleware, userController.index)
      .put('/api/' + API_VERSION + '/users', authorizationMiddleware, userController.create)
      .get('/api/' + API_VERSION + '/users/:id', authorizationMiddleware, userController.get)
      .patch('/api/' + API_VERSION + '/users/:id', authorizationMiddleware, userController.update)
      .delete('/api/' + API_VERSION + '/users/:id', authorizationMiddleware, userController.remove);
//files
router.get('/api/' + API_VERSION + '/files', authorizationMiddleware, fileController.index)
      .put('/api/' + API_VERSION + '/files', authorizationMiddleware, fileUploader.single(FILE_FIELD), fileController.create)
      .delete('/api/' + API_VERSION + '/files/:id', authorizationMiddleware, fileController.remove);
// // menu 
router.get('/api/' + API_VERSION + '/settings', authorizationMiddleware, settingsController.index)
      .get('/api/' + API_VERSION + '/settings/:name', authorizationMiddleware, settingsController.get)
      .patch('/api/' + API_VERSION + '/settings/:name', authorizationMiddleware, settingsController.update);
 
// page
router.get('/api/' + API_VERSION + '/page', authorizationMiddleware, pageController.index)
      .put('/api/' + API_VERSION + '/page', authorizationMiddleware, pageController.create)
      .get('/api/' + API_VERSION + '/page/:id', authorizationMiddleware, pageController.get)
      .patch('/api/' + API_VERSION + '/page/:id', authorizationMiddleware, pageController.update)
      .delete('/api/' + API_VERSION + '/page/:id', authorizationMiddleware, pageController.remove);

// content
router.get('/api/' + API_VERSION + '/content', authorizationMiddleware, contentController.index)
      .put('/api/' + API_VERSION + '/content', authorizationMiddleware, contentController.create)
      .get('/api/' + API_VERSION + '/content/:id', authorizationMiddleware, contentController.get)
      .patch('/api/' + API_VERSION + '/content/:id', authorizationMiddleware, contentController.update)
      .delete('/api/' + API_VERSION + '/content/:id', authorizationMiddleware, contentController.remove);


// content
router.get('/api/' + API_VERSION + '/section', authorizationMiddleware, sectionsController.index)
      .get('/api/' + API_VERSION + '/section/all', authorizationMiddleware, sectionsController.sectionDropDown)
      .put('/api/' + API_VERSION + '/section', authorizationMiddleware, sectionsController.create)
      .get('/api/' + API_VERSION + '/section/:id', authorizationMiddleware, sectionsController.get)
      .patch('/api/' + API_VERSION + '/section/:id', authorizationMiddleware, sectionsController.update)
      .delete('/api/' + API_VERSION + '/section/:id', authorizationMiddleware, sectionsController.remove);

// page section
router.get('/api/' + API_VERSION + '/page-section', authorizationMiddleware, pageSectionController.index)
      .put('/api/' + API_VERSION + '/page-section', authorizationMiddleware, pageSectionController.create)
      .put('/api/' + API_VERSION + '/page-section/bulk', authorizationMiddleware, pageSectionController.bulk)
      .patch('/api/' + API_VERSION + '/page-section', authorizationMiddleware, pageSectionController.update)
      .delete('/api/' + API_VERSION + '/page-section', authorizationMiddleware, pageSectionController.remove)

// section content
router.get('/api/' + API_VERSION + '/section-content', authorizationMiddleware, sectionContentController.index)
      .put('/api/' + API_VERSION + '/section-content/bulk', authorizationMiddleware, sectionContentController.insertBulk)
      .delete('/api/' + API_VERSION + '/section-content', authorizationMiddleware, sectionContentController.deleteBulk);


// // content
// router.get('/api/' + API_VERSION + '/categories', authorizationMiddleware, categoriesController.index)
//       .put('/api/' + API_VERSION + '/categories', authorizationMiddleware, categoriesController.create)
//       .get('/api/' + API_VERSION + '/categories/:id', authorizationMiddleware, categoriesController.get)
//       .patch('/api/' + API_VERSION + '/categories/:id', authorizationMiddleware, categoriesController.update)
//       .delete('/api/' + API_VERSION + '/categories/:id', authorizationMiddleware, categoriesController.remove);



// // content
// router.get('/api/' + API_VERSION + '/tags', authorizationMiddleware, tagsController.index)
//       .put('/api/' + API_VERSION + '/tags', authorizationMiddleware, tagsController.create)
//       .get('/api/' + API_VERSION + '/tags/:id', authorizationMiddleware, tagsController.get)
//       .patch('/api/' + API_VERSION + '/tags/:id', authorizationMiddleware, tagsController.update)
//       .delete('/api/' + API_VERSION + '/tags/:id', authorizationMiddleware, tagsController.remove);

router.get('/api/' + API_VERSION +'/logs', authorizationMiddleware, utilsController.getLogs)
      .get('/api/' + API_VERSION +'/logs/:filename', authorizationMiddleware, utilsController.readLog)
      .delete('/api/' + API_VERSION +'/logs/:filename', authorizationMiddleware, utilsController.removeLogs)
      .get('/api/' + API_VERSION +'/dashboard', authorizationMiddleware, userController.getUserDashboard)


router.use('/api/v1', apiErrorAnd404Handeler)
// router
router.get('*', page);
router.use(webErrorAnd404Handeler)

module.exports = router;
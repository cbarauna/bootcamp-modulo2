const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const gestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/Controllers/UserController')
const SessionController = require('./app/Controllers/SessionController')
const DashBoardController = require('./app/Controllers/DashBoardController')
const FileController = require('./app/Controllers/FileController')
const AppointmentController = require('./app/Controllers/AppointmentController')
const AvaliableController = require('./app/Controllers/AvaliableController')

routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash('success')
  res.locals.flashError = req.flash('error')
  return next()
})

routes.get('/files/:file', FileController.show)

routes.get('/', gestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', gestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.use('/app', authMiddleware)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashBoardController.index)
routes.post('/app/appointments/new/:provider', AppointmentController.store)

routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.get('/app/available/:provider', AvaliableController.index)
module.exports = routes

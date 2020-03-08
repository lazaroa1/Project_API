'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

//Login
Route.post('/login', 'AuthController.login')

//Representante
Route.resource('/user', 'UserController')

//Client
Route.resource('/client', 'ClientController').apiOnly().middleware('auth')


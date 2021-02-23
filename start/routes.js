'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'PageController.index')
Route.get('/admin', 'Admin/ProductController.index')
Route.get('/admin/products', 'Admin/ProductController.index')  //GET
Route.post('/admin/products', 'Admin/ProductController.store')  //POST 
Route.get('/admin/products/:id/delete', 'Admin/ProductController.delete') 


Route.get('/admin/products/create', 'Admin/ProductController.create')
Route.get('/admin/products/:id/edit', 'Admin/ProductController.edit')

Route.get('/admin/products/create', 'Admin/ProductController.create')  //CREATE
Route.get('/admin/products/:id', 'Admin/ProductController.show')  //SHOW
Route.get('/admin/products/:id/:name', 'Admin/ProductController.show')  //SHOW


Route.get('/admin/products/edit', 'Admin/ProductController.create')
Route.get('/admin/products/:id/edit', 'Admin/ProductController.edit')  //EDIT
Route.put('/admin/products/:id', 'Admin/ProductController.update') //UPDATE submitting a FORM



//ADMIN BRANDS
Route.get('/admin/brands', 'Admin/BrandController.index')
Route.post('/admin/brands', 'Admin/BrandController.store')
Route.get('/admin/brands/:id/delete', 'Admin/BrandController.delete') 
Route.get('/admin/brands/create', 'Admin/BrandController.create')
Route.get('/admin/brands/:id/edit', 'Admin/BrandController.edit')

Route.get('/admin/brands/create', 'Admin/BrandController.create')  //CREATE
Route.get('/admin/brands/:id', 'Admin/BrandController.show')  //SHOW
Route.get('/admin/brands/:id/:name', 'Admin/BrandController.show')  //SHOW


Route.get('/admin/brands/edit', 'Admin/BrandController.create')
Route.get('/admin/brands/:id/edit', 'Admin/BrandController.edit')  //EDIT
Route.put('/admin/brands/:id', 'Admin/BrandController.update') //UPDATE submitting a FORM
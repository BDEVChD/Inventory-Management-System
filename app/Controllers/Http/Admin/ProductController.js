'use strict'

class ProductController {


    index({view}){
        return view.render('admin/products/all')
    }
    store(){
        return   
    }
    create({view}){
        return view.render('admin/products/create') 
    }
    show({view}){
        return view.render('admin/products/show')   
    }
    edit({view}){
        return view.render('admin/products/edit')   
    }
    update(){
        return   
    }
    delete(){
        return   
    }
}

module.exports = ProductController

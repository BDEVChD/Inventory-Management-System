'use strict'
const Database = use('Database')

class ProductController {


    index({view}){
        return view.render('admin/products/all')
    }
    store({request, response}){
        const post = request.post()
        Database.raw(`INSERT INTO products (title, sku, material, description, brand_id, qty, size, user_id)
        Values(${post.title}, ${post.sku}, ${post.material}, ${post.description}, 1, ${post.qty}, ${post.size}, 1)
        `).then(response )
        return `saved success`
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

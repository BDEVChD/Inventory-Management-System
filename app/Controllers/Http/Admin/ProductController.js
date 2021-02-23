'use strict'
const Database = use('Database')
const sanitize = require('sqlstring');

class ProductController {
    async index({view, request, response}){
        try {
            let allProducts = await Database.raw(`
            SELECT products.id, products.title, products.sku,brands.title as brand, concat(users.f_name, ' ', users.l_name) as user, products.material, products.qty, products.size, products.user_id, products.created_at
            FROM products
            INNER JOIN brands
            ON products.brand_id = brands.id
            INNER JOIN users
            ON products.user_id = users.id
            ORDER BY created_at ASC
        `)
        allProducts = allProducts[0]
        return view.render('admin/products/all', {allProducts})
        } catch (error) {
            console.log(error)
            return response.redirect('back')
            
            // `<h1>There was an error</h1>
            //  <h3>${error.sqlMessage}</h3>
            //  `
        }
      
    }
    async store({request, response}){
        try {
            const post = request.post()
        await Database.raw(`INSERT INTO products (title, sku, img_url, material, description, brand_id, qty, size, user_id)
        Values('${post.title}', '${post.sku}', '${post.img_url}','${post.material}', '${post.description}', 1, ${post.qty}, 1, 1)
        `)
        
        return response.redirect('/admin/products')
        } catch (error) {
            console.log(error)
            return response.redirect('back')
            
            // `<h1>There was an error</h1>
            //  <h3>${error.sqlMessage}</h3>
            //  `
        }
    }
    create({view, request, response}){
        return view.render('admin/products/create') 
    }

    async edit({view, request, response, params}){
        // return view.render('admin/products/edit')
        
        try {
            let product = await Database.raw(`
            SELECT products.id, products.title, products.sku, products.img_url, products.description, brands.title as brand, concat(users.f_name, ' ', users.l_name) as user, products.material, products.qty, products.size, products.user_id, products.created_at
            FROM products
            INNER JOIN brands
            ON products.brand_id = brands.id
            INNER JOIN users
            ON products.user_id = users.id
            WHERE products.id = ${params.id}
            ORDER BY created_at ASC
            LIMIT 1
        `)
        
        product = product[0][0]
        return view.render('admin/products/edit', {product})
        } catch (error) {
            console.log(error)
            return response.redirect('back')
            
            // `<h1>There was an error</h1>
            //  <h3>${error.sqlMessage}</h3>
            //  `
        }       
    }
    async delete({request, response, params}){
        try {
            const id = params.id
        await Database.raw(`
        DELETE FROM products
        WHERE id = ${id}
        `)
        return response.redirect('/admin/products')
        } catch (error) {
            console.log(error)
            return response.redirect('back')
            
        }    
    }
    async show({view, request, response, params}){
    
        try {
            let product = await Database.raw(`
            SELECT products.id, products.title, products.sku, products.img_url, products.description, brands.title as brand, concat(users.f_name, ' ', users.l_name) as user, products.material, products.qty, products.size, products.user_id, products.created_at
            FROM products
            INNER JOIN brands
            ON products.brand_id = brands.id
            INNER JOIN users
            ON products.user_id = users.id
            WHERE products.id = ${params.id}
            ORDER BY created_at ASC
            LIMIT 1
        `)
        
        product = product[0][0]
        return view.render('admin/products/show', {product})
        } catch (error) {
            console.log(error)
            return response.redirect('back')
            
            // `<h1>There was an error</h1>
            //  <h3>${error.sqlMessage}</h3>
            //  `
        }
    }
    
    async update({request, response, params, }){
        try {
            const id = params.id
            const post = request.post()
        await Database.raw(`UPDATE products
        SET 
        title = '${post.title}', 
        sku = '${post.sku}',
        img_url =  '${post.img_url}',
        material = '${post.material}',
        description = '${post.description}', 
        brand_id = 1, 
        qty = ${post.qty},
        size = 1,
        user_id = 1
        WHERE id = ${id}
        `)
        
        return response.redirect(`/admin/products/${id}`)
        } catch (error) {
            console.log(error)
            return response.redirect('back')
            
        }  
    }
    
}

module.exports = ProductController

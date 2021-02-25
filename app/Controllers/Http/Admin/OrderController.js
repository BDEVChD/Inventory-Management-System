'use strict'
const Database = use('Database')
const sanitize = require('sqlstring');

class orderController {
    async index({view, request, response}){
        try {
        //     let allorders = await Database.raw(`
        //     SELECT orders.id, orders.title, orders.sku,brands.title as brand, concat(users.f_name, ' ', users.l_name) as user, orders.material, orders.qty, orders.size, orders.user_id, orders.created_at
        //     FROM orders
        //     INNER JOIN brands
        //     ON orders.brand_id = brands.id
        //     INNER JOIN users
        //     ON orders.user_id = users.id
        //     ORDER BY created_at ASC
        // `)

        let allorders = ''
        return view.render('admin/orders/all', {allorders})
        } catch (error) {
            console.log(error)
            return response.redirect('back')
            
        
        }
      
    }
    async store({request, response}){
        try {
            const post = request.post()
        await Database.raw(`INSERT INTO orders (title, sku, img_url, material, description, brand_id, qty, size, user_id)
        Values('${post.title}', '${post.sku}', '${post.img_url}','${post.material}', '${post.description}', '${post.brand_id}', ${post.qty}, '${post.size}', 1)
        `)
        
        return response.redirect('/admin/orders')
        } catch (error) {
            console.log(error)
            return response.redirect('back')
            
        
        }
    }
    async create({view, request, response}){
        let brands= await Database.raw(`
            SELECT * FROM brands
            ORDER BY brands.title ASC
            
    `)
            brands = brands[0]
        return view.render('admin/orders/create', {brands}) 
    }

    async edit({view, request, response, params}){
        try {
            let order = await Database.raw(`
            SELECT orders.id, orders.title, orders.sku, orders.img_url, orders.description, brands.title as brand, concat(users.f_name, ' ', users.l_name) as user, orders.material, orders.qty, orders.size, orders.user_id, orders.brand_id, orders.created_at
            FROM orders
            INNER JOIN brands
            ON orders.brand_id = brands.id
            INNER JOIN users
            ON orders.user_id = users.id
            WHERE orders.id = ${params.id}
            ORDER BY created_at ASC
            LIMIT 1
        `)
        
        order = order[0][0]


        let brands= await Database.raw(`
            SELECT * FROM brands
            ORDER BY brands.title ASC
            
    `)
            brands = brands[0]
        


        return view.render('admin/orders/edit', {order, brands})
        } catch (error) {
            console.log(error)
            return response.redirect('back')
            
            
        }  
      
        
           
    }
    async delete({request, response, params}){
        try {
            const id = params.id
        await Database.raw(`
        DELETE FROM orders
        WHERE id = ${id}
        `)
        return response.redirect('/admin/orders')
        } catch (error) {
            console.log(error)
            return response.redirect('back')
            
        }    
    }
    async show({view, request, response, params}){
    
        try {
            let order = await Database.raw(`
            SELECT orders.id, orders.title, orders.sku, orders.img_url, orders.description, brands.title as brand, concat(users.f_name, ' ', users.l_name) as user, orders.material, orders.qty, orders.size, orders.user_id, orders.created_at
            FROM orders
            INNER JOIN brands
            ON orders.brand_id = brands.id
            INNER JOIN users
            ON orders.user_id = users.id
            WHERE orders.id = ${params.id}
            ORDER BY created_at ASC
            LIMIT 1
        `)
        
        order = order[0][0]



        return view.render('admin/orders/show', {order})
        } catch (error) {
            console.log(error)
            return response.redirect('back')
            
            
        }
    }
    
    async update({request, response, params, }){
        try {
            const id = params.id
            const post = request.post()
        await Database.raw(`UPDATE orders
        SET 
        title = '${post.title}', 
        sku = '${post.sku}',
        img_url =  '${post.img_url}',
        material = '${post.material}',
        description = '${post.description}', 
        brand_id = '${post.brand_id}', 
        qty = ${post.qty},
        size = 1,
        user_id = 1
        WHERE id = ${id}
        `)
        
        return response.redirect(`/admin/orders/${id}`)
        } catch (error) {
            console.log(error)
            return response.redirect('back')
            
        }  
    }
    
}

module.exports = orderController

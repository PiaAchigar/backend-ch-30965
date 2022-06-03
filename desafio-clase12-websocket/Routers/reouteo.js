//------- Dependencies -------
const fs = require('fs');
const express = require('express');
const { Router } = express;


//-------- Modules --------
const Contenedor = require('../Container.js');

//------- Router --------
let productList = new Contenedor();

productList.idStarter();

const productosRouter = Router();


productosRouter.get('', async (req, res) => {

    // if (productList.getLast().id < req.query.idNumber) {
    //     return res.status(200).render('error', { message: 'This product is not available' })
    // } else if (!req.query.idNumber) {
    //     return res.status(200).render('products', { productList });
    // } else if (req.query.idNumber) {
    //     return res.status(200).json(productList.getById(req.query.idNumber))
    // }
})

// productosRouter.get('/:idNumber', (req, res) => {    
//     return res.status(200).json(productList.getById(req.params.idNumber));    
// })

// productosRouter.post('', ( req, res, next) => {

//     res.status(200).json(productList.newProduct(req.body.title, Number(req.body.price), req.body.thumbnail))
    
//     productList.exportProducts();

//     console.log('Response successful');

//     next();
// })

// productosRouter.get('/refreshList', (req, res, next) => {
//     res.json(productList.getAll());
//     next();
// })

// productosRouter.post('/put', (req, res, next) => {

//     let productToModify = productList.getById(Number(req.body.id));
  
//     if (req.body.title) { productToModify.title = req.body.title }
//     if (req.body.price) { productToModify.price = Number(req.body.price) }
//     if (req.body.thumbnail) { productToModify.thumbnail = req.body.thumbnail }

    
//     productList.getAll().splice(req.body.id, 1, productToModify);

//     res.status(200).json(productList.getById(req.body.id));

//     productList.exportProducts();

//     console.log('Response successful');
    
//     next()
// })

// productosRouter.post('/delete', (req, res, next) => {

//     res.status(200).json(productList.deleteById(Number(req.body.id)));

//     productList.exportProducts();

//     console.log('Response successful');

//     next();
// })


module.exports = productosRouter
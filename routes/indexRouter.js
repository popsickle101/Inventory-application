
const { Router } = require("express");
const pool=require('../db/pool.js')





const indexRouter = Router();
const itemsController = require('../controllers/itemscontroller.js');

indexRouter.get("/", (req, res) => res.render('homepage'))



indexRouter.get('/items', itemsController.getAllItems);


indexRouter.post('/items/add', async (req, res) => {
    const itemId = req.body.id;
    const itemName=req.body.name;
    const itemDesc=req.body.description;
    const itemQuantity=req.body.quantity;
  
    try {
        await pool.query('INSERT INTO orders (id,name,description,quantity) VALUES ($1,$2,$3,$4)', [itemId,itemName,itemDesc,itemQuantity]);
        res.redirect('/orders');
    } catch (err) {
        if (err.code === '23505') {
            // Duplicate key error
            res.send('Item already added' );
          }
          else{
        console.error(err);
        res.send('Error adding item to order');
          }
    }
});

indexRouter.post('/orders/:id/delete', async (req, res) => {
    const orderId = req.params.id;
    try {
        await pool.query('DELETE FROM orders WHERE id = $1', [orderId]);
        res.redirect('/orders');
    } catch (err) {
        console.error(err);
        res.send('Error deleting order');
    }
});

indexRouter.get("/orders",itemsController.showAllItems)




module.exports = indexRouter;

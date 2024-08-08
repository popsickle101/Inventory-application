
const pool = require('../db/pool.js');


exports.getAllItems = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM items');
  
    
    res.render('itempage', { items: rows });
  } catch (error) {
    
      
    res.status(500).json({ error: 'Item already added' });
      
  }
};

exports.showAllItems=async(req,res) =>{
  try {
    const { rows } = await pool.query('SELECT * FROM orders');
  
    
    res.render('orderpage', { orders: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const errors = require('restify-errors');
const Customer = require('../models/Customer');

module.exports = server => {
    // Get Customers
    server.get('/customers', async (req, res, next) => { 
        try{
            const customers = await Customer.find({});
            res.send(customers);
            next();
        } catch(err){
            return next(new errors.InvalidContentError(err));
        }        
    });

    // Add Customers
    server.post('/customers', async (req, res, next) => {
        // cek json data
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const { name , email, balance } = req.body;

        const customers = new Customer({
            name,
            email,
            balance
        });

        try {
            const newCustomer = await customers.save();
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }
    });
};


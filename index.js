const express = require('express')
const app = express()
const server = require('http').createServer(app);
const db = require('./mongo_crud_methods');
const central_err_handler = require('./central_error_handler')

const bodyParser = require('body-parser')
app.use(bodyParser());

app.use(central_err_handler);

//get all API
app.get('/get_all', async (req, res) => {
    try {
        const result = await db.find_all('test_collection')
        return res.status(200).jsonp(result)
    } catch (err) {
        return res.status(400).jsonp({ err: err.message })
    }
});

//get one API
app.get('/get_one', async (req, res) => {
    try {
        const result = await db.find_by_id('test_collection',req.body.id)
        return res.status(200).jsonp(result)
    } catch (err) {
        send_err_res(400,err,res)
    }
});

//insert one API
app.post('/insert', async (req, res) => {
    try {
        const result = await db.insert('test_collection', req.body)
        return res.status(201).jsonp(result)
    } catch (err) {
        send_err_res(400,err,res)
    }
});

//update one API
app.put('/update', async (req, res) => {
    try {
        const update_body = {name:req.body.name}
        const result = await db.update_by_id('test_collection', req.body.id,update_body)

        return res.status(200).jsonp(result)
    } catch (err) {
        send_err_res(400,err,res)
    }
});

//delete one API
app.delete('/delete', async (req, res) => {
    try {
        const result = await db.delete_by_id('test_collection', req.body.id)

        return res.status(200).jsonp(result)
    } catch (err) {
        send_err_res(400,err,res)
    }
});

server.listen(process.env.PORT || 8080, () => {
    console.log('server running...at 8080');
});


const express = require('express');
const Producto = require("../models/producto");
const app = express();


app.get("/productos", (req, res) => {

    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);


    Producto.find({ prodState: true })
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Producto.count({ prodState: true }, (err, conteo) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                res.json({
                    ok: true,
                    productos,
                    total_productos: conteo
                });
            });
        })



})


app.post("/productos", function(req, res) {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioVenta: body.precioVenta,
        precioCompra: body.precioCompra,
        existencia: body.existencia,
        descripcion: body.descripcion,
        img: body.img,
        prodState: body.userState,
    })

    producto.save((err, productoBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            producto: productoBD
        });
    })



})


app.put('/productos/:id', function(req, res) {
    let id = req.params.id;
    let body = req.body;

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    })
})

app.delete('/productos/:id', function(req, res) {

    let id = req.params.id;
    let cambiaEstado = {
        prodState: false
    }

    Producto.findByIdAndUpdate(id, cambiaEstado, { new: true, runValidators: true }, (err, productoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            producto: productoBorrado
        });
    })

})



module.exports = app;
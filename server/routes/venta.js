const express = require("express");

let app = express();

let Venta = require("../models/venta");


app.get("/ventas", (req, res) => {

    let desde = req.query.desde || 0;
    let limite = req.query.limite || 1000;

    desde = Number(desde);
    limite = Number(limite);


    Venta.find({ ventasState: true })
        .skip(desde)
        .limit(limite)
        .exec((err, ventas) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Venta.count({ ventasState: true }, (err, conteo) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                res.json({
                    ok: true,
                    ventas,
                    total_ventas: conteo
                });
            });
        })



})


app.post("/ventas", function(req, res) {

    let body = req.body;

    let venta = new Venta({
        _id: body._id,
        fecha: body.fecha,
        hora: body.hora,
        productos: body.productos,
        total: body.total,
        subtotal: body.subtotal,
        iva: body.iva,
        ventasState: body.ventasState,
    })


    venta.save((err, ventaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            venta: ventaDB
        });
    })



})


app.put('/ventas/:id', function(req, res) {
    let id = req.params.id;
    let body = req.body;
    Venta.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, ventaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            venta: ventaDB
        });
    })
})

app.delete('/ventas/:id', function(req, res) {

    let id = req.params.id;
    let cambiaEstado = {
        ventasState: false
    }

    Venta.findByIdAndUpdate(id, cambiaEstado, { new: true, runValidators: true }, (err, ventaBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            venta: ventaBorrada
        });
    })

})



module.exports = app;
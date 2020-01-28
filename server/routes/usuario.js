const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const _ = require('underscore')
const Usuarios = require('../models/usuario');
const Cate = require('../models/categoria2');
const Produ = require('../models/producto');

app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuarios.find({}, 'nombre email role google img')
        .limit(limite)
        .skip(desde)
        .exec((err, usuario) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err

                });
            }
            Usuarios.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuario

                });

            });


        });
});
app.post('/usuario', function(req, res) {
    let body = req.body;
    let usuario = new Usuarios({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        img: body.img
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });


});
app.post('/categoria', function(req, res) {
    let body = req.body;

    let categoria = new Cate({
        nombre: body.nombre
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });


});
app.post('/producto', function(req, res) {
    let body = req.body;

    let producto = new Produ({
        nombre: body.nombre,
        PrecioUni: body.PrecioUni,
        disponibilidad: body.disponibilidad
    })
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        });
    });


});
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    Usuarios.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    Usuarios.findByIdAndRemove(id, (err, usuarioborrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (usuarioborrado === null) {
            return res.status(400).json({
                ok: true,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioborrado
        });

    });

});

module.exports = app;
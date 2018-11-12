//============================
//Puert
//============================

process.env.PORT = process.env.PORT || 3000;

//=======================
//Entorno
//====================

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//===================
//Base de datos
//==================

let urlDB;

if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/PuntoDeVenta";
} else
    urlDB = "mongodb://PVenta-User:Pa55word@ds125892.mlab.com:25892/punto_de_venta_bd"

process.env.URLDB = urlDB;
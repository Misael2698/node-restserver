//=============================
//PUERTO
//=============================
process.env.PORT = process.env.PORT || 3000;
//=============================
//Base de datos
//=============================
// let urlDB;
// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/cafe';
// } else {
//     urlDB = 'mongodb+srv://cafe_user:misael12345@clusters-tju3j.gcp.mongodb.net/cafe';
// }
urlDB = 'mongodb+srv://cafe_user:misael12345@clusters-tju3j.gcp.mongodb.net/cafe';
process.env.URLDB = urlDB;
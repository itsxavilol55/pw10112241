let express = require('express');
let mysql = require('mysql');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

let conexion = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'pwdata'
    }
);

conexion.connect(function(error){
    if(error)
        throw error;
    console.log('conectado a la base de datos')
});
app.get("/",function(req,res){
    res.send('rutas de inicio');
});

app.listen(3000, function(){
    console.log('Servidor listo');
});
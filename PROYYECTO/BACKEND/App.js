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
        database: 'pwdata',
        port: '8080'
    }
);
conexion.connect(function(error){
    if(error)
        console.log('hubo un error');
    else
        console.log('conectado a la base de datos');
});
app.get('/api/clientes/',(req,res)=>{
    conexion.query('select * from clientes',(error,fila)=>{
        if(error)
        console.log('hubo un error al pedir datos');
    else
        res.send(fila)
    });
});
app.get('/api/clientes/:id',(req,res)=>{
    conexion.query('select * from clientes where id=?',[req.params.id],
    (error,fila)=>{
        if(error)
        console.log('hubo un error al pedir datos');
    else
        res.send(fila)
    });
});
app.delete('/api/clientes/:id',(req,res)=>{
    conexion.query('delete from clientes where id=?',[req.params.id],
    (error,fila)=>{
        if(error)
        console.log('hubo un error al pedir datos');
    else
        res.send(fila)
    });
});
app.post('/api/clientes',(req,res)=>{
    let data = {
        id: req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        rfc: req.body.rfc,
        curp: req.body.curp,
        cp: req.body.cp
    }
    let sql = "insert into clientes set ?";
    conexion.query(sql,data,
    (error,resultado)=>{
        if(error)
        console.log('hubo un error al pedir datos');
    else
        res.send(resultado)
    });
});
app.get("/",function(req,res){
    res.send('rutas de inicio');
});
app.listen(3000, function(){
    console.log('Servidor listo');
});

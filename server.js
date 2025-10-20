const express = require('express');
const fs =require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())
 //endpoint recibe datos del formulario
app.post('/api/form',(req,res) => {
    const { name, email, blockchain} =
    req.body;

console.log('Datos recibidos desde el front')
console.log(`Nombre: ${name}`);
console.log(`Email: ${email}`);
console.log(`Conoce blockchain: ${blockchain}`);


//Save data
const db =
JSON.parse(fs.readFileSync('db.json', 'utf8'));
db.usuarios.push({name, email,blockchain});
fs.writeFileSync('db.json', JSON.stringify(db,null,2));

res.json({
    success:true,
    message: `Gracias ${name}, tus datos fueron guardados correctamente.`
});
});
//fin endpoint

//init server
 app.listen(3000, ()=> console.log('-servidor corriendo en http://localhost:3000'));


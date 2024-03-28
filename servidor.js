const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 5000

//middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/formulario', (req, res) => {
    console.log(req.body);
    const { ID, nombre, apellido, titulo, autor, editorial, año } = req.body
    if (!ID || !nombre || !apellido || !titulo || !autor || !editorial || !año) {
        return res.redirect('/error.html')
    }
    const contenido = `${ID},${nombre},${apellido},${titulo},${autor},${editorial},${año}\n`;

    fs.writeFile(path.join(__dirname, 'data', `id_${ID}.txt`), contenido, (err) => {
        if (err) {
            console.error('Error al escribir el archivo:', err);
            return res.status(500).send('Error interno del servidor');
        }
        //res.redirect('/exito.html')
        res.download(path.join(__dirname, 'data', `id_${ID}.txt`));
    });
});

app.listen(port, () => console.log(`Servidor funcionando en el puerto: ${port}`))
//express
const express = require('express')
const app = express()
const port = 3000

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mbtitest', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
     console.log('mongoose connected')
}).catch(err => {
     console.log('mongoose connection failed')
}) 

//ejs
const ejsMate = require('ejs-mate')
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));





app.get('/', (req, res) => {
  res.send('Hello World!')
})





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
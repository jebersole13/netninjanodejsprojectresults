const express = require('express');
const morgan = require('morgan');
const mongoose= require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//express app

const app = express();
//listen for request

//con

const dbURI = 'mongodb+srv://redleader:KnXBh8M2hxS6fxyw@cluster0.m4zky8i.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));

//register view engine
app.set('view engine','ejs');



//middleware static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


app.get('/',(req, res) => {
res.redirect('/blogs');
});

app.get('/about',(req, res) => {
  //res.send('<p>West Philadelphia, born and raised<p>');
  res.render('about', {title: 'Aboot'});
  });
  
 

 //blog routes 
app.use('/blogs', blogRoutes);

  
//404 page must be at the bottom 

app.use((req,res)=>{
  res.status(404).render('404', {title: '404!!'});
})
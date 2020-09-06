const express = require('express');

const app = express();



// fat arrow function or anonymous function or lambda function, call back function
// asynscronous, syncronous
app.listen(5000, () => {
    console.log('Server started  on port 5000');
})

app.get('/', (req, res)=>{
    res.send('Home Page');
})



app.get('/contact', (req, res)=>{
    res.send('Contact');
})


// app.use('/about', (req, res) => {
    //     console.log('This is about midleware');
    // })
    
    
    // app.get('/about', (req, res)=>{
        //     res.send('about');
        // })
        
        // app.use('/blog', (req, res) => {
            //     console.log('This is blog midleware');
            // })
            
            
            // app.get('/blog', (req, res)=>{
                //     res.send('blog');
                // })
                
app.use('/', (req, res)=> {
    console.log('This is home midleware');
})

// app.use('/contact', (req, res) => {
//     console.log('This is contact midleware');
// })
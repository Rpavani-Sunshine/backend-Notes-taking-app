const express=require('express');
require('dotenv').config();
const sequelize=require('./connections/database');
const userRouter = require('./routes/userRoute');
const notesRouter = require('./routes/notesRoute');


app = express();
app.use(express.json());

// Routes
app.use("/auth", userRouter);
app.use("/notes", notesRouter);

// sync database
sequelize.sync()
.then(result=>{
    // console.log(result);
})
.catch(err=>{
    console.log(err);
});


//run server
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`port is running on ${PORT}`);
});
// Backend Code For Implement CURD endpoints for notes.

Step 1: 
 1. create folder backend and open it in to VS code editor. Open terminal
 and 
 RUN 
 >npm init.

 2. Then RUN 
 >npm install express.

 3. Create express server for app

 4. create connection folder and 
    install sequelize  : >npm i sequelize --save
    as well as install > npm i mysql2 

    create database.js file 
    Path: /connections/database.js 
      1. import sequelize 
      2. create mysql connection 
      3. export it

5. create model folder
   1. create userModel.js file 
   Path: /models/userModel.js 
      1. include database file in it.
      and create Model and Model_fields using define() method.
      2. export create userModel

6. Path: index.js.js 
   now using sync() method Sync all defined models to the DB.

7. create routes folder
   create userRoute.js file in it
      Path: /routes/userRoute.js 
      1. import express, bcrypyjs, jsonwebtoken, userModel.
      2. create endpoints for register and login user.

8. create one more file for notesModel.js in model folder
   Path: /models/notesModel.js 
   1. create Model and Model_fields using define() method.
   2. exported created Model

9. Create notesRoute.js in rotes folder
   Path: /routes/notesRoute.js 
   1. create endpoints for notes


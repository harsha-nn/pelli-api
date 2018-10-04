const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');

const app=express();
app.use(bodyParser.json());
app.use(cors());
const database={
    users:[
        {
            id:'t1234',
            name:'Jane Doe',
            email:"Jane@gmail.com",
            password:'Jane',
            match:"80%",
            age:"28",
            contact:0, 
            joined: new Date()           
        },
        {
            id:'t2345',
            name:'Suzzie Doe',
            email:"Suzzie@gmail.com",
            password:'Suzzie',
            match:"78%",
            age:"27",
            contact:0,
            joined: new Date()
        },
    ]
}

app.get('/', (req,res)=>{
    res.json(database.users);
})

app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;
    let found=false;
    database.users.forEach(user=>{
        if(user.id===id){
            found=true;
           return  res.json(user)
        }         
    })
    if(!found) {
        return  res.status(404).json("Not found");
      }
})

app.get('/viewMoreProfiles',(req,res)=>{
    res.json(database.users)
})

app.put('/viewContact',(req,res)=>{
    const {id}=req.body;
    let found=false;
    database.users.forEach(user=>{
        if(user.id===id){
            found=true;
            user.contact++;
           return  res.json(user.contact)
        }         
    })
    if(!found) {
        return  res.status(404).json("Not found");
      }
})

app.post('/signin',(req,res)=>{
    // console.log( "request email, password", req.body.email, req.body.password);
    // console.log("database email, password", database.users[0].email, database.users[0].password)
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.status(200).json(database.users[0]);
    }else
    {
        throw err;
        res.status(404).json("FAILED");
    }
})

app.post('/register',(req,res)=>{
    const {email,name,password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash)
    });
    database.users.push({
        id:'t23456',
        name:name,
        email:email,
        password:password,
        match:"78%",
        age:"27",
        contact:"999-999-9999",
        joined: new Date()
    })
    res.json(database.users[database.users.length -1 ])
})

app.listen(3001,()=>{
    console.log("App is running on port 3000");
});

/*

Get:-

/ --> Home page
/profile/:id --> Get user's profile = returns User{}
/viewMoreProfiles --> Get more profiles => returns arry of user objects
/listContacts --> Get list of profiles the user viewed contacts

Post:-

/signin --> success/fail
/register --> user {}

Put:-
/viewContact --> return user.phoneNumber
/updatePreferences/:id --> updates user preferences -> return user {}

*/
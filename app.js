const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
const SECRET = "orozco"

app.get('/api', (req, res) => {
  res.json({msg: `Welcome to the API`})
})



//This gets the token back
app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: "Amber",
    email: "ambie.j210@gmail.com"
  }
  //usually taken in payload and secret
  jwt.sign({user}, SECRET, {expiresIn: '30s'},(err, token)=> {
    res.json({
      token
    })
  })
})

//verify token 
// Format of token Authorization: Bearer <access_token>
const verifyToken = (req, res, next) => {
  //get auth header value
  const bearerHeader = req.headers[`authorization`]
  //ceck if bearer is undefined
  if(typeof bearerHeader !== undefined){
    const bearer = bearerHeader.split(' ');
    //get token from array
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next()
  } else {
  
    res.sendStatus(403).json({msg: `FORBIDEN`})
  }
}
//!verify
app.post('/api/posts', verifyToken, (req, res)=> {
  jwt.verify(req.token, SECRET, (err, authData)=> {
    if(err){
      res.sendStatus(403)
    } else {
      res.json({msg: `Post Created`, authData})
      
    }
  })
})
const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`))
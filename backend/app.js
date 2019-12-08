const express = require('express')
const bodyParser = require('body-parser')
const cp = require('systeminformation')
const app = express()
const port = 4000
const sequelize = require('sequelize');
const db = require('./models')
const cors = require('cors');

// zmienne  z systeminfo
let proc1;
  

// SERVER
var konwersja = function(val){
  return parseFloat((val)/Math.pow(1024,3)).toFixed(2);
}
var dane = function (){
let proc = {'modelkomp':'',
'modelproc':'',
'speedavg':'',
memtotal:'',
memfree:'',
memused:'',
    battery:'',
    disk1:'',
    disk2:''
   
   
  }
  //definicja model
 cp.system().then(function(x){

    proc.modelkomp = x.manufacturer +' '+x.model;

 }).then(


cp.cpu().then(function(x){
   
  proc.modelproc = x.manufacturer+' '+x.brand   ;


})).then(


cp.cpuCurrentspeed(function(x){
proc.speedavg = x.avg;
})).then(


cp.mem(function(x){
      
  proc.memtotal = konwersja(x.total);
  proc.memfree = konwersja(x.free);
  proc.memused = konwersja(x.used);
})).then(


cp.battery(function(x){
  proc.battery = x.percent
})).then(

cp.diskLayout(function(s){
  
  proc.disk1 =  konwersja(s[0].size)
  proc.disk2 =   konwersja(s[1].size)

})).then(function(){
  
  proc1 = proc;

})
return proc;

}
dane()


dodaj = function(){
  //console.log(proc1)
  const { modelkomp, modelproc, speedavg, memtotal, memfree, memused, battery, disk1, disk2} = proc1
    const userid = 1;
    //Math.floor(Math.random() * 8)+1
    console.log(userid+ ' ---------------------------------------------------------------------------------------------------------------------------------------')
  db.dane.create({ modelkomp, modelproc, speedavg, memtotal, memfree, memused, battery, disk1, disk2, userid})
    
}
useek = function(){
 let ek = { firstName : 'Krystian', lastName : 'Krasiński', email :'łodyga@gmail.com', nick:'KociDestroyer' }
  const { firstName, lastName, email, nick} = ek
 
  db.uzytko.create({  firstName, lastName, email, nick})
    console.log({ firstName, lastName, email, nick})
}

//setInterval(function(){dodaj()},10000);
var server = app.listen(port, () => console.log(`sExample app listening on port ${port}!`))

app.use(bodyParser.json());
const jsonParser = bodyParser.json()

app.use(cors())

app.use(function(req, res, next) {
  if (req.headers.authorization == 'XYZ' || req.headers.authorization == 'root') {
    next();
  }
  else{
    return res.status(403).json({ error: 'Invalid or missing credentials!' });
  }

});

app.get('/', (req, res) => {
  res.send(':)')
  })


  // /--------------------------------------------------------------------
var czas_pracy = function(ev){
 var czas =  Math.floor((ev*2.4)/60);
  var min =  Math.floor((ev*2.4)-(czas*60));

return {czas, min}
} 



  app.get('/oblicz/:id', (req, res) => {
const idz = parseInt(req.params.id);

    res.send(czas_pracy(idz))
    })

    
  //dev tools
  app.post('/add', jsonParser, (req, res) => {
    const { modelkomp, modelproc, speedavg, memtotal, memfree, memused, battery, disk1, disk2} = req.body
    
        return db.Track.create({ modelkomp, modelproc, speedavg, memtotal, memfree, memused, battery, disk1, disk2})
      .then(console.log(req.body))
      .then((track) => res.send(track))
      .catch((err) => {
        console.log('Can not create a track!', JSON.stringify(track))
        return res.status(400).send(err)
      })
      
  })




  app.get('/get', function(req, res){

    return db.dane.findAll({ 
      })
    .then((dane) => res.send(dane))
    .catch((err) => {
      console.log('Brak danych', JSON.stringify(err))
      return res.send(err)
    })
  })

  app.get('/stat', function(req, res){

    return db.uzytko.findAndCountAll({
      attributes: ['nick','firstName','lastName','email','updatedAt'],
      include: [
        { model: db.dane}
     ],
     group: ['nick']
   })
    .then((dane) => res.send(dane))
    .catch((err) => {
      console.log('Brak danych', JSON.stringify(err))
      return res.send(err)
    })
  })


  app.get('/user', function(req, res){

    return db.uzytko.findAll({ 
      })
    .then((dane) => res.send(dane))
    .catch((err) => {
      console.log('Brak danych', JSON.stringify(err))
      return res.send(err)
    })
  })

  app.post('/post', jsonParser, (req, res) => {
    const { firstName, lastName, email, nick } = req.body
        return db.uzytko.create({ firstName, lastName, email,nick })
      .then((us) => res.send(us))
      .catch((err) => {
        console.log('nie mozna utworzyc uzytkownika', JSON.stringify(err))
        return res.status(400).send(err)
      })
  
  })

  app.use(function(req, res, next) {
    if ( req.headers.authorization == 'root') {
      next();
    }
    else{
      return res.status(403).json({ error: 'Invalid or missing credentials!' });
    }
  
  });

  app.put('/put/:id', jsonParser, (req, res) => {
    const id = parseInt(req.params.id)
    return db.uzytko.findByPk(id)
    .then((uz) => {
      if ( uz === null ) {
        return res.status(400).send("brak użytkownika")
      }
      const { firstName, lastName, email, nick } = req.body
      return db.uzytko.update({ firstName, lastName, email, nick }, {where: {
        id: id
      } })
        .then(s => res.send({mess:"edycja poprawna" }))
        .catch((err) => {
          console.log('edycja nie powiodla sie ', JSON.stringify(err))
          res.status(400).send(err)
        })
    })
  })

  app.del('/delet', (req, res) => {
 res.send('do testów tokenu')
  })

  app.put('/update', (req, res) => {
   res.send('do testów tokenu')
     })

  app.delete('/del/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.dane.findByPk(id)
      .then((s) => s.destroy({ force: true }))
      .then(() => res.send({ id }))
      .catch((err) => {
        console.log('nie mozna usunac', JSON.stringify(err))
        res.status(400).send(err)
      })
  })

  app.delete('/deluser/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.uzytko.findByPk(id)
      .then((s) => s.destroy({ force: true }))
      .then(() => res.send({ id,mess:"udało się usunąć" }))
      .catch((err) => {
        console.log('nie mozna usunac', JSON.stringify(err))
        res.status(400).send(err)
      })
  })


  module.exports = {
    konwersja: konwersja,
     czas_pracy:   czas_pracy,
     server: server
  
  }

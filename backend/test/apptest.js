const request = require('supertest')
const { expect } = require('chai')
//const index = require('../app.js');
assert = require('assert');
const chaiExclude = require('chai-exclude');
let chai = require('chai');
let should = chai.should();


  describe('testy expresa', () => {
beforeEach(() => index = require('../app.js').server)
 afterEach(() => index.close())
  
    it('odrzucone połączenie bez autentykacji', (done) => {
      request(index)
        .get('/')
        .expect(403, done)
    })

    it('połączenie z tokenem podstawowym', (done) => {
        request(index)
          .get('/')
          .set('Authorization', 'XYZ')
          .expect(200, done)
      })

      it('połączenie z tokenem podstawowym do autoryzacji wyższego poziomu - usuwanie', (done) => {
        request(index)
          .delete('/delet')
          .set('Authorization', 'XYZ')
          .expect(403, done)
      })

      it('połączenie z tokenem podstawowwym do autoryzacji wyższego poziomu - edycja', (done) => {
        request(index)
          .put('/update')
          .set('Authorization', 'XYZ')
          .expect(403, done)
      })

      it('połączenie z tokenem root do autoryzacji podstawowej', (done) => {
        request(index)
          .get('/get')
          .set('Authorization', 'root')
          .expect(200, done)
      })

      it('połączenie z tokenem root do autoryzacji wyższego poziomu - usuwanie', (done) => {
        request(index)
          .delete('/delet')
          .set('Authorization', 'root')
          .expect(200, done)
      })
    
      it('połączenie z tokenem root do autoryzacji wyższego poziomu - edycja', (done) => {
        request(index)
          .put('/update')
          .set('Authorization', 'root')
          .expect(200, done)
      })

})

describe('testy bazy danych', () => {
    beforeEach(() => index = require('../app.js').server)
     afterEach(() => index.close())
      
     it('test geta', (done) => {
  
    //get---------------------------------------------------------------------------------------------------------------------

    request(index)
      .get('/user')
      .set('Authorization', 'XYZ')
      .end((err, res) =>{
        res.should.have.property('status', 200);
        res.body.should.be.a('array');
       res.body[0].should.be.property('id' && 'firstName' && 'LastName' && 'email' && 'nick');
        //res.body.length.should.be.eql(0);
        done();
        
       
          })
       
      })
    
//post---------------------------------------------------------------------------------------------------------------------
      it('test posta', (done) => {
        let zmienna = {
          firstName: 'test',
          lastName: 'test',
          email: 'test',
          nick: 'test'
        }
    request(index)
      .post('/post')
      .set('Authorization', 'XYZ')
      .send(zmienna)
      .end((err, res) =>{
        const resolvingPromise = new Promise( (resolve) => {
          resolve('promise resolved');
         });
         resolvingPromise.then( (result) => {
          res.should.have.property('status', 200);
          res.body.should.have.property('firstName').eql('test');
          res.body.should.have.property('lastName').eql('test');
          res.body.should.have.property('email').eql('test');
          res.body.should.have.property('nick').eql('test');
      
          done()
  
         })
          })
       
      })

//delete---------------------------------------------------------------------------------------------------------------------
      it('test delete', (done) => {
        let zmienna = {
          firstName: 'testdel',
          lastName: 'testdel',
          email: 'testdel',
          nick: 'testdel'
        }
        let sid;
    request(index)
      .post('/post')
      .set('Authorization', 'XYZ')
      .send(zmienna)
      .end((err, res) =>{
        const resolvingPromise = new Promise( (resolve) => {
          resolve('promise resolved');
         });
         resolvingPromise.then( (result) => {
          res.should.have.property('status', 200);
          this.sid = res.body.id;
          
          request(index)
          .delete('/deluser/'+this.sid)
          .set('Authorization', 'root')
          .send(zmienna)
          .end((err, res) => {
            res.should.have.property('status', 200);
            res.body.should.be.a('object');
            res.body.should.have.property('mess').eql('udało się usunąć');
            done()
             });
     
         })
        
          })
      
      
      })

  //put---------------------------------------------------------------------------------------------------------------------

  it('test put', (done) => {
    let zmienna = {
      firstName: 'testdel',
      lastName: 'testdel',
      email: 'testdel',
      nick: 'testdel'
    }
    let sids;
request(index)
  .post('/post')
  .set('Authorization', 'XYZ')
  .send(zmienna)
  .end((err, res) =>{
    const resolvingPromise = new Promise( (resolve) => {
      resolve('promise resolved');
     });
     resolvingPromise.then( (result) => {
      res.should.have.property('status', 200);
      this.sids = res.body.id;
     
      request(index)
      .put('/put/' +   this.sids )
      .set('Authorization', 'root')
      .send({firstName: "poZmianiePut", lastName: "poZmianiePut", email: 'poZmianiePut', nick: 'poZmianiePut'})
      .end((err, res) => {
      
        res.should.have.property('status', 200);
        res.body.should.be.a('object');
        res.body.should.have.property('mess').eql('edycja poprawna');
        
      
        done()
        
         });
     })
    
      })



  })



  //del z blednym tokenem---------------------------------------------------------------------------------------------------------------------

  it('del z blednym tokenem', (done) => {
    let zmienna = {
      firstName: 'testdel',
      lastName: 'testdel',
      email: 'testdel',
      nick: 'testdel'
    }
    let sid;
request(index)
  .post('/post')
  .set('Authorization', 'XYZ')
  .send(zmienna)
  .end((err, res) =>{
    const resolvingPromise = new Promise( (resolve) => {
      resolve('promise resolved');
     });
     resolvingPromise.then( (result) => {
      res.should.have.property('status', 200);
      this.sid = res.body.id;
      
      request(index)
      .delete('/deluser/'+this.sid)
      .set('Authorization', 'XYZ')
      .send(zmienna)
      .end((err, res) => {
        res.should.have.property('status', 403);

        done()
         });
 
     })
    
      })
  
  
  })


  //put z blednym tokenem---------------------------------------------------------------------------------------------------------------------
  it('put z blednym tokenem', (done) => {
    let zmienna = {
      firstName: 'testdel',
      lastName: 'testdel',
      email: 'testdel',
      nick: 'testdel'
    }
    let sids;
request(index)
  .post('/post')
  .set('Authorization', 'XYZ')
  .send(zmienna)
  .end((err, res) =>{
    const resolvingPromise = new Promise( (resolve) => {
      resolve('promise resolved');
     });
     resolvingPromise.then( (result) => {
      res.should.have.property('status', 200);
      this.sids = res.body.id;
     
      request(index)
      .put('/put/' +   this.sids )
      .set('Authorization', 'XYZ')
      .send({firstName: "poZmianiePut", lastName: "poZmianiePut", email: 'poZmianiePut', nick: 'poZmianiePut'})
      .end((err, res) => {
      
        res.should.have.property('status', 403);
       
        done()
        
         });
     })
    
      })



  })



    })


//     describe('unit test'), () =>{
//       it('konwersja bajtów', (done) => {
//           var result = konwersja (10000000000)
// assert.equal(result, 10)
//       });

//     }
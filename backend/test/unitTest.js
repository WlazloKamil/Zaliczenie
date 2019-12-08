
// //const { expect } = require('chai')
// //const index = require('../app.js');
// //assert = require('assert');
// //const chaiExclude = require('chai-exclude');
// //let chai = require('chai');
// //let should = chai.should();
// const index = require('../app');
// const assert = require('chai').assert;
// const { expect } = require('chai');


//     describe('unit testy'), function(){
//       it('konwersja bajtów', function() {
//           // var result = index.konwersja(10000000000);
//           // expect(result).to.equal(10)
//       // assert.equal(result, 10);
//           done();
//       });

//     }

const { expect } = require('chai')
const konwersja = require('../app.js').konwersja
const czas = require('../app.js').czas_pracy

describe('Konwersja bajtów', () => {
  context('zmienne', () => {
  it('dobrze zamienia bajty na GB', () => {
    expect(parseInt(konwersja(10737418240))).to.equal(10)
    expect(parseInt(konwersja(24674455353))).to.equal(22)
    expect(parseInt(konwersja(53532568585))).to.equal(49)
    expect(parseInt(konwersja(53279693266))).to.equal(49)
    expect(parseInt(konwersja(97646463344))).to.equal(90)
  })

  
  it('dobrze oblicza czas pracy', () => {
    expect(czas(95).czas).to.equal(3)
    expect(czas(95).min).to.equal(48)

    expect(czas(12).czas).to.equal(0)
    expect(czas(12).min).to.equal(28)

    expect(czas(56).czas).to.equal(2)
    expect(czas(56).min).to.equal(14)

    expect(czas(1).czas).to.equal(0)
    expect(czas(1).min).to.equal(2)

    expect(czas(52).czas).to.equal(2)
    expect(czas(52).min).to.equal(4)

    expect(czas(99).czas).to.equal(3)
    expect(czas(99).min).to.equal(57)

    expect(czas(11).czas).to.equal(0)
    expect(czas(11).min).to.equal(26)
  })

  
})
})
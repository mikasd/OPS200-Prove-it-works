const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
  let httpServer = null;
  let pageObject = null;

  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after((done) => {
    httpServer.close();
    done();
  });

  it('should contain a <h1> element for the page title', () => { 
    return pageObject
      .evaluate(() => document.querySelector('h1').innerText)
      .then(headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal('Mortgage Calculator');
      });
  });

  it('should contain a principal input', () => 
      pageObject
      .wait()
      .then(expect('input[name=principal]').to.exist)
  );

  it('should contain an interest rate input', () => 
    pageObject
    .wait()
    .then(expect('input[name=interestRate]').to.exist)
  )

  it('should contain an loan term input', () => 
    pageObject
    .wait()
    .then(expect('input[name=loanTerm]').to.exist)
  )

  it('should contain an period input', () => 
    pageObject
    .wait()
    .then(expect('input[name=period]').to.exist)
  )

  it('should contain a button', () => {
      pageObject
      .wait()
      .then(expect('button#calculate').to.exist)
  })

  it('should correctly calculate mortgage', () =>
  pageObject
  .wait()
  .type('input[name=principal]', 300000)
  .type('input[name=interestRate]', 3.75)
  .type('input[name=loanTerm]', 30)
  .select('select[name=period]', 12)
  .click('button#calculate')
  .wait('#output')
  .evaluate(() => document.querySelector('#output').innerText)
  .then((outputText) => {
    expect(outputText).to.equal('$1389.35');
  })

  
).timeout(6500)

it('should correctly calculate mortgage', () =>
  pageObject
  .wait()
  .type('input[name=principal]', 500000)
  .type('input[name=interestRate]', 4.75)
  .type('input[name=loanTerm]', 15)
  .select('select[name=period]', 12)
  .click('button#calculate')
  .wait('#output')
  .evaluate(() => document.querySelector('#output').innerText)
  .then((outputText) => {
    expect(outputText).to.equal('$3889.16');
  })

  
).timeout(6500);
  // This is where your code is going to go
})
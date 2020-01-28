//1) Warm up
setTimeout(function () {
  console.log('TIMED OUT!');
}, 300);

//2) Full fill a promise
let promise = new Promise(function (fullfill, reject) {
  setTimeout(function () {
    fullfill('FULFILLED!');
  }, 300);
})

promise.then(function (fullfill) {
  console.log(fullfill)
})

//3) Reject a promise
let promise = new Promise(function (fullfill, reject) {
  setTimeout(function () {
    reject(new Error('REJECTED!'));
  }, 300);
})

function onReject(error) {
  console.log(error.message);
}

promise.then(null, onReject)

//4) To reject or not to reject
let promise = new Promise(function (fullfill, reject) {
  setTimeout(function () {
    fullfill('I FIRED');
    reject(new Error('I DID NOT FIRE'));
  }, 300);
})

function onRejected(error) {
  console.log(error.message);
}

promise.then(function (fullfill) { console.log(fullfill) }, onRejected)

//5) Always asynchronous
let promise = new Promise(function (fullfill) {
  fullfill('PROMISE VALUE');
})

promise.then(function (fullfill) { console.log(fullfill) })
console.log('MAIN PROGRAM');

//6) Shortcuts
let promise = Promise.reject(new Error('SECRET VALUE'));
promise.catch(function (err) {
  console.error('THERE IS AN ERROR!!!');
  console.error(err.message);
});


//7) Promise after promise
var firstPromise = first();

var secondPromise = firstPromise.then(function (val) {
  return second(val);
});

secondPromise.then(console.log);

//8) Values and promises
function attachTitle(name) {
  return 'DR. ' + name;
}

Promise.resolve('MANHATTAN')
  .then(attachTitle)
  .then(console.log);

//9)Throw an error
function parsePromised(json) {
  return new Promise(function (fulfill, reject) {
    try {
      fulfill(JSON.parse(json));
    } catch (e) {
      reject(e);
    }
  });
}

function onReject(error) {
  console.log(error.message);
}

parsePromised(process.argv[2])
  .then(null, onReject);

//10) An important rule
function iterate(num) {
  console.log(num);
  return num + 1;
}

function alwaysThrows() {
  throw new Error('OH NOES');
}

function onReject(error) {
  console.log(error.message);
}

Promise.resolve(iterate(1))
  .then(iterate)
  .then(iterate)
  .then(iterate)
  .then(iterate)
  .then(alwaysThrows)
  .then(iterate)
  .then(iterate)
  .then(iterate)
  .then(iterate)
  .then(iterate)
  .catch(onReject);

//11) Multiple promises
function all(a, b) {
  return new Promise(function (fulfill, reject) {
    var counter = 0;
    var out = [];

    a.then(function (val) {
      out[0] = val;
      counter++;

      if (counter >= 2) {
        fulfill(out);
      }
    });

    b.then(function (val) {
      out[1] = val;
      counter++;

      if (counter >= 2) {
        fulfill(out);
      }
    });
  });
}

all(getPromise1(), getPromise2())
  .then(console.log);

//12) Fetch JSON
var qhttp = require('q-io/http');

qhttp.read("http://localhost:1337")
  .then(function (json) {
    console.log(JSON.parse(json));
  })
  .then(null, console.error)
  .done()

//13) Do some work
var qhttp = require('q-io/http');

qhttp.read("http://localhost:7000/")
  .then(function (id) {
    return qhttp.read("http://localhost:7001/" + id);
  })
  .then(function (json) {
    console.log(JSON.parse(json));
  })
  .then(null, console.error)
  .done();
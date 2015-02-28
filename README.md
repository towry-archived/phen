# PHEN

`phen` is a lightweight Promise/A+ implemented library.

# API 

### .defer(worker)

defer a long time work, `worker` is a function that has two "helper": resolver, rejector. This method will return a promise object which can be used to be chained by `then` method.

Example:
```javascript
var promise = phen.defer(function (resolve, reject) {
	// will be excuted after 5s
	setTimeout(function () {
		var v = Math.rand(); // a random number

		if (v > .5) {
			resolve(v);
		} else {
			reject(v);
			// or reject("That's not the number I want!");
			// or reject(new Error("Wrong number!"));
		}
	}, 5000);
});
```

### .then(onFulfill, onReject)

Attach callbacks to be called when `promise` fulfilled or rejected. the `then` method will return a new promise object.

Example:
```
// this promise is from above example
// suppose it's fulfilled
promise.then(function (v) {
	console.log(v);
	return v;
}).then(function (v2) {
	console.log("another value: " + v2);
	return v2;
}).then(function (v3) {
	console.log("another another value: " + v3);
})

// or 
promise.then(function (v) {
	console.log(v);
	
	// return a new thing
	return v + 3;
}).then(function (v2) {
	console.log(v2); // v + 3
});

// or with onReject
// the promise is rejected
promise.then(null, function (reason) {
	console.log(reason);
	return 3;
}).then(function (v) {
	console.log(v); // 3
}, function (e) {
	// will not be here
});
```

# LICENSE

MIT License

---

Copyright 2015 Towry Wang

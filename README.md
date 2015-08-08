## seneca-nats-transport

[![NPM][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Seneca NATS transport.

[Seneca](http://senecajs.org/) is a microservices framework and [NATS](http://nats.io/) is 
an open-source, high-performance, lightweight cloud messaging system. This transport library
provides a publish-subscribe message distribution model.

### Installation

```
npm install seneca
npm install seneca-nats-transport
```

### Usage

[gnatsd server](http://nats.io/download/) **must** be up and running.

```javascript
// server.js

require('seneca')()
  .use('nats-transport')
  .add({role: 'foo', cmd: 'bar'}, function(msg, done) { return done(null, msg); })
  .listen({type:'nats'});
```

```javascript
// client.js

require('seneca')()
  .use('nats-transport')
  .client({type:'nats'})
  .act({role: 'foo', cmd: 'bar', arg1: 1, arg2: 2}, console.log);
```

*Run following commands*
```bash
./gnatsd
node server.js
node client.js
```

### License

Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.

[npm-url]: http://npmjs.org/package/seneca-nats-transport
[npm-image]: https://badge.fury.io/js/seneca-nats-transport.png

[travis-url]: https://travis-ci.org/cmfatih/seneca-nats-transport
[travis-image]: https://travis-ci.org/cmfatih/seneca-nats-transport.svg?branch=master
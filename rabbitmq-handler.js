var amqp = require('amqp');
var config = require('./config').config;

var connection;
var exchange;

var rabbitURL = 'amqp://' + config.credentials.user + ':' + config.credentials.pass + '@' + config.server.host + ':' + config.server.port;

var queueName = 'ps_test';

console.log(rabbitURL);

module.exports.connect = function(callback) {
    connection = amqp.createConnection(
        {url:rabbitURL},
        {defaultExchangeName:'test.topic'}
    );
  
    connection.on('ready', function() {
        console.log('Connected');
        // Do stuff with our connection
        exchange = connection.exchange(
            'test.topic', function(exchange) {
                console.log('Exchange ' + exchange.name + ' is open');
            }
        );
     
        // Invoke our callback and return
        return callback();
    });
    
    connection.on('error', function(err) {
        console.log(err);
    });
};

module.exports.setupQueue = function(callback, queueName, exchangeName, options) {
    connection.queue(queueName ? queueName : config.queue.default.name ,
                            options ? options : config.queue.default.options, 
                            function(queue) {
                                console.log('Queue ' + queue.name + ' is open');
        
                                queue.bind(exchangeName ? exchangeName : config.exchange.default, 
                                            config.queue.default.routing_pattern, 
                                            function() {
                                                console.log('Queue bound');
                                                return callback(queue);
                                            }
                                );
    });
};

module.exports.publish = function(topic, body, callback) {
    return exchange.publish(topic, body, {}, callback);
}

module.exports.subscribe = function(queue, callback) {
    queue.subscribe({ ack: true, prefetchCount: 0 }, function(message, headers, deliveryInfo, messageObject){
       console.log('Got message ' + deliveryInfo.routingKey); 
       callback(messageObject, message);
    });
};

module.exports.disconnect = function() {
    console.log('Disconnecting');
    
    return connection.disconnect();
};
var rabbit = require('./rabbitmq-handler');
var message = process.argv[2] || 'no message supplied';

console.log('rabbit on board [' + message +']');

rabbit.connect(function () {
    console.log('Rabbit connected');
    
    rabbit.setupQueue(function(queue) {
        console.log('Queue callback for [' + queue.name + ']');
        
        rabbit.publish('test.topic.ps_test.1', message, function() {
        console.log('Message published');
        rabbit.disconnect();
        });
        process.exit();
    }, 'bob_test');
    

});


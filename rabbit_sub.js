var rabbit = require('./rabbitmq-handler');

console.log('rabbit on board');

rabbit.connect(function () {
    console.log('Rabbit connected');
    
    rabbit.setupQueue(function(queue) {
        console.log('Queue callback');
        
        rabbit.subscribe(queue, function(messageObject, message) {
            console.log('Subscriber callback');
            console.log(message.data.toString('utf-8'));
            
           messageObject.acknowledge(false);
            
        });
    });
});
# node_rabbitmq

Key points

    sudo apt-get install rabbitmq-server

Rabbit mq needs to be running

    sudo rabbitmqctl status 
    sudo service rabbitmq-server start

You cannot connect with guest:guest - a new account needs to be created

    sudo rabbitmqctl add_user username password

The new account needs to have access enabled . N.B. Settings below are 'access all areas' and are not suitable for production.

    sudo rabbitmqctl set_permissions -p / username ".*" ".* ".*"
    
config.js should be modified to reflect the specific environment

Run rabbit_pub.js to emit a message . Passing quoted text will inlude that text as the body of the message. Listing queues should
show the default queue with a message

    sudo rabbitmqctl list_queues 
    
Run rabbit_sub.js to consume the queue . It should print the message . The consumer will continue to poll for messages, so if rabbit_pub.js 
is rerun the message should go straight to the consumer .


TODO
 - Move credentials out of config.js
 - Modify the emitter
 - Delayed message queues - https://www.rabbitmq.com/blog/2015/04/16/scheduling-messages-with-rabbitmq/
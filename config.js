module.exports.config = {
    server: {
        host:process.env.IP,
        port:'5672'
    },
    credentials: {
        user: 'developer',
        pass: 'rabbit'
    },
    exchange: {
        default: 'test.topic'
    },
    queue: {
        default: {
            name: 'ps_test',
            options: {
                durable: true,
                autoDelete: false
            },
            routing_pattern: 'test.topic.ps_test.*'
        }
    }
};
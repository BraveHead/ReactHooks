/**
 * @description 简单实现订阅、发布功能
 */
class PubSub {
    
    constructor() {
        this.init();
    }

    init() {
        this.events = new Map(); // 事件  { topicName: [ eventCallback ] }
    }

    getEvent(topic) {
        return  this.events.get(topic);
    }

    setEvent(topic, callback) {
        let topicEvents = this.getEvent(topic);
        if(topicEvents && topicEvents.size) {
            topicEvents.add(callback);
        } else {
            this.events.set(topic, new Set([callback]));
        }
    };

    subscribe(topic, callback) {
        this.setEvent(topic, callback);
    }

    publish(topic, message) {
        const topicEvents = this.getEvent(topic);
        topicEvents.forEach(element => {
            element(message);
        });
    }

    /**
     * 
     * @param {标识名} topic 
     * @param {订阅该消息的回调方法} callback 
     */
    unsubscribe(topic) {
        this.events.set(topic, new Set());
    }

    clearAll() {
        this.init();
    }
}

const pubsub = new PubSub();

pubsub.subscribe('test', (data) => {
    console.log('subscribe data:', data);
});

pubsub.publish('test', 'test data');

let i = 0;

const n = setInterval(() => {
    i++;
    if(i > 10) {
        // clearInterval(n);
        pubsub.unsubscribe('test');
    }
    pubsub.publish('test', 'test data2');
}, 1000);

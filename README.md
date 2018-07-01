# Queue

[![build:?](https://travis-ci.org/eyas-ranjous/datatructures-js/priority-queue.svg?branch=master)](https://travis-ci.org/eyas-ranjous/datatructures-js/priority-queue) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/priority-queue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/priority-queue.svg)](https://www.npmjs.com/packages/@datastructures-js/priority-queue) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue)

elements data type: any type.

## Usage
```js
const pQueueFn = require('@datastructures-js/priority-queue');
const pQueue = pQueueFn();
```

## API

**.enqueue(element, priority)** 

adds an element with priority (number) to the back of the queue.
```javascript
pQueue.enqueue('patient 1', 2); // lower priority
pQueue.enqueue('patient 2', 1); // higher priority
```

**.front()** 

returns the front element in queue.
```javascript
console.log(pQueue.front()); // patient 1
```

**.back()** 

returns the back element in the queue.
```javascript
console.log(pQueue.back()); // patient 3
```

**.dequeue()** 

dequeues the highest priority element from the queue.
```javascript
console.log(pQueue.dequeue()); // patient 2
console.log(pQueue.front()); // patient 1
```

**.isEmpty()** 

checks if the queue is empty.
```javascript
console.log(pQueue.isEmpty()); // false
```

**.length()** 

returns the length of the queue.
```javascript
console.log(pQueue.length()); // 1
```

**.toArray()** 

converts the queue to an array from highest prority element to lowest
```javascript
pQueue.enqueue('patient 3', 5);
pQueue.enqueue('patient 4', 1);
console.log(pQueue.toArray()); // ['patient 4', 'patient 1', 'patient 5']
```

**.clear()** 

clears the queue
```javascript
pQueue.clear();
console.log(pQueue.length()); // 0
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/queue/blob/master/LICENSE)

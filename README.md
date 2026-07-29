# @datastructures-js/priority-queue

## Docs
https://datastructures-js.info/docs/priority-queue

## fix
Fixes element positions in the queue in O(n) runtime.

```js
const { MinPriorityQueue } = require('@datastructures-js/priority-queue');

const first = { id: 1, priority: 1 };
const second = { id: 2, priority: 2 };
const queue = new MinPriorityQueue((value) => value.priority);

queue.enqueue(first);
queue.enqueue(second);
console.log(queue.front()); // { id: 1, priority: 1 }

second.priority = 0;
queue.fix();
console.log(queue.front()); // { id: 2, priority: 0 }
```

# @datastructures-js/priority-queue

[![build:?](https://travis-ci.org/datastructures-js/priority-queue.svg?branch=master)](https://travis-ci.org/datastructures-js/priority-queue) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/priority-queue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/priority-queue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue)

A performant priority queue implementation using a Heap data structure.

# Table of Contents
* [Install](#install)
* [require](#require)
* [import](#import)
* [API](#api)
  * [Construction](#construction)
  * [.enqueue(element[, priority])](#enqueueelement-priority)
  * [.front()](#front)
  * [.back()](#back)
  * [.dequeue()](#dequeue)
  * [.isEmpty()](#isEmpty)
  * [.size()](#size)
  * [.toArray()](#toarray)
  * [.clear()](#clear)
 * [Build](#build)
 * [License](#license)

## Install

```sh
npm install --save @datastructures-js/priority-queue
```

## API
There are two types of PriorityQueue in this repo: MinPriorityQueue which uses a MinHeap and considers an element with smaller priority number as higher in priority. And MaxPriorityQueue which uses a MaxHeap and cosiders an element with bigger priority number as higher in priority.

### require

```js
const { MinPriorityQueue, MaxPriorityQueue } = require('@datastructures-js/priority-queue');
```

### import

```js
import { MinPriorityQueue, MaxPriorityQueue } from '@datastructures-js/priority-queue';
```

### Construction
The constructor accepts a callback to get the numeric priority from the queued element. If not passed, the constructor adds a default priority callback that returns the value of the element itself.

```js
// empty queue with default priority the element value itself.
const numbersQueue = new MinPriorityQueue();

// empty queue, will provide priority in .enqueue
const patientsQueue = new MinPriorityQueue();

// empty queue with priority returned from a prop of the queued object
const biddersQueue = new MaxPriorityQueue({ priority: (bid) => bid.value });
```

### .enqueue(element[, priority])
adds an element with a numeric priority to the queue. Priority is not required here if a priority callback has been provided in the constructor. If passed here with a constructor callback, it will override the callback.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      element: any
      <br />
      priority: number
    </td>
    <td align="center">MinPriorityQueue | MaxPriorityQueue</td>
    <td align="center">O(log(n))</td>
  </tr>
</table>

```js
// MinPriorityQueue Example, where priority is the number element itself
numbersQueue
  .enqueue(10)
  .enqueue(-7)
  .enqueue(2)
  .enqueue(-1)
  .enqueue(-17)
  .enqueue(33);

// MinPriorityQueue Example, where priority is the patient's turn
patientsQueue
  .enqueue('patient y', 1) // highest priority
  .enqueue('patient z', 3)
  .enqueue('patient w', 4) // lowest priority
  .enqueue('patient x', 2);

// MaxPriorityQueue Example, where priority is the bid's value.
biddersQueue
  .enqueue({ name: 'bidder y', value: 1000 }) // lowest priority
  .enqueue({ name: 'bidder w', value: 2500 })
  .enqueue({ name: 'bidder z', value: 3500 }) // highest priority
  .enqueue({ name: 'bidder x', value: 3000 });
```

### .front()
returns the element with highest priority in the queue.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">object</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
console.log(numbersQueue.front()); // { priority: -17, element: -17 }

console.log(patientsQueue.front()); // { priority: 1, element: 'patient y' }

console.log(biddersQueue.front()); // { priority: 3500, element: { name: 'bidder z', value: 3500 } }
```

### .back()
returns an element with a lowest priority in the queue.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">object</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
console.log(numbersQueue.back()); // { priority: 33, element: 33 }

patientsQueue.enqueue('patient m', 4); // lowest priority
patientsQueue.enqueue('patient c', 4); // lowest priority
console.log(patientsQueue.back()); // { priority: 4, element: 'patient c' }

biddersQueue.enqueue({ name: 'bidder m', value: 1000 }); // lowest priority
biddersQueue.enqueue({ name: 'bidder c', value: 1000 }); // lowest priority
console.log(biddersQueue.back()); // { priority: 1000, element: { name: 'bidder y', value: 1000 } }
```

### .dequeue()
removes and returns the element with highest priority in the queue.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">object</td>
    <td align="center">O(log(n))</td>
  </tr>
</table>

```js
console.log(numbersQueue.dequeue()); // { priority: -17, element: -17 }
console.log(numbersQueue.front()); // { priority: -7, element: -7 }

console.log(patientsQueue.dequeue()); // { priority: 1, element: 'patient y' }
console.log(patientsQueue.front()); // { priority: 2, element: 'patient x' }

console.log(biddersQueue.dequeue()); // { priority: 3500, element: { name: 'bidder z', value: 3500 } }
console.log(biddersQueue.front()); // { priority: 3000, element: { name: 'bidder x', value: 3000 } }
```

### .isEmpty()
checks if the queue is empty.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">boolean</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
console.log(numbersQueue.isEmpty()); // false

console.log(patientsQueue.isEmpty()); // false

console.log(biddersQueue.isEmpty()); // false
```

### .size()
returns the number of elements in the queue.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">number</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
console.log(numbersQueue.size()); // 5

console.log(patientsQueue.size()); // 5

console.log(biddersQueue.size()); // 5
```

### .toArray()
returns a sorted array of elements by their priorities from highest to lowest.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">array&lt;object&gt;</td>
    <td align="center">O(n*log(n))</td>
  </tr>
</table>

```js
console.log(numbersQueue.toArray());
/*
[
  { priority: -7, element: -7 },
  { priority: -1, element: -1 },
  { priority: 2, element: 2 },
  { priority: 10, element: 10 },
  { priority: 33, element: 33 }
]
*/

console.log(patientsQueue.toArray());
/*
[
  { priority: 2, element: 'patient x' },
  { priority: 3, element: 'patient z' },
  { priority: 4, element: 'patient c' },
  { priority: 4, element: 'patient w' },
  { priority: 4, element: 'patient m' }
]
*/

console.log(biddersQueue.toArray());
/*
[
  { priority: 3000, element: { name: 'bidder x', value: 3000 } },
  { priority: 2500, element: { name: 'bidder w', value: 2500 } },
  { priority: 1000, element: { name: 'bidder y', value: 1000 } },
  { priority: 1000, element: { name: 'bidder m', value: 1000 } },
  { priority: 1000, element: { name: 'bidder c', value: 1000 } }
]
*/
```

### .clear()
clears all elements in the queue.

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(1)</td>
 </tr>
</table>


```js
numbersQueue.clear();
console.log(numbersQueue.size()); // 0
console.log(numbersQueue.front()); // null
console.log(numbersQueue.dequeue()); // null

patientsQueue.clear();
console.log(patientsQueue.size()); // 0
console.log(patientsQueue.front()); // null
console.log(patientsQueue.dequeue()); // null

biddersQueue.clear();
console.log(biddersQueue.size()); // 0
console.log(biddersQueue.front()); // null
console.log(biddersQueue.dequeue()); // null
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/priority-queue/blob/master/LICENSE)

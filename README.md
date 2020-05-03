# @datastructures-js/priority-queue

[![build:?](https://travis-ci.org/datastructures-js/priority-queue.svg?branch=master)](https://travis-ci.org/datastructures-js/priority-queue) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/priority-queue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/priority-queue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue)

A performant priority queue implementation using a Heap data structure.

# Table of Contents
* [Install](#install)
* [API](#api)
  * [require](#require)
  * [import](#import)
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
The constructor can accept a callback to get the priority from the queued element. If not passed, the priortiy should be passed with `.enqueue`.

#### Example

```js
// the priority not part of the enqueued element
const patientsQueue = new MinPriorityQueue();

// the priority is a prop of the queued element
const biddersQueue = new MaxPriorityQueue({ priority: (bid) => bid.value });
```

### .enqueue(element[, priority])
adds an element with a priority (number) to the queue. Priority is not required here if a priority callback has been defined in the constructor. If passed here in addition to an existing constructor callback, it will override the callback one.

<table>
  <tr><th align="center" colspan="3">params</th></tr>
  <tr><td><b>name</b></td><td><b>type</b></td></tr>
  <tr><td>element</td><td>object</td></tr>
  <tr><td>priority</td><td>number</td></tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
 </tr>
</table>

#### Example

```js
// MinPriorityQueue Example, where priority is the turn for example
patientsQueue.enqueue('patient y', 1); // highest priority
patientsQueue.enqueue('patient z', 3);
patientsQueue.enqueue('patient w', 4); // lowest priority
patientsQueue.enqueue('patient x', 2);

// MaxPriorityQueue Example, where priority is the bid for example. Priority is obtained from the callback.
biddersQueue.enqueue({ name: 'bidder y', value: 1000 }); // lowest priority
biddersQueue.enqueue({ name: 'bidder w', value: 2500 });
biddersQueue.enqueue({ name: 'bidder z', value: 3500 }); // highest priority
biddersQueue.enqueue({ name: 'bidder x', value: 3000 });
```

### .front()
returns the element with highest priority in the queue.

<table>
 <tr><th>return</th><th>description</th></tr>
 <tr>
  <td>object</td>
  <td>object literal with "priority" and "element" props</td>
 </tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(1)</td>
 </tr>
</table>

#### Example

```js
console.log(patientsQueue.front()); // { priority: 1, element: 'patient y' }

console.log(biddersQueue.front()); // { priority: 3500, element: { name: 'bidder z', value: 3500 } }
```

### .back()
returns an element with lowest priority in the queue. If multiple elements exist at the lowest priority, the one that was inserted first will be returned.

<table>
 <tr><th>return</th><th>description</th></tr>
 <tr>
  <td>object</td>
  <td>object literal with "priority" and "element" props</td>
 </tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(1)</td>
 </tr>
</table>

#### Example

```js
patientsQueue.enqueue('patient m', 4); // lowest priority
patientsQueue.enqueue('patient c', 4); // lowest priority
console.log(patientsQueue.back()); // { priority: 4, element: 'patient w' }

biddersQueue.enqueue({ name: 'bidder m', value: 1000 }); // lowest priority
biddersQueue.enqueue({ name: 'bidder c', value: 1000 }); // lowest priority
console.log(biddersQueue.back()); // { priority: 1000, element: { name: 'bidder y', value: 1000 } }
```

### .dequeue()
removes and returns the element with highest priority in the queue.

<table>
 <tr><th>return</th><th>description</th></tr>
 <tr>
  <td>object</td>
  <td>object literal with "priority" and "element" props</td>
 </tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
 </tr>
</table>

#### Example

```js
console.log(patientsQueue.dequeue()); // { priority: 1, element: 'patient y' }
console.log(patientsQueue.front()); // { priority: 2, element: 'patient x' }

console.log(biddersQueue.dequeue()); // { priority: 3500, element: { name: 'bidder z', value: 3500 } }
console.log(biddersQueue.front()); // { priority: 3000, element: { name: 'bidder x', value: 3000 } }
```

### .isEmpty()
checks if the queue is empty.

<table>
 <tr><th>return</th></tr>
 <tr>
  <td>boolean</td>
 </tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(1)</td>
 </tr>
</table>

#### Example

```js
console.log(patientsQueue.isEmpty()); // false

console.log(biddersQueue.isEmpty()); // false
```

### .size()
returns the number of elements in the queue.

<table>
 <tr><th>return</th></tr>
 <tr>
  <td>number</td>
 </tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(1)</td>
 </tr>
</table>

#### Example

```js
console.log(patientsQueue.size()); // 5

console.log(biddersQueue.size()); // 5
```

### .toArray()
returns a sorted array of elements by their priorities from highest to lowest.

<table>
 <tr><th>return</th><th>description</th></tr>
 <tr>
  <td>array</td><td>an array of object literals with "priority" & "element" props</td>
 </tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(n*log(n))</td>
 </tr>
</table>

#### Example

```js
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

#### Example

```js
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

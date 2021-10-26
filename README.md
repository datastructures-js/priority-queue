# @datastructures-js/priority-queue

[![build:?](https://travis-ci.org/datastructures-js/priority-queue.svg?branch=master)](https://travis-ci.org/datastructures-js/priority-queue) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/priority-queue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/priority-queue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue)

A performant priority queue implementation using a Heap data structure.

<img src="https://user-images.githubusercontent.com/6517308/121813242-859a9700-cc6b-11eb-99c0-49e5bb63005b.jpg">

# Contents
* [Install](#install)
* [require](#require)
* [import](#import)
* [API](#api)
  * [constructor](#constructor)
  * [.enqueue](#enqueue)
  * [.front](#front)
  * [.back](#back)
  * [.dequeue](#dequeue)
  * [.isEmpty](#isEmpty)
  * [.size](#size)
  * [.toArray](#toarray)
  * [.clear](#clear)
 * [Build](#build)
 * [License](#license)

## Install

```sh
npm install --save @datastructures-js/priority-queue
```

## API
PriorityQueue in this repo is implemented as 3 types:

- **PriorityQueue** that accepts a custom comparator between elements.
- **MinPriorityQueue** which considers an element with smaller priority number as higher in priority.
- **MaxPriorityQueue** which cosiders an element with bigger priority number as higher in priority.

### require

```js
const {
  PriorityQueue,
  MinPriorityQueue,
  MaxPriorityQueue
} = require('@datastructures-js/priority-queue');
```

### import

```js
import {
  PriorityQueue,
  MinPriorityQueue,
  MaxPriorityQueue,
  PriorityQueueOptions, // queue options interface
  PriorityQueueItem // queue item interface for min/max queue
} from '@datastructures-js/priority-queue';
```

### constructor
#### PriorityQueue
The constructor requires a compare callback to compare between queue elements. compare works similar to javascript sort callback: returning a number less or equal 0, means do not swap.

##### JS
```js
// empty queue with comparator
const employeesQueue = new PriorityQueue({
  compare: (e1, e2) => {
    if (e1.salary > e2.salary) return -1; // do not swap
    if (e1.salary < e2.salary) return 1; // swap

    // salaries are the same, compare rank
    return e1.rank < e2.rank ? 1 : -1;
  }
});
```

##### TS
```js
// queued element type
interface Employee {
  name: string;
  salary: number;
  rank: number;
}

// empty queue with comparator
const employeesQueue = new PriorityQueue<Employee>({
  compare: (e1: Employee, e2: Employee): number => {
    if (e1.salary > e2.salary) return -1; // do not swap
    if (e1.salary < e2.salary) return 1; // swap

    // salaries are the same, compare rank
    return e1.rank < e2.rank ? 1 : -1;
  }
});
```

#### MinPriorityQueue/MaxPriorityQueue
The constructor accepts a priority callback option to get the numeric priority from the queued element. If not passed, the constructor adds a default priority callback that returns the numeric value of the element itself. Use this queue type when the priority is a known value and does not require complex comparison.

##### JS
```js
// empty queue with priority is the element value itself.
const numbersQueue = new MinPriorityQueue();

// empty queue, will provide priority in .enqueue
const patientsQueue = new MinPriorityQueue();

// empty queue with priority returned from a prop of the queued object
const biddersQueue = new MaxPriorityQueue({ priority: (bid) => bid.value });
```

##### TS
```js
const numbersQueue = new MinPriorityQueue<number>();

const patientsQueue = new MinPriorityQueue<string>();

interface Bid {
  name: string;
  value: number;
}
const biddersQueue = new MaxPriorityQueue<Bid>({
  priority: (bid: Bid) => bid.value
});
```

### .enqueue
#### PriorityQueue - .enqueue(element)
adds an element based on its comparison with other elements in the queue.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>element: T</td>
    <td align="center">PriorityQueue&lt;T&gt;</td>
    <td align="center">O(log(n))</td>
  </tr>
</table>

```js
employeesQueue
  .enqueue({ name: 'employee 1', salary: 2000, rank: 1 })
  .enqueue({ name: 'employee 2', salary: 1500, rank: 0 })
  .enqueue({ name: 'employee 3', salary: 4000, rank: 4 })
  .enqueue({ name: 'employee 4', salary: 2000, rank: 2 })
  .enqueue({ name: 'employee 5', salary: 3000, rank: 3 });
```

#### MinPriorityQueue/MaxPriorityQueue - .enqueue(element[, priority])
adds an element with a numeric priority to the queue. Priority is not required here if a priority callback has been provided in the constructor. If passed here with a constructor callback, it will override the callback.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      element: T
      <br />
      priority: number
    </td>
    <td align="center">MinPriorityQueue&lt;T&gt; | MaxPriorityQueue&lt;T&gt;</td>
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

#### PriorityQueue

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">T</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
console.log(employeesQueue.dequeue()); // { name: 'employee 3', salary: 4000, rank: 4 }
```

#### MinPriorityQueue/MaxPriorityQueue

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">PriorityQueueItem&lt;T&gt;</td>
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

#### PriorityQueue

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">T</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
console.log(employeesQueue.back()); // { name: 'employee 2', salary: 1500, rank: 0 }
```

#### MinPriorityQueue/MaxPriorityQueue

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">PriorityQueueItem&lt;T&gt;</td>
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

#### PriorityQueue

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">T</td>
    <td align="center">O(log(n))</td>
  </tr>
</table>

```js
console.log(employeesQueue.dequeue()); // { name: 'employee 3', salary: 4000, rank: 4 }
console.log(employeesQueue.dequeue()); // { name: 'employee 5', salary: 3000, rank: 3 }
console.log(employeesQueue.dequeue()); // { name: 'employee 4', salary: 2000, rank: 2 }
console.log(employeesQueue.dequeue()); // { name: 'employee 1', salary: 2000, rank: 1 }
console.log(employeesQueue.dequeue()); // { name: 'employee 2', salary: 1500, rank: 0 }
```

#### MinPriorityQueue/MaxPriorityQueue

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">PriorityQueueItem&lt;T&gt;</td>
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

#### PriorityQueue

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">T[]</td>
    <td align="center">O(n*log(n))</td>
  </tr>
</table>

```js
console.log(employeesQueue.toArray());
/*
[
  { name: 'employee 3', salary: 4000, rank: 4 },
  { name: 'employee 5', salary: 3000, rank: 3 },
  { name: 'employee 4', salary: 2000, rank: 2 },
  { name: 'employee 1', salary: 2000, rank: 1 },
  { name: 'employee 2', salary: 1500, rank: 0 }
]
*/
```

#### MinPriorityQueue/MaxPriorityQueue

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">PriorityQueueItem&lt;T&gt;[]</td>
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

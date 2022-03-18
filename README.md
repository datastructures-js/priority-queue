# @datastructures-js/priority-queue

[![npm](https://img.shields.io/npm/v/@datastructures-js/priority-queue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/priority-queue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue)

A heap-based implementation of priority queue in javascript with typescript support.

<img src="https://user-images.githubusercontent.com/6517308/121813242-859a9700-cc6b-11eb-99c0-49e5bb63005b.jpg">

# Contents
* [Install](#install)
* [require](#require)
* [import](#import)
* [API](#api)
  * [constructor](#constructor)
  * [fromArray](#fromarray)
  * [enqueue](#enqueue)
  * [front](#front)
  * [back](#back)
  * [dequeue](#dequeue)
  * [isEmpty](#isEmpty)
  * [size](#size)
  * [toArray](#toarray)
  * [clear](#clear)
 * [Build](#build)
 * [License](#license)

## Install

```sh
npm install --save @datastructures-js/priority-queue
```

## API
PriorityQueue class allows using a compare function between values. MinPriorityQueue & MaxPriorityQueue can be used for primitive values and objects with known comparison prop.

### require

```js
const {
  PriorityQueue,
  MinPriorityQueue,
  MaxPriorityQueue,
} = require('@datastructures-js/priority-queue');
```

### import

```js
import {
  PriorityQueue,
  MinPriorityQueue,
  MaxPriorityQueue,
  ICompare,
  IGetCompareValue,
} from '@datastructures-js/priority-queue';
```

### constructor
#### PriorityQueue
constructor requires a compare function that works similar to javascript sort callback, returning a number bigger than 0, means swap elemens.

##### TS
```ts
interface ICar {
  year: number;
  price: number;
}

const compareCars: ICompare<ICar> = (a, b) => {
  if (a.year > b.year) {
    return -1;
  }
  if (a.year < b.year) {
    // prioratize newest cars
    return 1;
  }
  // with least price
  return a.price < b.price ? -1 : 1;
};

const carsQueue = new PriorityQueue<ICar>(compareCars);
```

##### JS
```js
const carsQueue = new PriorityQueue((a, b) => {
    if (a.year > b.year) {
      return -1;
    }
    if (a.year < b.year) {
      // prioratize newest cars
      return 1;
    }
    // with least price
    return a.price < b.price ? -1 : 1;
  }
});
```

#### MinPriorityQueue, MaxPriorityQueue
constructor requires a callback for object queues to indicate which prop is used for comparison, and does not require any for number or string ones.

##### TS
```ts
const numbersQueue = new MinPriorityQueue<number>();

interface IBid {
  id: number;
  value: number;
}
const getBidValue: IGetCompareValue<IBid> = (bid) => bid.value;
const bidsQueue = new MaxPriorityQueue<IBid>(getBidValue);
```

##### JS
```js
const numbersQueue = new MinPriorityQueue();
const bidsQueue = new MaxPriorityQueue((bid) => bid.value);
```

### fromArray
If queue is being created from an existing array, and there is no need to use an extra space, this static function can be used to turn the array into a priority queue.

#### PriorityQueue
##### TS
```ts
const numbers = [3, -2, 5, 0, -1, -5, 4];

const pq = PriorityQueue.fromArray<number>(numbers, (a, b) => a - b);

console.log(numbers); // [-5, -1, -2, 3, 0, 5, 4]
pq.dequeue();
pq.dequeue();
pq.dequeue();
console.log(numbers); // [ 0, 3, 4, 5 ]
```

##### JS
```ts
const numbers = [3, -2, 5, 0, -1, -5, 4];

const pq = PriorityQueue.fromArray(numbers, (a, b) => a - b);

console.log(numbers); // [-5, -1, -2, 3, 0, 5, 4]
pq.dequeue();
pq.dequeue();
pq.dequeue();
console.log(numbers); // [ 0, 3, 4, 5 ]
```

#### MinPriorityQueue, MaxPriorityQueue
##### TS
```ts
const numbers = [3, -2, 5, 0, -1, -5, 4];

const mpq = MaxPriorityQueue.fromArray<number>(numbers);

console.log(numbers); // [-5, -1, -2, 3, 0, 5, 4]
mpq.dequeue();
mpq.dequeue();
mpq.dequeue();
console.log(numbers); // [ 0, 3, 4, 5 ]
```

##### JS
```ts
const numbers = [3, -2, 5, 0, -1, -5, 4];

const mpq = MaxPriorityQueue.fromArray<number>(numbers, (a, b) => a - b);

console.log(numbers); // [-5, -1, -2, 3, 0, 5, 4]
mpq.dequeue();
mpq.dequeue();
mpq.dequeue();
console.log(numbers); // [ 0, 3, 4, 5 ]
```

### enqueue
adds a value based on its comparison with other values in the queue.

```js
const cars = [
  { year: 2013, price: 35000 },
  { year: 2010, price: 2000 },
  { year: 2013, price: 30000 },
  { year: 2017, price: 50000 },
  { year: 2013, price: 25000 },
  { year: 2015, price: 40000 },
  { year: 2022, price: 70000 }
];
cars.forEach((car) => carsQueue.enqueue(car));

const numbers = [3, -2, 5, 0, -1, -5, 4];
numbers.forEach((num) => numbersQueue.enqueue(num));

const bids = [
  { id: 1, value: 1000 },
  { id: 2, value: 20000 },
  { id: 3, value: 1000 },
  { id: 4, value: 1500 },
  { id: 5, value: 12000 },
  { id: 6, value: 4000 },
  { id: 7, value: 8000 }
];
bids.forEach((bid) => bidsQueue.enqueue(bid));
```

### front()
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

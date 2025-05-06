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
  * [enqueue (push)](#enqueue-push)
  * [front](#front)
  * [back](#back)
  * [dequeue (pop)](#dequeue-pop)
  * [contains](#contains)
  * [remove](#remove)
  * [isEmpty](#isEmpty)
  * [size](#size)
  * [toArray](#toarray)
  * [Symbol.iterator](#symboliterator)
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
constructor requires a compare function that works similar to javascript sort callback, returning a number bigger than 0, means swap elements.

##### TS
```ts
interface ICar {
  year: number;
  price: number;
}

const compareCars: ICompare<ICar> = (a: ICar, b: ICar) => {
  if (a.year > b.year) {
    return -1;
  }
  if (a.year < b.year) {
    // prioritize newest cars
    return 1;
  }
  // with lowest price
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
    // with lowest price
    return a.price < b.price ? -1 : 1;
  }
);
```

#### MinPriorityQueue, MaxPriorityQueue
constructor requires a callback for object values to indicate which prop is used for comparison, and does not require any for primitive values like numbers or strings.

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

##### Legacy Compare Function (v5 compatibility)
For backward compatibility with v5, you can also pass a compare function in an options object:

```js
// MinPriorityQueue with legacy compare
const minQueue = new MinPriorityQueue({ compare: (a, b) => a - b });

// MaxPriorityQueue with legacy compare
const maxQueue = new MaxPriorityQueue({ compare: (a, b) => a - b });
```

This format is supported for backward compatibility with v5 of the library.

### fromArray
If the queue is being created from an existing array, and there is no desire to use an extra O(n) space, this static function can turn an array into a priority queue in O(n) runtime.

#### PriorityQueue
##### TS
```ts
const numbers = [3, -2, 5, 0, -1, -5, 4];

const pq = PriorityQueue.fromArray<number>(numbers, (a, b) => a - b);

console.log(numbers); // [-5, -1, -2, 3, 0, 5, 4]
pq.dequeue(); // -5
pq.dequeue(); // -2
pq.dequeue(); // -1
console.log(numbers); // [ 0, 3, 4, 5 ]
```

##### JS
```ts
const numbers = [3, -2, 5, 0, -1, -5, 4];

const pq = PriorityQueue.fromArray(numbers, (a, b) => a - b);

console.log(numbers); // [-5, -1, -2, 3, 0, 5, 4]
pq.dequeue(); // -5
pq.dequeue(); // -2
pq.dequeue(); // -1
console.log(numbers); // [ 0, 3, 4, 5 ]
```

#### MinPriorityQueue, MaxPriorityQueue
##### TS
```ts
const numbers = [3, -2, 5, 0, -1, -5, 4];

const mpq = MaxPriorityQueue.fromArray<number>(numbers);

console.log(numbers); // [-5, -1, -2, 3, 0, 5, 4]
mpq.dequeue(); // 5
mpq.dequeue(); // 4
mpq.dequeue(); // 3
console.log(numbers); // [ 0, -1, -5, -2 ]
```

##### JS
```ts
const numbers = [3, -2, 5, 0, -1, -5, 4];

const mpq = MaxPriorityQueue.fromArray(numbers);

console.log(numbers); // [-5, -1, -2, 3, 0, 5, 4]
mpq.dequeue(); // 5
mpq.dequeue(); // 4
mpq.dequeue(); // 3
console.log(numbers); // [ 0, -1, -5, -2 ]
```

### enqueue (push)
adds a value based on its comparison with other values in the queue in O(log(n)) runtime.

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
numbers.forEach((num) => numbersQueue.push(num)); // push is an alias for enqueue

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

### front
peeks on the value with highest priority in the queue.

```js
console.log(carsQueue.front()); // { year: 2022, price: 70000 }
console.log(numbersQueue.front()); // -5
console.log(bidsQueue.front()); // { id: 2, value: 20000 }
```

### back
peeks on the value with a lowest priority in the queue.

```js
console.log(carsQueue.back()); // { year: 2010, price: 2000 }
console.log(numbersQueue.back()); // 5
console.log(bidsQueue.back()); // { id: 1, value: 1000 }
```

### dequeue (pop)
removes and returns the element with highest priority in the queue in O(log(n)) runtime.

```js
console.log(carsQueue.dequeue()); // { year: 2022, price: 70000 }
console.log(carsQueue.dequeue()); // { year: 2017, price: 50000 }
console.log(carsQueue.dequeue()); // { year: 2015, price: 40000 }

console.log(numbersQueue.dequeue()); // -5
console.log(numbersQueue.dequeue()); // -2
console.log(numbersQueue.dequeue()); // -1

console.log(bidsQueue.pop()); // { id: 2, value: 20000 }
console.log(bidsQueue.pop()); // { id: 5, value: 12000 }
console.log(bidsQueue.pop()); // { id: 7, value: 8000 }
```

### contains
checks if the queue contains an element that meet a criteria in O(n*log(n)) runtime.

```js
carsQueue.contains((car) => car.price === 50000); // true
carsQueue.contains((car) => car.price === 200000); // false
numbersQueue.contains((n) => n === 4); // true
numbersQueue.contains((n) => n === 10); // false
```

### remove
removes all elements that meet a criteria in O(n*log(n)) runtime and returns a list of the removed elements.

```js
carsQueue.remove((car) => car.price === 35000); // [{ year: 2013, price: 35000 }]

numbersQueue.remove((n) => n === 4); // [4]

bidsQueue.remove((bid) => bid.id === 3); // [{ id: 3, value: 1000 }]
```

### isEmpty
checks if the queue is empty.

```js
console.log(carsQueue.isEmpty()); // false
console.log(numbersQueue.isEmpty()); // false
console.log(bidsQueue.isEmpty()); // false
```

### size
returns the number of elements in the queue.

```js
console.log(carsQueue.size()); // 3
console.log(numbersQueue.size()); // 3
console.log(bidsQueue.size()); // 3
```

### toArray
returns a sorted array of elements by their priorities from highest to lowest in O(n*log(n)) runtime.

```js
console.log(carsQueue.toArray());
/*
[
  { year: 2013, price: 25000 },
  { year: 2013, price: 30000 },
  { year: 2010, price: 2000 }
]
*/

console.log(numbersQueue.toArray()); // [ 0, 3, 5 ]

console.log(bidsQueue.toArray());
/*
[
  { id: 6, value: 4000 },
  { id: 4, value: 1500 },
  { id: 1, value: 1000 }
]
*/
```

### Symbol.iterator
The queues implement a Symbol.iterator that makes them iterable on `pop`.
```js
console.log([...carsQueue]);
/*
[
  { year: 2013, price: 25000 },
  { year: 2013, price: 30000 },
  { year: 2010, price: 2000 }
]
*/
console.log(carsQueue.size()); // 0

console.log([...numbersQueue]); // [ 0, 3, 5 ]
console.log(numbersQueue.size()); // 0

for (const bid of bidsQueue) {
  console.log(bid);
}
/*
{ id: 6, value: 4000 },
{ id: 4, value: 1500 },
{ id: 1, value: 1000 }
*/
console.log(bidsHeap.size()); // 0
```

### clear
clears all elements in the queue.

```js
carsQueue.clear();
console.log(carsQueue.size()); // 0
console.log(carsQueue.front()); // null
console.log(carsQueue.dequeue()); // null
console.log(carsQueue.isEmpty()); // true

numbersQueue.clear();
console.log(numbersQueue.size()); // 0
console.log(numbersQueue.front()); // null
console.log(numbersQueue.dequeue()); // null
console.log(numbersQueue.isEmpty()); // true

bidsQueue.clear();
console.log(bidsQueue.size()); // 0
console.log(bidsQueue.front()); // null
console.log(bidsQueue.dequeue()); // null
console.log(bidsQueue.isEmpty()); // true
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/priority-queue/blob/master/LICENSE)

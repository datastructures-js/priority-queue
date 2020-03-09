# @datastructures-js/priority-queue

[![build:?](https://travis-ci.org/datastructures-js/priority-queue.svg?branch=master)](https://travis-ci.org/datastructures-js/priority-queue) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/priority-queue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/priority-queue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/priority-queue)

A highly performant priority queue implementation using a Min Heap data structure.

# Table of Contents
* [Install](#install)
* [API](#api)
  * [require](#require)
  * [import](#import)
  * [creating a priority queue](#create-a-priority-queue)
  * [.enqueue(element, priority)](#enqueueelement-priority)
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

### require

```js
const PriorityQueue = require('@datastructures-js/priority-queue');
```

### import

```js
import PriorityQueue from '@datastructures-js/priority-queue';
```

### Create a Priority Queue

```js
const priorityQueue = new PriorityQueue();
```


### .enqueue(element, priority)

adds an element with a priority (number) to the queue. The smaller the number, the higher the priority.

<table>
  <tr>
    <th>runtime</th>
    <th>params</th>
  </tr>
  <tr>
    <td>O(log(n))</td>
    <td>
       <b>element</b>: {object}
       <br><br>
       <b>priority</b>: {number}
    </td>
  </tr>
</table>

```js
priorityQueue.enqueue('patient y', 1); // highest priority
priorityQueue.enqueue('patient z', 3);
priorityQueue.enqueue('patient w', 4); // lowest priority
priorityQueue.enqueue('patient x', 2);
```

### .front()

returns the element with highest priority in the queue.

<table>
  <tr>
    <th>runtime</th>
    <th>return</th>
  </tr>
  <tr>
    <td>O(1)</td>
    <td>{object}</td>
  </tr>
</table>

```js
console.log(priorityQueue.front()); // patient y
```

### .back()

returns an element with lowest priority in the queue. If multiple elements exist at the lowest priority, the one that was inserted first will be returned.

<table>
  <tr>
    <th>runtime</th>
    <th>return</th>
  </tr>
  <tr>
    <td>O(1)</td>
    <td>{object}</td>
  </tr>
</table>

```js
priorityQueue.enqueue('patient m', 4); // lowest priority
priorityQueue.enqueue('patient c', 4); // lowest priority
console.log(priorityQueue.back()); // patient w
```

### .dequeue()

removes and returns the element with highest priority in the queue.

<table>
  <tr>
    <th>runtime</th>
    <th>return</th>
  </tr>
  <tr>
    <td>O(log(n))</td>
    <td>{object}</td>
  </tr>
</table>

```js
console.log(priorityQueue.dequeue()); // patient y
console.log(priorityQueue.front()); // patient x
```

### .isEmpty()

checks if the queue is empty.

<table>
  <tr>
    <th>runtime</th>
    <th>return</th>
  </tr>
  <tr>
    <td>O(1)</td>
    <td>{boolean}</td>
  </tr>
</table>

```js
console.log(priorityQueue.isEmpty()); // false
```

### .size()

returns the number of elements in the queue.

```js
console.log(priorityQueue.size()); // 5
```

### .toArray()

returns an sorted array of elements from highest priority to lowest.

```js
console.log(priorityQueue.toArray()); // ['patient x', 'patient z', 'patient c', 'patient w', 'patient m']
```

### .clear()
clears all elements in the queue.

```js
priorityQueue.clear();
console.log(priorityQueue.size()); // 0
console.log(priorityQueue.front()); // null
console.log(priorityQueue.dequeue()); // null
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/priority-queue/blob/master/LICENSE)

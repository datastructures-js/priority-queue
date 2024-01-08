/**
 * @datastructures-js/priority-queue
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { MinHeap } = require('@datastructures-js/heap');
const PriorityQueue = require('./priorityQueue');

/**
 * @class MinPriorityQueue
 * @extends PriorityQueue
 */
class MinPriorityQueue extends PriorityQueue {
  constructor(options) {
    super(options);
    this._heap = new MinHeap();
  }

  static from(entries) {
    const queue = new MinPriorityQueue();

    entries.forEach(([element, priority]) => {
      queue.enqueue(element, priority);
    });

    return queue;
  }
}

module.exports = MinPriorityQueue;

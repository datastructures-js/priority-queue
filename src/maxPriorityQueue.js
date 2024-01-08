/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { MaxHeap } = require('@datastructures-js/heap');
const { PriorityQueue } = require('./priorityQueue');

/**
 * @class MaxPriorityQueue
 * @extends PriorityQueue
 */
class MaxPriorityQueue extends PriorityQueue {
  constructor(options) {
    super(options);
    if (!this._compare) {
      this._heap = new MaxHeap();
    }
  }

  static from(entries) {
    const queue = new MaxPriorityQueue();

    entries.forEach(([element, priority]) => {
      queue.enqueue(element, priority);
    });

    return queue;
  }
}

exports.MaxPriorityQueue = MaxPriorityQueue;

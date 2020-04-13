/**
 * @datastructures-js/priority-queue
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { MaxHeap } = require('@datastructures-js/heap');
const PriorityQueue = require('./priorityQueue');

/**
 * @class MaxPriorityQueue
 * @extends PriorityQueue
 */
class MaxPriorityQueue extends PriorityQueue {
  constructor() {
    super();
    this._heap = new MaxHeap();
  }
}

module.exports = MaxPriorityQueue;

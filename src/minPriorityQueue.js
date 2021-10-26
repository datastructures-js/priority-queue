/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { MinHeap } = require('@datastructures-js/heap');
const { PriorityQueue } = require('./priorityQueue');

/**
 * @class MinPriorityQueue
 * @extends PriorityQueue
 */
class MinPriorityQueue extends PriorityQueue {
  constructor(options) {
    super(options);
    if (!this._compare) {
      this._heap = new MinHeap();
    }
  }
}

exports.MinPriorityQueue = MinPriorityQueue;

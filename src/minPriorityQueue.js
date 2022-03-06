/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { MinHeap } = require('@datastructures-js/heap');

/**
 * @class MinPriorityQueue
 * @extends PriorityQueue
 */
class MinPriorityQueue extends MinHeap {
  constructor(options = {}) {
    if (options && typeof options !== 'object') {
      throw new Error('MinPriorityQueue constructor accepts an object');
    }

    const { priority } = options;
    if (priority !== undefined && typeof priority !== 'function') {
      throw new Error('MinPriorityQueue expects a valid priority function');
    }
    super(priority);
  }

  /**
   * Returns an element with highest priority in the queue
   * @public
   * @returns {number|string|object}
   */
  front() {
    return super.root();
  }

  /**
   * Returns an element with lowest priority in the queue
   * @public
   * @returns {number|string|object}
   */
  back() {
    return super.leaf();
  }

  /**
   * Adds a value to the queue
   * @public
   * @param {number|string|object} value
   * @returns {PriorityQueue}
   */
  enqueue(value) {
    return super.insert(value);
  }

  /**
   * Removes and returns an element with highest priority in the queue
   * @public
   * @returns {number|string|object}
   */
  dequeue() {
    return super.extractRoot();
  }

  /**
   * Returns a sorted list of elements from highest to lowest priority
   * @public
   * @returns {array}
   */
  toArray() {
    return super.clone().sort().reverse();
  }
}

exports.MinPriorityQueue = MinPriorityQueue;

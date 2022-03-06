/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { Heap } = require('@datastructures-js/heap');

/**
 * @class PriorityQueue
 */
class PriorityQueue extends Heap {
  /**
   * Creates a priority queue
   * @params {object} options
   */
  constructor(options = {}) {
    if (typeof options !== 'object') {
      throw new Error('PriorityQueue constructor expects an object');
    }

    const { compare } = options;
    if (typeof compare !== 'function') {
      throw new Error('PriorityQueue constructor expects a valid compare function prop');
    }
    super(compare);
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

exports.PriorityQueue = PriorityQueue;

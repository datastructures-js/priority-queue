/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { PriorityQueue } = require('./priorityQueue');

/**
 * @class MinPriorityQueue
 * @extends PriorityQueue
 */
class MinPriorityQueue extends PriorityQueue {
  constructor(options, values) {
    // Handle legacy options format ({ compare: fn })
    if (options && typeof options === 'object' && typeof options.compare === 'function') {
      const compareFunction = (a, b) => options.compare(a, b) <= 0 ? -1 : 1;
      super(compareFunction, values);
    } else {
      // Current format (direct compare function)
      const getCompareValue = options;
      if (getCompareValue && typeof getCompareValue !== 'function') {
        throw new Error('MinPriorityQueue constructor requires a callback for object values');
      }
      // Create a MinHeap-compatible compare function
      const compare = (a, b) => {
        const aVal = typeof getCompareValue === 'function' ? getCompareValue(a) : a;
        const bVal = typeof getCompareValue === 'function' ? getCompareValue(b) : b;
        return aVal <= bVal ? -1 : 1;
      };
      super(compare, values);
    }
  }

  /**
   * Adds a value to the queue
   * @public
   * @param {number|string|object} value
   * @returns {MinPriorityQueue}
   */
  enqueue(value) {
    super.enqueue(value);
    return this;
  }

  /**
   * Adds a value to the queue
   * @public
   * @param {number|string|object} value
   * @returns {MinPriorityQueue}
   */
  push(value) {
    return this.enqueue(value);
  }
}

/**
 * Creates a priority queue from an existing array
 * @public
 * @static
 * @returns {MinPriorityQueue}
 */
MinPriorityQueue.fromArray = function fromArray(values, options) {
  return new MinPriorityQueue(options, values);
};

exports.MinPriorityQueue = MinPriorityQueue;

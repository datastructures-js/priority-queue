/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { PriorityQueue } = require('./priorityQueue');

/**
 * @class MaxPriorityQueue
 * @extends PriorityQueue
 */
class MaxPriorityQueue extends PriorityQueue {
  constructor(options, values) {
    // Handle legacy options format ({ compare: fn })
    if (options && typeof options === 'object' && typeof options.compare === 'function') {
      const compareFunction = (a, b) => options.compare(a, b) <= 0 ? -1 : 1;
      super(compareFunction, values);
    } else {
      // Current format (direct compare function)
      const getCompareValue = options;
      if (getCompareValue && typeof getCompareValue !== 'function') {
        throw new Error('MaxPriorityQueue constructor requires a callback for object values');
      }
      // Create a MaxHeap-compatible compare function
      const compare = (a, b) => {
        const aVal = typeof getCompareValue === 'function' ? getCompareValue(a) : a;
        const bVal = typeof getCompareValue === 'function' ? getCompareValue(b) : b;
        return aVal < bVal ? 1 : -1;
      };
      super(compare, values);
    }
  }

  /**
   * Adds a value to the queue
   * @public
   * @param {number|string|object} value
   * @returns {MaxPriorityQueue}
   */
  enqueue(value) {
    super.enqueue(value);
    return this;
  }

  /**
   * Adds a value to the queue
   * @public
   * @param {number|string|object} value
   * @returns {MaxPriorityQueue}
   */
  push(value) {
    return this.enqueue(value);
  }
}

/**
 * Creates a priority queue from an existing array
 * @public
 * @static
 * @returns {MaxPriorityQueue}
 */
MaxPriorityQueue.fromArray = function fromArray(values, options) {
  return new MaxPriorityQueue(options, values);
};

exports.MaxPriorityQueue = MaxPriorityQueue;

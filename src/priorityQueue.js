/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { Heap } = require('@datastructures-js/heap');

/**
 * @class PriorityQueue
 */
class PriorityQueue {
  /**
   * Creates a priority queue
   * @params {function} compare
   */
  constructor(compare, _values) {
    if (typeof compare !== 'function') {
      throw new Error('PriorityQueue constructor expects a compare function');
    }
    this._heap = new Heap(compare, _values);
    if (_values) {
      this._heap.fix();
    }
  }

  /**
   * Returns an element with highest priority in the queue
   * @public
   * @returns {number|string|object}
   */
  front() {
    return this._heap.root();
  }

  /**
   * Returns an element with lowest priority in the queue
   * @public
   * @returns {number|string|object}
   */
  back() {
    return this._heap.leaf();
  }

  /**
   * Adds a value to the queue
   * @public
   * @param {number|string|object} value
   * @returns {PriorityQueue}
   */
  enqueue(value) {
    return this._heap.insert(value);
  }

  /**
   * Adds a value to the queue
   * @public
   * @param {number|string|object} value
   * @returns {PriorityQueue}
   */
  push(value) {
    return this.enqueue(value);
  }

  /**
   * Removes and returns an element with highest priority in the queue
   * @public
   * @returns {number|string|object}
   */
  dequeue() {
    return this._heap.extractRoot();
  }

  /**
   * Removes and returns an element with highest priority in the queue
   * @public
   * @returns {number|string|object}
   */
  pop() {
    return this.dequeue();
  }

  /**
   * Removes all elements that match a criteria in the callback
   * @public
   * @param {function} cb
   * @returns {array}
   */
  remove(cb) {
    if (typeof cb !== 'function') {
      throw new Error('PriorityQueue remove expects a callback');
    }

    const removed = [];
    const dequeued = [];
    while (!this.isEmpty()) {
      const popped = this.pop();
      if (cb(popped)) {
        removed.push(popped);
      } else {
        dequeued.push(popped);
      }
    }

    dequeued.forEach((val) => this.push(val));
    return removed;
  }

  /**
   * Checks if the queue contains an element that matches a criteria
   * @public
   * @param {function} cb
   * @returns {boolean}
   */
  contains(cb) {
    if (typeof cb !== 'function') {
      throw new Error('PriorityQueue contains expects a callback');
    }

    let found = false;
    const dequeued = [];
    while (!this.isEmpty()) {
      const popped = this.pop();
      dequeued.push(popped);
      if (cb(popped)) {
        found = true;
        break;
      }
    }

    dequeued.forEach((val) => this.push(val));
    return found;
  }

  /**
   * Returns the number of elements in the queue
   * @public
   * @returns {number}
   */
  size() {
    return this._heap.size();
  }

  /**
   * Checks if the queue is empty
   * @public
   * @returns {boolean}
   */
  isEmpty() {
    return this._heap.isEmpty();
  }

  /**
   * Clears the queue
   * @public
   */
  clear() {
    this._heap.clear();
  }

  /**
   * Returns a sorted list of elements from highest to lowest priority
   * @public
   * @returns {array}
   */
  toArray() {
    return this._heap.clone().sort().reverse();
  }

  /**
   * Implements an iterable on the priority queue
   * @public
   */
  [Symbol.iterator]() {
    let size = this.size();
    return {
      next: () => {
        size -= 1;
        return {
          value: this.pop(),
          done: size === -1
        };
      }
    };
  }

  /**
   * Creates a priority queue from an existing array
   * @public
   * @static
   * @returns {PriorityQueue}
   */
  static fromArray(values, compare) {
    return new PriorityQueue(compare, values);
  }
}

exports.PriorityQueue = PriorityQueue;

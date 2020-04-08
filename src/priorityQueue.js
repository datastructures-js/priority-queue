/**
 * @datastructures-js/priority-queue
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { MinHeap } = require('@datastructures-js/heap');

/**
 * @class PriorityQueue
 * depends on a MinHeap to manage elements based on their priorities
 */
class PriorityQueue {
  constructor() {
    this._heap = new MinHeap();
  }

  /**
   * @public
   * @returnss {number}
   */
  size() {
    return this._heap.size();
  }

  /**
   * @public
   * @returnss {boolean}
   */
  isEmpty() {
    return this._heap.size() === 0;
  }

  /**
   * @public
   * returns then front element in the queue
   * @returnss {object}
   */
  front() {
    return this.size() > 0 ? this._heap.root().value : null;
  }

  /**
   * returns then back element in the queue
   * @public
   * @returnss {object}
   */
  back() {
    return this.size() > 0 ? this._heap.leaf().value : null;
  }

  /**
   * @public
   * add an element to the queue based on its priority
   * @param {object} element
   * @param {number} priority
   * @throws {Error} if priority is not a valid number
   */
  enqueue(element, priority) {
    if (Number.isNaN(+priority) || priority < 1) {
      throw new Error('priority should be a positive none-zero number');
    }
    this._heap.insert(priority, element);
  }

  /**
   * @public
   * removes and returns the element with highest priority in the queue
   * @returns {object}
   */
  dequeue() {
    return this.size() > 0 ? this._heap.extractRoot().value : null;
  }

  /**
   * @public
   * returns an sorted list of elements from highest priority to lowest
   * @returns {array}
   */
  toArray() {
    return this._heap.clone().sort().map((n) => n.getValue()).reverse();
  }

  /**
   * clears the queue
   * @public
   */
  clear() {
    this._heap.clear();
  }
}

module.exports = PriorityQueue;

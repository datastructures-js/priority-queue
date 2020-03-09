/**
 * datastructures-js/priority-queue
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { MinHeap } = require('@datastructures-js/heap');

/**
 * @class PriorityQueue
 * uses a MinHeap to enqueue and dequeue elements based on their priorities
 */
class PriorityQueue {
  constructor() {
    this.heap = new MinHeap();
  }

  /**
   * @public
   * @returns {number}
   */
  size() {
    return this.heap.size();
  }

  /**
   * @public
   * @returns {boolean}
   */
  isEmpty() {
    return this.heap.size() === 0;
  }

  /**
   * returns then front element in the queue
   * @public
   * @returns {object}
   */
  front() {
    return this.size() > 0 ? this.heap.root().value : null;
  }

  /**
   * returns then back element in the queue
   * @public
   * @returns {object}
   */
  back() {
    return this.size() > 0 ? this.heap.leaf().value : null;
  }

  /**
   * add an element to the queue based on its priority
   * @public
   * @param {object} element
   * @param {number} priority
   * @throws {Error}
   */
  enqueue(element, priority) {
    if (Number.isNaN(+priority) || priority < 1) {
      throw new Error('priority should be a positive none-zero number');
    }
    this.heap.insert(priority, element);
  }

  /**
   * removes and returns the element with highest priority in the queue
   * @public
   * @return {object}
   */
  dequeue() {
    return this.size() > 0 ? this.heap.extractRoot().value : null;
  }

  /**
   * returns an sorted list of elements from highest priority to lowest
   * @public
   * @return {array}
   */
  toArray() {
    return this.heap.clone().sort().map((n) => n.getValue()).reverse();
  }

  /**
   * clears the queue
   * @public
   */
  clear() {
    this.heap.clear();
  }
}

module.exports = PriorityQueue;

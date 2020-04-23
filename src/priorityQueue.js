/**
 * @datastructures-js/priority-queue
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

/**
 * @abstract
 * @class PriorityQueue
 */
class PriorityQueue {
  constructor(options = {}) {
    const { priority } = options;
    if (priority !== undefined && typeof priority !== 'function') {
      throw new Error('invalid priority callback');
    }
    this._getPriority = typeof priority === 'function' ? priority : null;
  }

  /**
   * @public
   * @returns {number}
   */
  size() {
    return this._heap.size();
  }

  /**
   * @public
   * @returns {boolean}
   */
  isEmpty() {
    return this._heap.isEmpty();
  }

  /**
   * @public
   * returns the element with highest priority in the queue
   * @returns {object}
   */
  front() {
    if (this.isEmpty()) return null;

    const first = this._heap.root();
    return {
      priority: first.getKey(),
      element: first.getValue()
    };
  }

  /**
   * @public
   * returns the element with lowest priority in the queue
   * @returns {object}
   */
  back() {
    if (this.isEmpty()) return null;

    const last = this._heap.leaf();
    return {
      priority: last.getKey(),
      element: last.getValue()
    };
  }

  /**
   * @public
   * add an element to the queue based on its priority
   * @param {object} element
   * @param {number} priority
   * @throws {Error} if priority is not a valid number
   */
  enqueue(element, priority) {
    if (priority && (Number.isNaN(+priority) || priority < 1)) {
      throw new Error('invalid priority number');
    }

    if (!priority && this._getPriority === null) {
      throw new Error('missing priority number or constructor callback');
    }

    this._heap.insert(priority || this._getPriority(element), element);
  }

  /**
   * @public
   * removes and returns the element with highest priority in the queue
   * @returns {object}
   */
  dequeue() {
    if (this.isEmpty()) return null;

    const first = this._heap.extractRoot();
    return {
      priority: first.getKey(),
      element: first.getValue()
    };
  }

  /**
   * @public
   * returns an sorted list of elements from highest priority to lowest
   * @returns {array}
   */
  toArray() {
    return this._heap
      .clone()
      .sort()
      .map((n) => ({ priority: n.getKey(), element: n.getValue() }))
      .reverse();
  }

  /**
   * @public
   * clears the queue
   */
  clear() {
    this._heap.clear();
  }
}

module.exports = PriorityQueue;

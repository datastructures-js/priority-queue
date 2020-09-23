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
   * @param {number} p - priority
   * @throws {Error} if priority is not a valid number
   */
  enqueue(element, p) {
    if (p && Number.isNaN(+p)) {
      throw new Error('invalid priority number');
    }

    if (Number.isNaN(+p) && this._getPriority === null) {
      throw new Error('missing priority number or constructor callback');
    }

    const priority = !Number.isNaN(+p) ? p : this._getPriority(element);
    this._heap.insert(priority, element);
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

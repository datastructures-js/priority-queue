/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 *
 * @abstract
 * @class PriorityQueue
 */
class PriorityQueue {
  /**
   * Creates a priority queue
   * @public
   * @params {object} [options]
   */
  constructor(options = {}) {
    const { priority } = options;
    if (priority !== undefined && typeof priority !== 'function') {
      throw new Error('.constructor expects a valid priority function');
    }
    this._priorityCb = priority || ((el) => +el);
  }

  /**
   * @private
   * @returns {object}
   */
  _getElementWithPriority(node) {
    return {
      priority: node.key,
      element: node.value
    };
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
   * Returns an element with highest priority in the queue
   * @public
   * @returns {object}
   */
  front() {
    if (this.isEmpty()) return null;
    return this._getElementWithPriority(this._heap.root());
  }

  /**
   * Returns an element with lowest priority in the queue
   * @public
   * @returns {object}
   */
  back() {
    if (this.isEmpty()) return null;
    return this._getElementWithPriority(this._heap.leaf());
  }

  /**
   * Adds an element to the queue
   * @public
   * @param {any} element
   * @param {number} p - priority
   * @throws {Error} if priority is not a valid number
   */
  enqueue(element, p) {
    if (p && Number.isNaN(+p)) {
      throw new Error('.enqueue expects a numeric priority');
    }

    if (Number.isNaN(+p) && Number.isNaN(this._priorityCb(element))) {
      throw new Error(
        '.enqueue expects a numeric priority '
        + 'or a constructor callback that returns a number'
      );
    }

    const priority = !Number.isNaN(+p) ? p : this._priorityCb(element);
    this._heap.insert(+priority, element);
    return this;
  }

  /**
   * Removes and returns an element with highest priority in the queue
   * @public
   * @returns {object}
   */
  dequeue() {
    if (this.isEmpty()) return null;
    return this._getElementWithPriority(this._heap.extractRoot());
  }

  /**
   * Returns a sorted list of elements from highest to lowest priority
   * @public
   * @returns {array}
   */
  toArray() {
    return this._heap
      .clone()
      .sort()
      .map((n) => this._getElementWithPriority(n))
      .reverse();
  }

  /**
   * Clears the queue
   * @public
   */
  clear() {
    this._heap.clear();
  }
}

module.exports = PriorityQueue;

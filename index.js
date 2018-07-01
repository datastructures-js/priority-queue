/**
 * datastructures-js/queue/PriorityQueue
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */
const priorityQueue = () => {
  let elements = [];
  let offset = 0;
  let priorities = {};

  /**
   * @returns {number}
   */
  const length = () => elements.length - offset;

  /**
   * @returns {boolean}
   */
  const isEmpty = () => length() === 0;

  /**
   * @returns {array}
   */
  const toArray = () => {
    const arr = [];
    if (isEmpty()) {
      return arr;
    }
    const pKeys = Object.keys(priorities);
    for (let i = offset; i < pKeys.length; i += 1) {
      arr.push(elements[priorities[pKeys[i]]]);
    }
    return arr;
  };

  /**
   * clears the queue
   */
  const clear = () => {
    elements = [];
    offset = 0;
    priorities = {};
  };

  /**
   * @returns {object}
   */
  const front = () => {
    if (!isEmpty()) {
      const pKeys = Object.keys(priorities);
      const firstIndex = priorities[pKeys[offset]];
      return elements[firstIndex];
    }
    return null;
  };

  /**
   * @returns {object}
   */
  const back = () => {
    if (!isEmpty()) {
      const pKeys = Object.keys(priorities);
      const lastIndex = priorities[pKeys[pKeys.length - 1]];
      return elements[lastIndex];
    }
    return null;
  };

  /**
   * @param {object} element
   * @param {number} priority
   * @throws {Error}
   */
  const enqueue = (el, priority) => {
    if (Number.isNaN(+priority) || priority < 1) {
      throw new Error('priority should be a positive number');
    }
    elements.push(el);
    priorities[priority] = elements.length - 1;
  };

  /**
   * only remove dequeued elements when reaching half size
   * to improve performance for high frequency data
   * @returns {object}
   */
  const dequeue = () => {
    if (!isEmpty()) {
      const first = front();
      offset += 1;
      if (offset * 2 >= elements.length) {
        const pKeys = Object.keys(priorities);
        const els = [];
        const prs = {};
        for (let i = offset; i < elements.length; i += 1) {
          els.push(elements[priorities[pKeys[i]]]);
          prs[priorities[i]] = els.length - 1;
        }
        priorities = prs;
        elements = els;
        offset = 0;
      }
      return first;
    }
    return null;
  };

  // priority queue API
  return {
    length,
    isEmpty,
    toArray,
    clear,
    front,
    back,
    enqueue,
    dequeue
  };
};

module.exports = priorityQueue;

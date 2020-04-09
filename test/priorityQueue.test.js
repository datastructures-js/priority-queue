const { expect } = require('chai');
const PriorityQueue = require('../src/priorityQueue');

describe('priorityQueue tests', () => {
  const priorityQueue = new PriorityQueue();

  describe('enqueue(element, priority)', () => {
    it('should throw an error when priort is invalid number', () => {
      expect(() => priorityQueue.enqueue('test', 'p'))
        .to.throw('priority should be a positive none-zero number');
    });

    it('should queue elements with priorities', () => {
      priorityQueue.enqueue('john', 2);
      priorityQueue.enqueue('sam', 4);
      priorityQueue.enqueue('samantha', 1);
      priorityQueue.enqueue('rose', 7);
    });
  });

  describe('.size()', () => {
    it('should have length of 4', () =>
      expect(priorityQueue.size()).to.equal(4));
  });

  describe('.front()', () => {
    it('should get the front element', () => {
      const { priority, element } = priorityQueue.front();
      expect(priority).to.equal(1);
      expect(element).to.equal('samantha');
    });
  });

  describe('.back()', () => {
    it('should get the back element', () => {
      expect(priorityQueue.back()).to.equal('rose');
    });
  });

  describe('toArray()', () => {
    it('should convert queue to array from highest priority to lowest', () => {
      expect(priorityQueue.toArray()).to.deep.equal([
        'samantha', 'john', 'sam', 'rose']
      );
    });
  });

  describe('.dequeue()', () => {
    it('should dequeue elements by priority', () => {
      const { priority: p1, element: e1} = priorityQueue.dequeue();
      expect(p1).to.equal(1);
      expect(e1).to.equal('samantha');
      expect(priorityQueue.size()).to.equal(3);
      expect(priorityQueue.front().element).to.equal('john');

      const { priority: p2, element: e2} = priorityQueue.dequeue();
      expect(p2).to.equal(2);
      expect(e2).to.equal('john');
      expect(priorityQueue.size()).to.equal(2);
      expect(priorityQueue.front().element).to.equal('sam');

      const { priority: p3, element: e3} = priorityQueue.dequeue();
      expect(p3).to.equal(4);
      expect(e3).to.equal('sam');
      expect(priorityQueue.size()).to.equal(1);
      expect(priorityQueue.front().element).to.equal('rose');
    });
  });

  describe('.isEmpty()', () => {
    it('should not be empty', () => {
      expect(priorityQueue.isEmpty()).to.equal(false);
    });
  });

  describe('.clear()', () => {
    it('should clear the priorty queue', () => {
      priorityQueue.clear();
      expect(priorityQueue.size()).to.equal(0);
      expect(priorityQueue.isEmpty()).to.equal(true);
      expect(priorityQueue.toArray()).to.deep.equal([]);
      expect(priorityQueue.front()).to.equal(null);
      expect(priorityQueue.back()).to.equal(null);
      expect(priorityQueue.dequeue()).to.equal(null);
    });
  });
});

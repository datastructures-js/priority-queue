const { expect } = require('chai');
const priorityQueue = require('./index');

describe('priorityQueue tests', () => {
  const pq = priorityQueue();

  describe('enqueue(element, priority)', () => {
    it('should throw an error when priort is invalid number', () =>
      expect(() => pq.enqueue('test', 'p'))
        .to.throw('priority should be a positive number'));

    it('should queue elements with priorities', () => {
      pq.enqueue('john', 2);
      pq.enqueue('sam', 4);
      pq.enqueue('samantha', 1);
      pq.enqueue('rose', 7);
    });
  });

  describe('.length()', () =>
    it('should have length of 4', () =>
      expect(pq.length()).to.equal(4)));

  describe('.front()', () =>
    it('should get the front element', () =>
      expect(pq.front()).to.equal('samantha')));

  describe('.back()', () =>
    it('should get the back element', () =>
      expect(pq.back()).to.equal('rose')));

  describe('toArray()', () =>
    it('should convert queue to array from highest priority to lowest', () =>
      expect(pq.toArray())
        .to.deep.equal(['samantha', 'john', 'sam', 'rose'])));

  describe('.dequeue()', () =>
    it('should dequeue elements by priority', () => {
      expect(pq.dequeue()).to.equal('samantha');
      expect(pq.length()).to.equal(3);
      expect(pq.front()).to.equal('john');

      expect(pq.dequeue()).to.equal('john');
      expect(pq.length()).to.equal(2);
      expect(pq.front()).to.equal('sam');

      expect(pq.dequeue()).to.equal('sam');
      expect(pq.length()).to.equal(1);
      expect(pq.front()).to.equal('rose');
    }));

  describe('.isEmpty()', () =>
    it('should not be empty', () =>
      expect(pq.isEmpty()).to.equal(false)));

  describe('.clear()', () =>
    it('should clear the priorty queue', () => {
      pq.clear();
      expect(pq.length()).to.equal(0);
      expect(pq.isEmpty()).to.equal(true);
      expect(pq.toArray()).to.deep.equal([]);
      expect(pq.front()).to.equal(null);
      expect(pq.back()).to.equal(null);
      expect(pq.dequeue()).to.equal(null);
    }));
});

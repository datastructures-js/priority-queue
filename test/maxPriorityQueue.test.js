const { expect } = require('chai');
const MaxPriorityQueue = require('../src/maxPriorityQueue');

describe('MaxPriorityQueue tests', () => {
  const biddersQueue = new MaxPriorityQueue();

  describe('enqueue(element, priority)', () => {
    it('should throw an error when priort is invalid number', () => {
      expect(() => biddersQueue.enqueue('test', 'p'))
        .to.throw('priority should be a positive none-zero number');
    });

    it('should queue elements with priorities', () => {
      biddersQueue.enqueue('bidder y', 1000); // lowest priority
      biddersQueue.enqueue('bidder z', 3500); // highest priority
      biddersQueue.enqueue('bidder w', 2500);
      biddersQueue.enqueue('bidder x', 3000);
    });
  });

  describe('.size()', () => {
    it('should have length of 4', () => {
      expect(biddersQueue.size()).to.equal(4);
    });
  });

  describe('.front()', () => {
    it('should get the front element', () => {
      const { priority, element } = biddersQueue.front();
      expect(priority).to.equal(3500);
      expect(element).to.equal('bidder z');
    });
  });

  describe('.back()', () => {
    it('should get the back element', () => {
      const { priority, element } = biddersQueue.back();
      expect(priority).to.equal(1000);
      expect(element).to.equal('bidder y');
    });
  });

  describe('toArray()', () => {
    it('should convert queue to array from highest priority to lowest', () => {
      expect(biddersQueue.toArray()).to.deep.equal([
        { priority: 3500, element: 'bidder z' },
        { priority: 3000, element: 'bidder x' },
        { priority: 2500, element: 'bidder w' },
        { priority: 1000, element: 'bidder y' }
      ]);
    });
  });

  describe('.dequeue()', () => {
    it('should dequeue elements by priority', () => {
      const { priority: p1, element: e1} = biddersQueue.dequeue();
      expect(p1).to.equal(3500);
      expect(e1).to.equal('bidder z');
      expect(biddersQueue.size()).to.equal(3);
      expect(biddersQueue.front().element).to.equal('bidder x');

      const { priority: p2, element: e2} = biddersQueue.dequeue();
      expect(p2).to.equal(3000);
      expect(e2).to.equal('bidder x');
      expect(biddersQueue.size()).to.equal(2);
      expect(biddersQueue.front().element).to.equal('bidder w');

      const { priority: p3, element: e3} = biddersQueue.dequeue();
      expect(p3).to.equal(2500);
      expect(e3).to.equal('bidder w');
      expect(biddersQueue.size()).to.equal(1);
      expect(biddersQueue.front().element).to.equal('bidder y');
    });
  });

  describe('.isEmpty()', () => {
    it('should not be empty', () => {
      expect(biddersQueue.isEmpty()).to.equal(false);
    });
  });

  describe('.clear()', () => {
    it('should clear the priorty queue', () => {
      biddersQueue.clear();
      expect(biddersQueue.size()).to.equal(0);
      expect(biddersQueue.isEmpty()).to.equal(true);
      expect(biddersQueue.toArray()).to.deep.equal([]);
      expect(biddersQueue.front()).to.equal(null);
      expect(biddersQueue.back()).to.equal(null);
      expect(biddersQueue.dequeue()).to.equal(null);
    });
  });
});

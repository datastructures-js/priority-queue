const { expect } = require('chai');
const MaxPriorityQueue = require('../src/maxPriorityQueue');

describe('MaxPriorityQueue tests', () => {
  let biddersQueue, bidsQueue;

  describe('constructor(options)', () => {
    it('creates an instance', () => {
      biddersQueue = new MaxPriorityQueue();
      expect(biddersQueue).to.be.instanceof(MaxPriorityQueue);
    });

    it('creates an instance with a priority callback', () => {
      bidsQueue = new MaxPriorityQueue({ priority: (bid) => bid.value });
    });

    it('throws an error if a priority callback is invalid', () => {
      expect(() => new MaxPriorityQueue({ priority: 'test' }))
        .to.throw('.constructor expects a valid priority function');
    });
  });

  describe('enqueue(element[, priority])', () => {
    it('should throw an error when priority is invalid number', () => {
      expect(() => biddersQueue.enqueue('test', 'p'))
        .to.throw('.enqueue expects a numeric priority');
    });

    it('should throw an error when no priority is provided', () => {
      expect(() => biddersQueue.enqueue('test'))
        .to.throw('enqueue expects a numeric priority '
          + 'or a constructor callback that returns a number'
        );
    });

    it('should queue elements with priorities', () => {
      biddersQueue.enqueue('bidder y', 1000); // lowest priority
      biddersQueue.enqueue('bidder z', 3500); // highest priority
      biddersQueue.enqueue('bidder w', 2500);
      biddersQueue.enqueue('bidder x', 3000);

      bidsQueue.enqueue({ name: 'bidder y', value: 1000 }); // lowest priority
      bidsQueue.enqueue({ name: 'bidder z', value: 3500 }); // highest priority
      bidsQueue.enqueue({ name: 'bidder w', value: 2500 });
      bidsQueue.enqueue({ name: 'bidder x', value: 3000 });
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

      expect(bidsQueue.toArray()).to.deep.equal([
        { priority: 3500, element: { name: 'bidder z', value: 3500 } },
        { priority: 3000, element: { name: 'bidder x', value: 3000 } },
        { priority: 2500, element: { name: 'bidder w', value: 2500 } },
        { priority: 1000, element: { name: 'bidder y', value: 1000 } }
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

      const { priority: p11, element: e11} = bidsQueue.dequeue();
      expect(p11).to.equal(3500);
      expect(e11).to.deep.equal({ name: 'bidder z', value: 3500 });
      expect(bidsQueue.size()).to.equal(3);
      expect(bidsQueue.front().element)
        .to.deep.equal({ name: 'bidder x', value: 3000 });

      const { priority: p2, element: e2} = biddersQueue.dequeue();
      expect(p2).to.equal(3000);
      expect(e2).to.equal('bidder x');
      expect(biddersQueue.size()).to.equal(2);
      expect(biddersQueue.front().element).to.equal('bidder w');

      const { priority: p22, element: e22} = bidsQueue.dequeue();
      expect(p22).to.equal(3000);
      expect(e22).to.deep.equal({ name: 'bidder x', value: 3000 });
      expect(bidsQueue.size()).to.equal(2);
      expect(bidsQueue.front().element)
        .to.deep.equal({ name: 'bidder w', value: 2500 });

      const { priority: p3, element: e3} = biddersQueue.dequeue();
      expect(p3).to.equal(2500);
      expect(e3).to.equal('bidder w');
      expect(biddersQueue.size()).to.equal(1);
      expect(biddersQueue.front().element).to.equal('bidder y');

      const { priority: p33, element: e33} = bidsQueue.dequeue();
      expect(p33).to.equal(2500);
      expect(e33).to.deep.equal({ name: 'bidder w', value: 2500 });
      expect(bidsQueue.size()).to.equal(1);
      expect(bidsQueue.front().element)
        .to.deep.equal({ name: 'bidder y', value: 1000 });
    });
  });

  describe('.isEmpty()', () => {
    it('should not be empty', () => {
      expect(biddersQueue.isEmpty()).to.equal(false);
      expect(bidsQueue.isEmpty()).to.equal(false);
    });
  });

  describe('.clear()', () => {
    it('should clear the priorty queue', () => {
      biddersQueue.clear();
      bidsQueue.clear();
      expect(biddersQueue.size()).to.equal(0);
      expect(bidsQueue.size()).to.equal(0);
      expect(biddersQueue.isEmpty()).to.equal(true);
      expect(bidsQueue.isEmpty()).to.equal(true);
      expect(biddersQueue.toArray()).to.deep.equal([]);
      expect(bidsQueue.toArray()).to.deep.equal([]);
      expect(biddersQueue.front()).to.equal(null);
      expect(bidsQueue.front()).to.equal(null);
      expect(biddersQueue.back()).to.equal(null);
      expect(bidsQueue.back()).to.equal(null);
      expect(biddersQueue.dequeue()).to.equal(null);
      expect(bidsQueue.dequeue()).to.equal(null);
    });
  });
});

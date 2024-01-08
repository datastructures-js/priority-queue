const { expect } = require('chai');
const { MaxPriorityQueue } = require('../src/maxPriorityQueue');

describe('MaxPriorityQueue tests', () => {
  describe('with priority', () => {
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

  describe('with comparator', () => {
    let employeesQueue;

    describe('constructor(options)', () => {
      it('creates an instance', () => {
        employeesQueue = new MaxPriorityQueue({
          compare: (e1, e2) => e2.salary - e1.salary
        });
        expect(employeesQueue).to.be.instanceof(MaxPriorityQueue);
      });
    });

    describe('enqueue(element)', () => {
      it('should queue elements', () => {
        employeesQueue.enqueue({ name: 'employee 1', salary: 2000 });
        employeesQueue.enqueue({ name: 'employee 2', salary: 1500 });
        employeesQueue.enqueue({ name: 'employee 3', salary: 4000 });
        employeesQueue.enqueue({ name: 'employee 4', salary: 2500 });
        employeesQueue.enqueue({ name: 'employee 5', salary: 3000 });
      });
    });

    describe('.size()', () => {
      it('should have length of 5', () => {
        expect(employeesQueue.size()).to.equal(5);
      });
    });

    describe('.front()', () => {
      it('should get the front element', () => {
        expect(employeesQueue.front()).to.deep.equal({
          name: 'employee 3',
          salary: 4000
        });
      });
    });

    describe('.back()', () => {
      it('should get the back element', () => {
        expect(employeesQueue.back()).to.deep.equal({
          name: 'employee 2',
          salary: 1500
        });
      });
    });

    describe('.toArray()' , () => {
      it('returns a sorted array from the queue', () => {
        expect(employeesQueue.toArray()).to.deep.equal([
          {
            name: 'employee 3',
            salary: 4000
          },
          {
            name: 'employee 5',
            salary: 3000
          },
          {
            name: 'employee 4',
            salary: 2500
          },
          {
            name: 'employee 1',
            salary: 2000
          },
          {
            name: 'employee 2',
            salary: 1500
          },
        ]);
      });
    });

    describe('.isEmpty()', () => {
      it('should not be empty', () => {
        expect(employeesQueue.isEmpty()).to.equal(false);
      });
    });

    describe('.dequeue()', () => {
      it('should dequeue elements by priority', () => {
        expect(employeesQueue.dequeue()).to.deep.equal({
          name: 'employee 3',
          salary: 4000
        });
        expect(employeesQueue.dequeue()).to.deep.equal({
          name: 'employee 5',
          salary: 3000
        });
        expect(employeesQueue.dequeue()).to.deep.equal({
          name: 'employee 4',
          salary: 2500
        });
        expect(employeesQueue.dequeue()).to.deep.equal({
          name: 'employee 1',
          salary: 2000
        });
      });
    });

    describe('.clear()', () => {
      it('should clear the queue', () => {
        expect(employeesQueue.size()).to.equal(1);
        employeesQueue.clear();
        expect(employeesQueue.size()).to.equal(0);
        expect(employeesQueue.isEmpty()).to.equal(true);
        expect(employeesQueue.toArray()).to.deep.equal([]);
        expect(employeesQueue.front()).to.equal(null);
        expect(employeesQueue.back()).to.equal(null);
        expect(employeesQueue.dequeue()).to.equal(null);
      });
    });

    describe('MaxPriorityQueue.from(entries)', () => {
      it('should create MaxPriorityQueue from [element, priority] pair array', () => {
        const numValues = [
          { id: 50 },
          { id: 80 },
          { id: 30 },
          { id: 90 },
          { id: 60 },
          { id: 40 },
          { id: 20 }
        ];

        const q = MaxPriorityQueue.from(numValues.map((element) => [element, element.id]));
        expect(q.toArray()).to.deep.equal([
          { priority: 90, element: { id: 90 } },
          { priority: 80, element: { id: 80 } },
          { priority: 60, element: { id: 60 } },
          { priority: 50, element: { id: 50 } },
          { priority: 40, element: { id: 40 } },
          { priority: 30, element: { id: 30 } },
          { priority: 20, element: { id: 20 } }
        ]);
      });
    });
  });
});

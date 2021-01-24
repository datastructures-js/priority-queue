const { expect } = require('chai');
const MinPriorityQueue = require('../src/minPriorityQueue');

describe('MinPriorityQueue tests', () => {
  let patientsQueue, turnsQueue;

  describe('constructor(options)', () => {
    it('creates an instance', () => {
      patientsQueue = new MinPriorityQueue();
      expect(patientsQueue).to.be.instanceof(MinPriorityQueue);
    });

    it('creates an instance with a priority callback', () => {
      turnsQueue = new MinPriorityQueue({ priority: (turn) => turn.value });
    });

    it('throws an error if a priority callback is invalid', () => {
      expect(() => new MinPriorityQueue({ priority: 'test' }))
        .to.throw('.constructor expects a valid priority function');
    });
  });

  describe('enqueue(element[, priority])', () => {
    it('should throw an error when priority is invalid number', () => {
      expect(() => patientsQueue.enqueue('test', 'p'))
        .to.throw('.enqueue expects a numeric priority');
    });

    it('should throw an error when priority not provided anywhere', () => {
      const invalidQueue = new MinPriorityQueue();
      expect(() => invalidQueue.enqueue('test'))
        .to.throw(Error).and.to.have.property(
          'message',
          '.enqueue expects a numeric priority '
          + 'or a constructor callback that returns a number'
        );
    });

    it('should queue elements with priorities', () => {
      patientsQueue.enqueue('patient a', 0); // highest priority
      patientsQueue.enqueue('patient y', 1);
      patientsQueue.enqueue('patient z', 3);
      patientsQueue.enqueue('patient w', 4); // lowest priority
      patientsQueue.enqueue('patient x', 2);

      turnsQueue.enqueue({ name: 'patient a', value: 0 }); // highest priority
      turnsQueue.enqueue({ name: 'patient y', value: 1 });
      turnsQueue.enqueue({ name: 'patient z', value: 3 });
      turnsQueue.enqueue({ name: 'patient w', value: 4 }); // lowest priority
      turnsQueue.enqueue({ name: 'patient x', value: 2 });
    });
  });

  describe('.size()', () => {
    it('should have length of 4', () => {
      expect(patientsQueue.size()).to.equal(5);
      expect(turnsQueue.size()).to.equal(5);
    });
  });

  describe('.front()', () => {
    it('should get the front element', () => {
      const { priority, element } = patientsQueue.front();
      expect(priority).to.equal(0);
      expect(element).to.equal('patient a');
    });
  });

  describe('.back()', () => {
    it('should get the back element', () => {
      const { priority, element } = patientsQueue.back();
      expect(priority).to.equal(4);
      expect(element).to.equal('patient w');
    });
  });

  describe('toArray()', () => {
    it('should convert queue to array from highest priority to lowest', () => {
      expect(patientsQueue.toArray()).to.deep.equal([
        { priority: 0, element: 'patient a' },
        { priority: 1, element: 'patient y' },
        { priority: 2, element: 'patient x' },
        { priority: 3, element: 'patient z' },
        { priority: 4, element: 'patient w' }
      ]);

      expect(turnsQueue.toArray()).to.deep.equal([
        { priority: 0, element: { name: 'patient a', value: 0 }},
        { priority: 1, element: { name: 'patient y', value: 1 }},
        { priority: 2, element: { name: 'patient x', value: 2 }},
        { priority: 3, element: { name: 'patient z', value: 3 }},
        { priority: 4, element: { name: 'patient w', value: 4 }}
      ]);
    });
  });

  describe('.dequeue()', () => {
    it('should dequeue elements by priority', () => {
      const { priority: p0, element: e0} = patientsQueue.dequeue();
      expect(p0).to.equal(0);
      expect(e0).to.equal('patient a');
      expect(patientsQueue.size()).to.equal(4);
      expect(patientsQueue.front().element).to.equal('patient y');

      const { priority: p00, element: e00} = turnsQueue.dequeue();
      expect(p00).to.equal(0);
      expect(e00).to.deep.equal({ name: 'patient a', value: 0 });
      expect(turnsQueue.size()).to.equal(4);
      expect(turnsQueue.front().element)
        .to.deep.equal({ name: 'patient y', value: 1 });

      const { priority: p1, element: e1} = patientsQueue.dequeue();
      expect(p1).to.equal(1);
      expect(e1).to.equal('patient y');
      expect(patientsQueue.size()).to.equal(3);
      expect(patientsQueue.front().element).to.equal('patient x');

      const { priority: p11, element: e11} = turnsQueue.dequeue();
      expect(p11).to.equal(1);
      expect(e11).to.deep.equal({ name: 'patient y', value: 1 });
      expect(turnsQueue.size()).to.equal(3);
      expect(turnsQueue.front().element)
        .to.deep.equal({ name: 'patient x', value: 2 });

      const { priority: p2, element: e2} = patientsQueue.dequeue();
      expect(p2).to.equal(2);
      expect(e2).to.equal('patient x');
      expect(patientsQueue.size()).to.equal(2);
      expect(patientsQueue.front().element).to.equal('patient z');

      const { priority: p22, element: e22} = turnsQueue.dequeue();
      expect(p22).to.equal(2);
      expect(e22).to.deep.equal({ name: 'patient x', value: 2 });
      expect(turnsQueue.size()).to.equal(2);
      expect(turnsQueue.front().element)
        .to.deep.equal({ name: 'patient z', value: 3 });

      const { priority: p3, element: e3} = patientsQueue.dequeue();
      expect(p3).to.equal(3);
      expect(e3).to.equal('patient z');
      expect(patientsQueue.size()).to.equal(1);
      expect(patientsQueue.front().element).to.equal('patient w');

      const { priority: p33, element: e33} = turnsQueue.dequeue();
      expect(p33).to.equal(3);
      expect(e33).to.deep.equal({ name: 'patient z', value: 3 });
      expect(turnsQueue.size()).to.equal(1);
      expect(turnsQueue.front().element)
        .to.deep.equal({ name: 'patient w', value: 4 });
    });
  });

  describe('.isEmpty()', () => {
    it('should not be empty', () => {
      expect(patientsQueue.isEmpty()).to.equal(false);
    });
  });

  describe('.clear()', () => {
    it('should clear the priorty queue', () => {
      patientsQueue.clear();
      turnsQueue.clear();
      expect(patientsQueue.size()).to.equal(0);
      expect(turnsQueue.size()).to.equal(0);
      expect(patientsQueue.isEmpty()).to.equal(true);
      expect(turnsQueue.isEmpty()).to.equal(true);
      expect(patientsQueue.toArray()).to.deep.equal([]);
      expect(turnsQueue.toArray()).to.deep.equal([]);
      expect(patientsQueue.front()).to.equal(null);
      expect(turnsQueue.front()).to.equal(null);
      expect(patientsQueue.back()).to.equal(null);
      expect(turnsQueue.back()).to.equal(null);
      expect(patientsQueue.dequeue()).to.equal(null);
      expect(turnsQueue.dequeue()).to.equal(null);
    });
  });
});

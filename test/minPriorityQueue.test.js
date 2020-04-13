const { expect } = require('chai');
const MinPriorityQueue = require('../src/minPriorityQueue');

describe('MinPriorityQueue tests', () => {
  const patientsQueue = new MinPriorityQueue();

  describe('enqueue(element, priority)', () => {
    it('should throw an error when priort is invalid number', () => {
      expect(() => patientsQueue.enqueue('test', 'p'))
        .to.throw('priority should be a positive none-zero number');
    });

    it('should queue elements with priorities', () => {
      patientsQueue.enqueue('patient y', 1); // highest priority
      patientsQueue.enqueue('patient z', 3);
      patientsQueue.enqueue('patient w', 4); // lowest priority
      patientsQueue.enqueue('patient x', 2);
    });
  });

  describe('.size()', () => {
    it('should have length of 4', () => {
      expect(patientsQueue.size()).to.equal(4);
    });
  });

  describe('.front()', () => {
    it('should get the front element', () => {
      const { priority, element } = patientsQueue.front();
      expect(priority).to.equal(1);
      expect(element).to.equal('patient y');
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
        { priority: 1, element: 'patient y' },
        { priority: 2, element: 'patient x' },
        { priority: 3, element: 'patient z' },
        { priority: 4, element: 'patient w' }
      ]);
    });
  });

  describe('.dequeue()', () => {
    it('should dequeue elements by priority', () => {
      const { priority: p1, element: e1} = patientsQueue.dequeue();
      expect(p1).to.equal(1);
      expect(e1).to.equal('patient y');
      expect(patientsQueue.size()).to.equal(3);
      expect(patientsQueue.front().element).to.equal('patient x');

      const { priority: p2, element: e2} = patientsQueue.dequeue();
      expect(p2).to.equal(2);
      expect(e2).to.equal('patient x');
      expect(patientsQueue.size()).to.equal(2);
      expect(patientsQueue.front().element).to.equal('patient z');

      const { priority: p3, element: e3} = patientsQueue.dequeue();
      expect(p3).to.equal(3);
      expect(e3).to.equal('patient z');
      expect(patientsQueue.size()).to.equal(1);
      expect(patientsQueue.front().element).to.equal('patient w');
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
      expect(patientsQueue.size()).to.equal(0);
      expect(patientsQueue.isEmpty()).to.equal(true);
      expect(patientsQueue.toArray()).to.deep.equal([]);
      expect(patientsQueue.front()).to.equal(null);
      expect(patientsQueue.back()).to.equal(null);
      expect(patientsQueue.dequeue()).to.equal(null);
    });
  });
});

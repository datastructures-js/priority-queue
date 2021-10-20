const { expect } = require('chai');
const { PriorityQueue } = require('../src/priorityQueue');

describe('PriorityQueue tests', () => {
  describe('with comparator', () => {
    let employeesQueue;

    describe('constructor(options)', () => {
      it('creates an instance', () => {
        employeesQueue = new PriorityQueue({
          compare: (e1, e2) => e2.salary - e1.salary
        });
        expect(employeesQueue).to.be.instanceof(PriorityQueue);
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
  });
});

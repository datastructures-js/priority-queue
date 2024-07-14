const { expect } = require('chai');
const { Heap } = require('../src/priorityQueue');
const { PriorityQueue } = require('../src/priorityQueue');

describe('PriorityQueue', () => {
  const numComparator = (a, b) => a.id - b.id;
  const numValues = [
    { id: 50 },
    { id: 80 },
    { id: 30 },
    { id: 90 },
    { id: 60 },
    { id: 40 },
    { id: 20 }
  ];

  const charComparator = (a, b) => (
    a.id < b.id ? 1 : -1
  );
  const charValues = [
    { id: 'm' },
    { id: 'x' },
    { id: 'f' },
    { id: 'b' },
    { id: 'z' },
    { id: 'k' },
    { id: 'c' }
  ];

  describe('PriorityQueue with min logic', () => {
    const minQ = new PriorityQueue(numComparator);

    it('enqueue', () => {
      numValues.forEach((value) => minQ.enqueue(value));
    });

    it('toArray', () => {
      expect(minQ.toArray()).to.eql(numValues.slice().sort((a, b) => a.id - b.id));
    });

    it('front', () => {
      expect(minQ.front()).to.eql({ id: 20 });
    });

    it('back', () => {
      expect(minQ.back()).to.eql({ id: 90 });
    });

    it('size', () => {
      expect(minQ.size()).to.equal(7);
    });

    it('isEmpty', () => {
      expect(minQ.isEmpty()).to.equal(false);
    });

    it('dequeue', () => {
      expect(minQ.dequeue()).to.deep.equal({ id: 20 });
      expect(minQ.dequeue()).to.deep.equal({ id: 30 });
      expect(minQ.dequeue()).to.deep.equal({ id: 40 });
      expect(minQ.dequeue()).to.deep.equal({ id: 50 });
      expect(minQ.dequeue()).to.deep.equal({ id: 60 });
      expect(minQ.dequeue()).to.deep.equal({ id: 80 });
      expect(minQ.dequeue()).to.deep.equal({ id: 90 });
      expect(minQ.isEmpty()).to.equal(true);
    });
  });

  describe('PriorityQueue with max logic', () => {
    const maxQ = new PriorityQueue(charComparator);

    it('enqueue (push)', () => {
      charValues.forEach((value) => maxQ.push(value));
    });

    it('toArray', () => {
      expect(maxQ.toArray())
        .to.eql(charValues.slice().sort((a, b) => (
          a.id > b.id ? -1 : 1
        )));
    });

    it('front', () => {
      expect(maxQ.front()).to.eql({ id: 'z' });
    });

    it('back', () => {
      expect(maxQ.back()).to.eql({ id: 'b' });
    });

    it('size', () => {
      expect(maxQ.size()).to.equal(7);
    });

    it('isEmpty', () => {
      expect(maxQ.isEmpty()).to.equal(false);
    });

    it('dequeue (pop)', () => {
      expect(maxQ.pop()).to.deep.equal({ id: 'z' });
      expect(maxQ.pop()).to.deep.equal({ id: 'x' });
      expect(maxQ.pop()).to.deep.equal({ id: 'm' });
      expect(maxQ.pop()).to.deep.equal({ id: 'k' });
      expect(maxQ.pop()).to.deep.equal({ id: 'f' });
      expect(maxQ.pop()).to.deep.equal({ id: 'c' });
      expect(maxQ.pop()).to.deep.equal({ id: 'b' });
      expect(maxQ.isEmpty()).to.equal(true);
    });
  });

  describe('contains', () => {
    it('checks if the queue contains an element', () => {
      const maxQ = new PriorityQueue(charComparator);
      charValues.forEach((value) => maxQ.push(value));
      expect(maxQ.contains((c) => c.id === 'z')).to.equal(true);
      expect(maxQ.contains((c) => c.id === 'y')).to.equal(false);
    });
  });

  describe('remove', () => {
    it('remove elements that match a criteria', () => {
      const testArr = [20, 30, 40, 50, 80, 90];
      const qTest = PriorityQueue.fromArray(testArr.slice(), (a, b) => a - b);
      const removed = qTest.remove((n) => [30, 50, 80].includes(n));
      expect(removed.sort()).to.eql([30, 50, 80]);
      expect(qTest.pop()).to.eql(20);
      expect(qTest.pop()).to.eql(40);
      expect(qTest.pop()).to.eql(90);
    });
  });

  describe('iterator', () => {
    it('allows iterating on queue elements', () => {
      const testArr = [20, 30, 40, 50, 80, 90];
      const qTest = PriorityQueue.fromArray(testArr.slice(), (a, b) => a - b);
      expect([...qTest]).to.eql(testArr);
      const qTest2 = PriorityQueue.fromArray(testArr.slice(), (a, b) => a - b);
      const res = [];
      for (const n of qTest2) {
        res.push(n);
      }
      expect(res).to.eql(testArr);
    });
  });

  describe('fromArray', () => {
    it('min PriorityQueue from array', () => {
      const q = PriorityQueue.fromArray(numValues, numComparator);
      expect(q.toArray()).to.eql(numValues.slice().sort((a, b) => a.id - b.id));
    });

    it('max PriorityQueue from array', () => {
      const q = PriorityQueue.fromArray(charValues, charComparator);
      expect(q.toArray()).to.eql(charValues.slice().sort((a, b) => (
        a.id > b.id ? -1 : 1
      )));
    });
  });
});

const { expect } = require('chai');
const { MaxPriorityQueue } = require('../src/maxPriorityQueue');

describe('MaxPriorityQueue', () => {
  describe('primitive values', () => {
    const values = ['m', 'x', 'f', 'b', 'z', 'k', 'c'];
    const maxQ = new MaxPriorityQueue();

    it('enqueue', () => {
      values.forEach((value) => maxQ.enqueue(value));
    });

    it('toArray', () => {
      expect(maxQ.toArray()).to.eql(values.slice().sort((a, b) => (
        a > b ? -1 : 1
      )));
    });

    it('front', () => {
      expect(maxQ.front()).to.eql('z');
    });

    it('back', () => {
      expect(maxQ.back()).to.eql('b');
    });

    it('size', () => {
      expect(maxQ.size()).to.equal(7);
    });

    it('isEmpty', () => {
      expect(maxQ.isEmpty()).to.equal(false);
    });

    it('dequeue', () => {
      expect(maxQ.dequeue()).to.deep.equal('z');
      expect(maxQ.dequeue()).to.deep.equal('x');
      expect(maxQ.dequeue()).to.deep.equal('m');
      expect(maxQ.dequeue()).to.deep.equal('k');
      expect(maxQ.dequeue()).to.deep.equal('f');
      expect(maxQ.dequeue()).to.deep.equal('c');
      expect(maxQ.dequeue()).to.deep.equal('b');
      expect(maxQ.isEmpty()).to.equal(true);
    });
  });

  describe('object values heap', () => {
    const values = [
      { id: 'm' },
      { id: 'x' },
      { id: 'f' },
      { id: 'b' },
      { id: 'z' },
      { id: 'k' },
      { id: 'c' }
    ];
    const maxQ = new MaxPriorityQueue((value) => value.id);

    it('enqueue (push)', () => {
      values.forEach((value) => maxQ.push(value));
    });

    it('toArray', () => {
      expect(maxQ.toArray()).to.eql(values.slice().sort((a, b) => (
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

    describe('iterator', () => {
      it('allows iterating on queue elements', () => {
        const testArr = [90, 80, 50, 40, 30, 20];
        const qTest = MaxPriorityQueue.fromArray(testArr.slice());
        expect([...qTest]).to.eql(testArr);
        const qTest2 = MaxPriorityQueue.fromArray(testArr.slice());
        const res = [];
        for (const n of qTest2) {
          res.push(n);
        }
        expect(res).to.eql(testArr);
      });
    });

    describe('contains', () => {
      it('checks if the queue contains an element', () => {
        const testArr = [90, 80, 50, 40, 30, 20];
        const qTest = MaxPriorityQueue.fromArray(testArr.slice());
        expect(qTest.contains((n) => n === 50)).to.equal(true);
        expect(qTest.contains((n) => n === 100)).to.equal(false);
      });
    });

    describe('remove', () => {
      it('remove elements that match a criteria', () => {
        const testArr = [20, 30, 40, 50, 80, 90];
        const qTest = MaxPriorityQueue.fromArray(testArr.slice());
        const removed = qTest.remove((n) => [30, 50, 80].includes(n));
        expect(removed.sort()).to.eql([30, 50, 80]);
        expect(qTest.pop()).to.eql(90);
        expect(qTest.pop()).to.eql(40);
        expect(qTest.pop()).to.eql(20);
      });
    });
  });
});

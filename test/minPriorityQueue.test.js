const { expect } = require('chai');
const { MinPriorityQueue } = require('../src/MinPriorityQueue');

describe('MinPriorityQueue', () => {
  describe('primitive values', () => {
    const values = [50, 80, 30, 90, 60, 40, 20];
    const minQ = new MinPriorityQueue();

    it('enqueue', () => {
      values.forEach((value) => minQ.enqueue(value));
    });

    it('toArray', () => {
      expect(minQ.toArray()).to.eql(values.slice().sort((a, b) => a - b));
    });

    it('front', () => {
      expect(minQ.front()).to.eql(20);
    });

    it('back', () => {
      expect(minQ.back()).to.eql(90);
    });

    it('size', () => {
      expect(minQ.size()).to.equal(7);
    });

    it('isEmpty', () => {
      expect(minQ.isEmpty()).to.equal(false);
    });

    it('dequeue', () => {
      expect(minQ.dequeue()).to.deep.equal(20);
      expect(minQ.dequeue()).to.deep.equal(30);
      expect(minQ.dequeue()).to.deep.equal(40);
      expect(minQ.dequeue()).to.deep.equal(50);
      expect(minQ.dequeue()).to.deep.equal(60);
      expect(minQ.dequeue()).to.deep.equal(80);
      expect(minQ.dequeue()).to.deep.equal(90);
      expect(minQ.isEmpty()).to.equal(true);
    });
  });

  describe('object values', () => {
    const values = [
      { id: 50 },
      { id: 80 },
      { id: 30 },
      { id: 90 },
      { id: 60 },
      { id: 40 },
      { id: 20 }
    ];
    const minQ = new MinPriorityQueue((value) => value.id);

    it('enqueue', () => {
      values.forEach((value) => minQ.enqueue(value));
    });

    it('toArray', () => {
      expect(minQ.toArray()).to.eql(values.slice().sort((a, b) => a.id - b.id));
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
});

const { expect } = require('chai');
const { MaxPriorityQueue } = require('../src/MaxPriorityQueue');

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

    it('enqueue', () => {
      values.forEach((value) => maxQ.enqueue(value));
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

    it('dequeue', () => {
      expect(maxQ.dequeue()).to.deep.equal({ id: 'z' });
      expect(maxQ.dequeue()).to.deep.equal({ id: 'x' });
      expect(maxQ.dequeue()).to.deep.equal({ id: 'm' });
      expect(maxQ.dequeue()).to.deep.equal({ id: 'k' });
      expect(maxQ.dequeue()).to.deep.equal({ id: 'f' });
      expect(maxQ.dequeue()).to.deep.equal({ id: 'c' });
      expect(maxQ.dequeue()).to.deep.equal({ id: 'b' });
      expect(maxQ.isEmpty()).to.equal(true);
    });
  });
});

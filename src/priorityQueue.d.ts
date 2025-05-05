import { ICompare } from '@datastructures-js/heap';

export class PriorityQueue<T> implements Iterable<T> {
  constructor(compare: ICompare<T>, values?: T[]);
  [Symbol.iterator](): Iterator<T, any, undefined>;
  size(): number;
  isEmpty(): boolean;
  front(): T | null;
  back(): T | null;
  enqueue(value: T): PriorityQueue<T>;
  push(value: T): PriorityQueue<T>;
  dequeue(): T | null;
  pop(): T | null;
  remove(cb: (value: T) => boolean): T[];
  contains(cb: (value: T) => boolean): boolean;
  toArray(): T[];
  clear(): void;
  static fromArray<T>(values: T[], compare: ICompare<T>): PriorityQueue<T>;
}

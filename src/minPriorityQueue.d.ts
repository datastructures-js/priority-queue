import { IGetCompareValue } from '@datastructures-js/heap';
import { PriorityQueue } from './priorityQueue';

export interface LegacyOptions<T> {
  compare: (a: T, b: T) => number;
}

export class MinPriorityQueue<T> extends PriorityQueue<T> {
  constructor(options?: IGetCompareValue<T> | LegacyOptions<T>, values?: T[]);
  enqueue(value: T): MinPriorityQueue<T>;
  push(value: T): MinPriorityQueue<T>;
  static fromArray<T>(values: T[], getCompareValue?: IGetCompareValue<T>): MinPriorityQueue<T>;
}

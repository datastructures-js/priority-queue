import { IGetCompareValue } from '@datastructures-js/heap';
import { PriorityQueue } from './priorityQueue';
import { LegacyOptions } from './minPriorityQueue';

export class MaxPriorityQueue<T> extends PriorityQueue<T> {
  constructor(options?: IGetCompareValue<T> | LegacyOptions<T>, values?: T[]);
  enqueue(value: T): MaxPriorityQueue<T>;
  push(value: T): MaxPriorityQueue<T>;
  static fromArray<T>(values: T[], getCompareValue?: IGetCompareValue<T>): MaxPriorityQueue<T>;
}

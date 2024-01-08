import { PriorityQueue } from './priorityQueue';

export class MinPriorityQueue<T> extends PriorityQueue<T> {
    static from(
      entries: readonly Iterable<readonly [element: T, priority: number]>
    ): MinPriorityQueue<T>;
}

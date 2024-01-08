import { PriorityQueue } from "./priorityQueue";

export class MaxPriorityQueue<T> extends PriorityQueue<T> {
  static from(
    entries: readonly Iterable<readonly [element: T, priority: number]>
  ): MaxPriorityQueue<T>;
}

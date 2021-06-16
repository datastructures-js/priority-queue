export interface PriorityQueueOptions<T> {
  priority?: (obj: T) => number;
}

export interface PriorityQueueItem<T> {
  priority: number;
  element: T;
}

export abstract class PriorityQueue<T> {
  constructor(options?: PriorityQueueOptions<T>);
  size(): number;
  isEmpty(): boolean;
  front(): PriorityQueueItem<T>;
  back(): PriorityQueueItem<T>;
  enqueue(element: T, priority?: number): PriorityQueue<T>;
  dequeue(): PriorityQueueItem<T>;
  toArray(): PriorityQueueItem<T>[];
  clear(): void;
}

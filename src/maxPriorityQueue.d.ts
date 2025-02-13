import {
  PriorityQueue,
  PriorityQueueConstructor,
  PriorityQueueOptions,
  PriorityQueueItem,
} from "./priorityQueue";

interface MaxPriorityQueue<E, T = E> extends PriorityQueue<E, T> {}

interface MaxPriorityQueueConstructor extends PriorityQueueConstructor {
  new <T>(
    options: PriorityQueueOptions<T> &
      Required<Pick<PriorityQueueOptions<T>, "compare">>
  ): MaxPriorityQueue<T>;
  new <T>(options?: PriorityQueueOptions<T>): MaxPriorityQueue<
    T,
    PriorityQueueItem<T>
  >;

  from<T>(
    entries: Iterable<readonly [element: T, priority: number]>
  ): MaxPriorityQueue<T>;
}

declare var MaxPriorityQueue: MaxPriorityQueueConstructor;

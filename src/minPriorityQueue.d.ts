import {
  PriorityQueue,
  PriorityQueueConstructor,
  PriorityQueueOptions,
  PriorityQueueItem,
} from "./priorityQueue";

interface MinPriorityQueue<E, T = E> extends PriorityQueue<E, T> {}

interface MinPriorityQueueConstructor extends PriorityQueueConstructor {
  new <T>(
    options: PriorityQueueOptions<T> &
      Required<Pick<PriorityQueueOptions<T>, "compare">>
  ): MinPriorityQueue<T>;
  new <T>(options?: PriorityQueueOptions<T>): MinPriorityQueue<
    T,
    PriorityQueueItem<T>
  >;

  from<T>(
    entries: Iterable<readonly [element: T, priority: number]>
  ): MinPriorityQueue<T>;
}

declare var MinPriorityQueue: MinPriorityQueueConstructor;

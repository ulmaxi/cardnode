/**
 * the mapped format for await to tuple
 */
export type AwaitMap<T, E=string> = [T|null, E | null];

/**
 * maps a promise to an array text
 */
export async function awaitTo<T>(promise: Promise<T>): Promise<AwaitMap<T>> {
  try {
    return [await promise, null];
  } catch (error) {
    return [null, (error?.message) ? (error as Error).message : error];
  }
}

/**
 * controls the local feed back for the local actions
 */
export interface LocalStatusAction<T, E=string> {
  onSuccess?: (res: T) => any,
  onError?: (err: E) => any
}

/**
 * calls the feed back for the local status action
 */
export function localStatusAction<T, K>([value, error]: AwaitMap<T, K>, {
  onError, onSuccess
}: LocalStatusAction<T, K>) {
  if (value && onSuccess) {
    onSuccess(value);
  }
  if (error && onError) {
    onError(error);
  }
}
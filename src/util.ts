/**
 * the mapped format for await to tuple
 */
export type AwaitMap<T> = [T|null, string | null];

/**
 * maps a promise to an array text
 */
export async function awaitTo<T>(promise: Promise<T>): Promise<AwaitMap<T>> {
  try {
    return [await promise, null];
  } catch (error) {
    return [null, (error as Error).message];
  }
}

/**
 * controls the local feed back for the local actions
 */
export interface LocalStatusAction<T> {
  onSuccess?: (res: T) => any,
  onError?: (err: string) => any
}

/**
 * calls the feed back for the local status action
 */
export function localStatusAction<T>([value, error]: AwaitMap<T>, {
  onError, onSuccess
}: LocalStatusAction<T>) {
  if (value && onSuccess) {
    onSuccess(value);
  }

  if (error && onError) {
    onError(error);
  }
}
import { useCallback } from 'react';

export const useLoadMore = (
  ids: number[],
  setIds: React.Dispatch<React.SetStateAction<number[]>>,
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
  hasMore: boolean
) => {
  return useCallback(() => {
    if (!hasMore) return;

    const nextIdStart = ids[ids.length - 1] + 1;
    const nextIds = Array.from({ length: 5 }, (_, i) => nextIdStart + i);
    setIds((prevIds) => [...prevIds, ...nextIds]);
  }, [ids, hasMore, setIds]);
};

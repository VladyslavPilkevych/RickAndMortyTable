import { useEffect } from 'react';

export const useIntersectionObserver = (
  loadMoreRef: React.RefObject<HTMLDivElement>,
  loadMore: () => void,
  isLoading: boolean,
  isError: boolean
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !isError) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, loadMore, isLoading, isError]);
};

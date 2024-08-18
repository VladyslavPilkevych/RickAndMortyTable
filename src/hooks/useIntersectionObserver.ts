import { useEffect } from 'react';

export const useIntersectionObserver = (
  loadMoreRef: React.RefObject<HTMLDivElement>,
  loadMore: () => void,
  isLoading: boolean,
  isError: boolean
) => {
  useEffect(() => {
    const currentRef = loadMoreRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !isError) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMoreRef, loadMore, isLoading, isError]);
};

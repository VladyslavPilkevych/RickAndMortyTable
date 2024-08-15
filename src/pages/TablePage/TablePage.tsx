import React from 'react';
import Table from '../../components/Table';
import './TablePage.css';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchCharactersByIds } from '../../utils/fetchCharactersByIds';
import { ICharacterData } from '../../types';

const TablePage: React.FC = () => {
  const [ids, setIds] = React.useState<number[]>([1, 2, 3, 4, 5]);
  const [charactersData, setCharactersData] = React.useState<ICharacterData[]>([]);
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['characters', ids],
    queryFn: () => fetchCharactersByIds(ids.slice(-5)),
    placeholderData: keepPreviousData,
  });

  React.useEffect(() => {
    if (data) {
      setCharactersData((prevData) => [...prevData, ...data]);
    }
  }, [data])

  const loadMoreCharacters = React.useCallback(() => {
    const nextIdStart = ids[ids.length - 1] + 1;
    const nextIds = Array.from({ length: 5 }, (_, i) => nextIdStart + i);
    setIds((prevIds) => [...prevIds, ...nextIds]);
  }, [ids]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !isError) {
          loadMoreCharacters();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef?.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef?.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreCharacters, isLoading, isError]);

  return (
    <div className={'tablePageRoot'}>
      <Table tableData={charactersData} />
      {isError && (
        <div className={'container'}>
          <div className={'error-message'}>
            <span className={'error-icon'}></span>
            {'Something went wrong. Please try again later.'}
          </div>
        </div>
      )}
      <button
        className={`loadMoreBtn ${
          isLoading ? 'loadMoreBtnLoading' : 'loadMoreBtnNotLoading'
        }`}
        onClick={loadMoreCharacters}
        disabled={isLoading || isError}
      >
        {isLoading ? 'Loading' : 'Load More'}
      </button>
      <div ref={loadMoreRef} className="load-more-trigger"></div>
    </div>
  );
};

export default React.memo(TablePage);

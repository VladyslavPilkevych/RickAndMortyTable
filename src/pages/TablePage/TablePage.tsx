import React from 'react';
import Table from '../../components/Table';
import './TablePage.css';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchCharactersByIds } from '../../api/fetchCharactersByIds';
import { ICharacterDataParsed } from '../../types';
import TableRow from '../../components/TableRow';
import { parseValuesFromBE } from '../../utils/parseValuesFromBE';

const TablePage: React.FC = () => {
  const [ids, setIds] = React.useState<number[]>([1, 2, 3, 4, 5]);
  const [charactersData, setCharactersData] = React.useState<ICharacterDataParsed[]>(
    []
  );
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['characters', ids],
    queryFn: () => fetchCharactersByIds(ids.slice(-5)),
    placeholderData: keepPreviousData,
  });

  React.useEffect(() => {
    const storedData = sessionStorage.getItem('tableItems');
    if (storedData) {
      const parsedDataFromBE: ICharacterDataParsed[] = JSON.parse(storedData);
      setCharactersData(parsedDataFromBE);
      const nextIds = Array.from({ length: 5 }, (_, i) => parsedDataFromBE?.length);
      setIds((prevIds) => [...prevIds, ...nextIds]);
    }
  }, []);

  React.useEffect(() => {
    if (data) {
      const parsedData = parseValuesFromBE(data);
      setCharactersData((prevData) => {
        const existingIds = new Set(prevData.map((item) => item.id));
        const newData = parsedData.filter((item) => !existingIds.has(item.id));
        sessionStorage.setItem('tableItems', JSON.stringify([...prevData, ...newData]));
        return [...prevData, ...newData];
      });
    }
  }, [data]);

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
    <div className={'page__table-container'}>
      <Table<ICharacterDataParsed>
        tableData={charactersData ?? []}
        columns={[
          { header: 'Name', accessor: 'name', isSortable: true },
          { header: 'Status', accessor: 'status', isSortable: true },
          { header: 'Gender', accessor: 'gender', isSortable: true },
          { header: 'Species', accessor: 'species', isSortable: true },
          { header: 'Created', accessor: 'created', isSortable: true },
          { header: 'Origin', accessor: 'origin', isSortable: true },
          { header: 'Detail', accessor: 'id', isSortable: false },
        ]}
        renderRow={(item: ICharacterDataParsed) => (
          <TableRow key={item.id} characterData={item} />
        )}
      />
      {isError && (
        <div className={'container'}>
          <div className={'message--error'}>
            <span className={'icon--error'}></span>
            {'Something went wrong. Please try again later.'}
          </div>
        </div>
      )}
      <button
        className={`button--load-more ${
          isLoading
            ? 'button--load-more_loading'
            : 'button--load-more_not-loading'
        }`}
        onClick={loadMoreCharacters}
        disabled={isLoading || isError}
      >
        {isLoading ? 'Loading' : 'Load More'}
      </button>
      <div ref={loadMoreRef} className={'trigger--load-more'}></div>
    </div>
  );
};

export default React.memo(TablePage);

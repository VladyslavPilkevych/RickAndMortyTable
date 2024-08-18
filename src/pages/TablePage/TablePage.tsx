import React from 'react';
import Table from '../../components/Table';
import './TablePage.css';
import { useCharactersData } from '../../hooks/useCharactersData';
import { ICharacterDataParsed } from '../../types';
import TableRow from '../../components/TableRow';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import { useLoadMore } from '../../hooks/useLoadMore';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { parseValuesFromBE } from '../../utils/parseValuesFromBE';
import { useDebounce } from '../../hooks/useDebounce';

const TablePage: React.FC = () => {
  const [ids, setIds] = React.useState<number[]>([1, 2, 3, 4, 5]);
  const [charactersData, setCharactersData] = React.useState<
    ICharacterDataParsed[]
  >([]);
  const [hasMore, setHasMore] = React.useState(true);
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isError } = useCharactersData(ids);

  React.useEffect(() => {
    if (data) {
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
        const parsedData = parseValuesFromBE(data);
        console.log(charactersData, data, hasMore);
        setCharactersData((prevData) => {
          const existingIds = new Set(prevData.map((item) => item.id));
          const newData = parsedData.filter((item) => !existingIds.has(item.id));
          const updatedData = [...prevData, ...newData];
          sessionStorage.setItem('tableItems', JSON.stringify(updatedData));
          return updatedData;
        });
      }
    }
  }, [data]);

  const loadMoreCharacters = useDebounce(
    useLoadMore(ids, setIds, setHasMore, hasMore),
    100
  );
  useIntersectionObserver(loadMoreRef, loadMoreCharacters, isLoading, isError);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={'page__table-container'}>
      <Table<ICharacterDataParsed>
        tableData={charactersData}
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
      {isError ? (
        <ErrorMessage btnText={'Refresh page'} onClickBtn={handleRefresh} />
      ) : (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {hasMore && (
                <>
                  <button
                    className={'button--load-more'}
                    onClick={loadMoreCharacters}
                  >
                    <>
                      <img
                        src={'/icons/arrowDown.png'}
                        alt={'Load More'}
                        className={'button--load-more_icon'}
                      />
                      {'Load More'}
                    </>
                  </button>
                  <div ref={loadMoreRef} className={'trigger--load-more'}></div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(TablePage);

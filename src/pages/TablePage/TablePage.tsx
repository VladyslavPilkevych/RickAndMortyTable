import React from 'react';
import './TablePage.css';
import Table from '../../components/Table';
import { useLoadMore } from '../../hooks/useLoadMore';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useCharactersData } from '../../hooks/useCharactersData';
import { useDebounce } from '../../hooks/useDebounce';
import { parseValuesFromBE } from '../../utils/parseValuesFromBE';
import ErrorMessage from '../../components/ErrorMessage';
import { ICharacterDataParsed } from '../../types/types';
import Loader from '../../components/Loader';
import TableRow from './components/TableRow';
import Button from '../../components/Button/Button';

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
          const newData = parsedData.filter(
            (item) => !existingIds.has(item.id)
          );
          const updatedData = [...prevData, ...newData];
          sessionStorage.setItem('tableItems', JSON.stringify(updatedData));
          return updatedData;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  <Button
                    onClick={loadMoreCharacters}
                    className={'button--load-more'}
                    iconSrc={'/icons/arrowDown.png'}
                    iconAlt={'Load More'}
                  >
                    {'Load More'}
                  </Button>
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

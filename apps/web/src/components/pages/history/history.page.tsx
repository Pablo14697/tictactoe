import type { GameHistoryPaginated } from '@customTypes/game.types';
import { HistoryTable } from '@shared/history-table.component';
import { Link } from '@shared/link.component';
import { Pagination } from '@shared/pagination.component';
import { getPaginatedHistory } from '@store/history.store';
import { useEffect, useState } from 'react';

export const HistoryPage: React.FC = () => {
  const [historyPaginated, setHistory] = useState<GameHistoryPaginated>({
    history: [],
    totalPages: 0,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const paginatedHistory = getPaginatedHistory(1);
    setHistory(paginatedHistory);
  }, []);

  const onChangePage = (page: number) => {
    const paginatedHistory = getPaginatedHistory(page);
    setHistory(paginatedHistory);
    setPage(page);
  };

  return (
    <div className="flex min-h-screen w-screen justify-center">
      <div className="no-scrollbar overflow-y-scroll bg-white">
        <div className="flex flex-col items-center px-13">
          <div className="mt-10" />
          <h1 className="text-center font-bold text-2xl leading-[60.51px]">
            TIC-TAC-TOE
          </h1>
          <div className="mb-3" />
          {historyPaginated.history.length ? (
            <HistoryTable data={historyPaginated.history} />
          ) : (
            <span className="text-center font-thin text-xl leading-[38.73px]">
              No games were played
            </span>
          )}
          <div className="mb-6" />
          <Pagination
            page={page}
            onChangePage={onChangePage}
            total={historyPaginated.totalPages}
          />
          <div className="mb-2" />

          <Link variant="sm" to="/">
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
};

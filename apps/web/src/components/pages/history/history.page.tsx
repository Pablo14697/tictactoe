import type { GameHistoryPaginated } from '@customTypes/game.types';
import { Link } from '@shared/link.component';
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
            <div className="no-scrollbar flex h-full w-full flex-col overflow-scroll rounded-lg bg-white shadow-md ">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr className="border-custom-green-muted border-b bg-custom-green-muted">
                    <th className="p-4">
                      <p className="font-normal text-sm leading-none">Mode</p>
                    </th>
                    <th className="p-4">
                      <p className="font-normal text-sm leading-none">Size</p>
                    </th>
                    <th className="p-4">
                      <p className="font-normal text-sm leading-none">Result</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {historyPaginated.history.map((item) => (
                    <tr
                      className="hover:bg-custom-green-muted-33"
                      key={item.id}
                    >
                      <td className="p-4">
                        <p className="font-bold text-sm capitalize">
                          {item.gameMode}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-sm">
                          {item.size}x{item.size}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{item.outcome}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h3 className="text-center font-thin text-xl leading-[38.73px]">
              No games were played
            </h3>
          )}
          <div className="mb-6" />
          <div className="inline-flex text-sm">
            <button
              type="button"
              className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-gray-300 border-e-0 bg-white px-3"
              disabled={page < 2}
              onClick={() => onChangePage(page - 1)}
            >
              Previous
            </button>
            <span className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3">
              {page}
            </span>

            <button
              type="button"
              className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3"
              disabled={page + 1 > historyPaginated.totalPages}
              onClick={() => onChangePage(page + 1)}
            >
              Next
            </button>
          </div>
          <div className="mb-2" />

          <Link variant="sm" to="/">
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
};

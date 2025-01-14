import type { GameHistory } from '@customTypes/game.types';
interface HistoryTableProps {
  data: GameHistory[];
}
export const HistoryTable = ({ data }: HistoryTableProps) => (
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
        {data.map((item) => (
          <tr className="hover:bg-custom-green-muted-33" key={item.id}>
            <td className="p-4">
              <p className="font-bold text-sm capitalize">{item.gameMode}</p>
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
);

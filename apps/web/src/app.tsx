import { GamePage } from '@pages/game/game.page';
import { HistoryPage } from '@pages/history/history.page';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GamePage />,
  },
  {
    path: '/history',
    element: <HistoryPage />,
  },
]);

export const App = () => <RouterProvider router={router} />;

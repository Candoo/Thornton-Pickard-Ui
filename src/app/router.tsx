import { App } from '@/app/App';
import { IndexPage } from '@/pages/IndexPage';
import { CamerasPage } from '@/pages/CamerasPage';
import { TestPage } from '@/pages/TestPage';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
    {
        index: true,
        element: <IndexPage />,
      },
      {
        path: 'cameras',
        element: <CamerasPage />,
      },
      {
        path: 'test-page',
        element: <TestPage />,
      },
    ],
  },
];

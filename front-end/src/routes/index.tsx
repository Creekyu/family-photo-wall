import React, { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';
import AuthRoute from '@/views/AuthRoute';
import LoadingPage from '@/components/LoadingPage';

export type Routes = {
  path: string;
  element: React.LazyExoticComponent<any>;
  children?: Routes[];
};

const router: Routes[] = [
  {
    path: '/',
    element: lazy(() => import('@/views/MainPage')),
  },
  {
    path: '/manage',
    element: lazy(() => import('@/views/BackStage')),
    children: [
      {
        path: 'add',
        element: lazy(() => import('@/views/BackStage/AddPhoto')),
      },
      {
        path: 'del',
        element: lazy(() => import('@/views/BackStage/DeletePhoto')),
      },
    ],
  },
  {
    path: '/test',
    element: lazy(() => import('@/views/TestPage')),
  },
  {
    path: '*',
    element: lazy(() => import('@/components/ErrorPage/Page404')),
  },
];

const syncRouter = (table: Routes[]): RouteObject[] => {
  const routeTable: RouteObject[] = [];
  table.forEach((route) => {
    routeTable.push({
      path: route.path,
      element: (
        <Suspense fallback={<LoadingPage></LoadingPage>}>
          <AuthRoute>
            <route.element />
          </AuthRoute>
        </Suspense>
      ),
      children: route.children && syncRouter(route.children),
    });
  });
  return routeTable;
};

export default syncRouter(router);

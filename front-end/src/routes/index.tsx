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
    children: [
      {
        path: '',
        element: lazy(() => import('@/views/MainPage/HomePage')),
      },
      {
        path: 'timeline',
        element: lazy(() => import('@/views/MainPage/TimeLine')),
      },
      {
        path: 'class',
        element: lazy(() => import('@/views/MainPage/PhotoWall')),
      },
    ],
  },
  {
    path: '/manage',
    element: lazy(() => import('@/views/BackStage')),
    children: [
      {
        path: '',
        element: lazy(() => import('@/views/BackStage/AddPhoto')),
      },
      {
        path: 'add',
        element: lazy(() => import('@/views/BackStage/AddPhoto')),
      },
      {
        path: 'edit',
        element: lazy(() => import('@/views/BackStage/EditPhoto')),
        children: [
          {
            path: '',
            element: lazy(
              () => import('@/views/BackStage/EditPhoto/EditCertain')
            ),
          },
        ],
      },
    ],
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

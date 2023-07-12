import React, { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';
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
    path: 'login',
    element: lazy(() => import('@/views/LoginPage')),
  },
  {
    path: '/manage',
    element: lazy(() => import('@/views/BackStage')),
    children: [
      {
        path: '',
        element: lazy(() => import('@/views/BackStage/EditInfo')),
      },
      {
        path: 'self',
        element: lazy(() => import('@/views/BackStage/EditInfo')),
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
      {
        path: 'user',
        element: lazy(() => import('@/views/BackStage/EditUser')),
      },
      {
        path: 'oss',
        element: lazy(() => import('@/views/BackStage/EditOSS')),
      },
      {
        path: 'smtp',
        element: lazy(() => import('@/views/BackStage/EditSMTP')),
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
          <route.element />
        </Suspense>
      ),
      children: route.children && syncRouter(route.children),
    });
  });
  return routeTable;
};

export default syncRouter(router);

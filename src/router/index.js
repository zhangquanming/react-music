import React, { lazy, Suspense } from 'react';

/// React 16.6 or higher
// 使用Suspense做Code-Splitting
const withSuspense = Component => {
  return props => (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );
};

const Recommend = withSuspense(lazy(() => import('../views/recommend/Recommend')));
const Rankings = withSuspense(lazy(() => import('../views/ranking/Ranking')));
const Singer = withSuspense(lazy(() => import('../views/singer/Singer')));
const Search = withSuspense(lazy(() => import('../views/search/Search')));

const Album = withSuspense(lazy(() => import('../containers/Album')));
const Ranking = withSuspense(lazy(() => import('../containers/Ranking')));

const router = [
  {
    path: '/recommend',
    component: Recommend,
    routes: [
      {
        path: '/recommend/:id',
        component: Album,
      },
    ],
  },
  {
    path: '/ranking',
    component: Rankings,
    routes: [
      {
        path: '/ranking/:id',
        component: Ranking,
      },
    ],
  },
  {
    path: '/singer',
    component: Singer,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    component: () => <div style={{ marginTop: 100, textAlign: 'center' }}>请求的页面不存在</div>,
  },
];

export default router;

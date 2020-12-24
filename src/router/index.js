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

const Recommend = withSuspense(
  lazy(() => import('../views/recommend/Recommend'))
);
const Ranking = withSuspense(lazy(() => import('../views/ranking/Ranking')));
const Singer = withSuspense(lazy(() => import('../views/singer/Singer')));
const Search = withSuspense(lazy(() => import('../views/search/Search')));

const router = [
  {
    path: '/recommend',
    component: Recommend,
  },
  {
    path: '/ranking',
    component: Ranking,
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
    component: () => (
      <div style={{ marginTop: 100, textAlign: 'center' }}>
        请求的页面不存在
      </div>
    ),
  },
];

export default router;

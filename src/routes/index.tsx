// import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import PendingFeedback from '~/components/pending-feedback'
import Layout from '~/layout'
import Game from '~/pages/Game'
import Index from '~/pages/Index'
import NotFound from '~/pages/NotFound'

// const Home = lazy(() => import('~/pages/home'))

// function SuspenseWrapper({
//   children,
//   className,
// }: {
//   className?: string
//   children: React.ReactNode
// }) {
//   return (
//     <Suspense
//       fallback={(
//         <PendingFeedback
//           className={className}
//         />
//       )}
//     >
//       {children}
//     </Suspense>
//   )
// }

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/game',
    element: <Game />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
], {
  basename: import.meta.env.BASE_URL,
  future: {
  },
})

export default function AppRooter() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  )
}

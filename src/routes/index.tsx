// import { lazy, Suspense } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
// import PendingFeedback from '~/components/pending-feedback'
import Layout from '~/layout'
import About from '~/pages/About'
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

const router = createHashRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/game',
    element: <Game />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
], {
  // basename: import.meta.env.BASE_URL,
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

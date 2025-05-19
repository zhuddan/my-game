import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PendingFeedback from '~/components/pending-feedback'
import Layout from '~/layout'
import Homebase from '~/pages/home'
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
    element: <Homebase />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
], {
  future: {
  },
})

export default function RootRooter() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  )
}

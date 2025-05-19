import AppRooter from './routes'
import { Provider as QueryProvider } from './state/query'

function App() {
  return (
    <QueryProvider>
      <AppRooter />
    </QueryProvider>
  )
}

export default App

import Index from './pages/Index.tsx'
import { BannerProvider } from './components/context/BannerProvider.tsx'
function App() {

  return (
    <BannerProvider>
      <Index />
    </BannerProvider>
  )
}

export default App

import { Grain } from './components/Grain'
import { Nav } from './components/Nav'
import { ProgressRail } from './components/ProgressRail'
import { useSmoothScroll } from './lib/smoothScroll'
import { Capabilities } from './sections/Capabilities'
import { Concept } from './sections/Concept'
import { Footer } from './sections/Footer'
import { Gallery } from './sections/Gallery'
import { Hero } from './sections/Hero'
import { Ticker } from './sections/Ticker'
import { Timeline } from './sections/Timeline'

function App() {
  useSmoothScroll()

  return (
    <>
      <Grain />
      <Nav />
      <ProgressRail />

      <main>
        <Hero />
        <Concept />
        <Capabilities />
        <Gallery />
        <Timeline />
        <Ticker />
        <Footer />
      </main>
    </>
  )
}

export default App

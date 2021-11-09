import Container from '../components/layout/Container'
import { Nav } from '../components/layout/landingPage/Nav'
import { Hero } from '../components/layout/landingPage/Hero'
import { About } from '../components/layout/landingPage/About'
import { Features } from '../components/layout/landingPage/Features'
import { Footer } from '../components/layout/landingPage/Footer'

function Home() {
  return (
    <Container>
      <Nav />
      <Hero />
      <About />
      <Features />
      <Footer />
    </Container>
  )
}

export default Home

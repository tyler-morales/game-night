import Container from '../layout/Container'
import { Nav } from '../layout/landingPage/Nav'
import { Hero } from '../layout/landingPage/Hero'
import { About } from '../layout/landingPage/About'
import { Features } from '../layout/landingPage/Features'
import { Footer } from '../layout/landingPage/Footer'

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

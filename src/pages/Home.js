import Container from '../layout/Container'
import { Nav } from '../layout/landingPage/Nav'
import { Hero } from '../layout/landingPage/Hero'
import { About } from '../layout/landingPage/About'

function Home() {
  return (
    <Container>
      <Nav />
      <Hero />
      <About />
    </Container>
  )
}

export default Home

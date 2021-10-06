import Container from '../layout/Container'
import { Hero } from '../layout/landingPage/Hero'
import { Nav } from '../layout/landingPage/Nav'

function Home() {
  return (
    <Container>
      <Nav />
      <Hero />
    </Container>
  )
}

export default Home

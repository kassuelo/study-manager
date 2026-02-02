import { Grid } from '../components/Grid'
import { Row } from '../components/Row'
import { Container } from '../components/Container'
import { StudyMap } from '../components/StudyMap'
import { StudyCycle } from '../components/StudyCycle'

export function Home() {
  return (
    <Container>
      <Row className='mt-3'>
        {/* BLOCO 1 */}
        <Grid cols="12 12 6 6">
          <StudyMap />
        </Grid>
        <Grid cols="12 12 6 6">
          <StudyCycle />
        </Grid>

      </Row>
    </Container>
  )
}

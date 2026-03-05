import { Container, Grid } from "@mui/material"
import { Link, Outlet } from "react-router"

export default function AppLayout() {
  return (
    <Container maxWidth="lg">
      <Grid rowSpacing={1} columnSpacing={1}>
        <nav style={{ marginBottom: "10rem", marginTop: "3rem" }}>
          <Grid container columnGap={2} columns={4}>
            <Grid size="grow">
              <Link to="/">Home</Link>
            </Grid>
            <Grid size="grow">
              <Link to="/policies">Policies</Link>
            </Grid>
          </Grid>
        </nav>

        <main>
          <Grid size="grow">
            <Outlet />
          </Grid>
        </main>
      </Grid>
    </Container>
  )
}

import { Box, Container, Grid, Typography } from "@mui/material";
import { Link, Outlet } from "react-router";

export default function AppLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <nav style={{ marginBottom: "10rem", marginTop: "3rem" }}>
        <Container>
          <Grid container columnGap={2} columns={4}>
            <Grid size="grow">
              <Link to="/">Home</Link>
            </Grid>
            <Grid size="grow">
              <Link to="/policies">Policies</Link>
            </Grid>
          </Grid>
        </Container>
      </nav>

      <Container sx={{ flex: 1, py: 4 }}>
        <main>
          <Grid size="grow">
            <Outlet />
          </Grid>
        </main>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
          bgcolor: "grey.200",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} My Website
        </Typography>
      </Box>
    </Box>
  );
}

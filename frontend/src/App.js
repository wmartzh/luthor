import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

export const App = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>xs=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>xs=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>xs=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>xs=3</Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App

import React from 'react'
import { Grid, Card, Typography } from '@mui/material'

const DashboardPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card>
          <Typography variant="h5">Dashboard</Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DashboardPage

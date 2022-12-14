import React from 'react'
import CountUp from 'react-countup'
import cx from 'classnames'
import styles from './Cards.module.css'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'

interface CardsPropsTypes {
  data: any
}

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }: CardsPropsTypes) => {

  if (!confirmed) {
    return null
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justifyContent="center">

        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Infected</Typography>
            <Typography variant="h5">

              <CountUp
                start={0}
                end={confirmed.value}
                duration={1.5}
                separator="."
              />

            </Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Number of active cases of covid-19</Typography>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Deaths</Typography>
            <Typography variant="h5">

              <CountUp
                start={0}
                end={deaths.value}
                duration={1.5}
                separator="."
              />

            </Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Number of deaths caused by covid-19</Typography>
          </CardContent>
        </Grid>

      </Grid>
    </div>
  )

}

export default Cards

import React, { useState } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core'

import { statusColor } from '../constants/statusColor'
import { makeStyles } from '@material-ui/styles'
import { FthBtn } from '../components/FthBtn'
import { Navigation } from '../layout/Navigation'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

export const GetPermission = () => {
  const classes = useStyles()
  const [type, setType] = useState('')

  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const handleChange = event => {
    setType(event.target.value)
  }

  return (
    <Container maxWidth="md">
      <Navigation />
      <Grid container justify="center">
        <Grid item xs={12} sm={5}>
          <Paper elevation={2} className="fth-paper">
            <Typography
              component="h1"
              variant="h5"
              style={{ color: '#12B6C6' }}
            >
              Get my permission
            </Typography>
            <Box marginTop="50px" />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={inputLabel}
                id="demo-simple-select-outlined-label"
              >
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={type}
                onChange={handleChange}
                labelWidth={labelWidth}
              >
                <MenuItem value={'normal'}>Normal</MenuItem>
                <MenuItem value={'weekends'}>Weekends</MenuItem>
              </Select>
              <TextField
                variant="outlined"
                label="Place"
                margin="normal"
                fullWidth
                id="place"
                required
              />
            </FormControl>
            <Box marginTop="20px" />
            <FthBtn
              type="submit"
              content="Confirm"
              myClass={classes.submit}
              to="/"
              bg={statusColor.allow}
            />
            <Box marginTop="30px" />
          </Paper>
          <Box
            className="fth-status-bar"
            style={{
              background: statusColor.allow
            }}
          ></Box>
        </Grid>
      </Grid>
    </Container>
  )
}

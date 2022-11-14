import React from 'react'
import { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import { fetchCountries } from '../../utils/api'

import styles from './CountryPicker.module.css'

interface CountryPickerPropsTypes {
  handleCountryChange: (countryName: string) => void
}

const CountryPicker = ({ handleCountryChange }: CountryPickerPropsTypes) => {

  const [fetchedCountries, setFetchedCountries] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries())
    }

    fetchAPI()
  }, [setFetchedCountries])

  return (
    <div className={styles.container}>
      <FormControl className={styles.formControl}>
        <NativeSelect defaultValue="" onChange={(e: any) => handleCountryChange(e.target.value)}>
          <option value="">Global</option>
          {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
        </NativeSelect>
      </FormControl>
    </div>
  )
}

export default CountryPicker

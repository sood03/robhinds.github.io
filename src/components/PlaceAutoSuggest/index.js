/**
 * Created by nitesood on 05-Feb-18.
 */

import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles';

class PlaceAutoSuggest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      loading: false
    }
    this.onChange = (address) => this.setState({ address })
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      highlightFirstSuggestion: true,
      style: styles.locationSearchText,
      hintText: "Enter your location",
      underlineShow : false,
      inputStyle : styles.locationInputStyle,
      hintStyle: styles.locationInputStyle
    }

    return (
      <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete inputProps={inputProps} />
        <RaisedButton
          label="Search"
          disableTouchRipple={false}
          primary={true}
          style={styles.locationSearchButton}
          onClick={() => this.fetchList()}/>
      </form>
    )
  }
}

export default PlaceAutoSuggest;
import React from "react";
import { Cards, AppChart, CountryPicker } from "./components";
import styles from "./App.modules.css";
import { fetchData } from "./utils/api";
import coronaImage from "./assets/covid19.png"; // images/covid19.png

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country: string) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img src={coronaImage} className="image" alt="covid19" />
        {Object.keys(data).length === 0 ? (
          <p style={{ textAlign: "center", marginTop: 50 }}>
            If no data appears, most likely the{" "}
            <a href="https://covid19.mathdro.id/api">third party API</a> is not
            working:
          </p>
        ) : (
          <>
            <Cards data={data} />
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <AppChart data={data} country={country} />
          </>
        )}
      </div>
    );
  }
}

export default App;

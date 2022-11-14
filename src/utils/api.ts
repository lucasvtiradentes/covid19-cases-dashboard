import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export { fetchData, fetchDailyData, fetchCountries };

interface Icountry {
  name: string;
}

interface IDailyData {
  confirmed: {
    total: number;
  };
  deaths: {
    total: number;
  };
  reportDate: string;
}

// confirmed: dailyData.confirmed.total,
// deaths: dailyData.deaths.total,
// date: dailyData.reportDate

async function fetchData(countryName?: string) {
  let changeableUrl = url;

  if (countryName) {
    changeableUrl = `${url}/countries/${countryName}`;
  }

  try {
    const { data } = await axios.get(changeableUrl);

    if (data.name === "AxiosError") {
      throw new Error("Erro na api");
    }

    const modifiedData = {
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate,
    };

    return modifiedData;
  } catch (error: any) {
    console.log(`erro: ${error.message}`);
    return [];
  }
}

async function fetchDailyData() {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData: IDailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error: any) {
    console.log(`erro: ${error.message}`);
    return [];
  }
}

async function fetchCountries() {
  try {
    const { data } = await axios.get(`${url}/countries`);

    if (data.name === "AxiosError") {
      throw new Error("Erro na api");
    }

    const countries = data.countries;

    return countries.map((country: Icountry) => country.name);
  } catch (error: any) {
    console.log(`erro: ${error.message}`);
    return [];
  }
}

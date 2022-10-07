import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Display = ({ countries, filter, show, handleShow }) => {
  const countriesToList = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter)
  );
  console.log(countriesToList);

  if (countriesToList.length === 1) {
    let country = countriesToList[0];
    let languages = country.languages;
    let langList = Object.values(languages);

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h3>languages</h3>
        <ul>
          {langList.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={"flag"} />
      </div>
    );
  }

  if (countriesToList.length <= 10) {
    return (
      <div>
        {countriesToList.map((country) => (
          <Country
            key={country.name.common}
            country={country}
            show={show}
            handleShow={handleShow}
            lat={country.capitalInfo.latlng[0]}
            lon={country.capitalInfo.latlng[1]}
            api_key={process.env.REACT_APP_API_KEY}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <p>Too many mathches, specify another filter</p>
    </div>
  );
};

const Country = ({ country, lat, lon, api_key }) => {
  const [show, setShow] = useState(true);
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${api_key}`
      )
      .then((response) => {
        const data = response.data;
        setWeather(data);
        console.log(data);
      });
  });

  const handleShow = () => {
    setShow(!show);
  };

  const name = country.name.common;
  const capital = country.capital[0];
  const area = country.area;
  const flag = country.flags.png;
  let languages = country.languages;
  let langList = Object.values(languages);

  if (!show) {
    return (
      <div>
        <h2>{name}</h2>
        <p>capital {capital}</p>
        <p>area {area}</p>
        <h3>languages</h3>
        <ul>
          {langList.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={flag} alt={"flag"} />
        <button onClick={handleShow}>{show ? "show" : "hide"}</button>
      </div>
    );
  }

  return (
    <div>
      <p key={name}>{name}</p>
      <button onClick={handleShow}>{show ? "show" : "hide"}</button>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const data = response.data;
      setCountries(data);
    });
  }, []);

  const handlefilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      find countries
      <input value={filter} onChange={handlefilter} />;
      <Display countries={countries} filter={filter} />
    </div>
  );
};

export default App;

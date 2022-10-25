import { useEffect, useState } from "react";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import loadingSvg from "../img/loading.svg";
import axios from "axios"

const errorText = "Please enter github's user name.";
const BASE_URL = "https://api.github.com/";

export default function GuessLanguage() {
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favoriteLangs, setFavoriteLangs] = useState([]);

  const handleChange = (val) => {
    setUserName(val);
    setFavoriteLangs([]);
  }

  const handleClick = async () => {
    setLoading(true);
    const repos_url = `${BASE_URL}users/${userName}/repos`;
    const {status, data} = await axios.get(repos_url);
    if (status === 200) {
      let list = [];
      for (const repo of data) {
        const {status: langStatus, data: langData} = await axios.get(repo.languages_url);
        if (langStatus === 200) {
          Object.keys(langData).forEach(lang => {
            const curFrequency = list[lang] ?? 0;
            list[lang] = curFrequency + 1;
          });
        }
      }
      let aryValues = [];
      for (const [key, value] of Object.entries(list)) {
        aryValues.push({
          lang: key,
          frequency: value
        });
      }
      aryValues.sort((a, b) => b.frequency - a.frequency);
      setFavoriteLangs(aryValues.slice(0, 5));
    } else if (status === 404) {
      setError("Couldn't find user name.");
    } else {
      setError("Unknown Error.");
    }
    setLoading(false);
  }

  useEffect(() => {
    const text = userName ? '' : errorText;
    setError(text); 
  }, [userName])

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Github Favorite Programmming Language
      </h1>
      <div className="mb-3">
        <InputBox
          id="username"
          label="User Name"
          type="text"
          onChange={handleChange}
          error={error}
        />
        <Button
          type="button"
          onClick={handleClick}
          buttonType="primary"
          disabled={error}
          loading={loading}
        >
          Guess
        </Button>
      </div>
      <h5 className="text-xl font-bold">Favorite Languages</h5>
      <ol>
        {favoriteLangs.map(({ lang }) => (
          <li key={lang}>{lang}</li>
        ))}
      </ol>
    </>
  )
}
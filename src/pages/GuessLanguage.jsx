import { useEffect, useState } from "react";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import axios from "axios"

const errorText = "Please enter github's user name.";
const BASE_URL = "https://api.github.com/";

export default function GuessLanguage() {
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favoriteLang, setFavoriteLang] = useState(null);

  const handleChange = (val) => {
    setUserName(val);
    setFavoriteLang(null);
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
      const maxLang = Object.keys(list).reduce((a, b) => list[a] > list[b] ? a : b);
      setFavoriteLang(maxLang);
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
      <h5 className="text-xl font-bold">Favorite Language:</h5>
      <p>{favoriteLang}</p>
    </>
  )
}
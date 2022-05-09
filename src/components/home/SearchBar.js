import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCity } from "../../store/actions";
import { getSuggestions } from "../../api/WeatherAPI";
// import Autocomplete from "react-autocomplete";
import AutoCompleteText from "../../helpers/AutoCompleteText";

function SearchBar() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [hintData, setHintData] = useState([]);
  // const style = { width: "100%", marginTop: "2rem" }; 


  // const setData = async () => {
  //   try {
  //     const res = await getSuggestions(searchText);
  //     return setHintData(res.data);
  //   } catch (err) {
  //     return console.log(err);
  //   }
  // };

  useEffect(() => {
    if (searchText.length > 0 && /^[A-Za-z -]*$/.test(searchText)){
      const setData = async () => {
        try {
          const res = await getSuggestions(searchText);
          return setHintData(res.data);
        } catch (err) {
          return console.log(err);
        }
      };
      setData();
    } 
  },[searchText]);

  const textFromInput = (event) => {
    setSearchText(event.target.value);
  };

  const handleSelectCity = (cityName) => {
    console.log(
      'handleSelectCity', cityName
    );
    const city = hintData.find((c) => c.LocalizedName === cityName);
    dispatch(updateCity(city));
    setHintData([]);
    setSearchText("");
  };

 

  return (
    <>
      <h2>Enter city name</h2>
    <AutoCompleteText suggestions={hintData} onTextChanged={textFromInput} onTextClicked={handleSelectCity} searchText={searchText}/>
    </>
  );
}

export default SearchBar;

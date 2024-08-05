import React, { useCallback, useEffect, useState } from "react";
import SuggestionsList from "./Suggestions-list";
import { useDispatch, useSelector } from "react-redux";
import { addData, clearData, removeItem } from "../utils/dataSlice";
import moment from "moment";

const AutoComplete = ({ placeholder, fetchSuggestions }) => {
  const [inputVal, setInputVal] = useState("");
  const [Suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useSelector((store) => store.searchdata?.data);
  console.log(history);
  const HandleInput = (event) => {
    setInputVal(event.target.value);
  };
  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    try {
      const result = await fetchSuggestions(query);
      setSuggestions(result);
    } catch (error) {
      setError("Failed to fetch suggestios");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    dispatch(clearData());
  };
  useEffect(() => {
    if (inputVal?.length > 1) {
      getSuggestions(inputVal);
    }
  }, [inputVal]);
  const handleSuggestioClick = (suggestion) => {
    setInputVal(suggestion);
    setSuggestions([]);
    let date = new Date();
    let currentDate = moment(date).format("DD/MM/YYYY");
    let obj = {
      title: suggestion,
      date: currentDate,
    };
    dispatch(addData(obj));
  };
  const removelist = (index) => {
    dispatch(removeItem(index));
  };
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center px-5 mt-10 h-16">
        <input
          type="text"
          placeholder={placeholder}
          value={inputVal}
          onChange={HandleInput}
          className=" w-full md:w-[50%] md:h-[70%] outline-none pl-5  rounded-md border-2 border-black"
        />
      </div>
      {(Suggestions.length > 0 || loading || error) && (
        <>
          {" "}
          <div className="flex justify-center">
            {error && <div className="text-red-700">{error}</div>}
            {loading && (
              <div className="loading animate-spin border-2 border-red-600 border-b-0 border-l-0 w-14 h-14 rounded-full"></div>
            )}
          </div>
          <div className="md:w-[48%] mx-5  md:mx-auto bg-white  shadow-2xl">
            <SuggestionsList
              suggestions={Suggestions}
              onSuggestionClick={handleSuggestioClick}
            />
          </div>
          <div className="md:w-[48%] mt-6 p-4 mx-5 md:mx-auto bg-white shadow-2xl rounded-md ">
            <div className="flex justify-between gap-10 mb-10">
              <div className="text-bold text-xl ">Search History</div>
              <button
                onClick={clearHistory}
                className="bg-slate-400 p-2 rounded-sm"
              >
                clear history
              </button>
            </div>

            {history.map((data, index) => (
              <div
                key={index}
                className="px-3 hover:bg-slate-200/40 cursor-pointer list-none  flex justify-between items-center space-y-2 "
              >
                <span>{data.title}</span>
               <div className="flex justify-between items-center gap-5">
               <span>{data.date}</span>
               <button onClick={()=>{removelist(index)}}>❌</button>
               </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AutoComplete;

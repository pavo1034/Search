import React, {useEffect, useState } from "react";
import SuggestionsList from "./Suggestions-list";
import { useDispatch, useSelector } from "react-redux";
import { addData, clearData } from "../utils/dataSlice";


const AutoComplete = ({
  placeholder,
  fetchSuggestions,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [Suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);
  const dispatch= useDispatch();
  const history =useSelector(store=>store.searchdata?.data);
  console.log(history);
  // console.log(Suggestions);
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
   
 const clearHistory =()=>{
  dispatch(clearData());
 }
  useEffect(() => {
    if (inputVal?.length > 1) {
      getSuggestions(inputVal);
    }
  }, [inputVal]);
  const handleSuggestioClick=(suggestion)=>{
    setInputVal(suggestion)
    setSuggestions([])
    dispatch(addData(suggestion))
  }
  return (
    <div className="w-full">
    <div className="w-full flex justify-center items-center  mt-10 h-16">
      <input
        type="text"
        placeholder={placeholder}
        value={inputVal}
        onChange={HandleInput}
        className="w-[50%] h-[70%] outline-none pl-5  rounded-md border-2 border-black"
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
          <div className="w-[40%]  mx-auto bg-white rounded-md shadow">
            <SuggestionsList 
            suggestions={Suggestions}
            onSuggestionClick={handleSuggestioClick} />
          </div>
          <div className="w-[40%] mt-6 p-4  mx-auto bg-slate-50 shadow-lg rounded-md ">
         <div className="flex justify-between gap-10 mb-10">
         <div className="text-bold text-xl ">Search History</div>
         <button onClick={clearHistory} className="bg-slate-400 p-2 rounded-sm">clear history</button>
         </div>
            {
              history.map((data,index)=><div key={index} className="px-3 hover:bg-slate-200/40 cursor-pointer list-none  space-y-2 ">
                <span>{data}</span>
              </div>)
            }
          </div>
        </>
      )}
      </div>
    
  );
};

export default AutoComplete;

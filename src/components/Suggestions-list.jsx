import React from "react";

const SuggestionsList = ({ suggestions = [], onSuggestionClick }) => {
  const getHighlightedText = (text) => {
    return text;
  };
  return (
    <div className="">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => onSuggestionClick(suggestion.title)}
          className="px-3 hover:bg-slate-200 cursor-pointer list-none"
        >
          {getHighlightedText(suggestion.title)}
        </li>
      ))}
    </div>
  );
};

export default SuggestionsList;

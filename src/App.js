import "./App.css";
import AutoComplete from "./components/AutoComplete";

function App() {
  const fetchSuggestions = async (query) => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}`
)
    if(!response.ok){
       throw new Error("Network response was not correct")  
    }
    const result = await response.json();
    return result.products;
  };
  return (
    <div className="">
      <h1 className="text-center text-3xl mt-10">Search page</h1>
      <AutoComplete
        placeholder={"Enter product"}
        fetchSuggestions={fetchSuggestions}
      />
    </div>
  );
}
export default App;

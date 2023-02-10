import React, { useState } from 'react';
import { fetchAnimals } from './api/AnimalsApi';
import './App.css';
import AutoCompleteInput from './components/AutoCompleteInput';
import { SearchResultDomItem } from './hooks/useAutoComplete';

function App() {
  let [selectedItem, setSelectedItem] = useState<SearchResultDomItem | undefined>()
  
  function onSelectItem(item: SearchResultDomItem) {
    setSelectedItem(item)
  }

  return (
    <div className="App">
      <h2>Sample autocomplete.</h2>
      <AutoCompleteInput 
        fetchDataAsync={fetchAnimals}
        searchPlaceholder='Start typing..'
        onSelectItem={onSelectItem} />
      {selectedItem && <h2>Selected item is: {selectedItem.label}</h2>}
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    </div>
  );
}

export default App;


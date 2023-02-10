import React, { useMemo, useRef, useState } from "react";
import useAutoComplete, { SearchResultDomItem, SearchResultItem } from "../hooks/useAutoComplete";
import useListenOutsideClick from "../hooks/useListenOutsideClick";
import "./AutoCompleteInput.css";
import ResultsList from "./ResultsList";

const SEARCH_PLACEHOLDER = "Type a search term...";

export interface AutoCompleteInputProps {
  fetchDataAsync: (searchTerm: string) => Promise<SearchResultItem[]>;
  searchPlaceholder?: string;
  onSelectItem: (resultItem: SearchResultDomItem) => void;
}

export default function AutoCompleteInput({
  fetchDataAsync,
  searchPlaceholder,
  onSelectItem,
}: AutoCompleteInputProps) {
  let [dropdownVisible, setDropdownVisible] = useState(false);
  let containerRef = useRef();
  useListenOutsideClick(containerRef, () => setDropdownVisible(false))
  let { setSearchText, searchText, searchResults } = useAutoComplete({
    fetchDataAsync,
  });


  function onSelectResult(result: SearchResultDomItem) {
    setDropdownVisible(false);
    setSearchText(result.label, false)
    onSelectItem(result)
  }

  function onChangeInputText(e: React.ChangeEvent<HTMLInputElement>) {
    let updatedValue = e.target.value;
    setSearchText(updatedValue);

    if (updatedValue && !dropdownVisible) {
        setDropdownVisible(true);
    } else if (!updatedValue && dropdownVisible) {
        setDropdownVisible(false);
    }
  }

  return (
    <div className="outside-container" ref={containerRef}>
      <input
        placeholder={searchPlaceholder ?? SEARCH_PLACEHOLDER}
        className="input-box"
        value={searchText}
        onChange={onChangeInputText}
      />
      {dropdownVisible && (
        <ResultsList results={searchResults} onSelectResult={onSelectResult} />
      )}
    </div>
  );
}

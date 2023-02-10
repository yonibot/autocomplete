import { useState } from "react";

function highlightMatches(searchTerm: string, searchResults: SearchResultItem[]): SearchResultDomItem[] {
    const matcher = new RegExp(searchTerm, 'i')

    return searchResults.map(result => {
        let highlightedNode = result.label.replace(matcher, match => `<span class="highlighted">${match}</span>`)

        return {
            ...result,
            highlightedNode,
        }
    })
}

export interface SearchResultItem {
    id: string;
    label: string;
    data?: unknown;
}

export type SearchResultDomItem = SearchResultItem & {
    highlightedNode?: string;
}

export interface AutoCompleteProps {
    fetchDataAsync: (searchValue: string) => Promise<SearchResultItem[]>;
}


export default function useAutoComplete({ fetchDataAsync }: AutoCompleteProps) {
    let [searchText, _setSearchText] = useState('');
    let [searchResults, setSearchResults] = useState([]);

    async function setSearchText(newText: string, shouldPerformSearch = true) {
        _setSearchText(newText)

        if (shouldPerformSearch && newText) {
            // This should be debounced properly.
            // I ran into tough async issues here, and
            // didn't manage to solve it in time
            if (newText) {
                try {
                    let searchResults = await fetchDataAsync(newText)
                    let highlightedResults = highlightMatches(newText, searchResults)
                    setSearchResults(highlightedResults);
                } catch(error) {
                    console.log("Search error. ", error)
                }
            }
        }
    }

    return { setSearchText, searchText, searchResults }
}

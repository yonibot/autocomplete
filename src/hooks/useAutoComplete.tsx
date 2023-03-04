import { useRef, useState } from "react";

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

const getCurrentTime = () => (new Date()).getTime()

export default function useAutoComplete({ fetchDataAsync }: AutoCompleteProps) {
    let [searchText, _setSearchText] = useState('');
    let [searchResults, setSearchResults] = useState([]);
    let latestReqTime = useRef<number>(getCurrentTime())

    async function setSearchText(newText: string, shouldPerformSearch = true) {
        _setSearchText(newText)

        if (shouldPerformSearch && newText) {
            try {
                let requestedAt = getCurrentTime();
                // update latestRequestedTime
                if (requestedAt > latestReqTime.current) latestReqTime.current = requestedAt;
                let searchResults = await fetchDataAsync(newText)

                // check whether current response is the latest requested data
                if (requestedAt < latestReqTime.current) {
                    // do nothing
                } else {
                    // this request is the latest one issued
                    console.log("Setting results for: ", newText, searchResults)
                    let highlightedResults = highlightMatches(newText, searchResults)
                    setSearchResults(highlightedResults);
                }
            } catch(error) {
                console.log("Search error. ", error)
            }
        }
    }

    return { setSearchText, searchText, searchResults }
}

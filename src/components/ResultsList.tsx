import { SearchResultDomItem } from "../hooks/useAutoComplete";
import "./ResultsList.css"

export interface ResultsListProps {
    results: SearchResultDomItem[];
    onSelectResult: (result: SearchResultDomItem) => void
};

export default function ResultsList({ results, onSelectResult }: ResultsListProps) {
    // In prod, this should not be shown until a few seconds have gone by and no results appear
    if (results.length === 0) return <div>No results found</div>

    return (
        <div className="results-list">
            {results.map(result => (
                <div
                    onClick={() => onSelectResult(result)}
                    className="result-item" 
                    dangerouslySetInnerHTML={{__html: result.highlightedNode}} />
            ))}
        </div>
    )
}
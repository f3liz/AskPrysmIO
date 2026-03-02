import { useState } from "react";
import { prysmFaqData } from "../data/prysmFaqData.ts";
import AccordionItem from "./AccordionItem.tsx";
import { SearchBar } from "./SearchBar.tsx";
import "../styles/faq.css"

export default function FAQ() {
    const [isExpanded, setExpandedId] = useState<number | null>(null);
    const [filteredFaqs, setFilteredFaqs] = useState(prysmFaqData);
    const [searchQuery, setSearchQuery] = useState("");

    const handleToggle = (id: number) => {
        setExpandedId(isExpanded === id ? null : id);
    };
    //tracks input
    const handleSearch = (results: typeof prysmFaqData, query: string) => {
        setFilteredFaqs(results);
        setSearchQuery(query);
    }

    return(
        <div className="faq-container">
            <SearchBar onSearch={handleSearch} />
            <div className="faq-content">
                {/* Empty Search State function*/}
                {searchQuery === "" && (
                    filteredFaqs.map((faq) => (
                         <AccordionItem
                            key={faq.id}
                            title={faq.question}
                            data={faq.sections}
                            isExpanded={isExpanded === faq.id}
                            onToggle={() => handleToggle(faq.id)}
                        />
                    ))
                )}
                    {/*No Results found state function*/}
                    {searchQuery !== "" && filteredFaqs.length === 0 && (
                        <p className="no-results">
                            Please refer to Ask PrysmIO
                        </p>
                    )}

                {/*Search result state function */}
                {searchQuery !== "" && filteredFaqs.length > 0 && (
                    filteredFaqs.map((faq) => (
                    <AccordionItem
                        key={faq.id}
                        title={faq.question}
                        data={faq.sections}
                        isExpanded={isExpanded === faq.id}
                        onToggle={() => handleToggle(faq.id)}
                    />
                ))
            )}
            </div>
        </div>
    )
}
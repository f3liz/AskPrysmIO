import { useState } from "react";
import { prysmFaqData } from "../data/prysmFaqData.ts";
import AccordionItem from "./AccordionItem.tsx";
import { SearchBar } from "./SearchBar.tsx";
import "../styles/faq.css"

export default function FAQ() {
    const [isExpanded, setExpandedId] = useState<number | null>(null);
    const [filteredFaqs, setFilteredFaqs] = useState(prysmFaqData);

    const handleToggle = (id: number) => {
        setExpandedId(isExpanded === id ? null : id);
    };

    return(
        <div className="faq-container">
            <SearchBar onSearch = {setFilteredFaqs} />
            <div className="faq-content">
                {filteredFaqs.map((item)=> (
                    <AccordionItem
                        key={item.id}
                        title={item.question}
                        content={""}
                        isExpanded={isExpanded === item.id}
                        onToggle={() => handleToggle(item.id)}
                />
                ))}
            </div>
        </div>
    )
}
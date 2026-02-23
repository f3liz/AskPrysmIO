import { prysmFaqData } from "../data/prysmFaqData.ts";
import type { SearchBarProps } from "../types.ts";
import { useState, useMemo } from "react";

export function SearchBar({onSearch} : SearchBarProps){
    const [searchTerm, setSearchTerm] = useState("");

    useMemo(() => {
        /** Below is an algorithm breaking up and searching this object for any matches
         * {
         *      id: Number,
         *      question: String,
         *      sections: [{
         *         title: String,
         *         content: String[] 
         *      }]
         * }
         */
        const value = searchTerm.toLocaleLowerCase().trim();

        const filtered = value
            ? prysmFaqData.filter((faq) => {
                // Check against questions first
                const matchingQuestions = faq.question.toLowerCase().includes(value);

                // Check for any matching sections
                const matchSections = faq.sections.some((section) => {
                    const titleMatch = section.title.toLowerCase().includes(value);
                    const contentMatch = section.content.some((content) => {
                        return content.toLowerCase().includes(value)
                    })
                    return titleMatch || contentMatch
                });

                return matchingQuestions || matchSections;
                
            }) : prysmFaqData

            onSearch(filtered)

            return filtered;
    }, [searchTerm, onSearch])

    return(
        <form>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search FAQs..."></input>
            <button type="submit">Submit</button>
        </ form>
    )
}
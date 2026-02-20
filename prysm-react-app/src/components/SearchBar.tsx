import { prysmFaqData } from "../data/prysmFaqData.ts";
import { useState, useMemo } from "react";

export function SearchBar({onSearch} : any){
    const [searchTerm, setSearchTerm] = useState("");

    useMemo(() => {
        const value = searchTerm.toLocaleLowerCase().trim();

        const filtered = value
            ? prysmFaqData.filter((faq) => {
                // Check against questions first
                if (faq.question.toLowerCase().includes(value)) return true;

                
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
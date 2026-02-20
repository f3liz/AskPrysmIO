import { prysmFaqData } from "../data/prysmFaqData.ts";
import { useState, type ReactEventHandler } from "react";
import { useEffect } from "react";

export function SearchBar(){
    const [searchBarContent, setSearchBarContent] = useState("");
    const [filteredFaqs, setFilteredFaqs] = useState(prysmFaqData);

    // useEffect(()=> {
    //     console.log(searchBarContent)
    // }, [searchBarContent])

    const updateSearch = (e: React.ChangeEvent) =>{
        
    }

    return(
        <form>
            <input type="text" onChange={updateSearch}></input>
            <button type="submit">Submit</button>
        </ form>
    )
}
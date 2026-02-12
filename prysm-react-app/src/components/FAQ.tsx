import { useState } from "react";
import accordionData from '../data/loremIpsum.ts';
import AccordionItem from "./AccordionItem.tsx";
import "../styles/faq.css"

export default function FAQ() {
    const [isExpanded, setExpandedId] = useState<number | null>(null);

    const handleToggle = (id: number) => {
        setExpandedId(isExpanded === id ? null : id);
    };

    return(
        <div className="faq-container">
            <div className="faq-content">
                {accordionData.map((item)=> (
                    <AccordionItem
                        key={item.id}
                        title={item.title}
                        content={item.content}
                        isExpanded={isExpanded === item.id}
                        onToggle={() => handleToggle(item.id)}
                />
                ))}
            </div>
        </div>
    )
}
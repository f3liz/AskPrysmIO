import type { AccordionItemProps, Section } from "../types"


export default function AccordionItem({title, data, isExpanded, onToggle}: AccordionItemProps) 
{
    return(
        <div className="accordion-item">
            <button
            className="accord-title"
            onClick={onToggle}
            >
                {title}
            </button>

            {isExpanded && (
                <div className="accordion-content">
                </div>
      )}
        </div>
    )
}
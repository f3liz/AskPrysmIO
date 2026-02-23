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
                {data.map((section: Section) => (
                    <div key={section.title} className="accordion-section">
                    <h3>{section.title}:</h3>
                    {section.content.map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                    </div>
                ))}
                </div>
      )}
        </div>
    )
}
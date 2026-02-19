type AccordionItemProps = {
    title: string;
    content: string;
    isExpanded: boolean;
    onToggle: () => void;
};

export default function AccordionItem({title, content, isExpanded, onToggle}: AccordionItemProps) 
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
                {content}
                </div>
            )}
        </div>
    )
}
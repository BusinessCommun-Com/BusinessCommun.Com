import { useState } from "react";
import "./SchemeCard.css";

export default function SchemeCard({ scheme }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="scheme-cards">
            <h3>{scheme.schemeName}</h3>

            {scheme?.ministry?.length > 0 && <p><strong>Ministry:</strong> {scheme.ministry}</p>}

            <p><strong>Key Sector Covered:</strong> {scheme?.keySectorsCovered?.join(", ")}</p>

            {scheme?.brief?.length && <p className={expanded ? "" : "truncate"}>
                <strong>Brief:</strong> {scheme.brief}
            </p>}

            {expanded && (
                <>
                    {scheme?.eligibilityCriteria?.length > 0 && <p><strong>Eligibility:</strong> {scheme.eligibilityCriteria}</p>}

                    {scheme?.funding && !Array.isArray(scheme?.funding) && typeof scheme?.funding === "object" && Object.keys(scheme?.funding).length > 0 && <p><strong>Funding:</strong> {scheme.funding.type} {scheme.funding.amount}</p>}

                    {scheme?.tenure?.length > 0 && <p><strong>Tenure:</strong> {scheme.tenure}</p>}

                    {
                        Array.isArray(scheme?.benefitTags) && scheme?.benefitTags.length > 0 &&
                        (
                            <>
                                <p><strong>BenefitTags:</strong> </p>
                                <ul>
                                    {scheme.benefitTags.map((b, i) => (
                                        <li key={i}>{b}</li>
                                    ))}
                                </ul>
                            </>
                        )


                    }

                    {Array.isArray(scheme?.benefits) && scheme.benefits.length > 0 && (
                        <>
                            <p><strong>Benefits:</strong></p>
                            <ul>
                                {scheme.benefits.map((b, i) => (
                                    <li key={i}>{b}</li>
                                ))}
                            </ul>
                        </>
                    )}


                    {scheme?.notes?.length > 0 && <p><strong>Notes:</strong> {scheme.notes}</p>}

                    <div className="application-container">
                        <span className="application-label">Link to Application:</span>
                        <a
                            href={scheme.applicationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="application-tag"
                        >
                            Click Here
                        </a>
                    </div>
                </>
            )}

            <div className="read-more">
                <button onClick={() => setExpanded(!expanded)}>
                    {expanded ? "Read Less" : "Read More"}
                </button>
            </div>
        </div>
    );
}
import governmentSchemes from "../../data/governmentSchemes.json";
import "./GovernmentSchemes.css";
import SchemeModal from "./SchemeModal";
import { useState } from "react";
// import "../../assets/GovernmentScheme_images";

export default function GovernmentSchemes() {
    const [selectedSchemes, setSelectedSchemes] = useState(null);
    return (<>
        <div className="scheme-layout">
            {
                governmentSchemes.map((governmentScheme) => {
                    return (
                        <Card
                            departmentName={governmentScheme.departmentName}
                            imageUrl={governmentScheme.imageUrl}
                            schemes={governmentScheme.schemes}
                            key={governmentScheme.departmentName}
                            onClick={() => setSelectedSchemes(governmentScheme.schemes)}
                        />
                    );
                })
            }
        </div>

        {selectedSchemes !== null && (
            <SchemeModal
                schemes={selectedSchemes}
                onClose={() => setSelectedSchemes(null)}
            />
        )}

    </>
    )
}


export function Card({ departmentName, imageUrl, onClick }) {

    return (
        <>
            <div className="scheme-card" onClick={onClick}>
                <div className="image-section">
                    <img src={`/GovernmentScheme_images/${imageUrl}`} alt={departmentName} />
                </div>

                <div className="department-section">
                    {departmentName}
                </div>
            </div>
        </>
    )


}



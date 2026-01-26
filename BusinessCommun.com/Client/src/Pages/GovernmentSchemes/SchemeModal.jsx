



import "./SchemeModal.css";


//   export default function SchemeModal({ schemes, onClose }) {

//     return (

// <div className="modal-overlay">

//        <div className="modal">

//          <button className="close-btn" onClick={onClose}>✕</button>


//          <div className="scheme-list">

//            {schemes.map((scheme, index) => (

// <SchemeCard key={index} scheme={scheme} />

// ))}

//          </div>

//        </div>

//      </div>

// );

// }



import { createPortal } from "react-dom";

import SchemeCard from "./SchemeCard";


export default function SchemeModal({ schemes, onClose }) {
    return createPortal(
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 100000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: "linear-gradient(135deg, #001f3f, #3a7bd5)",
                    width: "80%",
                    maxHeight: "80vh", // Keeps the modal from growing off-screen
                    padding: "20px",
                    display: "flex",    /* Changed from grid to flex */
                    flexDirection: "column", 
                    gap: "10px",
                    borderRadius: "10px",
                    overflow: "hidden"  /* Clips anything trying to leak out */
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button Container */}
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end" // Aligns X to the right
                }}>
                    <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }} onClick={onClose}>
                        X
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div style={{
                    overflowY: "auto", 
                    flexGrow: 1,       /* Forces this div to fill the available height */
                    paddingRight: "5px" /* Small gap so scrollbar doesn't hit the text */
                }}>
                    {schemes.map((scheme, index) => (
                        <SchemeCard key={index} scheme={scheme} />
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
}



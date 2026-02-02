import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import './ImageModal.css';

const ImageModal = ({ images, initialIndex = 0, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex]);

    if (!isOpen || !images || images.length === 0) return null;

    const handlePrev = (e) => {
        if (e) e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        if (e) e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="image-modal-overlay" onClick={onClose}>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                <FaTimes />
            </button>

            {images.length > 1 && (
                <>
                    <button className="modal-nav-btn prev" onClick={handlePrev} aria-label="Previous">
                        <FaChevronLeft />
                    </button>
                    <button className="modal-nav-btn next" onClick={handleNext} aria-label="Next">
                        <FaChevronRight />
                    </button>
                </>
            )}

            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    className="modal-image"
                />
                {images.length > 1 && (
                    <div className="modal-counter">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageModal;

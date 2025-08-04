# Medical Note Taking Application

## Overview

A responsive web application for doctors to type medical notes with real-time extraction and highlighting of clinical terms.

## Project Outline

*   **Phase 1: Basic UI and Textarea** - **Completed**
    *   Setup basic Angular component structure.
    *   Create main layout (header, textarea, extracted terms section).
    *   Implement dark mode toggle.
    *   Add basic styling with CSS variables for dark mode.
*   **Phase 2: Real-time Extraction (Mock)** - **Completed**
    *   Implement a mock NLP backend service with debouncing.
    *   Integrate service with textarea for real-time extraction.
    *   Display mock extracted terms as chips with icons and tooltips.
*   **Phase 3: Text Highlighting** - **Completed**
    *   Implement text highlighting using a mirrored element and `<span>` tags.
*   **Phase 4: Action Buttons** - **Completed**
    *   Implement "Clear text", "Copy to clipboard", "Save note" (mock), and "Export as plain text" (mock) buttons.
*   **Phase 5: Responsive Design** - **Completed**
    *   Add CSS media queries for responsiveness.
*   **Phase 6: Optional Features** - **Completed**
    *   Implement hover tooltips to show SNOMED/ICD10 code mappings (mock data).
    *   Use local storage to persist notes temporarily.
    *   Integrate a real NLP API (optional - requires external setup).

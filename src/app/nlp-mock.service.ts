import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ExtractedTerm {
  term: string;
  category: 'Medication' | 'Condition' | 'Lab Test' | 'Procedure' | 'Other';
  icon: string;
  snomed?: string;
  icd10?: string;
  index: number; // Add index to the interface
}

@Injectable({ providedIn: 'root' })
export class NlpMockService {
  extractTerms(text: string): Observable<ExtractedTerm[]> {
    // Mock NLP logic - In a real application, this would call a backend API
    const terms: ExtractedTerm[] = [];
    const lowerCaseText = text.toLowerCase();

    if (lowerCaseText.includes('aspirin')) {
      const index = lowerCaseText.indexOf('aspirin');
      terms.push({ term: 'aspirin', category: 'Medication', icon: '💊', snomed: '373427005', index: index });
    }
    if (lowerCaseText.includes('fever')) {
      const index = lowerCaseText.indexOf('fever');
      terms.push({ term: 'fever', category: 'Condition', icon: '⚠️', icd10: 'R50.9', index: index });
    }
    if (lowerCaseText.includes('cbc')) {
      const index = lowerCaseText.indexOf('cbc');
      terms.push({ term: 'CBC', category: 'Lab Test', icon: '🧪', snomed: '58410007', icd10: 'D64.9', index: index });
    }
    if (lowerCaseText.includes('biopsy')) {
      const index = lowerCaseText.indexOf('biopsy');
      terms.push({ term: 'biopsy', category: 'Procedure', icon: '🔪', snomed: '122869004', index: index });
    }

    return of(terms);
  }
}
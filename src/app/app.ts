import { ChangeDetectionStrategy, Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NlpMockService, ExtractedTerm } from './nlp-mock.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AppComponent implements OnInit {
  darkMode = signal(false);
  noteControl = new FormControl('');
  extractedTerms = signal<ExtractedTerm[]>([]);

  private nlpService = inject(NlpMockService);

  highlightedText = computed(() => {
    let highlighted = this.noteControl.value || '';
    const terms = this.extractedTerms();

    // Sort terms by index to avoid issues with overlapping highlights
    terms.sort((a, b) => a.index - b.index);

    // Apply highlights from the end of the text to the beginning
    for (let i = terms.length - 1; i >= 0; i--) {
      const term = terms[i];
      const start = term.index;
      const end = term.index + term.term.length;
      highlighted = 
        highlighted.slice(0, start) +
        `<span class="highlight">${highlighted.slice(start, end)}</span>` +
        highlighted.slice(end);
    }

    return highlighted;
  });

  ngOnInit() {
    // Load note from local storage on initialization
    const savedNote = localStorage.getItem('medicalNote');
    if (savedNote) {
      this.noteControl.setValue(savedNote);
    }

    this.noteControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(text => {
        // Save note to local storage on each change
        localStorage.setItem('medicalNote', text || '');
        return this.nlpService.extractTerms(text || '');
      })
    ).subscribe(terms => {
      this.extractedTerms.set(terms);
    });
  }

  toggleDarkMode() {
    this.darkMode.update(value => !value);
    document.body.classList.toggle('dark-mode', this.darkMode());
  }

  clearNote() {
    this.noteControl.setValue('');
    this.extractedTerms.set([]);
    localStorage.removeItem('medicalNote'); // Remove from local storage when cleared
  }

  copyNote() {
    navigator.clipboard.writeText(this.noteControl.value || '').catch(err => {
      console.error('Failed to copy note: ', err);
    });
  }

  saveNote() {
    console.log('Saving note (mock):', this.noteControl.value);
    alert('Note saved (mock)! Check the console for the note content.');
  }

  exportNote() {
    const noteContent = this.noteControl.value || '';
    const blob = new Blob([noteContent], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = 'medical_note.txt';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
  }

  getTooltip(term: ExtractedTerm): string {
    let tooltip = `Category: ${term.category}`;
    if (term.snomed) {
      tooltip += `
SNOMED CT: ${term.snomed}`;
    }
    if (term.icd10) {
      tooltip += `
ICD-10: ${term.icd10}`;
    }
    return tooltip;
  }
}

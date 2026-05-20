import { Injectable } from '@angular/core';

import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStorageService {
  private readonly storageKey = 'banca-estudos:students';

  getAll(): Student[] {
    const storedStudents = localStorage.getItem(this.storageKey);

    if (!storedStudents) {
      return [];
    }

    try {
      const parsedStudents = JSON.parse(storedStudents) as Student[];
      return Array.isArray(parsedStudents) ? parsedStudents : [];
    } catch {
      return [];
    }
  }

  saveAll(students: Student[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(students));
  }
}

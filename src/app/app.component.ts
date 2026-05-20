import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  Student,
  StudentFormValue,
  StudentShift,
  StudentStatus,
} from './models/student.model';
import { StudentStorageService } from './services/student-storage.service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly studentStorage = inject(StudentStorageService);

  readonly shifts: StudentShift[] = ['Manhã', 'Tarde', 'Noite'];
  readonly statuses: StudentStatus[] = ['Ativo', 'Aguardando', 'Inativo'];

  students: Student[] = this.studentStorage.getAll();
  editingStudentId: string | null = null;

  readonly studentForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    guardian: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    grade: ['', [Validators.required]],
    shift: ['Tarde' as StudentShift, [Validators.required]],
    status: ['Ativo' as StudentStatus, [Validators.required]],
    notes: [''],
  });

  get totalStudents(): number {
    return this.students.length;
  }

  get activeStudents(): number {
    return this.students.filter((student) => student.status === 'Ativo').length;
  }

  get waitingStudents(): number {
    return this.students.filter((student) => student.status === 'Aguardando').length;
  }

  get isEditing(): boolean {
    return this.editingStudentId !== null;
  }

  saveStudent(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const formValue = this.studentForm.getRawValue();

    if (this.editingStudentId) {
      this.students = this.students.map((student) =>
        student.id === this.editingStudentId ? { ...student, ...formValue } : student,
      );
    } else {
      const newStudent: Student = {
        id: this.createId(),
        ...formValue,
        createdAt: new Date().toISOString(),
      };

      this.students = [newStudent, ...this.students];
    }

    this.persistStudents();
    this.resetForm();
  }

  editStudent(student: Student): void {
    this.editingStudentId = student.id;
    this.studentForm.setValue({
      name: student.name,
      guardian: student.guardian,
      phone: student.phone,
      grade: student.grade,
      shift: student.shift,
      status: student.status,
      notes: student.notes,
    });
  }

  removeStudent(studentId: string): void {
    const student = this.students.find((currentStudent) => currentStudent.id === studentId);

    if (!student) {
      return;
    }

    const confirmed = window.confirm(`Remover ${student.name} do cadastro?`);

    if (!confirmed) {
      return;
    }

    this.students = this.students.filter((currentStudent) => currentStudent.id !== studentId);
    this.persistStudents();

    if (this.editingStudentId === studentId) {
      this.resetForm();
    }
  }

  cancelEditing(): void {
    this.resetForm();
  }

  fieldHasError(fieldName: keyof StudentFormValue): boolean {
    const control = this.studentForm.controls[fieldName];
    return control.invalid && (control.dirty || control.touched);
  }

  formatDate(date: string): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  }

  private resetForm(): void {
    this.editingStudentId = null;
    this.studentForm.reset({
      name: '',
      guardian: '',
      phone: '',
      grade: '',
      shift: 'Tarde',
      status: 'Ativo',
      notes: '',
    });
  }

  private persistStudents(): void {
    this.studentStorage.saveAll(this.students);
  }

  private createId(): string {
    return globalThis.crypto?.randomUUID?.() ?? String(Date.now());
  }
}

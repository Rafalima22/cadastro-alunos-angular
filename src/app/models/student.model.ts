export type StudentShift = 'Manhã' | 'Tarde' | 'Noite';

export type StudentStatus = 'Ativo' | 'Aguardando' | 'Inativo';

export interface Student {
  id: string;
  name: string;
  guardian: string;
  phone: string;
  grade: string;
  shift: StudentShift;
  status: StudentStatus;
  notes: string;
  createdAt: string;
}

export interface StudentFormValue {
  name: string;
  guardian: string;
  phone: string;
  grade: string;
  shift: StudentShift;
  status: StudentStatus;
  notes: string;
}

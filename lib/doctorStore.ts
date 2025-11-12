// lib/doctorStore.ts
export type DoctorRecord = { email: string; name: string; specialty?: string };

let ALLOWED: DoctorRecord[] = [
  { email: 'doctor@example.com', name: 'Д-р Иванова', specialty: 'Терапевт' }
];

export function listDoctors(){ return ALLOWED; }
export function addDoctor(rec: DoctorRecord){
  if(!rec.email) throw new Error('email required');
  if(ALLOWED.find(d=>d.email.toLowerCase()===rec.email.toLowerCase())) return;
  ALLOWED.push(rec);
}
export function removeDoctor(email: string){
  ALLOWED = ALLOWED.filter(d=>d.email.toLowerCase()!==email.toLowerCase());
}
export function isDoctorAllowed(email: string){
  return !!ALLOWED.find(d=>d.email.toLowerCase()===email.toLowerCase());
}

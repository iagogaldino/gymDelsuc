export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'student' | 'trainer';
  createdAt: Date;
  updatedAt: Date;
}

export interface Student extends User {
  userType: 'student';
  objective: FitnessObjective;
  physicalData: PhysicalData;
  activePlans: Plan[];
  progress: Progress[];
}

export interface Trainer extends User {
  userType: 'trainer';
  profile: TrainerProfile;
  plans: Plan[];
  students: Student[];
  certifications: Certification[];
}

export interface FitnessObjective {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface PhysicalData {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  measurements: {
    chest: number;
    waist: number;
    hips: number;
    biceps: number;
    thighs: number;
  };
}

export interface TrainerProfile {
  bio: string;
  experience: number; // years
  specialties: string[];
  location: string;
  rating: number;
  totalReviews: number;
  hourlyRate: number;
  profileImage: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  imageUrl: string;
}

export interface Plan {
  id: string;
  trainerId: string;
  name: string;
  type: 'monthly' | 'quarterly' | 'yearly' | 'single';
  price: number;
  description: string;
  features: string[];
  duration: number; // days
  isActive: boolean;
}

export interface Progress {
  id: string;
  studentId: string;
  date: Date;
  weight: number;
  measurements: {
    chest: number;
    waist: number;
    hips: number;
    biceps: number;
    thighs: number;
  };
  photos: string[];
  notes: string;
}

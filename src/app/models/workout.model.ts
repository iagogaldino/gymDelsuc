export interface Workout {
  id: string;
  trainerId: string;
  studentId: string;
  name: string;
  description: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'mixed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // minutes
  exercises: WorkoutExercise[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exercise: Exercise;
  sets: number;
  reps: number;
  weight?: number; // kg
  duration?: number; // seconds
  restTime: number; // seconds
  notes?: string;
  order: number;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'bodyweight';
  muscleGroups: string[];
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  videoUrl?: string;
  imageUrl?: string;
  instructions: string[];
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  studentId: string;
  startTime: Date;
  endTime?: Date;
  completedExercises: CompletedExercise[];
  notes?: string;
  rating?: number;
}

export interface CompletedExercise {
  exerciseId: string;
  sets: CompletedSet[];
  notes?: string;
}

export interface CompletedSet {
  setNumber: number;
  reps: number;
  weight?: number;
  duration?: number;
  completed: boolean;
}

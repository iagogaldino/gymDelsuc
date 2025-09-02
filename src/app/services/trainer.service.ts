import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Trainer, Plan } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private mockTrainers: Trainer[] = [
    {
      id: '1',
      email: 'carlos@fitness.com',
      name: 'Carlos Mendes',
      userType: 'trainer',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date(),
      profile: {
        bio: 'Personal trainer certificado com 8 anos de experiência em musculação e funcional. Especialista em hipertrofia e emagrecimento.',
        experience: 8,
        specialties: ['Hipertrofia', 'Emagrecimento', 'Funcional'],
        location: 'São Paulo, SP',
        rating: 4.8,
        totalReviews: 127,
        hourlyRate: 80,
        profileImage: 'assets/images/trainers/carlos.jpg'
      },
      plans: [
        {
          id: '1',
          trainerId: '1',
          name: 'Plano Mensal',
          type: 'monthly',
          price: 150,
          description: 'Acompanhamento completo com treinos personalizados e ajustes semanais',
          features: ['4 treinos por semana', 'Ajustes semanais', 'Suporte via app', 'Acompanhamento de progresso'],
          duration: 30,
          isActive: true
        },
        {
          id: '2',
          trainerId: '1',
          name: 'Plano Trimestral',
          type: 'quarterly',
          price: 400,
          description: 'Plano com desconto para compromisso de 3 meses',
          features: ['4 treinos por semana', 'Ajustes semanais', 'Suporte via app', 'Acompanhamento de progresso', '10% desconto'],
          duration: 90,
          isActive: true
        }
      ],
      students: [],
      certifications: [
        {
          id: '1',
          name: 'Personal Trainer',
          issuer: 'Cref',
          issueDate: new Date('2015-03-15'),
          imageUrl: 'assets/images/certifications/cref.jpg'
        }
      ]
    },
    {
      id: '2',
      email: 'ana@fitness.com',
      name: 'Ana Costa',
      userType: 'trainer',
      createdAt: new Date('2022-06-01'),
      updatedAt: new Date(),
      profile: {
        bio: 'Especialista em pilates e treinamento funcional. Formada em Educação Física com pós em Biomecânica.',
        experience: 5,
        specialties: ['Pilates', 'Funcional', 'Reabilitação'],
        location: 'Rio de Janeiro, RJ',
        rating: 4.9,
        totalReviews: 89,
        hourlyRate: 90,
        profileImage: 'assets/images/trainers/ana.jpg'
      },
      plans: [
        {
          id: '3',
          trainerId: '2',
          name: 'Pilates Individual',
          type: 'single',
          price: 120,
          description: 'Sessão individual de pilates com foco em postura e fortalecimento',
          features: ['Sessão individual', 'Avaliação postural', 'Exercícios personalizados'],
          duration: 1,
          isActive: true
        },
        {
          id: '4',
          trainerId: '2',
          name: 'Pacote Mensal',
          type: 'monthly',
          price: 400,
          description: '8 sessões de pilates por mês',
          features: ['8 sessões por mês', 'Avaliação inicial', 'Acompanhamento de progresso'],
          duration: 30,
          isActive: true
        }
      ],
      students: [],
      certifications: [
        {
          id: '2',
          name: 'Educação Física',
          issuer: 'UFRJ',
          issueDate: new Date('2018-12-20'),
          imageUrl: 'assets/images/certifications/ufrj.jpg'
        }
      ]
    },
    {
      id: '3',
      email: 'marcos@fitness.com',
      name: 'Marcos Silva',
      userType: 'trainer',
      createdAt: new Date('2021-09-01'),
      updatedAt: new Date(),
      profile: {
        bio: 'Especialista em corrida e condicionamento físico. Ex-atleta profissional com experiência em treinamento de alto rendimento.',
        experience: 12,
        specialties: ['Corrida', 'Condicionamento', 'Alto Rendimento'],
        location: 'Belo Horizonte, MG',
        rating: 4.7,
        totalReviews: 156,
        hourlyRate: 100,
        profileImage: 'assets/images/trainers/marcos.jpg'
      },
      plans: [
        {
          id: '5',
          trainerId: '3',
          name: 'Preparação para Corrida',
          type: 'monthly',
          price: 200,
          description: 'Programa completo de preparação para corridas de 5km a maratona',
          features: ['Planos de treino personalizados', 'Acompanhamento de performance', 'Dicas de nutrição', 'Suporte 24/7'],
          duration: 30,
          isActive: true
        },
        {
          id: '6',
          trainerId: '3',
          name: 'Plano Anual',
          type: 'yearly',
          price: 2000,
          description: 'Acompanhamento completo durante todo o ano',
          features: ['Planos personalizados', 'Ajustes mensais', 'Suporte prioritário', '20% desconto'],
          duration: 365,
          isActive: true
        }
      ],
      students: [],
      certifications: [
        {
          id: '3',
          name: 'Treinador de Corrida',
          issuer: 'CBAt',
          issueDate: new Date('2011-05-10'),
          imageUrl: 'assets/images/certifications/cbat.jpg'
        }
      ]
    }
  ];

  constructor() { }

  getTrainers(): Observable<Trainer[]> {
    return of(this.mockTrainers);
  }

  getTrainerById(id: string): Observable<Trainer | undefined> {
    const trainer = this.mockTrainers.find(t => t.id === id);
    return of(trainer);
  }

  searchTrainers(filters: {
    objective?: string;
    maxPrice?: number;
    minRating?: number;
    location?: string;
  }): Observable<Trainer[]> {
    let filtered = [...this.mockTrainers];

    if (filters.objective) {
      filtered = filtered.filter(trainer => 
        trainer.profile.specialties.some(specialty => 
          specialty.toLowerCase().includes(filters.objective!.toLowerCase())
        )
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(trainer => 
        trainer.plans.some(plan => plan.price <= filters.maxPrice!)
      );
    }

    if (filters.minRating) {
      filtered = filtered.filter(trainer => 
        trainer.profile.rating >= filters.minRating!
      );
    }

    if (filters.location) {
      filtered = filtered.filter(trainer => 
        trainer.profile.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    return of(filtered);
  }

  getTrainerPlans(trainerId: string): Observable<Plan[]> {
    const trainer = this.mockTrainers.find(t => t.id === trainerId);
    return of(trainer?.plans || []);
  }

  getTopRatedTrainers(limit: number = 5): Observable<Trainer[]> {
    const sorted = [...this.mockTrainers].sort((a, b) => b.profile.rating - a.profile.rating);
    return of(sorted.slice(0, limit));
  }

  getTrainersBySpecialty(specialty: string): Observable<Trainer[]> {
    const filtered = this.mockTrainers.filter(trainer => 
      trainer.profile.specialties.some(s => 
        s.toLowerCase().includes(specialty.toLowerCase())
      )
    );
    return of(filtered);
  }
}

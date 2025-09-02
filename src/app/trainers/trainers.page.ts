import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.page.html',
  styleUrls: ['./trainers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TrainersPage implements OnInit {
  searchTerm = '';
  selectedObjective = '';
  maxPrice = '';
  minRating = '';
  selectedLocation = '';
  
  // Mock data for browsing
  objectives = [
    { id: 'hipertrofia', name: 'Hipertrofia' },
    { id: 'emagrecimento', name: 'Emagrecimento' },
    { id: 'condicionamento', name: 'Condicionamento' },
    { id: 'forca', name: 'Força' },
    { id: 'flexibilidade', name: 'Flexibilidade' }
  ];

  priceRanges = [
    { id: '50', name: 'Até R$ 50' },
    { id: '100', name: 'Até R$ 100' },
    { id: '150', name: 'Até R$ 150' },
    { id: '200', name: 'Até R$ 200' },
    { id: '200+', name: 'Acima de R$ 200' }
  ];

  ratingRanges = [
    { id: '3', name: '3+ estrelas' },
    { id: '4', name: '4+ estrelas' },
    { id: '4.5', name: '4.5+ estrelas' },
    { id: '5', name: '5 estrelas' }
  ];

  locations = [
    { id: 'sp', name: 'São Paulo' },
    { id: 'rj', name: 'Rio de Janeiro' },
    { id: 'mg', name: 'Minas Gerais' },
    { id: 'rs', name: 'Rio Grande do Sul' },
    { id: 'online', name: 'Online' }
  ];

  // Featured trainers data (top rated and most popular)
  featuredTrainers = [
    {
      id: 'featured-1',
      name: 'Ana Costa',
      profile: {
        bio: 'Especialista em emagrecimento e condicionamento. Transformou mais de 500 vidas!',
        specialties: ['Emagrecimento', 'Condicionamento', 'Aeróbico'],
        rating: 4.9,
        totalReviews: 234,
        location: 'São Paulo, SP',
        experience: 10,
        isFeatured: true,
        featuredBadge: 'Top Rated'
      },
      plans: [
        { id: 'f1', name: 'Plano Mensal', price: 150, type: 'mês' },
        { id: 'f2', name: 'Plano Trimestral', price: 400, type: 'trimestre' }
      ]
    },
    {
      id: 'featured-2',
      name: 'Pedro Santos',
      profile: {
        bio: 'Personal trainer especializado em hipertrofia e força. Ex-atleta profissional.',
        specialties: ['Hipertrofia', 'Força', 'Funcional'],
        rating: 4.8,
        totalReviews: 189,
        location: 'Rio de Janeiro, RJ',
        experience: 15,
        isFeatured: true,
        featuredBadge: 'Most Popular'
      },
      plans: [
        { id: 'f3', name: 'Plano Mensal', price: 180, type: 'mês' },
        { id: 'f4', name: 'Plano Semestral', price: 900, type: 'semestre' }
      ]
    },
    {
      id: 'featured-3',
      name: 'Mariana Silva',
      profile: {
        bio: 'Especialista em pilates e reabilitação. Formada em Fisioterapia e Educação Física.',
        specialties: ['Pilates', 'Reabilitação', 'Flexibilidade'],
        rating: 4.9,
        totalReviews: 156,
        location: 'Belo Horizonte, MG',
        experience: 8,
        isFeatured: true,
        featuredBadge: 'Expert'
      },
      plans: [
        { id: 'f5', name: 'Plano Mensal', price: 120, type: 'mês' },
        { id: 'f6', name: 'Plano Trimestral', price: 300, type: 'trimestre' }
      ]
    },
    {
      id: 'featured-4',
      name: 'Carlos Mendes',
      profile: {
        bio: 'Personal trainer focado em corrida e endurance. Maratonista e triatleta.',
        specialties: ['Corrida', 'Endurance', 'Funcional'],
        rating: 4.7,
        totalReviews: 98,
        location: 'Porto Alegre, RS',
        experience: 12,
        isFeatured: true,
        featuredBadge: 'Specialist'
      },
        plans: [
        { id: 'f7', name: 'Plano Mensal', price: 140, type: 'mês' },
        { id: 'f8', name: 'Plano Trimestral', price: 360, type: 'trimestre' }
      ]
    }
  ];

  // Mock trainers data
  allTrainers = [
    {
      id: '1',
      name: 'João Silva',
      profile: {
        bio: 'Personal trainer especializado em hipertrofia e funcional. 8 anos de experiência.',
        specialties: ['Hipertrofia', 'Funcional', 'Força'],
        rating: 4.8,
        totalReviews: 127,
        location: 'São Paulo, SP',
        experience: 8
      },
      plans: [
        { id: '1', name: 'Plano Mensal', price: 120, type: 'mês' },
        { id: '2', name: 'Plano Trimestral', price: 300, type: 'trimestre' }
      ]
    },
    {
      id: '2',
      name: 'Maria Santos',
      profile: {
        bio: 'Especialista em emagrecimento e condicionamento físico. Formada em Educação Física.',
        specialties: ['Emagrecimento', 'Condicionamento', 'Aeróbico'],
        rating: 4.9,
        totalReviews: 89,
        location: 'Rio de Janeiro, RJ',
        experience: 5
      },
      plans: [
        { id: '3', name: 'Plano Semanal', price: 80, type: 'semana' },
        { id: '4', name: 'Plano Mensal', price: 280, type: 'mês' }
      ]
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      profile: {
        bio: 'Personal trainer focado em reabilitação e flexibilidade. Especialista em pilates.',
        specialties: ['Flexibilidade', 'Reabilitação', 'Pilates'],
        rating: 4.7,
        totalReviews: 156,
        location: 'Belo Horizonte, MG',
        experience: 12
      },
      plans: [
        { id: '5', name: 'Plano Mensal', price: 150, type: 'mês' },
        { id: '6', name: 'Plano Semestral', price: 800, type: 'semestre' }
      ]
    }
  ];

  filteredTrainers = this.allTrainers;
  isLoading = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // No business logic needed for browsing
  }

  applyFilters() {
    this.filteredTrainers = this.allTrainers.filter(trainer => {
      let matches = true;

      if (this.searchTerm) {
        matches = matches && trainer.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      }

      if (this.selectedObjective) {
        matches = matches && trainer.profile.specialties.some(s => 
          s.toLowerCase().includes(this.selectedObjective.toLowerCase())
        );
      }

      if (this.maxPrice && this.maxPrice !== '200+') {
        const maxPriceNum = parseInt(this.maxPrice);
        matches = matches && trainer.plans.some(plan => plan.price <= maxPriceNum);
      }

      if (this.minRating) {
        const minRatingNum = parseFloat(this.minRating);
        matches = matches && trainer.profile.rating >= minRatingNum;
      }

      if (this.selectedLocation) {
        matches = matches && trainer.profile.location.toLowerCase().includes(this.selectedLocation.toLowerCase());
      }

      return matches;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedObjective = '';
    this.maxPrice = '';
    this.minRating = '';
    this.selectedLocation = '';
    this.filteredTrainers = this.allTrainers;
  }

  viewTrainer(trainerId: string) {
    // For browsing, just show an alert
    const trainer = this.allTrainers.find(t => t.id === trainerId);
    if (trainer) {
      alert(`Perfil de ${trainer.name}\n\n${trainer.profile.bio}\n\nEspecialidades: ${trainer.profile.specialties.join(', ')}\n\nAvaliação: ${trainer.profile.rating}/5`);
    }
  }

  viewFeaturedTrainer(trainerId: string) {
    // For browsing, just show an alert
    const trainer = this.featuredTrainers.find(t => t.id === trainerId);
    if (trainer) {
      alert(`Perfil de ${trainer.name} (${trainer.profile.featuredBadge})\n\n${trainer.profile.bio}\n\nEspecialidades: ${trainer.profile.specialties.join(', ')}\n\nAvaliação: ${trainer.profile.rating}/5`);
    }
  }

  getObjectiveIcon(objective: string): string {
    const icons: { [key: string]: string } = {
      'hipertrofia': 'muscle',
      'emagrecimento': 'fitness',
      'condicionamento': 'heart',
      'forca': 'barbell',
      'flexibilidade': 'body'
    };
    return icons[objective] || 'target';
  }

  getPriceRange(plans: any[]): string {
    if (!plans || plans.length === 0) return 'Preços não definidos';
    const prices = plans.map(p => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `R$ ${min}` : `R$ ${min} - R$ ${max}`;
  }
}

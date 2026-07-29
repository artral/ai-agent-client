import { Component, inject, signal,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService, ProfileInfo } from '../../../core/services/profile';


interface WeatherInfo {
  temp: number;
  condition: string;
  location: string;
}

interface InsuranceInfo {
  planName: string;
  cardNumber: string;
  groupNumber: string;
}


@Component({
  selector: 'app-dashboard.component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  // Mock data for now — replace with real service calls later
  totalMembers = signal<number>(1284);
  private profileService = inject(ProfileService);
  profile = this.profileService.profile;
  isEditingProfile = signal(false);
  editForm = signal<ProfileInfo>({ ...this.profile() });
  isSaving = signal(false);
  isLoading = signal(true);

  async ngOnInit() {
    await this.profileService.loadProfile();
    this.isLoading.set(false);
  } 
  startEdit() {
    this.editForm.set({ ...this.profile() }); // reset form to current values
    this.isEditingProfile.set(true);
  }

  cancelEdit() {
    this.isEditingProfile.set(false);
  }

  async saveEdit() {
    this.isSaving.set(true);
    await this.profileService.saveProfile(this.editForm());
    this.isSaving.set(false);
    this.isEditingProfile.set(false);
  }

  updateField(field: keyof ProfileInfo, value: string) {
    this.editForm.update((f) => ({ ...f, [field]: value }));
  }

  weather = signal<WeatherInfo>({
    temp: 72,
    condition: 'Sunny',
    location: 'Chaska, MN',
  });



  insurance = signal<InsuranceInfo>({
    planName: 'PBM Gold Plan',
    cardNumber: '**** **** 4821',
    groupNumber: 'GRP-9931',
  });
}

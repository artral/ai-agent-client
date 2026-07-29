// src/app/core/services/profile.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface ProfileInfo {
  name: string;
  role: string;
  memberId: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/users/1';

  private profileData = signal<ProfileInfo>({
    name: 'Jane Doe',
    role: 'Patient',
    memberId: 'MBR-004821',
  });

  readonly profile = this.profileData.asReadonly();

  async loadProfile() {
    try {
      const data = await firstValueFrom(this.http.get<ProfileInfo>(this.apiUrl));
      this.profileData.set(
        {
          name: data.name,
          role: data.role || 'Patient', // default to 'Patient' if role is missing
          memberId: data.memberId || 'MBR-004821', // default to a placeholder if memberId is missing

        });
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  }
  async saveProfile(updated: ProfileInfo): Promise<ProfileInfo> {
    try {
      const savedProfile = await firstValueFrom(this.http.put<ProfileInfo>(this.apiUrl, updated));
      this.profileData.set(savedProfile);
      return savedProfile;
    } catch (error) {
      console.error('Failed to save profile:', error);
      throw error;
    }
  }


}
import { Injectable } from '@nestjs/common';
import { FirebaseAuthService } from '@/gateway/firebase/service';

@Injectable()
export class UserService {
  constructor(private readonly firebaseService: FirebaseAuthService) {}

  async login(email: string, password: string): Promise<string> {
    const token = await this.firebaseService.login(email, password);
    return token;
  }

  async register(email: string, password: string) {
    const user = await this.firebaseService.register(email, password);
    return user;
  }
}

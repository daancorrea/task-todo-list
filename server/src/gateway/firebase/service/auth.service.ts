/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseConfigService } from '../config/firebase.config';
import * as admin from 'firebase-admin';
import axios from 'axios';

@Injectable()
export class FirebaseAuthService {
  auth: admin.auth.Auth;
  firebaseApiKey: string;
  constructor(private firebaseConfigService: FirebaseConfigService) {
    this.auth = this.firebaseConfigService.firebaseApp.auth();
    this.firebaseApiKey =
      this.firebaseConfigService.configService.get<string>('FIREBASE_API_KEY');
  }

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    try {
      return await this.auth.verifyIdToken(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseApiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        },
      );
      return response.data.idToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  async register(email: string, password: string): Promise<any> {
    const register = await this.auth.createUser({
      email,
      password,
    });
    if (!register) {
      throw new BadRequestException('Error to register user');
    }
    return;
  }
}

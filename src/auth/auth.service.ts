import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { BcryptService } from '../utils/services/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user) {
      const passwordIsMatch = await this.bcryptService.compare(
        password,
        user.password,
      );
      if (passwordIsMatch) {
        const { password, ...data } = user;
        return data;
      }
    }
    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const userValid = await this.validateUser(user.username, user.password);
    if (userValid) {
      const payload = { username: userValid.username, sub: userValid.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}

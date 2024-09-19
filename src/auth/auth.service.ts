import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { BcryptService } from 'src/utils/bcrypt.service';

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

  async signIn(user: any): Promise<{ access_token: string }> {
    const isUserValid = await this.validateUser(user.username, user.password);

    if (isUserValid) {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}

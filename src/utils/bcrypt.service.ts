import { Injectable } from '@nestjs/common';
import { genSalt, hashSync, compareSync } from 'bcrypt';

@Injectable()
export class BcryptService {
  async hash(data: string): Promise<string> {
    const salt = await genSalt(10);
    return hashSync(data, salt);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    console.log('Compare args:', data, encrypted);
    return compareSync(data, encrypted);
  }
}

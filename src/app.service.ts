import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  public async initRoom(): Promise<string> {
    try {
      const dateNow = new Date();
      return (dateNow.getTime() + Math.floor(100000 + Math.random() * 900000)).toString();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

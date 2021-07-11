import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService , private readonly appGateway : AppGateway) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('init-room')
  public async initRoom(@Res() res){
    try{
      const response = await this.appService.initRoom();
      await this.appGateway.resToClient();
      res.status(HttpStatus.CREATED).json(response);
    }catch(error){
      res.status(error.getStatus()).send(error.getResponse());
    }
  }
}

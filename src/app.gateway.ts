import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'ws';
import { RecieveChatRequestDto } from "./dto/request";

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
    private logger = new Logger(AppGateway.name);

    @WebSocketServer()
    private server: Server;

    public handleConnection(client: Socket){
        this.logger.verbose(`Connection by : ${client.id}`);
    }

    public resToClient() : void{
        this.server.emit('SEND_FROM_SERVER', 'Init Success');
    }

    @SubscribeMessage('CHAT_TO_SERVER')
    recieveChat(@MessageBody() data: RecieveChatRequestDto): void {
        this.logger.verbose(`Room ID  : ${data.roomId}`);
        this.server.emit('CHAT_TO_ROOM_ID#' + data.roomId, data);
    }
}
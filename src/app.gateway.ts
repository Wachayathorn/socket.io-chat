import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { RecieveChatRequestDto } from "./dto/request";

@WebSocketGateway({
    transports: ['websocket',
        'flashsocket',
        'htmlfile',
        'xhr-polling',
        'jsonp-polling',
        'polling'],
    pingTimeout: 60000,
    pingInterval: 25000
})
export class AppGateway implements OnGatewayConnection {
    private logger = new Logger(AppGateway.name);

    @WebSocketServer()
    server: Server;

    public handleConnection(client: Socket) {
        this.logger.verbose(`Connection by : ${client.id}`);
    }

    @SubscribeMessage('CHAT_TO_SERVER')
    recieveChat(@MessageBody() data: RecieveChatRequestDto): void {
        this.logger.verbose(`Room ID  : ${data.roomId}`);
        this.server.emit('CHAT_TO_ROOM_ID#' + data.roomId, data);
    }
}
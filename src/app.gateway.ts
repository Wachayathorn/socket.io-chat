import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { RecieveChatRequestDto } from "./dto/request";

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
    private logger = new Logger(AppGateway.name);
    
    @WebSocketServer()
    private readonly server: Server;

    public handleConnection(client: Socket) {
        this.logger.verbose('On Connection by IP:', client.handshake.address);
    }

    handleDisconnect(client: Socket) {
        this.logger.verbose('On Connection by IP:', client.handshake.address);
    }

    @SubscribeMessage('CHAT_TO_SERVER')
    recieveChat(@MessageBody() data: RecieveChatRequestDto): void {
        this.server.emit('CHAT_TO_ROOM_ID#' + data.roomId, data);
    }
}
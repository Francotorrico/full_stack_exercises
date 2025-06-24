import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
  SubscribeMessage,
  MessageBody
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationsService } from './notifications.service';
import { NotificationDto } from './dto/notification.dto';
import { NotificationUser } from './interfaces/notification.interface';
import { UsePipes, ValidationPipe } from '@nestjs/common';

// interface ConnectedUser {
//   socketId: string;
// }


@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  @WebSocketServer()
  public server: Server;

  private connectedUsers: Map<string, NotificationUser> = new Map();
  constructor(private readonly notificationsService: NotificationsService) { }

  private userNotificationsViewed: Map<string, number> = new Map();

  public afterInit(server: Server): void {
    console.log(`server ready at ${server.path()}`);

  }
  public handleConnection(client: Socket): void {
 
    const userId = client.handshake.query.userId as string;

    if (!userId || userId.trim() === '') {
      console.log(`Conexión rechazada: userId no proporcionado en socket ${client.id}`);
      client.disconnect(); // Desconecta el socket inválido
      return;
    }
    const user: NotificationUser = {
      id: client.id,
      socketId: client.id,
      userId,
    };
    this.connectedUsers.set(userId, user);
    console.log(`Usuario conectado: ${userId} con socket ${client.id}`);

  }

  public handleDisconnect(client: Socket): void {
    for (const [userId, user] of this.connectedUsers) {
      if (user.socketId === client.id) {
        this.connectedUsers.delete(userId);
        console.log(`Usuario desconectado: ${userId}`);
        break;
      }
    }
  }


  @SubscribeMessage('getConnectedUsers')
  public handleGetConnectedUsers(client: Socket): void {
    const connectedUsersList = Array.from(this.connectedUsers.values())
      .filter(user => user.socketId !== client.id)
      .map(user => ({ userId: user.userId, socketId: user.socketId }));
    this.server.to(client.id).emit('connectedUsersList', connectedUsersList);

  }


  @SubscribeMessage('sendNotification')
  public handleSendNotification(client: Socket, payload: NotificationDto) {
    console.log('Payload recibido:', payload);

    const allowedTypes = ["info", "warning", "error", "success"];

    if (!payload.user_id || !payload.message || !allowedTypes.includes(payload.type)) {
      console.log('Validación falló:', {payload});

      this.server.to(client.id).emit('error-data-invalide', {payload});
      return;
    }

    const notification = this.notificationsService.create(payload);
    const user = this.connectedUsers.get(payload.user_id);

    if (user) {
      this.server.to(user.socketId).emit('new-notification', notification);
      console.log(`Notificación enviada a usuario ${payload.user_id}`);
    } else {
      console.log(`Usuario ${payload.user_id} no está conectado de ${client.id}`);
    }

  }

  @SubscribeMessage('markAsRead')
  public handleMarkAsRead(@MessageBody() data: { id: string; userId: string }): void {
    //como leída en el array en memoria
    this.notificationsService.markAsRead(data.id);

    const viewed = this.userNotificationsViewed.get(data.userId) || 0;
    this.userNotificationsViewed.set(data.userId, viewed + 1);

    //
    const unreadCount = this.notificationsService.countUnreadByUser(data.userId);
    const user = this.connectedUsers.get(data.userId);
    if (user) {
      this.server.to(user.socketId).emit('unreadCountUpdated', { unreadCount });


    }

  }



  //devuelve array completo de notificaciones
  @SubscribeMessage('getAllNotifications')
  public handleGetReadCount(client: Socket, payload: { user_id: string }): void {
    console.log('Payload recibido en getReadCount:', payload);

    //const userId = payload.user_Id;
    console.log(`getReadCount solicitado para userId=${payload.user_id}`);
    const notifications = this.notificationsService.findByUser(payload.user_id);
    console.log({ notifications });
    this.server.to(client.id).emit('allNotifications', { notifications });
  }

}

import { Injectable } from '@nestjs/common';
import { Notification } from './interfaces/notification.interface';
import { NotificationDto } from './dto/notification.dto';
import { randomUUID } from 'crypto';



@Injectable()
export class NotificationsService {

    private notifications: Notification[] = [];

    create(dto: NotificationDto): Notification {
        const newNotification: Notification = {
            id: randomUUID(), //evito dos notificaiones con el mismo id   
            userId: dto.user_id,
            message: dto.message,
            type: dto.type,
            read: false,
            timestamp: new Date()
        }
        this.notifications.push(newNotification);
        return newNotification;
    }

    // con esta funciones busco dentro de la lista de notificaciones
    //simulo que tengo guardado en la base de datos


    //devuelvo todas las notificaciones de [] que le pertenecen a un usuario específico
    findByUser(userId: string): Notification[] {
        return this.notifications.filter(n => n.userId === userId);
    }

    

    // devuelvo todas las notificaciones que no leyo el usuario osea cuantas no leyó el usuario
    public countUnreadByUser(userId: string): number {
        return this.notifications.filter(n => n.userId === userId && !n.read).length;
    }

    //Marca una noti como leída
    public markAsRead(id: string): void {
        const notif = this.notifications.find(n => n.id === id);
        if (notif) notif.read = true;
        console.log(`Notificacion ${id} marcada como leída`);

    }

}

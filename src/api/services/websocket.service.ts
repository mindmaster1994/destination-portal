import { Injectable } from "@angular/core";
import * as Stomp from '@stomp/stompjs';
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import * as SockJS from 'sockjs-client';

@Injectable()
export class WebsocketService {
    
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/user/favourite/destination";
    stompClient: any;

    OnConnectionSubject = new Subject();

    constructor(private toasterService:ToastrService){}

    getConnectionAsObservable(){
        return this.OnConnectionSubject.asObservable();
    }

    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.OnConnectionSubject.next(true);
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
        }, this.errorCallBack);
    };

    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    _send(message) {
        this.stompClient.send("/app/store", {}, JSON.stringify(message));
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    onMessageReceived(message) {
        console.log("Message Recieved : " + message);
        this.toasterService.success(JSON.stringify(message.body));
    }
}
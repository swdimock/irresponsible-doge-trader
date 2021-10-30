import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

const URL = "wss://ws-sandbox.coinapi.io/v1/";
const API_KEY = "749CB7FE-69FC-48A0-8797-9BC58BE8669C";

@Injectable({
  providedIn: "root"
})
export class CryptoService {
  public webSocket: WebSocketSubject<any> = webSocket(URL);
  public crypto$: Subject<any> = new Subject();

  connect() {
    this.webSocket.asObservable().subscribe((data) => this.crypto$.next(data));
    this.greeting();
  }

  greeting() {
    this.webSocket.next({
      type: "hello",
      apikey: API_KEY,
      heartbeat: false,
      subscribe_data_type: ["trade"],
      subscribe_filter_asset_id: ["DOGE"]
    });
  }
}

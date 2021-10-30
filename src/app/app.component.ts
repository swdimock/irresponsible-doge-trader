import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { CryptoService } from "./services/crypto.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent implements OnInit {
  public title = "Dogecoin Trade Advisor";
  public direction;
  public currentPrice$ = new Subject();
  private previousPrice;

  constructor(private wsCrypto: CryptoService) {
    wsCrypto.connect();
  }

  ngOnInit() {
    this.getCurrentTradePrice();
  }

  getCurrentTradePrice() {
    this.wsCrypto.crypto$.subscribe((trade) => {
      if (trade.price && !`${trade.price}`.split(".")[1].includes("0000")) {
        this.currentPrice$.next(trade.price.toFixed(3));
        // Compare the previous price to the new price
        this.direction =
          trade.price > this.previousPrice ? "Mooning!!" : "Hodl!!!";
        this.previousPrice = trade.price;
      }
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";

@Component({
  selector: "lib-ProxyHelper",
  templateUrl: "./ProxyHelper.component.html",
  styleUrls: ["./ProxyHelper.component.css"],
})
export class ProxyHelperComponent implements OnInit {
  constructor(private API: ApiService) {}

  apiResponse = "Press the button above to get the response.";

  doAPIAction(): void {
    this.API.request(
      {
        module: "ProxyHelper",
        action: "aboutInfo",
      },
      (response) => {
        this.apiResponse = response;
      }
    );
  }

  ngOnInit() {}
}

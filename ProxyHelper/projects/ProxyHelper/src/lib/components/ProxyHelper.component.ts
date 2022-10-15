import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";

@Component({
  selector: "lib-ProxyHelper",
  templateUrl: "./ProxyHelper.component.html",
  styleUrls: ["./ProxyHelper.component.css"],
})
export class ProxyHelperComponent implements OnInit {
  constructor(private API: ApiService) {}

  public title: string = "";
  public version = "";

  statusColor = "warn";
  status = "Stopped";
  toggleSuccess = false;
  toggleFailure = false;
  error = "";
  disabled = false;


  proxyIp = "172.16.42.42";
  proxyPort = "8080";

  running = false;
  
  isFetchingBackups = false;
  isBackingUp = false;

  backupName = "";
  backupContents = "";
  restoreMessage = "";
  backups = [];

  ngOnInit() {
    this.getAboutInfo()
    this.getRunningStatus()
  }

  getAboutInfo(): void {
    this.API.request(
      {
        module: "ProxyHelper",
        action: "aboutInfo",
      },
      (response) => {
        console.log(response)
        this.title = response.title;
        this.version = response.version;
      }
    );
  }

  getRunningStatus() {
    this.API.request(
      {
        module: "ProxyHelper",
        action: "getRunningStatus",
      },
      (response) => {
        console.log(response)
        this.running = response.isRunning;
        this.proxyIp = response.proxyIp || this.proxyIp;
        this.proxyPort = response.proxyPort || this.proxyPort;
        
        if (response.isRunning) {
          this.status = "Running";
          this.statusColor = "accent";
          this.toggleSuccess = false;
          this.toggleFailure = false;
          this.error = "";
        } else {
          this.status = "Stopped";
          this.statusColor = "warn";
          this.toggleSuccess = false;
          this.toggleFailure = false;
          this.error = "";
        }
      }
    );
  }

  setRunningStatus(running) {
    this.running = running;
    this.API.request(
      {
        module: "ProxyHelper",
        action: "setRunningStatus",
        isRunning: running,
        proxyIp: this.proxyIp,
        proxyPort: this.proxyPort,
      },
      (response) => {
        console.log(response)
      }
    );
  }

  backupRules(bIsAutoBackup) {
    this.isBackingUp = true;
    this.API.request(
      {
        module: "ProxyHelper",
        action: "backupRules",
        bIsAutoBackup
      },
      (response) => {
        this.isBackingUp = false;
        console.log(response)
      }
    );
  }

  enableProxy() {
    this.error = "";
    this.toggleFailure = false;

    this.API.request(
      {
        module: "ProxyHelper",
        action: "backupRules",
        bIsAutoBackup: true
      },
      (response) => {
        console.log(response)
        this.API.request(
          {
            module: "ProxyHelper",
            action: "clearRules"
          },
          (response) => {
            console.log(response);
            this.API.request(
              {
                module: "ProxyHelper",
                action: "createProxyRules",
                dIP: this.proxyIp,
                dPort:  parseInt(this.proxyPort)
              },
              (response) => {
                console.log(response)
                if (response.success) {
                  this.setRunningStatus(true);
                  console.log('Started proxy on IP: ' + this.proxyIp + ' and port: ' + this.proxyPort);
                  this.status = "Started";
                  this.statusColor = "primary";
                  this.toggleSuccess = true;
                  this.toggleFailure = false;
                  this.disabled = true;
                } else {
                  console.log('Failed to start proxy');
                  this.status = "Stopped";
                  this.statusColor = "warn";
                  this.toggleSuccess = false;
                  this.toggleFailure = true;
                  this.disabled = false;
                }
              }
            );
          }
        );
      }
    );
  }

  disableProxy() {
    this.API.request(
      {
        module: "ProxyHelper",
        action: "clearRules"
      },
      (response) => {
        console.log(response);
        console.log('Stopping proxy');
        this.status = "Stopped";
        this.statusColor = "warn";
        this.toggleSuccess = false;
        this.toggleFailure = false;
        this.API.request(
          {
            module: "ProxyHelper",
            action: "restoreBackup",
            filename: "iptables_tmp"
          },
          (response) => {
            console.log(response)
          }
        );
      })
  }

  toggleProxy() {
    if (this.status == "Stopped") {
      this.enableProxy();
    } else {
      this.disableProxy();
    }
  }

  viewBackup(filename) {
    this.API.request(
      {
        module: "ProxyHelper",
        action: "viewBackup",
        filename
      },
      (response) => {
        console.log(response)
        this.backupContents = response.output;
        this.backupName = response.name;
      }
    );
  }

  restoreBackup(filename) {
    this.API.request(
      {
        module: "ProxyHelper",
        action: "restoreBackup",
        filename
      },
      (response) => {
        console.log(response)
        if (response.success) {
          this.restoreMessage = "Backup restored";
        } else {
          this.restoreMessage = "Failed to restore backup";
        }
      },
    );
  }

  getBackups() {
    this.API.request(
      {
        module: "ProxyHelper",
        action: "getBackups"
      },
      (response) => {
        console.log(response)
        this.backups = response.backups
      }
    );
  }

  deleteBackup(filename) {
    this.API.request(
      {
        module: "ProxyHelper",
        action: "deleteBackup",
        filename
      },
      (response) => {
        console.log(response)
        if (response.success) {
          this.restoreMessage = "Backup deleted";
        } else {
          this.restoreMessage = "Failed to delete backup";
        }
      }
    );
  }
}

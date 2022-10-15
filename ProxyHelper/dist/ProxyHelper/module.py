#!/usr/bin/env python3 
 
from fileinput import filename
import logging 
import os
import json
import datetime
import re

from pineapple.modules import Module, Request 
 
module = Module("ProxyHelper", logging.DEBUG) 

tmpFileName = "iptables_tmp"
statusFile = "/pineapple/modules/ProxyHelper/module.status"
 
@module.handles_action("aboutInfo") 
def aboutInfo(request: Request): 
    f = open("/pineapple/modules/ProxyHelper/module.json")
    data = json.load(f)
    return {"title": data["title"], "version": data["version"]}

@module.handles_action("clearRules")
def clearRules(request: Request):
    # Clear out the PREROUTING and POSTROUTING chains to remove our rules.
    # Just in case this clears out something the user needed, we make and
    # restore a backup when toggling the proxy. If this ends up causing issues,
    # the code could be updated to parse iptables output and remove only what we added    
    os.system("iptables -t nat -F PREROUTING")
    os.system("iptables -t nat -F POSTROUTING")
    return {"success": True, "call": "clearRules()"}

@module.handles_action("createProxyRules")
def createProxyRules(request: Request):
    if request.dIP == "" or re.search(r'((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))', request.dIP) == "":
        return {"success": False, "call": "createPoxyRules()", "error": "The IP address is invalid"}
    
    if not isinstance(request.dPort, int):
        return {"success": False, "call": "createPoxyRules()", "error": "The port is invalid (not an integer)"}

    if request.dPort <= 0 or request.dPort >65535:
        return {"success": False, "call": "createPoxyRules()", "error": "The port is invalid (invalid range)"}
    
    os.system("echo '1' > /proc/sys/net/ipv4/ip_forward")
    destination = f'{request.dIP}:{request.dPort}'
    os.system("iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination " + destination)
    os.system("iptables -t nat -A PREROUTING -p tcp --dport 443 -j DNAT --to-destination " + destination)
    os.system("iptables -t nat -A POSTROUTING -j MASQUERADE")
    return {"success": True, "call": "createProxyRules()", "ip": request.dIP, "port": request.dPort, "destination": destination}

@module.handles_action("backupRules")
def backupRules(request: Request):
    os.system("mkdir -p /pineapple/modules/ProxyHelper/backups/")
    filename = ""
    if request.bIsAutoBackup:
        filename = "/pineapple/modules/ProxyHelper/backups/" + tmpFileName
    else:
        filename = '/pineapple/modules/ProxyHelper/backups/iptables_' + datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-S")

    os.system("iptables-save > " + filename)

    return {"success": True, "call": "backupRules()", "content": "iptables-save", "filename": filename}

@module.handles_action("viewBackup")
def viewBackup(request: Request):
    filename = request.filename
    if filename is None or filename == "":
        return {"success": False, "call": "viewBackup()", "error": "No filename specified"}

    filePath = "/pineapple/modules/ProxyHelper/backups/" + filename

    if not os.path.isfile(filePath):
        return {"success": False, "call": "viewBackup()", "error": "No file found"}

    if not os.path.getsize(filePath) == 0:
        return {"success": False, "call": "viewBackup()", "error": "File is empty"}
    
    with open(filePath) as f:
        return {"success": True, "call": "viewBackup()", "file": filename, "output": f}

@module.handles_action("restoreBackup")
def restoreBackup(request: Request):
    filename = request.filename
    if filename is None or filename == "":
        return {"success": False, "call": "restoreBackup()", "error": "No filename specified"}

    filePath = "/pineapple/modules/ProxyHelper/backups/" + filename

    if not os.path.isfile(filePath):
        return {"success": False, "call": "restoreBackup()", "error": "No file found"}
    
    with open(filePath) as f:
        os.system("iptables-restore < " + filePath)
        return {"success": True, "call": "restoreBackup()", "file": filename, "output": f}

@module.handles_action("getBackups")
def getBackups():
    baseDir = "/pineapple/modules/ProxyHelper/backups"
    backupFiles = [f for f in os.listdir() if os.path.isfile(os.path.join(baseDir, f))]
    backups = []

    for backup in backupFiles:
        if not os.path.isfile(backup) and not os.path.getsize(backup) == 0 and backup != tmpFileName:
            with open(backup, "r") as f:
                backups.append(f)
    return {"success": True, "call": "getBackups()", "backups": backups}

@module.handles_action("deleteBackup")
def deleteBackup(request: Request):
    filePath = "/pineapple/modules/ProxyHelper/backups/" + request.filename

    if not os.path.isfile(filePath):
        return {"success": False, "call": "restoreBackup()", "error": "No file found"}

    os.system("rm -rf " + filename)
    return {"success": True, "call": "deleteBackup()", "file": filename}

@module.handles_action("setRunningStatus")
def setRunningStatus(request: Request):
    status = {
        "isRunning": request.isRunning,
        "proxyIp": request.proxyIp,
        "proxyPort": request.proxyPort,
    }

    with open(statusFile, "w+") as f:
        f.write(json.dumps(status))
        f.close()
    
    return {"success": True, "call": "setRunningStatus()", "json": status}

@module.handles_action("getRunningStatus")
def getRunningStatus(request: Request):
    isRunning = False
    proxyIp = ""
    proxyPort = ""

    if os.path.isfile(statusFile) and os.path.getsize(statusFile) > 0:
        f = open(statusFile, "r")
        status = json.load(f)
        isRunning = status["isRunning"]
        proxyIp = status["proxyIp"]
        proxyPort= status["proxyPort"]
    return {"success": True, "call": "getRunningStatus()", "isRunning": isRunning, "proxyIp": proxyIp, "proxyPort": proxyPort}
 
if __name__ == "__main__": 
    module.start()
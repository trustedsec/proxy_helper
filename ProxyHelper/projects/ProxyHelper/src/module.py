#!/usr/bin/env python3 
 
import logging 
 
from pineapple.modules import Module, Request 
 
module = Module("ProxyHelper", logging.DEBUG) 

tmpFileName = "iptables_tmp"
statusFile = "/pineapple/modules/ProxyHelper/module.status"
 
@module.handles_action("aboutInfo") 
def aboutInfo(request: Request): 
    f = open("/pineapple/modules/ProxyHelper/module.json")
    data = json.load(f)
    return json.dumps({"title": data["title"], "version": data["version"]})

@module.handles_action("clearRules")
def clearRules(request: Request):
    # Clear out the PREROUTING and POSTROUTING chains to remove our rules.
    # Just in case this clears out something the user needed, we make and
    # restore a backup when toggling the proxy. If this ends up causing issues,
    # the code could be updated to parse iptables output and remove only what we added    
    os.system("iptables -t nat -F PREROUTING")
    os.system("iptables -t nat -F POSTROUTING")
    return json.dumps({"success": True, "call": "clearRules()"})

@module.handles_action("createProxyRules")
def createProxyRules(request: Request):
    if re.search(r'((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))', request.dIP) == "":
        return json.dumps({"success": False, "call": "createPoxyRules()", "error": "The IP address is invalid"})
    
    if not isinstance(request.dPort, int):
        return json.dumps({"success": False, "call": "createPoxyRules()", "error": "The port is invalid (not an integer)"})

    if request.dbPort <= 0 or request.dbPort >65535:
        return json.dumps({"success": False, "call": "createPoxyRules()", "error": "The port is invalid (invalid range)"})
    
    os.system("echo '1' > /proc/sys/net/ipv4/ip_forward")
    destination = request.dIP + ":" + request.dPort
    os.system("iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination " + destination)
    os.system("iptables -t nat -A PREROUTING -p tcp --dport 443 -j DNAT --to-destination " + destination)
    os.system("iptables -t nat -A POSTROUTING -j MASQUERADE")
    return json.dumps({"success": True, "call": "createProxyRules()", "ip": request.dIP, "port": request.dPort, "destination": destination})

@module.handles_action("backupRules")
def backupRules(request: Request):
    os.system("mkdir -p /pineapple/modules/ProxyHelper/backups/")
    filename = ""
    if request.bIsAutoBackup:
        filename = "/pineapple/modules/ProxyHelper/backups/" + tmpFileName
    else:
        filename = '/pineapple/modules/ProxyHelper/backups/iptables_' + datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-S")

    os.system("iptables-save > " + filename)

    return json.dumps({"success": True, "call": "backupRules()", "content": "iptables-save", "filename": filename})

 
if __name__ == "__main__": 
    module.start()
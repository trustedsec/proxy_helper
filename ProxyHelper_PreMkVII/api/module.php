<?php namespace pineapple;

class ProxyHelper extends Module
{
    private $tmpFileName = 'iptables_tmp';
    private $statusFile = '/pineapple/modules/ProxyHelper/module.status';

    public function route()
    {
        switch ($this->request->action) {
            case 'aboutInfo':
                $this->aboutInfo();
                break;
            case 'clearRules':
                $this->clearRules();
                break;
            case 'backupRules':
                $this->backupRules();
                break;
            case 'viewBackup':
                $this->viewBackup();
                break;
            case 'restoreBackup':
                $this->restoreBackup();
                break;
            case 'getBackups':
                $this->getBackups();
                break;
            case 'deleteBackup':
                $this->deleteBackup();
                break;
            case 'createProxyRules':
                $this->createProxyRules();
                break;
            case 'setRunningStatus':
                $this->setRunningStatus();
                break;
            case 'getRunningStatus':
                $this->getRunningStatus();
                break;
        }
    }

    protected function aboutInfo()
    {
        $moduleInfo = @json_decode(file_get_contents("/pineapple/modules/ProxyHelper/module.info"));
        $this->response = array('title' => $moduleInfo->title, 'version' => $moduleInfo->version);
    }

    private function clearRules()
    {
        /*
        Clear out the PREROUTING and POSTROUTING chains to remove our rules.
        Just in case this clears out something the user needed, we make and
        restore a backup when toggling the proxy. If this ends up causing issues,
        the code could be updated to parse iptables output and remove only what we added
        */
        exec('iptables -t nat -F PREROUTING', $output, $retval); // Flush all chains
        exec('iptables -t nat -F POSTROUTING', $output, $retval); // Delete every non-builtin chain

        $this->response = array('success' => true,
                                'call' => 'clearRules()');
    }

    private function createProxyRules()
    {
        // Validate the IP address
        if (!filter_var($this->request->dIP, FILTER_VALIDATE_IP)) {
            $this->response = array('success' => false,
                                  'call' => 'createProxyRules()',
                                  'error' => 'The IP address is invalid');
            return;
        }

        // Validate the port number
        if (!filter_var($this->request->dPort, FILTER_VALIDATE_INT)) {
            $this->response = array('success' => false,
                                  'call' => 'createProxyRules()',
                                  'error' => 'The port is invalid (not an integer)');
            return;
        }

        // Validate the port range
        if (intval($this->request->dPort) <= 0 || intval($this->request->dPort) > 65535) {
            $this->response = array('success' => false,
                                  'call' => 'createProxyRules()',
                                  'error' => 'The port is invalid (invalid range)');
            return;
        }

        // Enable IP forwarding
        exec('echo \'1\' > /proc/sys/net/ipv4/ip_forward', $output, $retval);

        // Create the proxy rules
        $destination = $this->request->dIP . ':' . $this->request->dPort;
        exec('iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination ' . $destination);
        exec('iptables -t nat -A PREROUTING -p tcp --dport 443 -j DNAT --to-destination ' . $destination);
        exec('iptables -t nat -A POSTROUTING -j MASQUERADE');
        $this->response = array('success' => true,
                                'call' => 'createProxyRules()',
                                'IP' => $this->request->dIP,
                                'Port' => $this->request->dPort,
                                'destination' => $destination);
    }

    private function backupRules()
    {
        // create the backup directory if it does not exist
        exec('mkdir -p /pineapple/modules/ProxyHelper/backups/', $output, $retval);
        $filename = '';

        if ($this->request->bAutoBackup) { // Name the auto backup something different to hide from the interface
            $filename = '/pineapple/modules/ProxyHelper/backups/' . $this->tmpFileName;
        } else {
            $filename = '/pineapple/modules/ProxyHelper/backups/iptables_' . date('Y-m-d_H-i-s');
        }

        // backup the current rules
        exec('iptables-save > ' . $filename, $output, $retval);
        $this->response = array('success' => true,
                                'content' => 'iptables-save',
                                'filename' => $filename,
                                'output' => $output,
                                'return' => $retval);
    }

    private function viewBackup()
    {
        exec('cat /pineapple/modules/ProxyHelper/backups/'.$this->request->file, $output);
        $file = $this->request->file;

        if (!empty($output)) {
            $this->response = array('output' => implode("\n", $output), 'file' => $file);
        } else {
            $this->response = array('output' => 'Empty backup...', 'file' => $file);
        }
    }

    private function restoreBackup()
    {

        $filename = '';
        $filename = '/pineapple/modules/ProxyHelper/backups/' . $this->request->file;

        // restore the rules
        exec('iptables-restore < ' . $filename, $output, $retval);
        $this->response = array('success' => true,
                                'content' => 'iptables-restore',
                                'filename' => $filename,
                                'output' => $output,
                                'return' => $retval);
    }

    private function getBackups()
    {
        $baseDir = '/pineapple/modules/ProxyHelper/backups';
        $backups = [];
        $scan = scandir($baseDir);

        foreach ($scan as $file) {
            // Ensure it is a file and not a path
            if (is_file($baseDir . '/' . $file)) {
                // Ignore the auto created iptables backup
                if (basename($file) != $this->tmpFileName) {
                    array_push($backups, $file);
                }
            }
        }

        $this->response = array('backups' => $backups);
    }

    private function deleteBackup()
    {
        exec('rm -rf /pineapple/modules/ProxyHelper/backups/'.$this->request->file);
        $this->response = array('deleteBackup()' => $this->request->file);
    }

    // Create status file that we can check if the user navigates away from the page
    private function setRunningStatus()
    {
        $arr = array('running' => $this->request->running,
                     'proxyIP' => $this->request->proxyIP,
                     'proxyPort' => $this->request->proxyPort);

        $json = json_encode($arr);
        $myfile = fopen($this->statusFile, "w");
        fwrite($myfile, $json);
        fclose($myfile);

        $this->response = array('success' => true,
                                'call' => 'setRunningStatus()',
                                'json' => $json);
    }

    private function getRunningStatus()
    {
        $running = false;
        $proxyIP = '';
        $proxyPort = '';

        if (file_exists($this->statusFile)) {
            $txt = file_get_contents($this->statusFile);
            $json = json_decode($txt);
            $running = $json->running;
            $proxyIP = $json->proxyIP;
            $proxyPort = $json->proxyPort;
        }

        $this->response = array('success' => true,
                                'call' => 'getRunningStatus()',
                                'running' => $running,
                                'proxyIP' => $proxyIP,
                                'proxyPort' => $proxyPort);
    }
}

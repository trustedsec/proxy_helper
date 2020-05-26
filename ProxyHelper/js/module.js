
registerController('ProxyHelperAboutController', ['$api', '$scope', '$rootScope', function($api, $scope, $rootScope) {

  $scope.title = "Loading...";
  $scope.version = "Loading...";

  $scope.aboutInfo = (function() {
      $api.request({
          module: 'ProxyHelper',
          action: 'aboutInfo'
      }, function(response) {
          $scope.title = response.title;
          $scope.version = response.version;
          console.log(response);
      });
  });

  $scope.aboutInfo();

}]);

registerController('ProxyHelperControlsController', ['$api', '$scope', '$rootScope', function($api, $scope, $rootScope) {
    /* It is good practice to 'initialize' your statusLabelvariables with nothing */
    $scope.statusLabel = 'danger';
    $scope.status = 'Stopped';
    $scope.toggleSuccess = false;
    $scope.toggleFailure = false;
    $scope.error = '';
    // if the proxy is running use this to disable input
    $scope.disabled = false;

    $rootScope.status = {
  		getBackups: false,
      running: false,
      proxySettingsDirty: false
  	};
    $rootScope.proxyPort = '';
    $rootScope.proxyIP = '';

    $scope.getRunningStatus = (function(status) {
        $api.request({
            module: 'ProxyHelper',
            action: 'getRunningStatus'
        }, function(response) {
            console.log(response);
            $rootScope.status.running = response.running;
            $rootScope.proxyIP = response.proxyIP;
            $rootScope.proxyPort = response.proxyPort;
            $rootScope.status.proxySettingsDirty = true;
            if(response.running) {
              $scope.status = 'Started';
              $scope.statusLabel = 'success';
              $scope.toggleSuccess = false;
              $scope.toggleFailure = false;
            } else {
              $scope.statusLabel = 'danger';
              $scope.status = 'Stopped';
              $scope.toggleSuccess = false;
              $scope.toggleFailure = false;
              $scope.error = '';
            }

        });
    });

    // Run this each time we load the page to refresh the page status
    $scope.getRunningStatus();

    // bAutoBackup determines if the backup was auto or manual generated
    // The goal is to hide the auto backup from the user so they do not accidentally remove it
    $scope.backupRules = (function(bAutoBackup) {
        $api.request({
            module: 'ProxyHelper',
            action: 'backupRules',
            bAutoBackup: bAutoBackup
        }, function(response) {
            $rootScope.status.getBackups = true;
            console.log(response);
        });
    });

    $scope.setRunningStatus = (function(running) {
      $rootScope.status.running = running;
      $api.request({
          module: 'ProxyHelper',
          action: 'setRunningStatus',
          running: running,
          proxyIP: $rootScope.proxyIP,
          proxyPort: $rootScope.proxyPort
      }, function(response) {
          console.log(response);
      });
    });



    $scope.enableProxy = (function() {
      $scope.error = '';
      $scope.toggleFailure = false;
      $api.request({
          module: 'ProxyHelper',
          action: 'backupRules',
          bAutoBackup: true
      }, function(response) {
          console.log(response);
      })
      .then(function(response){
        return $api.request({
            module: 'ProxyHelper',
            action: 'clearRules'
        }, function(response) {
            console.log(response);
        })
      })
      .then(function(response){
        return $api.request({
            module: 'ProxyHelper',
            action: 'createProxyRules',
            dIP: $rootScope.proxyIP,
            dPort: $rootScope.proxyPort
        }, function(response) {
            console.log(response);
            if(response.success){
              $scope.setRunningStatus(true);
              console.log('Started proxy on IP: ' + $rootScope.proxyIP + ' and port: ' + $rootScope.proxyPort);
              $scope.status = 'Started';
              $scope.statusLabel = 'success';
              $scope.toggleSuccess = true;
              $scope.toggleFailure = false;
            } else {
              //$scope.setRunningStatus(false);
              $scope.error = response.error;
              console.log('Failed to start proxy');
              $scope.status = 'Stopped';
              $scope.statusLabel = 'danger';
              $scope.toggleSuccess = false;
              $scope.toggleFailure = true;
            }
        })
      });


    });

    $scope.disableProxy = (function() {
        $api.request({
            module: 'ProxyHelper',
            action: 'clearRules'
        }, function(response) {
            console.log(response);
        })
        .then(function(response){
          $scope.setRunningStatus(false);
          console.log('Stopped proxy');
          $scope.status = 'Stopped';
          $scope.statusLabel = 'danger';
          $scope.toggleSuccess = false;
          $scope.toggleFailure = false;
        })
        .then(function(response){
          return $api.request({
            module: 'ProxyHelper',
            action: 'restoreBackup',
            file: 'iptables_tmp'
          }, function(response) {
            console.log(response);
          })
        });
    });

    // Handle the proxy start/stop button
    $scope.toggleProxy = (function() {
      if($scope.status == 'Stopped') { // Starting the proxy
        $scope.enableProxy();
      }
      else { // Stopping the proxy
        $scope.disableProxy();
      }
    });

    $rootScope.$watch('status.running', function(newValue, oldValue) {
      //console.log('Watch Fired');
      $scope.disabled = newValue;
      console.log('Updating controls controller disabled flag');
    });

}]);


registerController('ProxyHelperBackupController', ['$api', '$scope', '$rootScope', function($api, $scope, $rootScope) {

    $scope.removedBackup = false;
    $scope.backupName = 'Loading...';
    $scope.backupContents = 'Loading...';

    // if the proxy is running use this to disable input
    $scope.disabled = false;

    $scope.backups = [];

    $scope.viewBackup = (function(param) {
        $api.request({
            module: 'ProxyHelper',
            action: 'viewBackup',
            file: param
        }, function(response) {
            $scope.backupContents = response.output;
            $scope.backupName = response.file;
            console.log(response);
        });
    });

    $scope.restoreBackup = (function(param) {
        $api.request({
            module: 'ProxyHelper',
            action: 'restoreBackup',
            file: param
        }, function(response) {
            console.log(response);
            if(response.success) {
              $scope.restoreMessage = 'Backup restored!';
            } else {
              $scope.restoreMessage = 'Failed to restore backup!';
            }
        });
    });

    $scope.getBackups = (function() {
        $api.request({
            module: 'ProxyHelper',
            action: 'getBackups'
        }, function(response) {
            $scope.backups = response.backups;
            console.log(response);
        });
    });

    $scope.deleteBackup = (function(param) {
  		$api.request({
  			module: 'ProxyHelper',
  			action: 'deleteBackup',
  			file: param
  		}, function(response) {
  			$scope.getBackups();
        console.log(response);
  		})
  	});

    $scope.getBackups();

    $rootScope.$watch('status.getBackups', function(newValue, oldValue) {
      //console.log('Watch Fired');
  		if (newValue) {
  			$scope.getBackups();
        $rootScope.status.getBackups = false;
        console.log('backups refreshed');
        //console.log('newValue: ', newValue, 'oldValue: ', oldValue);
  		}
  	});

    $rootScope.$watch('status.running', function(newValue, oldValue) {
      //console.log('Watch Fired');
      $scope.disabled = newValue;
      console.log('Updating backup controller disabled flag');
    });

}]);

registerController('ProxyHelperSettingsController', ['$api', '$scope', '$rootScope', function($api, $scope, $rootScope) {

  $scope.proxyPort = $rootScope.proxyPort;
  $scope.proxyIP = $rootScope.proxyIP;
  // if the proxy is running use this to disable input
  $scope.disabled = false;

  //$rootScope.proxyPort = '';
  //$rootScope.proxyIP = '';

  $scope.updatePort = (function() {
    $rootScope.proxyPort = $scope.proxyPort;
		//console.log('updatePort called: ' + $scope.proxyPort);
	});

  $scope.updateIP = (function() {
    $rootScope.proxyIP = $scope.proxyIP;
		//console.log('updateIP called: ' + $scope.proxyIP);
	});

  $scope.saveSettings = (function() {
    console.log('Clicked Save');
	});

  $rootScope.$watch('status.proxySettingsDirty', function(newValue, oldValue) {
    //console.log('Watch Fired');
    if (newValue) {
      $scope.proxyIP = $rootScope.proxyIP;
      $scope.proxyPort = $rootScope.proxyPort;
      console.log('refreshed proxy settings');
      //console.log('newValue: ', newValue, 'oldValue: ', oldValue);
    }
  });

  $rootScope.$watch('status.running', function(newValue, oldValue) {
    //console.log('Watch Fired');
    $scope.disabled = newValue;
    console.log('Updating settings controller disabled flag');
  });

}]);

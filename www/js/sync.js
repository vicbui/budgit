var SYNCDATA = {
	url: 'http://localhost:3000/sync',//TODO Set your server URL
    database: null,
    tableToSync: [{
        tableName: 'cat',
        idName: 'shared_id'
    }],
    sync_info: {//Example of user info
        username: 'vicbui',//the user mail is not always here
        email: 'quangvu88@hotmail.com',
        password: "Viclihai1521",
     	serverid: "",
     	lastSyncDate: 0
       /* device_uuid: 'UNIQUE_DEVICE_ID_287CHBE873JB',//if no user mail, rely on the UUID
        
		device_version: '5.1',
        device_name: 'test navigator',
		userAgent: navigator.userAgent,
        //app data
        appName: 'fr-en',
        mosa_version: '3.2',
        lng: 'fr'*/
    },
    initDb: function(callback){
    	var self=this;
    	self.database = openDB();
    	self.database.transaction(function(transaction){
        	 transaction.executeSql('Select serverid FROM device',[],function (transaction, results){
           		if (results.rows.length>0)
  				{
  					SYNCDATA.sync_info.serverid=results.rows.item(0).serverid	
  				}    
  			callback();
           },errorDB);
        })
    },
    initSync: function(callback){
    	var self=this;
    	self.initDb(function(){
			 DBSYNC.initSync(self.tableToSync, self.database, self.sync_info, self.url,function(){
			 	console.log("startSync");
			 DBSYNC.syncNow(self._syncProgress, function(syncResult){
                    if ((typeof syncResult.serverid==="undefiend" )==false)
                        self.sync_info.serverid=syncResult.serverid;
                    	callback();
                    });
    		});
		})
    },
    synServer: function(callback){
    	var self=this;
    	DBSYNC.syncNow(self._syncProgress, function(syncResult){
                    	callback();
                    });
    }, 
    _syncProgress: function(percent, msgKey, message){
		console.log(message+' ('+percent+'%)');
       
    }


}
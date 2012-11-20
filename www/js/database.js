
function openDB(){
	//alert("opendb");
	return window.openDatabase('budgitDB','1.0','budgit dabase',1000000);
}
function populateDB(tx){
	 tx.executeSql('DROP TABLE IF EXISTS USER');
	 tx.executeSql('DROP TABLE IF EXISTS CAT');
	 tx.executeSql('DROP TABLE IF EXISTS TRANS');
	 //tx.executeSql('DROP TABLE IF EXISTS TRANS_META');
	 tx.executeSql('DROP TABLE IF EXISTS TRANS_RECURRING');
	 tx.executeSql('DROP TABLE IF EXISTS BUDGET');

	 tx.executeSql('DROP TABLE IF EXISTS new_elem');
     tx.executeSql('DROP TABLE IF EXISTS sync_info');
     tx.executeSql('DROP TABLE IF EXISTS device');

	 
	//alert("populate");
     tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id INTEGER PRIMARY KEY AUTOINCREMENT, username, email, password,created_at DATETIME,updated_at DATETIME)');
 	 tx.executeSql('CREATE TABLE IF NOT EXISTS CAT (id INTEGER PRIMARY KEY AUTOINCREMENT, name, shared_id TEXT, created_at DATETIME,updated_at DATETIME, UNIQUE(name) ON CONFLICT IGNORE)');
 	 tx.executeSql('CREATE TABLE IF NOT EXISTS TRANS (id INTEGER PRIMARY KEY AUTOINCREMENT, amount,optional,created_at DATETIME,updated_at DATETIME,catid)');
 	 tx.executeSql('CREATE TABLE IF NOT EXISTS TRANS_RECURRING (id INTEGER PRIMARY KEY AUTOINCREMENT, type INTEGER, day INTEGER , month INTEGER ,year INTEGER ,start_date DATETIME,end_date DATETIME,trans_id INTEGER)');
 	 tx.executeSql('CREATE TABLE IF NOT EXISTS BUDGET (id INTEGER PRIMARY KEY AUTOINCREMENT, budget_limit, balance, created_at DATETIME,updated_at DATETIME,catid)');
 	 tx.executeSql('CREATE TABLE IF NOT EXISTS device (serverid TEXT)');

//monthly_limit,balance,
//select * from TRANS where updated_at IN (select DISTINCT(updated_at) from TRANS ORDER BY updated_at DESC LIMIT 2*(3-1),2) ORDER BY updated_at DESC

     
//food","groceries","entertainment","clothes","rent","phonebill"

 popluateTrans(tx);
 //alert(covertToUnixTime("2011-03-03"));
}

function popluateTrans(tx)
{

tx.executeSql('INSERT INTO USER (id, username, email, password,created_at,updated_at) VALUES (1, "VicBui","quangvu88@hotmail.com","Viclihai1521","2012-10-17 06:00:00","2012-10-17 06:00:00")');  	
tx.executeSql('INSERT INTO CAT (id, name,shared_id, created_at,updated_at) VALUES (1,"clothes","1","2012-10-17 06:00:00","2012-10-17 06:00:00")');
tx.executeSql('INSERT INTO CAT (id, name,shared_id, created_at,updated_at) VALUES (2,"entertainment","2","2012-10-17 06:00:00","2012-10-17 06:00:00")');
tx.executeSql('INSERT INTO CAT (id, name,shared_id, created_at,updated_at) VALUES (3,"food","3","2012-10-17 06:00:00","2012-10-17 06:00:00")');
tx.executeSql('INSERT INTO CAT (id, name,shared_id, created_at,updated_at) VALUES (4,"groceries","4","2012-10-17 06:00:00","2012-10-17 06:00:00")');
tx.executeSql('INSERT INTO CAT (id, name,shared_id, created_at,updated_at) VALUES (5,"phonebill","5","2012-10-17 06:00:00","2012-10-17 06:00:00")');
tx.executeSql('INSERT INTO device (serverid) VALUES ("")');  	


 tx.executeSql('INSERT INTO BUDGET (id,budget_limit, balance, created_at,updated_at,catid) VALUES (1,200.0,200.0,"2012-10-17 06:00:00","2012-10-17 06:00:00",0)');
 tx.executeSql('INSERT INTO BUDGET (id,budget_limit, balance, created_at,updated_at,catid) VALUES (2,50.0,50.0,"2012-09-17 06:00:00","2012-09-17 06:00:00",0)');
 tx.executeSql('INSERT INTO BUDGET (id,budget_limit, balance, created_at,updated_at,catid) VALUES (3,50.0,50.0,"2012-08-17 06:00:00","2012-08-17 06:00:00",0)');
 tx.executeSql('INSERT INTO BUDGET (id,budget_limit, balance, created_at,updated_at,catid) VALUES (4,200.0,200.0,"2012-10-17 06:00:00","2012-10-17 06:00:00",1)');
 tx.executeSql('INSERT INTO BUDGET (id,budget_limit, balance, created_at,updated_at,catid) VALUES (5,200.0,200.0,"2012-10-16 06:00:00","2012-10-16 06:00:00",1)');
 tx.executeSql('INSERT INTO BUDGET (id,budget_limit, balance, created_at,updated_at,catid) VALUES (6,200.0,200.0,"2012-10-15 06:00:00","2012-10-15 06:00:00",1)');
 
 tx.executeSql('INSERT INTO BUDGET (id,budget_limit, balance, created_at,updated_at,catid) VALUES (7,200.0,200.0,"2012-10-17 06:00:00","2012-10-17 06:00:00",2)');
 tx.executeSql('INSERT INTO BUDGET (id,budget_limit, balance, created_at,updated_at,catid) VALUES (8,100.0,100.0,"2012-10-17 06:00:00","2012-10-17 06:00:00",3)');
 tx.executeSql('INSERT INTO BUDGET (id,budget_limit, balance, created_at,updated_at,catid) VALUES (9,28.0,28.0,"2012-10-17 06:00:00","2012-10-17 06:00:00",4)');
 tx.executeSql('INSERT INTO BUDGET (id,budget_limit, balance, created_at,updated_at,catid) VALUES (10,500.0,500.0,"2012-10-17 06:00:00","2012-10-17 06:00:00",5)');


	//alert("tet");
	var data= new Object(); 
	data['amount']=-21.0;
	data['opt']="";
	data['recurring']=4;
	data['createdDate']="2011-11-03 04:30:00";
	data['timestart']=data['createdDate'];
	insertTrans(tx,0,data);

	data['amount']=-21.0;
	data['opt']="";
	data['recurring']=1;
	data['createdDate']="2012-10-25 13:30:00";
	data['timestart']=data['createdDate'];

	insertTrans(tx,0,data);


	data['amount']=-24.0;
	data['opt']="";
	data['recurring']=0;
	data['createdDate']="2012-10-28 06:09:00";
	data['timestart']=data['createdDate'];

	insertTrans(tx,0,data);



	data['amount']=-23.0;
	data['opt']="";
	data['recurring']=2;
	data['createdDate']="2012-10-20 12:03:00";
	data['timestart']=data['createdDate'];

	insertTrans(tx,0,data);

	data['amount']=-1.0;
	data['opt']="";
	data['recurring']=0;
	data['createdDate']="2012-10-29 06:00:00";
	data['timestart']=data['createdDate'];

	insertTrans(tx,0,data);

	data['amount']=-20.0;
	data['opt']="";
	data['recurring']=0;
	data['createdDate']="2012-10-30 06:00:00";
	data['timestart']=data['createdDate'];

	insertTrans(tx,0,data);

	data['amount']=-20.0;
	data['opt']="";
	data['recurring']=0;
	data['createdDate']="2012-10-31 06:00:00";
	data['timestart']=data['createdDate'];

	insertTrans(tx,0,data);

	data['amount']=-20.0;
	data['opt']="";
	data['recurring']=0;
	data['createdDate']="2012-11-01 06:00:00";
	data['timestart']=data['createdDate'];

	insertTrans(tx,0,data);

	data['amount']=-22.0;
	data['opt']="";
	data['recurring']=1;
	data['createdDate']="2012-10-26 06:45:00";
	data['timestart']=data['createdDate'];

	insertTrans(tx,0,data);

	data['amount']=-50.0;
	data['opt']="";
	data['recurring']=3;
	data['createdDate']="2012-10-03 06:00:00";
	data['timestart']=data['createdDate'];

	insertTrans(tx,0,data);

	data['amount']=-30.0;
	data['opt']="";
	data['recurring']=2;
	data['createdDate']="2012-11-03 06:00:00";
	data['timestart']=data['createdDate'];

	insertTrans(tx,0,data);

	data['amount']=-15.0;
	data['opt']="";
	data['recurring']=1;
	data['createdDate']="2012-11-02 06:00:00";
	data['timestart']=data['createdDate'];

	insertTrans(tx,1,data);

	data['amount']=-25.0;
	data['opt']="";
	data['recurring']=0;
	data['createdDate']="2012-11-01 06:00:00";
	data['timestart']=data['createdDate'];

	insertTrans(tx,1,data);

	data['amount']=-34.0;
	data['opt']="";
	data['recurring']=0;
	data['createdDate']="2012-11-03 07:00:00";
	data['timestart']=data['createdDate'];

	insertTrans(tx,2,data);

	data['amount']=-50.0;
	data['opt']="Eat with friends";
	data['recurring']=3;
	data['createdDate']="2012-11-01 07:00:00";
	data['timestart']=data['createdDate'];

	insertTrans(tx,2,data);


}
function errorDB(err)
{
  console.log("Error processing SQL: "+err.code+" "+err.message);
}
function successDB() {
  console.log("success!");
}



function update_cat_by_id(tx,catid,catname)
{
	//alert(catid+" "+catname);
	catid=parseInt(catid);
	//alert(catid);
	tx.executeSql("UPDATE CAT SET name = ? WHERE (id = ?) ", [catname,catid],successDB);

//	tx.executeSql('UPDATE TRANS SET ="test" WHERE id=1' ,[],errorDB,function(){ alert("success")});

}

function get_all_cats(tx,cat)
{

	cat.results=new Array();
	tx.executeSql('SELECT * FROM CAT ORDER BY updated_at DESC,name ASC LIMIT 20', [],function (tx, results) {
				 // alert("test");
		  var len = results.rows.length, i;
				  
			for (i = 0; i < len; i++) {
		   // cats.push(results.rows.item(i).name);

		  	cat.results.push(results.rows.item(i));
			//alert(cat.results[0]);
		  }
		}, errorDB);

}

function getCats(tx,cat)
{

	cat.results=new Array();
	tx.executeSql('SELECT name FROM CAT ORDER BY updated_at DESC,name ASC LIMIT 20', [],function (tx, results) {
				 // alert("test");
		  var len = results.rows.length, i;
				  
			for (i = 0; i < len; i++) {
		   // cats.push(results.rows.item(i).name);

		  	cat.results.push(results.rows.item(i).name);
			//alert(cat.results[0]);
		  }
		}, errorDB);

}

function searchCatsByName(tx,find_string,search_results)
{
		//alert("test");
		find_string="%"+find_string+"%";
		tx.executeSql("SELECT * FROM CAT WHERE name like ? ORDER BY updated_at DESC,name ASC LIMIT 20", [find_string],function (tx, results) {
		  var len = results.rows.length, i;
		  for (i = 0; i < len; i++) {
		    //console.log(results.rows.item(i).name);    
		    //alert(results.rows.item(i).name);
		 	  // alert(search_results.result+" ");
  		     //alert(search_results.result);

		     search_results.result.push(results.rows.item(i).name);
		  }
	//	  callback(search_results);
		}, errorDB);
}

function listTrans(tx,startTime,endTime,callback)
{
	//var startTime="2012-11-02", endTime="2012-11-03";
	//alert(startTime);
	var startArr=startTime.split("-");
	var endArr=endTime.split("-");
	var startDate= new Date(parseInt(startArr[0]),(parseInt(startArr[1])-1),parseInt(startArr[2]));
	var endDate= new Date(parseInt(endArr[0]),(parseInt(endArr[1])-1),parseInt(endArr[2]));
	var currentTime,day,month,sql;
	var trans=new Array();


	tx.transaction(function(tx){

			for (var d = endDate; d >= startDate; d.setDate(d.getDate()-1)) {
    			//alert(d);
    				var currentTime = convertDatetimeToString(d);
    			//	alert(;  ORDER BY time(strftime('%H:%M:%S',trans.updated_at)) DESC
    				//console.log(currentTime+" date");
    				//alert(currentTime);
    			 	var day=currentTime.split("-")[2]+"";
    			 	var month=currentTime.split("-")[1];
    				sql="SELECT transa.* FROM (SELECT trans.*,recurring.*,cat.name,cat.id as catid, cat.updated_at as cat_update_at, strftime('%s',?) as current_date, strftime('%s',(date(recurring.start_date))) as start_unix from TRANS "+
					"JOIN CAT on CAT.id= trans.catid "+
					"JOIN TRANS_RECURRING recurring on trans.id= recurring.trans_id ORDER BY time(trans.updated_at) DESC) as transa "+
					"WHERE ( ((transa.start_date='*') or (date(transa.start_date) <= ?))  AND ((transa.end_date='*') or (date(transa.end_date) >= ?))   ) " + 
					"AND ( "+
					"(transa.current_date - transa.start_unix = 0)"+
					"OR (((transa.current_date- transa.start_unix) % transa.day = 0) AND (transa.month = '') AND  (transa.year = ''))  "+
					"OR ((transa.day = ?) AND (transa.month = '*') AND  (transa.year ='*')) "+
					"OR ((transa.day = ?) AND (transa.month = ?) AND  (transa.year ='*')) "+
					")";
			
				
				tx.executeSql(sql, [currentTime,currentTime,currentTime,day,day,month],function (tx, results) {
		 		var len = results.rows.length, i;
					  for (i = 0; i < len; i++) {
					  	
					  	trans.push(results.rows.item(i));
					  	//alert(results.rows.item(i).current_date);
						//console.log(convertUnixToString(parseInt(results.rows.item(i).current_date)));				 
					 //   console.log(results.rows.item(i).start_unix+" "+results.rows.item(i).amount+" "+results.rows.item(i).catid+" "+results.rows.item(i).end_date+" "+results.rows.item(i).current_date);    
					    
					  }

				})
    		}
    	},errorDB,function(){
    		//alert(trans.length);
    		//if (callback != "")
			callback(trans);
			//return trans;
			//cats.result=trans;
			//alert(cats.result.length);
    	})

	

}


function insertTrans(tx,catid,data)
{

	var amount=data['amount'],optional=data['opt'],catid;
	var created_at=data['createdDate'];
	var recurring=data['recurring'];
	var rec_timestamp=1;
	var updated_at=created_at;
	var date_part=updated_at.split(" ")[0];
	var time_part=updated_at.split(" ")[1];

	var day_part=date_part.split("-")[2]+"";
	var month_part=date_part.split("-")[1]+"";
	var year_part=date_part.split("-")[0]+"";

	var timeStart=data['createdDate'];

	if (typeof timeStart === "undefined")
		timeStart="*"

	var timeEnd=data['timeend'];
	if (typeof timeEnd === "undefined")
		timeEnd="*"
//recurring= ['Never','Daily','Weekly','Bi-weekly', 'Monthly', 'Yearly','Weekdays','Weekends'];
	//var recurring= ['Never','Daily','Weekly', 'Monthly', 'Yearly'];

	tx.executeSql('INSERT INTO TRANS (amount,optional,catid,created_at,updated_at) VALUES (?,?,?,?,?)'
		,[amount,optional,catid,created_at,updated_at],function(tx){


			tx.executeSql('SELECT * FROM TRANS where (amount=?) AND (catid=?) AND (created_at=?) AND (updated_at=?)',
				[amount,catid,created_at,updated_at],function(tx, results){

				var trans_id=parseInt(results.rows.item(0).id);
				//strftime('%s','now')
				//alert(trans_id);
								if (recurring==0)
								{
									day="";
									month="";
									year="";
								}
								if (recurring==1)
								{
									//rec_timestamp=60*60*24;
									day=60*60*24;
									month="";
									year="";
								}
								if (recurring==2)
								{
									day=60*60*24*7;
									month="";
									year="";
							
								}
								if (recurring==3)
								{
									day=day_part;
									month="*";
									year="*";
								}
								if (recurring==4)
								{
									day=day_part;
									month=month_part;
									year="*";
								}

							tx.executeSql('INSERT INTO TRANS_RECURRING (type,day,month,year,start_date,end_date,trans_id) VALUES (?,?,?,?,?,?,?)',
				[recurring,day,month,year,timeStart,timeEnd,trans_id],successDB,errorDB);


						})	



				});


    
}

get_latest_id = function(tx,data,callback)
{
	tx.executeSql('select count(*) as id from CAT',[],function(tx, results){
		var shared_id=(parseInt(results.rows.item(0).id)+1)+"";
		if (SYNCDATA.sync_info.serverid!="")
		shared_id=(parseInt(results.rows.item(0).id)+1)+"_"+SYNCDATA.sync_info.serverid;
		//alert(shared_id);
		callback(tx,data,shared_id);
	})
}

function insertNewCat(tx,data)
{

	get_latest_id(tx,data,function(tx,data,shared_id){
		
		//alert(data['cat']+" "+data['createdDate']+shared_id);
		tx.executeSql('INSERT INTO CAT (name,shared_id,created_at,updated_at) VALUES (?,?,?,?)', [data['cat'],shared_id,data['createdDate'],data['createdDate']], 
	 	function(tx,result){
	 	//	alert("find");
		 	catFindIdName(tx,data);
	 	}, errorDB);
	})

	
}
function catFindIdName(tx,data)
{
	//alert(data['cat']);
	tx.executeSql('SELECT * FROM CAT WHERE name=?', [data['cat']],function (tx, results) {
		  var len = results.rows.length, i;
		    	
		    if (len==0){

		  		catid = -1;
		  		//alert("enter");
		  		//alert(catid);
		  		insertNewCat(tx,data);
		  }
			else
			{

				catid=results.rows.item(0).id;
				alert(catid);
				var amount=parseFloat(results.rows.item(0).balance);
				//alert(amount);
			//	alert(len);
				insertTrans(tx,catid,data);
				//alert(catid);
				//updateTimeStamp(tx,"CAT",catid);
					
				//alert(amount+data['amount']);
				
			//	updateBalance(tx,"CAT",catid,"balance",amount+data['amount']);
			//	insertTrans(tx,catid,data)
			//	alert(catid);
			}
		  });

}
function updateTimeStamp(tx,tableName,id)
{
	//alert("test");
	//alert(id+" "+timeNow());
	//var query="";
	//alert(query);
	tx.executeSql('UPDATE '+ tableName +' SET updated_at=? WHERE id=?' ,[timeNow(),id]);

}
function updateBalance(tx,tableName,id,column,amount)
{
		//var query="'";

	tx.executeSql('UPDATE '+ tableName+' SET '+column+'=? WHERE id=?' ,[amount,id]);

}

/************************************************************/
function getNoTransactionCat(tx,trans,cats)
{
	//cats.results=new Array();
	tx.executeSql('SELECT * from CAT ',[],function (tx, results) {
			
		  var len = results.rows.length, i; 
				//alert(len);
				for (i = 0; i < len; i++) {
						var test=false;
						for (var j=0;j<trans.length;j++)
						{
							if (trans[j].catid == results.rows.item(i).id)
							{
								test=true;
								break;
							}
						}
						if (test==false)
						{
							//alert(test);

							var obj=new Object();

							obj.name=results.rows.item(i).name;
							obj.totalSpend=0;
							cats.results.push(obj);
							//alert(cats.results[cats.results.length-1].name);
							get_budget_by_cat_id(tx,results.rows.item(i).id,cats.results[cats.results.length-1]);	
						}
						
				}
	})
}

function get_budget_by_cat_id(tx,catid,cats)
{
	//alerT("test");
	//alert(cats.totalSpend+" totalspend");
	
	tx.executeSql("select a.* from BUDGET a WHERE (a.created_at=(select max(b.created_at) from BUDGET b where b.catid=a.catid)) AND (a.catid=?)" , [catid],function (tx, resultss) {
		///alert(catid);		
			if (resultss.rows.length>0)
			{
				cats.budget= new Object();
				cats.budget=resultss.rows.item(0);
				//alert(cats.budget.budget_limit+" inside lengt");
			}
			else
				cats.budget=-1;
			
			//alert(cats.budget.budget_limit+" outside limit" +catid+resultss.rows.length);

	});
}

/*******************************************************/

function getTotalBalance(tx,trans,cats)
{
	//alert("test");
	var arr= new Array(),count=0;
	for (var i=0;i<trans.length;i++)
	{
	//	count++;
		if (typeof arr[trans[i].catid] === "undefined")
		{
			arr[trans[i].catid] = new Object();
			arr[trans[i].catid].amount=0;
			arr[trans[i].catid].name="";
		}
		//alert();
		arr[trans[i].catid].amount=arr[trans[i].catid].amount+Math.abs(trans[i].amount);
		arr[trans[i].catid].name = trans[i].name;
		//alert(arr[trans[i].catid].amount);
	}

	for (var catid in arr)
	{	

		var obj=new Object();
		//cats[count]=new Object();
		obj.name=arr[catid].name;
		//alert(arr[catid].amount);
		obj.totalSpend = arr[catid].amount;
		cats.results.push(obj);
		//alert(cats.results[0]);
		get_budget_by_cat_id(tx,parseInt(catid),cats.results[count]);
		count++;		
		//alert(catid+" "+cats[count].totalSpend);
	}
	//alert(count);
	//listTrans(tx,"2012-05-05","2012-05-05",_getTotalBalance)
	//c.name,a.balance,a.budget_limit from BUDGET a INNER JOIN CAT c on a.catid=c.id WHERE a.created_at=(select max(b.created_at) from BUDGET b where b.catid=a.catid)  GROUP BY a.catid"
				

	/*tx.executeSql("select SUM(ABS(t.amount)) as totalspend, c.name,c.id as catid from TRANS t INNER JOIN CAT c ON t.catid=c.id  group by t.catid ORDER BY max(t.updated_at) DESC" , [],function (tx, results) {
	
		  var len = results.rows.length, i;
		  var totalLeft=0;
		  var totalMonthly_limit=0;
		  
				for (i = 0; i < len; i++) {
						cats[i]=new Object();
						cats[i].name=results.rows.item(i).name;
						cats[i].totalSpend=results.rows.item(i).totalspend;
						get_budget_by_cat_id(tx,results.rows.item(i).catid,cats[i]);
				}
		
		


		});*/
		
}

function get_cat_balance_by_name(tx,name,value)
{
	//	alert(name);

	tx.executeSql("select c.name,a.balance,a.budget_limit from BUDGET a INNER JOIN CAT c on a.catid=c.id WHERE (c.name=?) AND (a.created_at=(select max(b.created_at) from BUDGET b where b.catid=a.catid))  GROUP BY a.catid", [name],function (tx, results) {
		  var len = results.rows.length, i;
		  var totalLeft=0;
		  var totalMonthly_limit=0;
		 
		     totalLeft+=results.rows.item(0).balance;
		     totalMonthly_limit+=results.rows.item(0).budget_limit;
		 
		  //alert(totalLeft+" totalLeft");


		  value.left=totalLeft;


		  value.spent=totalMonthly_limit-totalLeft;

		  //alert(value.left+" "+value.spent);
		  //alert(value.spent+" "+value.left);
		  //objectL.text(totalLeft+"");
		  //objectS.text((totalMonthly_limit-totalLeft)+"");
	//	  callback(search_results);
		});
}




/***********************************************************/


function get_trans_last_7_days_by_cat_name(tx,name,transactions)
{
			 		//alert(transactions.test);

	tx.executeSql("SELECT * FROM CAT WHERE name=?", [name],function (tx, results) {
			var id = results.rows.item(0).id;
			//id=1;
		 		//alert(id);AND 
		 		
		 		tx.executeSql("SELECT * FROM TRANS WHERE (catid=?) AND (updated_at > (SELECT DATETIME('now', '-7 day')))  ORDER BY updated_at ASC",[id],function (tx,results){
		 			  var len = results.rows.length, i;
					 // alert(len);
					  for (i = 0; i < len; i++) {
					    	transactions.data.push(results.rows.item(i));
					    	//console.log(transactions.data[i].created_at);
					    	// alert(transactions.data[i].amount);
					   // alert
					  }
					  
		 		});
		});
}



/***********************************************************/


function get_trans_perc_by_cat_name_month(tx,name,month,transactions)
{
			 		//alert(transactions.test);
			 //		alert(name);
	var year = new Date().getFullYear()+"";
	var totalcat=0,totalothers=0;
	var id;
	tx.executeSql("SELECT * FROM CAT WHERE name=?", [name],function (tx, results) {
			id = results.rows.item(0).id;
			//id=1;
		 		
		 		tx.executeSql("SELECT * FROM TRANS WHERE (strftime('%m', date(updated_at))=?) AND (strftime('%Y', date(updated_at))=?) ORDER BY updated_at ASC",[month,year],function (tx,results){
		 	 		//alert(name); 
	  			    var len = results.rows.length, i;
					 // alert(len);
					  for (i = 0; i < len; i++) {
					  //	alert(results.rows.item(i).catid + " "+id);
					    	(results.rows.item(i).catid == id) ? totalcat+=results.rows.item(i).amount : totalothers+=results.rows.item(i).amount;
					  }

					  //console.log(totalcat+" "+totalothers);
					  totalcat=Math.abs(totalcat);
					  totalothers= Math.abs(totalothers);
					  var total=totalcat+totalothers;
					  //alert(totalcat+" "+totalothers);
					  transactions.results.perccat=Math.round((totalcat/total*100));
					  transactions.results.percothers=Math.round((totalothers/total*100))
		 		});
		});
}

/********************************************************/

function get_trans_date_paging_by_cat_id_month_year(tx,id,offset,limit,month,year,transactions)
{
			 		//alert(transactions.test);

	tx.executeSql("SELECT * FROM CAT WHERE id=?", [name],function (tx, results) {
			
			var id = -1;
					if (results.rows.length>0)
					{
						id = results.rows.item(0).id;
						//alert(id+" "+offset+limit);
						tx.executeSql("select DISTINCT(date(updated_at)) as updated_at from TRANS WHERE (catid=?) AND (strftime('%m', date(updated_at))=?) AND (strftime('%Y', date(updated_at))=?)  ORDER BY updated_at DESC LIMIT ?,?",[id,offset,limit],function (tx,results){
		 			 	var len = results.rows.length, i;
						  for (i = 0; i < len; i++) {
						//		   alert("test");
						    	transactions.results.push(results.rows.item(i).updated_at);
						    	//alert(results.rows.item(i).updated_at);
						    	//console.log(transactions.data[i].created_at);
						    	// alert(transactions.data[i].amount);
						   // alert
						  }
					  
		 				});
		 			}
		 			else
		 			{
						tx.executeSql("select DISTINCT(date(updated_at)) as updated_at from TRANS AND (strftime('%m', date(updated_at))=?) AND (strftime('%Y', date(updated_at))=?) ORDER BY updated_at DESC LIMIT ?,?",[offset,limit],function (tx,results){
		 			 	var len = results.rows.length, i;
						  for (i = 0; i < len; i++) {
						    	transactions.results.push(results.rows.item(i).updated_at);
						    	//alert(results.rows.item(i).updated_at);
						    	//console.log(transactions.data[i].created_at);
						    	// alert(transactions.data[i].amount);
						   // alert(results.rows.item(i).updated_at);
						  }
					  
		 				});
		 			}
		 		
		});
}

/********************************************/

function get_trans_date_paging_by_cat_name_day_month_year(tx,name,offset,limit,day,month,year,transactions)
{
			 		//alert(transactions.test);
  	day=day+"";

	if (day.length == 1 && day!="-1")
   	{
   		day = "0" + day;
   	}

   	month=month+"";
   	year=year+"";

	tx.executeSql("SELECT * FROM CAT WHERE name=?", [name],function (tx, results) {
			
			var id = -1;

					if (results.rows.length>0)
					{
						id = results.rows.item(0).id;
						//alert(id+" "+offset+limit);
						if (day!="-1")
						{
							tx.executeSql("select DISTINCT(date(updated_at)) as updated_at from TRANS WHERE (catid=?) AND (strftime('%d', date(TRANS.updated_at))=?) AND (strftime('%m', date(TRANS.updated_at))=?) AND (strftime('%Y', date(TRANS.updated_at))=?)  ORDER BY updated_at DESC LIMIT ?,?",[id,day,month,year,offset,limit],function (tx,results){
			 			 	var len = results.rows.length, i;
							  for (i = 0; i < len; i++) {
							//		   alert("test");
							    	transactions.results.push(results.rows.item(i).updated_at);
							    	//alert(results.rows.item(i).updated_at);
							    	//console.log(transactions.data[i].created_at);
							    	// alert(transactions.data[i].amount);
							   // alert
							  }
						  
			 				});
		 				}
		 				else
		 				{

		 					tx.executeSql("select DISTINCT(date(updated_at)) as updated_at from TRANS WHERE (catid=?) AND (strftime('%m', date(TRANS.updated_at))=?) AND (strftime('%Y', date(TRANS.updated_at))=?)  ORDER BY updated_at DESC LIMIT ?,?",[id,month,year,offset,limit],function (tx,results){
			 			 	var len = results.rows.length, i;
							  for (i = 0; i < len; i++) {
							//		   alert("test");
							    	transactions.results.push(results.rows.item(i).updated_at);
							    	//alert(results.rows.item(i).updated_at);
							    	//console.log(transactions.data[i].created_at);
							    	// alert(transactions.data[i].amount);
							   // alert
							  }
						  
			 				});
		 				}
		 			}
		 			else
		 			{
		 				if (day!="-1")
						{
							tx.executeSql("select DISTINCT(date(updated_at)) as updated_at from TRANS WHERE (strftime('%d', date(TRANS.updated_at))=?) AND (strftime('%m', date(TRANS.updated_at))=?) AND (strftime('%Y', date(TRANS.updated_at))=?)  ORDER BY updated_at DESC LIMIT ?,?",[day,month,year,offset,limit],function (tx,results){
			 			 	var len = results.rows.length, i;
							  for (i = 0; i < len; i++) {
							//		   alert("test");
							    	transactions.results.push(results.rows.item(i).updated_at);
							    	//alert(results.rows.item(i).updated_at);
							    	//console.log(transactions.data[i].created_at);
							    	// alert(transactions.data[i].amount);
							   // alert
							  }
						  
			 				});
		 				}
		 				else
		 				{
		 					//alert(month+" "+year+" "+offset+" "+limit);
		 				tx.executeSql("select DISTINCT(date(updated_at)) as updated_at from TRANS WHERE (strftime('%m', date(TRANS.updated_at))=?) AND (strftime('%Y', date(TRANS.updated_at))=?) ORDER BY updated_at DESC LIMIT ?,?",[month,year,offset,limit],function (tx,results){
		 			 	var len = results.rows.length, i;
						  for (i = 0; i < len; i++) {
						    	transactions.results.push(results.rows.item(i).updated_at);
						    	//alert(results.rows.item(i).updated_at);
						    	//console.log(transactions.data[i].created_at);
						    	// alert(transactions.data[i].amount);
						   // alert(results.rows.item(i).updated_at);
						  }
					  
		 				});
		 				}
						
		 			}
		 		
		});
}
function get_trans_max_min_avg_by_cat_name_month(tx,name,month,transactions)
{
			 		//alert(transactions.test);
			 //		alert(name);
	var year = new Date().getFullYear()+"";
	var totalcat=0,totalothers=0;
	var id;
	tx.executeSql("SELECT * FROM CAT WHERE name=?", [name],function (tx, results) {
			id = results.rows.item(0).id;
			//alert(id);
		 		tx.executeSql("SELECT MAX(ABS(amount)) as maxSpend,MIN(ABS(amount)) as minSpend,AVG(ABS(amount)) as avgSpend FROM TRANS WHERE (catid=?) AND (strftime('%m', date(updated_at))=?) AND (strftime('%Y', date(updated_at))=?)",[id,month,year],function (tx,results){
		 	 		 // alert("test");
					  transactions.results.maxSpend=Math.round(results.rows.item(0).maxSpend);
					  transactions.results.minSpend=Math.round(results.rows.item(0).minSpend);
					  transactions.results.avgSpend=Math.round(results.rows.item(0).avgSpend);
					 // alert(transactions.results.maxSpend);
					 // alert(transactions.results.maxSpend);
		 		});
		});
}


/**************************************/

function get_trans_date_by_cat_name_date(tx,name,date,idName,contextObject,callback)
									{
										var alltrans = new Object();
										alltrans.results= new Array();
										alltrans.total=0;
									  tx.transaction(function(tx)
			   				 		  {		
			   				 		  //	alert(date);
			   				 		  //alert(transactions.test);
			   				 		  	if (name!="")
			   				 		  	{	
											tx.executeSql("SELECT * FROM CAT WHERE name like ?", [name],function (tx, results) {
													var id = results.rows.item(0).id;
														//alert(id);	
												 		tx.executeSql("SELECT TRANS.optional as optional, TRANS.amount as amount,CAT.name as name, TRANS.catid as catid,TRANS.id as id FROM TRANS INNER JOIN CAT ON TRANS.catid=CAT.id WHERE TRANS.catid=? AND date(TRANS.updated_at)= ? ", [id,date],function (tx, results) {
													
														var len = results.rows.length, i;
														var total=0;
															 // alert(len);
															  for (i = 0; i < len; i++) {
															    	var obj=new Object();
															  		obj.amount=Math.abs(results.rows.item(i).amount);
															  		obj.name=results.rows.item(i).name;
															  		obj.catid=results.rows.item(i).catid;
															  		obj.transid=results.rows.item(i).id;
															  		obj.optional=results.rows.item(i).optional;
															    	alltrans.results.push(obj);
															    	total=total+Math.abs(results.rows.item(i).amount);
															  }
															 alltrans.total=total.toFixed(2);
															 //alert(total+" "+date);
															 alltrans.divname=idName;
															 alltrans.cat=name;
															 callback(alltrans,contextObject);
													});
												});
										}
										else
										{
												tx.executeSql("SELECT TRANS.optional as optional,TRANS.amount as amount,CAT.name as name FROM TRANS INNER JOIN CAT ON TRANS.catid=CAT.id WHERE date(TRANS.updated_at)= ?", [date],function (tx, results) {		
														var len = results.rows.length, i;
														var total=0;
															 // alert(len);
															  for (i = 0; i < len; i++) {
															  		var obj=new Object();
															  		obj.amount=Math.abs(results.rows.item(i).amount);
															  		obj.name=results.rows.item(i).name;
															  		obj.catid=results.rows.item(i).catid;
															  		obj.transid=results.rows.item(i).id;
															  		obj.optional=results.rows.item(i).optional;
															  		//alert(obj.optional);
															    	alltrans.results.push(obj);
															    	total=total+Math.abs(results.rows.item(i).amount);
															  }
															 alltrans.total=total.toFixed(2);
															 alltrans.divname=idName;
															
															 callback(alltrans,contextObject);	
												});
										}
									 },errorDB);
									}


/************************/

function get_total_transactions_by_month_year_cat(tx,month,year,alltrans)
{
	//alert("abcd");
	
	month=month+"";year=year+"";
	tx.executeSql("SELECT SUM(ABS(TRANS.amount)) as amount,CAT.name as name,TRANS.catid as catid FROM TRANS INNER JOIN CAT ON TRANS.catid=CAT.id WHERE (strftime('%m', date(TRANS.updated_at))=?) AND (strftime('%Y', date(TRANS.updated_at))=?) GROUP BY TRANS.catid ", [month,year],function (tx, results) {		
		//alert("test");
		var len = results.rows.length, i;
		alltrans.results=new Object();
		//alert(len);
		if (len>0)
		{
			alltrans.results.isValid=1;
			for (i = 0; i < len; i++) {
				alltrans[i]=new Object();
				alltrans[i].amount=results.rows.item(i).amount;
				alltrans[i].catname=results.rows.item(i).name;
				alltrans[i].catid= results.rows.item(i).catid;
		
				//function get_budget_by_cat_id(tx,catid,cats)
			}
		}
		else
		{
			alltrans.results.isValid=0;
		}
		//alert(min+" "+max);
		//get_budget_by_cat_id(tx,results.rows.item(i).catid,alltrans.value);
			
	});
}


/**********************************************************/

function get_transactions_by_month_year_cat(tx,catid,month,year,alltrans)
{
	//alert("abcd");
	alltrans.results=new Object();
	if (catid==-1)
		catid = "%%";
	else 
		catid= catid+"";
	//alert(catid);
	month=month+"";year=year+"";
	tx.executeSql("SELECT SUM(ABS(TRANS.amount)) as amount,CAT.name as name,date(TRANS.updated_at) as updated_at FROM TRANS INNER JOIN CAT ON TRANS.catid=CAT.id WHERE (strftime('%m', date(TRANS.updated_at))=?) AND (strftime('%Y', date(TRANS.updated_at))=?) AND CAT.id like ? GROUP BY date(TRANS.updated_at) ORDER BY  date(TRANS.updated_at)", [month,year,catid],function (tx, results) {		
		//alert("test");
		var len = results.rows.length, i;
		//alert(len);
		if (len>0)
		{
			alltrans.results.isValid=1;
			var total=0,max=results.rows.item(0).amount,min=results.rows.item(0).amount;
			alltrans.value=new Object();
			for (i = 0; i < len; i++) {
				alltrans[i]=new Object();
				alltrans[i].amount=results.rows.item(i).amount;
				alltrans[i].updated_at=results.rows.item(i).updated_at;
			//	alert(alltrans[i].amount);
				total+=results.rows.item(i).amount;
				if (max<results.rows.item(i).amount) max=results.rows.item(i).amount;
				if (min>results.rows.item(i).amount) min=results.rows.item(i).amount;

				//function get_budget_by_cat_id(tx,catid,cats)
			}
			alltrans.value.spent=total;
			alltrans.value.min=min;
			alltrans.value.max=max;
			//alert(min+" "+max);
			//get_budget_by_cat_id(tx,results.rows.item(i).catid,alltrans.value);
		}
		else
		{
			alltrans.results.isValid=0;
		}	
	});
}
function get_budget_by_cat_id_by_month_year(tx,catid,cats,month,year,value,avg)
{
	//alerT("test");
	if (catid==-1)
		catid= "%%";
	
	tx.executeSql("select a.* from BUDGET a WHERE (a.updated_at=(select max(b.updated_at) from BUDGET b where (b.catid=a.catid) AND (strftime('%m', date(b.updated_at))=?) AND (strftime('%Y', date(b.updated_at))=?)    )) AND (a.catid like ?)" , [catid,month,year],function (tx, results) {
			
			if (results.rows.length>0)
			{
				value.budget=results.rows.item(0);
			}
			else
				value.budget=-1;
			//alert(cats.budget.budget_limit);
	});
}
function get_cat_name_by_id(tx,id,cat)
{
	//alert(data['cat']);
	cat.data=new Object();
	cat.data.name="";
	tx.executeSql('SELECT * FROM CAT WHERE id=?', [id],function (tx, results) {
		  var len = results.rows.length, i;
		   if (len>0){
		   	cat.data.name=results.rows.item(0).name;
		  }
		})
}
/*************************************/
function delete_trans_by_id(tx,id)
{
	//alert(id);
	tx.executeSql('DELETE FROM TRANS WHERE id=?', [id]);	
	
}
function delete_all_repeat_by_id(tx,transid){

	tx.executeSql('DELETE FROM TRANS_RECURRING WHERE trans_id=?', [transid]);
	tx.executeSql('DELETE FROM TRANS WHERE id=?', [transid]);
	
	
}


function delete_just_this_trans_by_id(tx,transid,deleteDate,deleteType){

	var date=deleteDate.split("-");
	var curr_day=parseInt(date[2]);
	var curr_month=date[1];
	var curr_year=date[0];
	if (curr_day.length==1)
		curr_day="0"+curr_day;
	if (curr_month.length==1)
		curr_month="0"+curr_month;



	var current_date= new Date(curr_year,curr_month-1,curr_day);
	//alert(current_date);
	current_date.setDate(current_date.getDate()-1);

	//var yesterday= current_date.

	var newDate=convertDatetimeToString(current_date);

			var sql="SELECT trans.id, trans.optional ,trans.amount ,trans.catid ,trans_recurring.type,trans_recurring.id as recid, trans_recurring.day,trans_recurring.month,trans_recurring.year,trans.updated_at,trans_recurring.start_date as start_date, trans_recurring.end_date as end_date from TRANS INNER JOIN TRANS_RECURRING ON trans.id=TRANS_RECURRING.trans_id where (trans.id=?) "+
				"AND ((date(start_date) <= ?) and ((end_date='*') or (date(end_date) >=?))) ";
				// alert(newDate);
				//alert(sql);
				tx.executeSql(sql, [transid,newDate,newDate],function (tx, results) {		
//alert("test");

					var len = results.rows.length, i;
					var data = new Array();
					var recurring=results.rows.item(0).type;
					var day=results.rows.item(0).day;
					var month=results.rows.item(0).month;
					var year=results.rows.item(0).year;
					current_date.setDate(current_date.getDate()+2);
					var timeStart=convertDatetimeToString(current_date);
					var update_time=results.rows.item(0).updated_at.split(" ")[1];
					timeStart=timeStart+" "+update_time;
				

					var timeEnd=results.rows.item(0).end_date;


					var trans_id=transid;

				//	alert(results.rows.item(0).recid);
			

				tx.executeSql('UPDATE TRANS_RECURRING SET end_date=? WHERE (trans_id=?) AND ((date(start_date) <= ?) and ((end_date="*") or (date(end_date) >=?)))', [newDate,transid,newDate,newDate]);


				if (deleteType ==0)
				{
					tx.executeSql('INSERT INTO TRANS_RECURRING (type,day,month,year,start_date,end_date,trans_id) VALUES (?,?,?,?,?,?,?)',
				[recurring,day,month,year,timeStart,timeEnd,trans_id],successDB,errorDB);

				}
				else
					if (deleteType==1)
					{

					}
					//insertTrans(tx,results.rows.item(0).catid,data);*/
				
			
		})

	
	

}

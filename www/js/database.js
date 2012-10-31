function openDB(){
	//alert("opendb");
	return window.openDatabase('budgitDB','1.0','budgit dabase',1000000);
}
function populateDB(tx){
	 tx.executeSql('DROP TABLE IF EXISTS USER');
	 tx.executeSql('DROP TABLE IF EXISTS CAT');
	 tx.executeSql('DROP TABLE IF EXISTS TRANS');
	 
	//alert("populate");
     tx.executeSql('CREATE TABLE USER (id INTEGER PRIMARY KEY AUTOINCREMENT, username, email, password,created_at DATETIME,updated_at DATETIME)');
 	 tx.executeSql('CREATE TABLE CAT (id INTEGER PRIMARY KEY AUTOINCREMENT, name, monthly_limit,balance,created_at DATETIME,updated_at DATETIME,userid)');
 	 tx.executeSql('CREATE TABLE TRANS (id INTEGER PRIMARY KEY AUTOINCREMENT, amount,optional,created_at DATETIME,updated_at DATETIME,catid)');
         


     
//food","groceries","entertainment","clothes","rent","phonebill"
 	tx.executeSql('INSERT INTO USER (id, username, email, password,created_at,updated_at) VALUES (1, "VicBui","quangvu88@hotmail.com","Viclihai1521","2012-10-17 06:00:00","2012-10-17 06:00:00")');  	
     tx.executeSql('INSERT INTO CAT (id, name, monthly_limit,balance,created_at,updated_at) VALUES (0,"clothes",200.0,200.0,"2012-10-17 06:00:00","2012-10-17 06:00:00")');
     tx.executeSql('INSERT INTO CAT (id, name, monthly_limit,balance,created_at,updated_at) VALUES (1,"entertainment",200.0,200.0,"2012-10-17 06:00:00","2012-10-17 06:00:00")');
     tx.executeSql('INSERT INTO CAT (id, name, monthly_limit,balance,created_at,updated_at) VALUES (2,"food",200.0,200.0,"2012-10-17 06:00:00","2012-10-17 06:00:00")');
  	 tx.executeSql('INSERT INTO CAT (id, name, monthly_limit,balance,created_at,updated_at) VALUES (3,"groceries",200.0,200.0,"2012-10-17 06:00:00","2012-10-17 06:00:00")');
	 tx.executeSql('INSERT INTO CAT (id, name, monthly_limit,balance,created_at,updated_at) VALUES (4,"phonebill",28.0,28.0,"2012-10-17 06:00:00","2012-10-17 06:00:00")');
	 tx.executeSql('INSERT INTO CAT (id, name, monthly_limit,balance,created_at,updated_at) VALUES (5,"rent",400.0,400.0,"2012-10-17 06:00:00","2012-10-17 06:00:00")');
tx.executeSql('INSERT INTO TRANS (amount,optional,created_at,updated_at,catid) VALUES (-10.0,"","2012-10-29 06:00:00","2012-10-29 06:00:00",0)');
tx.executeSql('INSERT INTO TRANS (amount,optional,created_at,updated_at,catid) VALUES (-20.0,"","2012-10-30 06:00:00","2012-10-30 06:00:00",0)');
tx.executeSql('INSERT INTO TRANS (amount,optional,created_at,updated_at,catid) VALUES (-20.0,"","2012-10-29 06:00:00","2012-10-30 06:00:00",0)');

//tx.executeSql('INSERT INTO TRANS (amount,optional,created_at,updated_at,catid) VALUES (20.0,"test","2012-10-30 06:00:00","2012-10-30 06:00:00")');
	
	//for (var i=6;i<100;i++)
     //{
     	// tx.executeSql('INSERT INTO CAT (id, name, monthly_limit,balance,created_at,updated_at) VALUES (?,?,200.0,200.0,"16-10-2012 06:00:00","16-10-2012 06:00:00")',[i,'cat'+i]);
    
  // 
     //}	 
}

function timeNow()
{
	var now = new Date();

	var curr_date = now.getDate()+"";
	var curr_month = now.getMonth()+1+"";
	var curr_year = now.getFullYear()+"";
	var curr_hour = now.getHours()+"";
	var curr_min = now.getMinutes()+"";
	var curr_sec = now.getSeconds()+"";


	if (curr_min.length == 1)
   	{
   	curr_min = "0" + curr_min;
   	}
   //	alert(curr_min.length+" "+curr_min);
   	if (curr_hour.length == 1)
   	{
   	curr_hour = "0" + curr_hour;
   	}
   	if (curr_sec.length == 1)
   	{
   	curr_sec = "0" + curr_sec;
   	}
   	return curr_year + "-" + curr_month + "-" + curr_date+" "+curr_hour+":"+curr_min+":"+curr_sec;
}

function errorDB(err)
{
  console.log("Error processing SQL: "+err.code+" "+err.message);
}
function successDB() {
  console.log("success!");
}







function getCats(tx)
{
	cat=new Array();
	tx.executeSql('SELECT name FROM CAT ORDER BY updated_at DESC,name ASC LIMIT 20', [],function (tx, results) {
				 // alert("test");
		  var len = results.rows.length, i;
				  
			for (i = 0; i < len; i++) {
		   // cats.push(results.rows.item(i).name);
		  	cat.push(results.rows.item(i).name);
			//alert(cat[0]);
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

function insertTrans(tx,catid,data)
{


	var amount=data['amount'],optional=data['opt'],catid;
	var created_at=data['createdDate'];
	var updated_at=created_at;

//	alert("finish");
	//
	tx.executeSql('INSERT INTO TRANS (amount,optional,catid,created_at,updated_at) VALUES (?,?,?,?,?)'
		,[amount,optional,catid,created_at,updated_at],successDB,errorDB);
    
}
function insertNewCat(tx,cat,data)
{

	if (catid==-1)
	{
	 tx.executeSql('INSERT INTO CAT (name, monthly_limit,balance,created_at,updated_at) VALUES (?,?,?,?,?)',
	 	[data['cat'],0,0,data['createdDate'],data['createdDate']], 
	 	function(tx,result){
	 	catFindIdName(tx,data);
	 	}, errorDB);
	}
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
		  		insertNewCat(tx,cat,data);
		  }
			else
			{

				catid=results.rows.item(0).id;
				var amount=parseFloat(results.rows.item(0).balance);
				//alert(amount);
			//	alert(len);
				insertTrans(tx,catid,data);
				//alert(catid);
				updateTimeStamp(tx,"CAT",catid);
				
				//alert(amount+data['amount']);
				
				updateBalance(tx,"CAT",catid,"balance",amount+data['amount']);
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
function getTotalBalance(tx,value,cats)
{
	tx.executeSql("SELECT * FROM CAT ORDER BY updated_at DESC", [],function (tx, results) {
		  var len = results.rows.length, i;
		  var totalLeft=0;
		  var totalMonthly_limit=0;
		  for (i = 0; i < len; i++) {
		    //console.log(results.rows.item(i).name);    
		     //search_results.push(results.rows.item(i).name);
		     totalLeft+=results.rows.item(i).balance;
		     totalMonthly_limit+=results.rows.item(i).monthly_limit;

		     var left = results.rows.item(i).balance;
		     var spent = results.rows.item(i).monthly_limit - left;

		     var cat={'name':results.rows.item(i).name,'left':left,'spent':spent};
		     cats.push(cat);
		  }
		  value.left=totalLeft;
		  value.spent=totalMonthly_limit-totalLeft;
		  //alert(value.spent+" "+value.left);
		  //objectL.text(totalLeft+"");
		  //objectS.text((totalMonthly_limit-totalLeft)+"");
	//	  callback(search_results);
		});
}

function get_cat_balance_by_name(tx,name,value)
{
	//	alert(name);

	tx.executeSql("SELECT * FROM CAT WHERE name=?", [name],function (tx, results) {
		  var len = results.rows.length, i;
		  var totalLeft=0;
		  var totalMonthly_limit=0;
		 
		     totalLeft+=results.rows.item(0).balance;
		     totalMonthly_limit+=results.rows.item(0).monthly_limit;
		 
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
function get_trans_last_7_days_by_cat_name(tx,name,transactions)
{
			 		//alert(transactions.test);

	tx.executeSql("SELECT * FROM CAT WHERE name=?", [name],function (tx, results) {
			var id = results.rows.item(0).id;
			//id=1;
		 		//alert(id);AND 
		 		
		 		tx.executeSql("SELECT * FROM TRANS WHERE (catid=?) AND (created_at > (SELECT DATETIME('now', '-7 day')))  ORDER BY created_at ASC",[id],function (tx,results){
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
function get_trans_perc_by_cat_name_month(tx,name,month,transactions)
{
			 		//alert(transactions.test);

	tx.executeSql("SELECT * FROM CAT WHERE name=?", [name],function (tx, results) {
			var id = results.rows.item(0).id;
			//id=1;
		 		//alert(id);AND 
		 		
		 		tx.executeSql("SELECT * FROM TRANS WHERE strftime('%m', date('now'))=? ORDER BY created_at ASC",[month],function (tx,results){
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


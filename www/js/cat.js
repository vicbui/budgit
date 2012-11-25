$("#cat").live( 'pageshow',function(event, ui){

				//if($.mobile.activePage.attr("id") == "cat"){
									//alert("test");
									
								/*	window.localStorage.getItem("cat");
								*/
				
									//alert(window.localStorage.getItem("cat"));
	var data=JSON.parse(window.localStorage.getItem("cat"));

	initCat(data.catName,data.spent,data.left);
	initTransDetails();


	$("#cancelCatBtn").click(function(event){
		event.preventDefault();
						//alert("test1");
						//enterToSave();
		$("#cat_track_area").data('inputText').switchOffTextScreen();
						//alert("test");
		return false;
	});


	var callbackBegin=function(action){
		//alert("test");

		$(".profileHide").each(function(index){	
			if (action==0)
			{
				$("#deleteCatBtn").hide();
				$("#cancelCatBtn").show();
				$(this).hide();
			}
			else
			{
				$("#deleteCatBtn").show();
				$("#cancelCatBtn").hide();
			
				$(this).show();
			}
		})

	}

	var callback = function(){
		//alert("after saved!");
		initTransDetails();
	}
	function initCat(name,spent,left)
	{			
			
		showProgressBar("total",spent,left);
		$("#dateLeft").text(daysInMonth());	
		$("#catTitle").text(capitaliseFirstLetter(name));
		$("#catLbl").text("#"+name);
		$("#cat_track_area").inputText();
		$("#cat_track_area").data('inputText').init();
		$("#cat_track_area").data('inputText').setCallback(callback);
		$("#cat_track_area").data('inputText').setCallbackBegin(callbackBegin);

	}
	function updateDashboard(average,max,min,total)
	{
		//alert(average+" "+max+" "+min+" "+total);
		$("#amountMax").text("$"+abbrNum(max,2));
		$("#amountMin").text("$"+abbrNum(min,2));
		$("#amountAvg").text("$"+abbrNum(average,2));
		var data=JSON.parse(window.localStorage.getItem("cat"));

			var budget=parseFloat(data.spent)+parseFloat(data.left);

			var left= budget-total;

			initCat(data.catName,total,left);

			var donutChart=$("#donutChart");
			donutChart.barChart();

			var chartValue= [[data.catName,60], ['Others',40]] ;
			donutChart.data('barChart').donutChart('donutChart','#993333', '#339900',chartValue);
			$("#legendPieCat").text(capitaliseFirstLetter(data.catName));
			$("#legendPie").show();

	}
	function initTransDetails()
	{
		var data=JSON.parse(window.localStorage.getItem("cat"));
		var transactions2=new Object();
		transactions2.results= new Array();
		window.localStorage.setItem('current_page',1);
		var itemPerLoad=window.localStorage.getItem('itemPerLoad');
		offset=0,limit=0;
		var contextObject="#cat";
		window.localStorage.setItem("contextObject",contextObject);	
		$(contextObject).find(".list").html("");
		$(contextObject).find(".list").parent().find(".end").remove();
		addResultToList(db,transactions2,data.catName,itemPerLoad,data.day,data.month,data.year,contextObject,function()
		{
			//initCat(name,spent,left);
											
		}, function(trans){
			var data=JSON.parse(window.localStorage.getItem("cat"));
			//console.log(trans[0].catid);
			//console.log(data.catName);
			//alert(data.catName);
			var total=0;
			if (trans.length>0)
			{
				var max=Math.abs(trans[0].amount),min=Math.abs(trans[0].amount),average=0,count=0;


				if (data.catName=="ad-hoc")
				{
					count=0;
					db.transaction(function(db){
						for (var i=0;i<trans.length;i++)
						{
							get_budget_by_cat_id_callback(db,trans[i],function(transBudget){
								//
								if (transBudget.budget ==-1 || transBudget.budget.amount==0)
								{
										console.log(transBudget.budget);
										count++;
										var amount=Math.abs(transBudget.amount);
										total=total+amount;
										if (max < amount)
											max = amount
										if (min > amount)
											min = amount
								}
							});
						}
					},errorDB,function(){
						average=total/count;
						updateDashboard(average,max,min,total);
					})
				}
				else
				{
					count=0;
					for (var i=0;i<trans.length;i++)
					{
						if (trans[i].name==data.catName)	
						{
								count++;
								var amount=Math.abs(trans[i].amount);
								total=total+amount;
								if (max < amount)
									max = amount
								if (min > amount)
									min = amount
						}
				
					}
					average=total/count;
					updateDashboard(average,max,min,total);
				

				}



						
			}
		
			
			
				
		});
	}

                                     
									/*var transactions=new Object();
									transactions.results= new Object();
									db.transaction(function(db)
								 				   {
								 				   		var current_month= (new Date().getMonth()+1)+"";
								 				   		//alert(current_month);
								 				   		transactions1.results.maxSpend=0;
								 				   		transactions1.results.minSpend=0;
								 				   		transactions1.results.avgSpend=0;

								 				   		get_trans_max_min_avg_by_cat_name_month(db,data.catName,current_month,transactions);

								 						
								 					},errorDB,function()
								 				    		  { 
								 				    		  //	alert(transactions.results.maxSpend);
								 				    		  	$("#amountMax").text("$"+abbrNum(transactions.results.maxSpend,2));
								 				    		  	$("#amountMin").text("$"+abbrNum(transactions.results.minSpend,2));
								 				    		  	$("#amountAvg").text("$"+abbrNum(transactions.results.avgSpend,2));
								 				    		  }
								 				   );
									*/
							/*
									var transactions1=new Object();
									transactions1.results= new Object();
									db.transaction(function(db)
								 				   {
								 				   		var current_month= (new Date().getMonth()+1)+"";
								 				   		//alert(current_month);
								 				   		transactions1.results.perccat=0;
								 				   		transactions1.results.percothers=0;
								 						get_trans_perc_by_cat_name_month(db,data.catName,current_month,transactions1);	    
								 					},errorDB,function()
								 				    		  { 
								 				    		  		//var chartValue = [['a',transactions1.results.perccat],['b',transactions1.results.percothers]];
								 				    		  
																	var donutChart=$("#donutChart");
																	donutChart.barChart();

																 if ((isNaN(transactions1.results.perccat))||(transactions1.results.perccat==0))
																 {
																 	transactions1.results.perccat=0;

																 }
																 if ((transactions1.results.perccat+"").length==1) 
																 {
																 		$("#valueDonutChart").text(transactions1.results.perccat+"%");
																 		$("#valueDonutChart").css({"font-size":"28px","margin-top":"-90px","margin-left":"30px"});
																 	
																 }
																 else 
																 	if ((transactions1.results.perccat+"").length==3)
																 	{
																 		//alert("test");
																 		$("#valueDonutChart").text(transactions1.results.perccat+"%");
																 		$("#valueDonutChart").css({"font-size":"21px","margin-top":"-88px","margin-left":"22px"});
																 	}
																 	else	 
																 	{
																 		$("#valueDonutChart").text(transactions1.results.perccat+"%");
																 		$("#valueDonutChart").css({"font-size":"26px","margin-top":"-90px","margin-left":"26px"});
																 	}

																 	var chartValue= [[data.catName,transactions1.results.perccat], ['Others',100-transactions1.results.perccat]] ;
																 
																	donutChart.data('barChart').donutChart('donutChart','#993333', '#339900',chartValue);
																	$("#legendPieCat").text(capitaliseFirstLetter(data.catName));
																	$("#legendPie").show();
																	
																 
								 				    		  });
									var transactions2=new Object();
									transactions2.results= new Array();
									window.localStorage.setItem('current_page',1);

									window.localStorage.setItem('itemPerLoad',5);
									var itemPerLoad=window.localStorage.getItem('itemPerLoad');
									offset=0,limit=0;
									var contextObject="#cat";
									window.localStorage.setItem("contextObject",contextObject);	
									$(contextObject).find(".list").html("");
									$(contextObject).find(".list").parent().find(".end").remove();
									//addResultToList(db,transactions2,data.catName,itemPerLoad,contextObject);
									addResultToList(db,transactions2,data.catName,itemPerLoad,data.day,data.month,data.year,contextObject)
									//alert("addresultlist");*/



	/*function showProgressBar(id,value1,value2)
						{

							var name="barChart"+id;
							var idw2=name+"L";
							var idw=name+"S";
							var total=value1+value2;
							var perc1=Math.round(Number((value1/total)*100));
							var perc2=Math.round(Number((value2/total)*100));


							value1=Math.abs(value1);
							value2=Math.abs(value2);

							$("#"+name).css("width",perc2+"px");
							$("#" + idw).text("$"+abbrNum(value1,2));
							$("#" + idw2).text("$"+abbrNum(Math.abs(value2),2));
							
							if (perc2<0)
							{
								//alert("test");
								$("#" + idw2).parent().find(".left").text("Over");

								$("#" + idw2).css("color","red");
								$("#" + idw2).parent().find(".left").css("color","red");
								//$("#" + idw2).text("$("+Math.abs(abbrNum(value2,2))+")");
							}
							else
							{
								$("#" + idw2).parent().find(".left").text("Left");

								$("#" + idw2).css("color","white");
								$("#" + idw2).parent().find(".left").css("color","white");
							}

							$("#"+name).parent().removeClass();
							$("#"+name).parent().addClass("progress-bar");
							$("#"+name).parent().addClass("shine");

							var now = new Date();
							var totalDays= noDaysInMonth((now.getMonth()+1)+"",now.getFullYear()) ;

							var curr_date = parseInt(now.getDate());
							var limit=Math.round(curr_date*100/totalDays);
							//alert(totalDays);
							$("#"+name).parent().find(".limitLine").css("width",limit+"px");
							$("#"+name).parent().find(".dateCirle").css("left",(limit-15)+"px");
						
							if (limit >= perc2)
							{
								$("#"+name).parent().addClass("red");
							}
							else
							{
									$("#"+name).parent().addClass("green");
							}
						}		*/						
});
				
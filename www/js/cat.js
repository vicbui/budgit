$("#cat").live( 'pageshow',function(event, ui){

				//if($.mobile.activePage.attr("id") == "cat"){
									//alert("test");
									
								/*	window.localStorage.getItem("cat");
								*/
									//alert(window.localStorage.getItem("cat"));
									var data=JSON.parse(window.localStorage.getItem("cat"));


									var total=$("#total");
									total.barChart();
									total.data('barChart').showChart('total','#993333', '#339900', data.spent,data.left,data.isBudget);

									$("#dateLeft").text(daysInMonth());	
									$("#catTitle").text(capitaliseFirstLetter(data.catName));
									$("#catLbl").text("#"+data.catName);
									$("#cat_track_area").inputText();
									$("#cat_track_area").data('inputText').init();
                                     

									var transactions=new Object();
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
									
									/*var transactions=new Object();
									transactions.data= new Array();
									
									db.transaction(function(db)
								 				   {
								 				   		get_trans_last_7_days_by_cat_name(db,data.catName,transactions);
								 				    },errorDB,function()
								 				    		  { 
								 				    		  	var chartValue=new Array();
								 				    		  	var seven_dates=new Array();
								 				    		  	seven_dates=process_seven_days(transactions.data);
								 				    		  	//alert(seven_dates); 
								 				    		  	for (var i in seven_dates)
															 	{
															 		//alert(seven_dates[i]);
															 		chartValue.push(seven_dates[i] * -1);
															 		//console.log(i+" "+final_date[i]);
															 	}
															 			$("#legendLine").text(capitaliseFirstLetter(data.catName)+" Expenses last 7 days");
								 				    		  	
								 				    		  });	*/
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
									//alert("addresultlist");
								});
				
	$("#analytic").live( 'pageshow',function(event, ui){
					/**************budget insight to be change *************/	
				/*************slider *******************/
						var object=$("#slider");
						var slider = new Swipe(object[0], {callback: function(e, pos) {
								//alert("test");
							 	$('#positionInsight').children('em').removeClass('on');
					         	$('#positionInsight').find('#'+pos).addClass('on');	
								loadSpendInfo(selectCat.val(),selectDay.val(),selectMonth.val(),selectYear.val());

					         }
					      });

						$(".navone").click(function(e){
							//alert("test");

							e.preventDefault();
							//slider4.next();
							//alert($(this).attr('id'));
						   $('#positionInsight').children('em').removeClass('on');
						    $(this).addClass('on');	
							slider.slide($(this).attr('id'),300);

							
						})

				/*************\slider *******************/

				/*************populate month *******************/
				var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
			
				var current_month= (new Date().getMonth()+1)+"";
				var selectMonth=$("#selectMonth");
				selectMonth.selectmenu();

				for (var i=0;i<12;i++)
				{
					//var today=
					var aMonth= '<option value="'+(i+1)+'">'+monthNames[i]+'</option>';
					selectMonth.append(aMonth);
											 //  <option value="0">Everything</option>

				}
				selectMonth.val(current_month).attr('selected', true).siblings('option').removeAttr('selected');
				selectMonth.selectmenu('refresh');

				/*************\populate month *******************/
				/*************populate year *******************/
				var yearNames = [ "2011", "2012", "2013"];	
				var current_year= (new Date().getFullYear())+"";
				var selectYear=$("#selectYear");
				selectYear.selectmenu();

				for (var i=2011;i<=2013;i++)
				{
					//var today=
					var aYear= '<option value="'+(i)+'">'+yearNames[i-2011]+'</option>';
					selectYear.append(aYear);
											 //  <option value="0">Everything</option>

				}
				selectYear.val(current_year).attr('selected', true).siblings('option').removeAttr('selected');
				selectYear.selectmenu('refresh');


				/*************\populate year *******************/

				/**************popluate days*************/
				var selectDay=$("#selectDay");
				//selectDay.selectmenu();
				populateDays(current_month,current_year);

				function populateDays(month,year)
				{
					$("#selectDay").html("");
					var selectDay=$("#selectDay");	
					selectDay.selectmenu();
					var lastday=noDaysInMonth(month,year);
						selectDay.append('<option value="-1">All</option>');
					for (var i=1;i<=lastday;i++)
					{
						var aDay= '<option value="'+(i)+'">'+i+'</option>';
						selectDay.append(aDay);
					}
					selectDay.selectmenu('refresh');
				}
				var current_day= (new Date().getDate());
				selectDay.val(current_day).attr('selected', true).siblings('option').removeAttr('selected');
				selectDay.selectmenu('refresh');


				/**************\popluate days*************/
				

				/*************populate cat *******************/
				//alert("test");
				var selectCat=$("#selectCat");
				

				var allcats=new Object();
				allcats.results=new Array();
				db.transaction(function(db)
								{
									selectCat.html("");
									selectCat.append('<option value="-1">All</option>');
									getCats(db,allcats);
								},errorDB,function(){
									//search_results=cat;
								//	alert(allcats.results.length);
									for (var i=0;i<allcats.results.length;i++)
									{
										//alert(allcats.results[i].id);
										var aCat= '<option value="'+ allcats.results[i].id+'">'+capitaliseFirstLetter(allcats.results[i].name)+'</option>';
										selectCat.append(aCat);
									}
									selectCat.selectmenu();
									selectCat.selectmenu('refresh');
								});	

				$("#selectMonth").bind( "change", function(event, ui)
				{	  
					populateDays(selectMonth.val(),selectYear.val());
				    loadSpendInfo(selectCat.val(),selectDay.val(),selectMonth.val(),selectYear.val());
				
				});

				$("#selectDay,#selectYear,#selectCat").bind( "change", function(event, ui) {
  					//alert(selectDay.val());
					loadSpendInfo(selectCat.val(),selectDay.val(),selectMonth.val(),selectYear.val());
						
				});
				/*************\populate cat *******************/

				/*************spend/save info *******************/

				loadSpendInfo(selectCat.val(),selectDay.val(),selectMonth.val(),selectYear.val());
				console.log(selectCat.val());
				/*************\populate cat *******************/

				/*************pie chart *******************/

				/*************\pie chart *******************/


				/*************line graph *******************/

				/*************\line graph *******************/

				/*************trans details*******************/

				/*************\trans details*******************/

				function piePopulate(month,year,slider)
				{
					$("#divselectDay").hide();
					$("#divSelectCat").hide();
					var alltrans=new Array();
					
					var firstday = year+ "-" + month + "-"+"01";
					var lastday = year + "-" + month + "-"+noDaysInMonth(month,year);
					//alert(firstday+" "+lastday);
					//convertDatetimeToString(inputDate)
					var chartValue=new Array();
					listTrans(db,firstday,lastday,function(trans){
						if (trans.length>0)
						{
							var arr = new Array();
							$(".chartEmpty").hide();
							for (i = 0; i < trans.length; i++) {
								if (typeof arr[trans[i].name] === "undefined")
								{
									var obj= new Object();
									obj.amount= Math.abs(trans[i].amount);
									obj.catid = trans[i].catid;
									arr[trans[i].name]= obj;	

												
								}	
								else
									arr[trans[i].name].amount=arr[trans[i].name].amount+Math.abs(trans[i].amount);
							}
							for (var name in arr)
							{
									var tmp=[name,arr[name].amount,arr[name].catid,month,year,slider];
									chartValue.push(tmp);	
							}


							var pieChart=$("#pieChartInsight");
							pieChart.barChart();
							pieChart.data('barChart').pieChart('pieChartInsight',chartValue);
							$('#pieChartInsight').unbind('jqplotDataClick');
							$('#pieChartInsight').bind('jqplotDataClick', 
		
				            function (ev, seriesIndex, pointIndex, data1) {
				            	//alert(chartValue[pointIndex][2]);
					           	var selectMonth=$("#selectMonth");
						    	selectMonth.val(chartValue[pointIndex][3]).attr('selected', true).siblings('option').removeAttr('selected');
								selectMonth.selectmenu('refresh');
								
								var selectYear=$("#selectYear");
								selectYear.val(chartValue[pointIndex][4]).attr('selected', true).siblings('option').removeAttr('selected');
								selectYear.selectmenu('refresh');
	
								var selectCat=$("#selectCat");
				            	selectCat.val(chartValue[pointIndex][2]).attr('selected', true).siblings('option').removeAttr('selected');
								selectCat.selectmenu('refresh');

								chartValue[pointIndex][5].slide(1,300);
							}
						    );

						}
						else
							{
								$("#pieChartInsight").html("");
								$(".chartEmpty").show();
							}
					})

				}
				function linechartPopulate(cat,month,year,slider)
				{
					$("#divselectDay").hide();
					$("#divSelectCat").show();
					
					var firstday = year+ "-" + month + "-"+"01";
					var lastday = year + "-" + month + "-"+noDaysInMonth(month,year);
					//alert(firstday+" "+lastday);
					//convertDatetimeToString(inputDate)
					var chartValue=new Array();
					var maxData=new Array(),minData=new Array();
					var dataresult=new Array();
					listTrans(db,firstday,lastday,function(trans){	
						if (trans.length>0)
						{
							var arr = new Array();

							$(".chartEmpty").hide();

							for (var i=0;i<trans.length;i++)
							{
								//alert(trans[i].catid+" "+cat);
								if ((cat==-1)||(cat==trans[i].catid))
								{
									//alert(trans[i].catid+" "+trans[i].amount);
									var today = convertUnixToString(trans[i].current_date);
									if (typeof arr[today] === "undefined")
									{
										arr[today]= Math.abs(trans[i].amount);	
										var tmp=today.split("-");
					    				var tmpDate = new Date(parseInt(tmp[0]),(parseInt(tmp[1])-1),parseInt(tmp[2]));
										
									}	
									else 
										arr[today]= arr[today]+Math.abs(trans[i].amount);
								}
							}
							var minTmpDate=new Date(3000,1,1); maxTmpDate=new Date(1000,1,1);
							var average=0,min=10000,max=0,total=0;
							for (var date in arr)
							{
							//	alert(date+" "+arr[date]);
								var tmp=date.split("-");
			    				var tmpDate = new Date(parseInt(tmp[0]),(parseInt(tmp[1])-1),parseInt(tmp[2]));

								total=total+arr[date];
								if (minTmpDate>tmpDate)
								{
									minTmpDate=tmpDate;
								}
									
								if (maxTmpDate<tmpDate)
								{
									maxTmpDate=tmpDate;
								}
								var tmpTrans=[tmpDate,arr[date],cat,month,year,slider];
								dataresult.push(tmpTrans);

								if (arr[date]>max)
								{
									max=arr[date];
									maxData=tmpTrans;
								}
								if (arr[date]<min)
								{
									min=arr[date];
									minData=tmpTrans;
								}

							}
						var newMaxDate = new Date(maxTmpDate.getFullYear(), maxTmpDate.getMonth(), maxTmpDate.getDate()); // create new increased date						//	alert("test");		
						var newMinDate = new Date(minTmpDate.getFullYear(), minTmpDate.getMonth(), minTmpDate.getDate()); // create new increased date						//	alert("test");		

						//	console.log(min+" "+max+" "+Math.round(total/trans.length));
						//	console.log(maxData);
						//	console.log(minData);
						var arrMax= new Array();
							var arrMin= new Array();
							arrMax.push(maxData);
							arrMin.push(minData);
							//console.log(minTmpDate+" "+maxTmpDate+" "+min+" "+max+" "+Math.round(total/trans.length));
							max=max+Math.round((max-min+1)*0.1)+1;
							min=min-Math.round((max-min)*0.1)-1;
							if (min<0)
								min=0

						//	alert(max+" "+min);
							var lineChart=$("#lineChart");
							lineChart.barChart();
							lineChart.data('barChart').lineChart('lineChart','#5E87B0',dataresult,arrMax,arrMin,newMinDate,newMaxDate,min,max,Math.round(total/trans.length));
							
							$("#lineChart").unbind('jqplotDataClick');
							$("#lineChart").bind('jqplotDataClick',
						   	function  (ev, seriesIndex, pointIndex, data1) 
						  	{ 
							  	var str=(data1+"").split(',')[0];
								var aDate=(new Date(parseFloat(str))).getDate();
								var selectDay=$("#selectDay");
								selectDay.val(aDate).attr('selected', true).siblings('option').removeAttr('selected');
								selectDay.selectmenu('refresh');
				            	var selectMonth=$("#selectMonth");
								selectMonth.val(dataresult[pointIndex][3]).attr('selected', true).siblings('option').removeAttr('selected');
								selectMonth.selectmenu('refresh');

								var selectYear=$("#selectYear");
								selectYear.val(dataresult[pointIndex][4]).attr('selected', true).siblings('option').removeAttr('selected');
								selectYear.selectmenu('refresh');

								var selectCat=$("#selectCat");
				            	selectCat.val(dataresult[pointIndex][2]).attr('selected', true).siblings('option').removeAttr('selected');
								selectCat.selectmenu('refresh');
							dataresult[pointIndex][5].slide(2,300); 

										           	});

						}
						else{
							$("#lineChart").html("");
							$(".chartEmpty").show();
						}
					})
				}
				function loadSpendInfo(cat,day,month,year)
				{

					//alert(slider.getPos());
					if(slider.getPos()==0)
					{
							
							piePopulate(month,year,slider);
					}
					else 
						if (slider.getPos()==1)
						{
							$("#divselectDay").hide();
							$("#divSelectCat").show();
							//alert(cat)
							linechartPopulate(cat,month,year,slider);

							/*var alltrans=new Array();
							var maxData=new Array(),minData=new Array();
							var dataresult=new Array();
							db.transaction(function(db)
										{
											//alert((parseInt(month))+" "+year);
											get_transactions_by_month_year_cat(db,cat,(parseInt(month)),year,alltrans);
										},errorDB,function(){
											if (alltrans.results.isValid==1)
											{
												$(".chartEmpty").hide();
												var minTmpDate=new Date(3000,1,1); maxTmpDate=new Date(1000,1,1);
												var average=0;
												for (var i=0;i<alltrans.length;i++)
												{ 

													
			    									var tmp=alltrans[i].updated_at.split("-");
			    									var tmpDate = new Date(parseInt(tmp[0]),(parseInt(tmp[1])-1),parseInt(tmp[2]));
													if (minTmpDate>tmpDate)
													{
														minTmpDate=tmpDate;
													}
													if (maxTmpDate<tmpDate)
													{
														maxTmpDate=tmpDate;
													}
													var tmpTrans=[tmpDate,alltrans[i].amount,cat,month,year,slider];
													if (alltrans[i].amount==alltrans.value.max)
														{
															maxData.push(tmpTrans)
														}
														else
															if (alltrans[i].amount==alltrans.value.min)
															{
																minData.push(tmpTrans);
															}
													dataresult.push(tmpTrans);
												}
												//console.log(data);
												//console.log(maxData);
												//console.log(minData);
												console.log(minTmpDate+" "+maxTmpDate+" "+alltrans.value.min+" "+alltrans.value.max+" "+Math.round(alltrans.value.spent/alltrans.length));
												var lineChart=$("#lineChart");
												lineChart.barChart();
												lineChart.data('barChart').lineChart('lineChart','#5E87B0',dataresult,maxData,minData,minTmpDate,maxTmpDate,alltrans.value.min,alltrans.value.max,Math.round(alltrans.value.spent/alltrans.length));
								           
												//search_results=cat;
												//alert(allcats.length);
										      	  	$("#lineChart").unbind('jqplotDataClick');
													$("#lineChart").bind('jqplotDataClick',
										            function  (ev, seriesIndex, pointIndex, data1) 
										            { 
										            //	alert(data1);
										            	var str=(data1+"").split(',')[0];
										            	//alert(str);
										            	var aDate=(new Date(parseFloat(str))).getDate();
										            	
										            	//alert('series: '+seriesIndex+', point: '+pointIndex+', data: '+data); 
										            	var selectDay=$("#selectDay");
										            	selectDay.val(aDate).attr('selected', true).siblings('option').removeAttr('selected');
														selectDay.selectmenu('refresh');

										            	var selectMonth=$("#selectMonth");
										            	selectMonth.val(dataresult[pointIndex][3]).attr('selected', true).siblings('option').removeAttr('selected');
														selectMonth.selectmenu('refresh');

														var selectYear=$("#selectYear");
										            	selectYear.val(dataresult[pointIndex][4]).attr('selected', true).siblings('option').removeAttr('selected');
														selectYear.selectmenu('refresh');

														var selectCat=$("#selectCat");
										            	selectCat.val(dataresult[pointIndex][2]).attr('selected', true).siblings('option').removeAttr('selected');
														selectCat.selectmenu('refresh');

														dataresult[pointIndex][5].slide(2,300); 

										           	});
									
											}
											else
											{
														$("#lineChart").html("");
														$(".chartEmpty").show();
											}		
										});*/
						}
						else
						{
							$("#divselectDay").show();
							$("#divSelectCat").show();
							var  aTmpCat= new Object();
							db.transaction(function(db)
										{
											alert(cat);
										//alert(cat+" "+(parseInt(month)-1)+" "+year);
											get_cat_name_by_id(db,cat,aTmpCat);				
										},errorDB,function(){
											var data= new Object();
											data.catName=aTmpCat.data.name;
											data.month=month;
											data.year=year;
											data.day=day;

											window.localStorage.setItem('cat',JSON.stringify(data));
											//alert(aTmpCat.data.name);
												var transactions2=new Object();
												transactions2.results= new Array();
												window.localStorage.setItem('current_page',1);
												window.localStorage.setItem('itemPerLoad',5);
												var itemPerLoad=window.localStorage.getItem('itemPerLoad');
												offset=0,limit=0;
												var contextObject="#analytic";
												window.localStorage.setItem("contextObject",contextObject);	
												//var contextObject=$("#analytic");	
												$(contextObject).find(".list").html("");
												$(contextObject).find(".list").parent().find(".end").remove();
												//alert(data.day);
												addResultToList(db,transactions2,data.catName,itemPerLoad,data.day,data.month,data.year,contextObject,function(){
													//alert("test");
												}, "");
												//alert();
										})
							
						}
				}


				/*	var chartValue=new Array();
					for (var i=1; i<30;i++)
					{
						var display='';
						var tmp=Math.round(Math.random()*50);
						if (tmp==20)
						{
							display='(Avg)';
						}
						var value =[i,tmp];

						chartValue.push(value);
					}

				//	var chartValue=[1,1,1,1,2,7,100,1,20,1,1,010,1,270,100,7,10,2,,90,7,10];	
					var lineChart=$("#lineChart");
					lineChart.barChart();
					lineChart.data('barChart').lineChart('lineChart','#5E87B0',chartValue);
*/

				})
				
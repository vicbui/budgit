$("#home").live( 'pageshow',function(event, ui){
			
						loadAllCats();
						loadAllDashboard();
						initTransDetails();	

						var cat=new Object();
						cat.results=new Array();
										
						var value={spent:0,left:0};
						var object=$("#slider4");
						var slider4 = new Swipe(object[0], {callback: function(e, pos) {
							 	$('#position').children('em').removeClass('on');
					         	$('#position').find('#'+pos).addClass('on');
					         	e.stopImmediatePropagation();	
					         }
					      });

					 	function initTransDetails()
					 	{
					 				var transactions2=new Object();
										transactions2.results= new Array();
										window.localStorage.setItem('itemPerLoad',5);
										var itemPerLoad=window.localStorage.getItem('itemPerLoad');
										window.localStorage.setItem('current_page',1);

										var contextObject="#transDetails";
										window.localStorage.setItem('contextObject',contextObject);
										var list=$(contextObject).find(".list");
										list.html("");

										$(contextObject).find(".list").parent().find(".end").remove();								

										//addResultToList(db,transactions2,"",itemPerLoad,contextObject);

										var now = new Date();

										addResultToList(db,transactions2,"",itemPerLoad,-1,now.getMonth()+1+"",now.getFullYear(),contextObject,function()
											{
												//alert("test");
												loadAllCats();
												loadAllDashboard();
											}, "");
					 	}
						
					


/*****************************charting*****************************************************/
						



						function showChart(id,color1,color2,value1,value2)
						{
							var name="barChart"+id;
							var idw2=name+"L";
							var idw=name+"S";
							var total=value1+value2;
							var perc1=Math.round(Number((value1/total)*100));
							var perc2=Math.round(Number((value2/total)*100));
							//alert(idw);
							$("#"+name).html("");
						  $.jqplot(name, [[perc1],[perc2]], {
					  	  stackSeries: true,
							seriesDefaults: {
						      renderer: $.jqplot.BarRenderer,
						      rendererOptions: {
						        varyBarColor: true,
						        barDirection: 'horizontal',
						          highlightMouseOver: false,
							        highlightMouseDown: false,
							        highlightColor: null,
							         barWidth: 50,


						      },
						      pointLabels: { 
						        show: false,
						      },
						      shadow: false,
						    },
						    axes: {
						      xaxis: {
						        //renderer: $.jqplot.CategoryAxisRenderer,
						        ticks:[0,100],
						        tickOptions: {
						          showGridline: false,
						          showMark: false,
						          //fontFamily: 'DosisBold',
						          textColor: '#ffffff',
						          fontSize: 'larger',
						          showLabel:false,

						        },
						      },
						      yaxis: {
						      	renderer: $.jqplot.CategoryAxisRenderer,
						        // ticks: ['love','hate'],
						        tickOptions: {
						          showGridline: false,
						          showMark: false,
						          fontFamily: 'DosisBold',
						          textColor: '#ffffff',
						          fontSize: 'larger',
						          showLabel:false
						        },
						      },

						    },
						    seriesColors: [color1,color2],
						    grid: {
							  background: 'transparent',  
						      drawGridLines: false,
						      borderWidth: 0.0,
						      shadow: false,
						    },

						    highlighter: { show: false },

						  }).replot({clear: true, resetAxes:true});	
							
							var w = parseInt($(".jqplot-yaxis").width(), 10) + parseInt($("#"+name).width(), 10);
							var h = parseInt($(".jqplot-title").height(), 10) + parseInt($(".jqplot-xaxis").height(), 10) + parseInt($("#"+name).height(), 10);

							$("#"+name).width(w).height(h);								
						//	plot;


							//$("#barChart").remove('barChartW');
							$("#" + idw).text("$"+abbrNum(value1,2));
							$("#" + idw2).text("$"+abbrNum(value2,2));
					
							var canvas= $("#"+name).find('.jqplot-event-canvas');
							canvas.css("cursor","pointer");
									//alert(canvas.html());
									canvas.click(function(){
										//alert();
									})
							
							var barChartName=$("#"+id).find('.barChartName');
							barChartName.css("cursor","pointer");
							
							//alert(barChartName.html());
								barChartName.click(function()
								{
									//alert("test");
								})


							}



/*****************************charting*****************************************************/

					$(".deleteLink").live('click',function(){
						//	event.preventDefault(); 
							
  							var myClass = $(this).parent().attr("class");							

							var parent=$(this).parent().parent();
  							
							$(this).parent().remove();
							date_pending[myClass]--;
							if 	(date_pending[myClass]==0)
							{

  								parent.find("."+myClass).each(function(){
  									//alert
  									$(this).remove();
  								});
  								lastdate=new Date("01/01/1001");
  							}
							/*$(this).parent().remove();
								count_pending--;
								console.log(count_pending);
							if (count_pending==0)
								$('#resultMsg').html("");*/
							return false;
					});


					
				function loadAllCats()
				{
						db.transaction(function(db)
								{
									getCats(db,cat);
								},errorDB,function(){


									all_cat_static=cat.results;

									//alert(search_results.length+" search results");

								});		
				}
				function loadAllDashboard()
				{

					var now=new Date();
					var firstday = now.getFullYear()+ "-" + (now.getMonth()+1)+ "-"+"01";
					var lastday = now.getFullYear() + "-" + (now.getMonth()+1)+ "-"+now.getDate();
					//alert(firstday+" "+lastday);
					//convertDatetimeToString(inputDate)

					listTrans(db,firstday,lastday,function(trans){

						//alert(trans.length);
						var cats=new Object();
						var catNoTransactions=new Object();
						var catAdhocTransactions=new Object();

						db.transaction(function(db){
											//alert(trans.length);

											cats.results= new Array();
											getTotalBalance(db,trans,cats);
											
										//	getTotalBalance(db,cats);
											catNoTransactions.results = new Array();
											catAdhocTransactions.results= new Object();
											getNoTransactionCat(db,trans,catNoTransactions);
											getAdhocTransaction(db,trans,catAdhocTransactions);
										//	get_cats_balance(db,cats);
										},errorDB,function(){

											//var trans=
											//alert("test"+cats.results.length);
											//alert(cats[0]);
											//alert(catAddhocTransactions.results.name);
											var spent=0,left=0;	
											cats.results=cats.results.concat(catNoTransactions.results); 
											//alert(catAdhocTransactions.results.name);
										//	alert(cats.results[0].budget.budget_limit+" limit");
											//alert(value.spent+" "+value.left);
											$("#allcats").html("");

											var max=cats.results[0].budget.amount;
											
											for (var i=1;i<cats.results.length;i++)
											{
												if (max<cats.results[i].budget.amount)
													max=cats.results[i].budget.amount;
											}
											//alert(max);

											for (var i=0;i<cats.results.length;i++)
											{
												var aCat=cats.results[i];
												//alert(cats.results[i].totalSpend+" "+cats.results[i].name+" "+aCat.budget.budget_limit);
												spent+=cats.results[i].totalSpend;
												//alert(spent);
												//alert(spent+ " "+left);
												$("#allcats").append("<div id='"+cats.results[i].name+"'></div><div style='clear:both'></div>");
												//alert(cat.name);
												var isBudget=0,budgetValue=0;
												if (cats.results[i].budget!=-1)
												{
													isBudget=1;
													budgetValue=cats.results[i].budget.amount-cats.results[i].totalSpend;
													left += (cats.results[i].budget.amount-cats.results[i].totalSpend);
												
												//	alert(cats.results[i].name+" "+(cats.results[i].totalSpend*budgetValue));
													if (((cats.results[i].totalSpend!=0) || (budgetValue!=0))&&(cats.results[i].name!="ad-hoc"))
													{
														//alert(cats.results[i].budget.amount);
														//alert((cats.results[i].budget.amount/max));
															$("#"+cats.results[i].name).barChart(
																{
																'id'         : cats.results[i].name,
											      				'color1'	 : '#993333',
											      				'color2'	 : '#339900',
											      				'value1'	 : cats.results[i].totalSpend,
											      				'value2'	 : budgetValue,
											      				'isBudget'   : isBudget,
											      				'scale'		 : 1
																}
															);
														$("#"+cats.results[i].name).data('barChart').initProgress();

													}
													else
														if ((cats.results[i].budget.amount==0)||(cats.results[i].name!="ad-hoc"))
														{
															catAdhocTransactions.results.totalSpend+=cats.results[i].totalSpend;
														}
												}
												else{
														catAdhocTransactions.results.totalSpend+=cats.results[i].totalSpend;
													}
											}
												//alert(catAdhocTransactions.results.budget);
												if ((catAdhocTransactions.results.budget!=0) || (catAdhocTransactions.results.totalSpend!=0))
												{
													$("#allcats").prepend("<div id='"+catAdhocTransactions.results.name+"'></div><div style='clear:both'></div>");

													$("#"+catAdhocTransactions.results.name).barChart(
																	{
																	'id'         : catAdhocTransactions.results.name,
												      				'color1'	 : '#993333',
												      				'color2'	 : '#339900',
												      				'value1'	 : catAdhocTransactions.results.totalSpend,
												      				'value2'	 : catAdhocTransactions.results.budget-catAdhocTransactions.results.totalSpend,
												      				'isBudget'   : 1,
												      				'scale'		 : 1
																	});
													$("#"+catAdhocTransactions.results.name).data('barChart').initProgress();
												}
												//alert("Tst");

											//alert(spent+" "+left);
											showProgressBar("balance",spent,left);

										//	showChart("balance", "#993333","#339900",spent,left);
										
										}
									 );
					});
				/*	*/
							/*showChart("Food", "#993333","#339900",10,20);
							showChart("Groceries", "#993333","#339900",130,80);*/
				}

				

				

				

				
							
	})
function showProgressBar(id,value1,value2)
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

							var curr_month=now.getMonth();

							var day=curr_date+"";
							if (day.length==1)
							{
								day="0"+day;
							}
							$("#"+name).parent().find(".dateCirle").find(".date").text(day+" "+getMonthNames(curr_month));

							/*$("#"+name).parent().removeClass();
							$("#"+name).parent().addClass('progressBar');
							$("#"+name).parent().addClass('shine');*/


							/*limitLine
							dateCirle*/
							if (limit >= perc2)
							{
								$("#"+name).parent().addClass("red");
							}
							else
							{
									$("#"+name).parent().addClass("green");
							}
						}
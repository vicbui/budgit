var loading = $.getScript('js/database.js');

$.when(loading).then(function() {
(function ($)
{
	var InputText= function(element)
	{
		var elem=$(element);
		var obj=this;
		var lastdate=new Date("1001/01/01");
		var symbols= new Object();
		var last_word,symbol="$";
		var name=elem.attr("id");
		var cat=new Array();
		var str="";
		var search_results;
		var db ;
		var timer;
		var trackDecimal=0;
		var date_pending=new Object();
		var final_text;

		//var symbols=["~"];
		/*var settings = $.extend( {
      				'id'         : '',
      				'color1'	 : '#993333',
      				'color2'	 : '#339900',
      				'value1'	 : 0,
      				'value2'	 : 0
    			}, options)*/
		//alert(elem);



					$("input[name=transTypeCat]",'#'+name+'radioBtns').bind( "click", function(event, ui) {
  							//alert("test");
  							elem.focus();
					});


					$('.'+name+'links').live('click',function(event){
						
							event.preventDefault(); 
						
							var text= elem.val();
							//alert(text+" "+$('#track_area')[0].title);
							var lastSymbol="";

							 if (elem.val() == $(elem)[0].title)
			        		 {
			            		elem.removeClass("defaultTextActive");
			            		elem.val("$0.00");
			            		text="$0.00";
			        		 }

			        		if ((elem.val()+"#").indexOf($(this).attr("name"))>-1)
					 			{
					 				$("#"+name+"errorMsg").text("You can't enter "+$(this).attr("name")+" more than once");
					 				e.preventDefault();
					 				return;
					 			}
 	



			        		symbols[symbol]=0;
			        		lastSymbol=symbol;
			       			symbol=$(this).attr("name");


			       			//if text.index

					 		symbols[symbol]=text.length-1;
					
						//	alert(symbol);
							
							if ((symbol!="+") && (symbol!="-"))
							{
								if ((text.charAt(text.length-1))!=" ")
									text=text+" ";					
								text=text+symbol;
							}
							//else
							//	text=text+symbol+"0.00";
							
							
								elem.focus();
	    						elem.val(text);
	    					
								/*if (symbol=="#")
			    				{
			    			

			    									turnAutoOn();
			    									populateList(symbol);
			    									//alert("test");
			    				}
			 	   				trackInput();
							*/
							//return false;

					});
				/*	$("#add").click(function(event){
						event.preventDefault();
						//alert("test1");
						enterToSave();
						//alert("test");
						return false;
					});*/

			elem.bind("click taphold",function() {
							//alert($("#track_area").getCursorPosition());
					        

					        if (elem.getCursorPosition()< obj.length_numbers())
    						{
    							elem.setCursorPosition(obj.length_numbers());	
    							if (symbol!="$")
    							{
    									symbols[symbol]=0;
    									symbol="$";
    									symbols[symbol]=0;
    							}	
    						}

    						var text=elem.val();
								/*********** find nearest symbol *********************/
    					    var currentString=text.substring(0,elem.getCursorPosition());
    					    var pos=obj.findLastSign(currentString);

    					    if ((currentString.charAt(pos)!=symbol)|| (pos!=symbols[symbol]))
    					    {
    					    	/*if (symbol=="#")
									obj.turnAutoOff();*/
								if (pos!=currentString.length)
    								{	
    									symbols[symbol]=0;
    									symbol=currentString.charAt(pos);
    									symbols[symbol]=pos;
    								}
    							
    					    }	
    						/******************************************************/
						});
	
					

		elem.focus(function(srcc)
		{
			 //alert("test");

			if ($(this).val() == $(this)[0].title)
			{
			    $(this).removeClass("defaultTextActive");
			    $(this).val("$0.00");
			    symbol="$";

			}
			obj.switchOnTextScreen();

		});
			    
		elem.blur(function()
		{
			if (($(this).val() == "")|| ($(this).val() == "$0.00"))
			    {
				    $(this).addClass("defaultTextActive");
			        $(this).val($(this)[0].title);
			    }
		});

 		elem.keypress(function(e) {
			if ((e.which==36)||(e.which==35)||(e.which==126))
			{



				if ((elem.val()+"#").indexOf(String.fromCharCode(e.which))>-1)
				{
					$("#"+name+"errorMsg").text("You can't enter "+String.fromCharCode(e.which)+" more than once");
					  e.preventDefault();
					 	return;
				}

			}
			if ((symbol=="$")&&(e.keyCode!=8)&&(e.keyCode != 13))
    		{
    			if(e.charCode == 35) { 	
					obj.enterHashtag(e);
				}
				else
				{
					if (e.keyCode==32)
	    			{
	    				//obj.enterHashtag(e);
	    			}
	    			else
	    			{
	    				var character=String.fromCharCode(e.keyCode);		
	    				//alert(character+" tewqr");		
	    				obj.enterNumber(character);
	    				e.preventDefault();	
	    			}

    			}
    		}
    		else{
	    			clearInterval(timer);
	    			//timer = setInterval(trackInput, 100);
	    		}

		});



    					elem.keyup(function(e){

    						

    						var text= elem.val();
    						if (text=="")
    							elem.val("$0.00");


    						/*********** find nearest symbol *********************/
    					    var currentString=text.substring(0,elem.getCursorPosition());
    					    var pos=obj.findLastSign(currentString);

    					  //  alert(currentString.charAt(pos));
    					    if ((currentString.charAt(pos)!=symbol)|| (pos!=symbols[symbol]))
    					    {
    					    	/*if (symbol=="#")
									obj.turnAutoOff();*/
								if (pos!=currentString.length)
    								{	
    									symbols[symbol]=0;
    									symbol=currentString.charAt(pos);
    									symbols[symbol]=pos;
    								}
    							
    					    }	
    						/******************************************************/
    						
    						
	    						 if (e.keyCode == 13)
	    						 {
	    						 	obj.enterToSave();
	    						 	//obj.switchOffTextScreen();
	    						 	//entertoPending(text);
	    						 }

    						 	/*if (symbol=="#") 
	    						{

	    							//alert("test");
	    							var last_char=text.substr(text.length-2,1);
	    							if (last_char!=" ")
	    							{
	    								obj.turnAutoOn();	
		    							obj.populateList(symbol);
		    						}	
	    						}*/

								



	    						if (symbol=="$")
    							{
    									var pos=obj.findNextSign(text.indexOf("$")+1,text);
    									elem.setCursorPosition(pos);
    								
    								//alert(symbol);
    								if (e.keyCode != 8)
    								{
    									//alert("test");
    								//	var beforeSign=text.substring(0,text.indexOf("$")+1);
	    							//	var afterSign=text.substring(text.indexOf("$")+1,text.length);
	    								//alert(afternumber);
	    								
		    							/*var deleteString=text.substring(0,$("#track_area").getCursorPosition());
		    							//alert(deleteString+"aaa");
		    							var last_space=$("#track_area").getCursorPosition()-1;
		    							var last_char=text.charAt(last_space);
		    							alert(last_char);
		    							//if 
		    							
		    						//		console.log(afternumber);
		    							if ((isNumber(last_char)) && (text.charAt(last_space-2)=="."))
		    							{
		    							//	alert(afternumber);
		    						//		$('#track_area').val($('#track_area').val()+afternumber);
		    								
		    						//		afternumber="";
	    								}*/	    							//	console.log(length_numbers());
	    							}
    							}

    					})

    					elem.keydown(function(e){
    						
    						/*if (elem.is(":focus")) {

								
							}*/
							//alert("test");
						
							//alert(elem.val());
							var text= elem.val();
							if ((elem.is(":focus"))) {


							 	if (($("#"+name+"functionBar").is(':visible'))==false)
							 	{
							 		if (text=="$0.00")
									{
										obj.switchOnTextScreen();
									}
								}
							}
							

							//console.log(text+" test");
    						
    						if (elem.getCursorPosition()<obj.length_numbers())
    						{
    							elem.setCursorPosition(obj.length_numbers());
    							if (symbol!="$")
    							{
    									symbols[symbol]=0;
    									symbol="$";
    									symbols[symbol]=0;
    							}

    							e.preventDefault();
    							return false;
    						}
    						else
    						{

	    						if (e.keyCode==8)
	    						{
	    							
		    						if (symbol=="$") 
		    						{
		    							var beforeSign=text.substring(0,text.indexOf("$")+1);
		    							var afterSign=text.substring(text.indexOf("$")+1,text.length);
		    							var deleteString=text.substring(0,elem.getCursorPosition());
		    							//alert(deleteString+"aaa");
		    							var last_space=elem.getCursorPosition()-1;
		    							//alert(text.charAt(last_space));

		    							var last_char=text.charAt(last_space);
		    							//alert(text.charAt(last_space-2));
		    							
		    			//				if (isNumber(last_char)) alert(text+" "+last_char);
		    					//		afternumber="";
		    							if ((obj.isNumber(last_char)) && (text.charAt(last_space-2)=="."))
		    							{
		    								e.preventDefault();
		    								trackDecimal--;
		    								var number=text.substring(text.indexOf("$")+1,last_space+1);
		    							//	alert(number);
		    								var decimal=number.substring(number.indexOf(".")+1,number.length);
		    								var n=number.substring(0,number.indexOf("."));
		    								afternumber=text.substring(last_space+1,text.length);
										
		    								//alert(afternumber+" "+trackDecimal);

		    								//if (afternumber.length>0)
		    								//	afternumber=" "+text.substring(last_space+1,text.length)+" ";

		    								//alert(afternumber);
		    							//	if (n.length>1)
		    							//	{
		    									decimal=n.substr(n.length-1,1)+decimal;
		    									n=n.substring(0,n.length-1);
		    									
		    									//alert(n+"."+decimal);
		    									if (n=="") n="0";
		    									if (decimal.length==1) 
		    										decimal="0"+decimal;
		    									//console.log(n+"d"+decimal);
		    							
		    								decimal=decimal.substring(0,decimal.length-1);
		//    								console.log(decimal+" decimal");
			

		    									if ((n=="0") && (decimal=="00"))
		    									{
		    										trackDecimal=0;
		    										//var stringToReplace=symbol+"0.00";
		    										
		    									//	var newtext=$('#track_area').val().replace(stringToReplace,"");
		    									//	$('#track_area').val(newtext);
		    										//alert(afternumber);
		    										
		    									//	return false;
		    									}
		    									
		    									elem.val(text.substring(0,text.indexOf("$")+1)+n+"."+decimal);
		    									elem.val(elem.val()+afternumber);

		    								text=elem.val();	
			    							var pos=obj.findNextSign(text.indexOf("$")+1,text);
	    									elem.setCursorPosition(pos);
		    									//else
											
		    							//	}
		    							//	else
		    							//	{

		    							//	}

		    								//	alert(n+"r"+decimal);
		    								//if (n!="0")
		    								//{

		    								//}

		    								//alert(decimal+"r"+n);

		    								//alert(number);
		    								//alert(chare);
		    							/*	if ((no=="0.00") && (chare=="$"))
		    									$('#track_area').val("");
		    								else
		    								{
		    									var string=text.substring(text.indexOf(symbol),text.indexOf("$")+1);
		    									//alert(string);
		    									//alert(text+" "+string);
		    										
		    								}*/


		    							
		    							}

		    						}
		    						
		    				
		    						
		    						//trackInput();
		    						//alert(symbol);
	    						}
		      				}
		      				//trackInput();

    							
    					});

	this.enterToSave=function()
					{
						
						var text=elem.val();
						if ((text!=""))
						{
							this.entertoPending(text);
							//alert(+" enter pending");
					
						}

						text=elem.val();
						//alert(text+"a");
						//alert(trimString($("#resultMsg").text())+" "+);

						if (this.trimString($("#"+name+"resultMsg").text())!="")
						{	
							if ((text=="") || (elem[0].title==text)  || (text=="$0.00") )
							{
							//	if ((text== ) &&()!=""))
								{
									this.saveTrans();		
									this.clear();
									this.switchOffTextScreen();

									/*$.mobile.changePage( "index.html", {
														transition: "slideup",
												reverse: true,
													
									});*/
								}
							}
						}						
					}
	/************ save transaction *******************/

	this.clear=function ()
				{
					this.turnAutoOff();
					$("#"+name+"resultMsg").html("");
					$("#"+name+"errorMsg").html("");
					lastdate=new Date("01/01/1001");
					last_word="",
					symbol="$";
					trackDecimal=0;
					date_pending=new Object();	

					db.transaction(getCats,errorDB,function(){ search_results=cat; });
				}
	this.saveTrans=function ()
				{
					//$("#re")
					//alert(this.decompose("aa"));
					var obj=this;
					var results=$("#"+name+"resultMsg");
					results.children('div').each(function(){
						var insertDate=$(this).attr("class");
						var trans=$(this).text();
						//alert(trans);
						if (trans.charAt(1)!="O")
						{
							var data= obj.decompose(trans);

							var now = new Date();
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

							var created_at=insertDate+" "+curr_hour+":"+curr_min+":"+curr_sec;
						
							data['createdDate']=created_at;
							//searchCatsByName(db,"");
						//	tst();
							db.transaction(function(db)
				 				   {
				 				   		catFindIdName(db,data);
				 				   		//alert("test");
				 				  	 	//searchCatsByName(db,string);
				 				  	
				 				    },errorDB,function()
				 				    		  {  	
				 				    			
				 				    		  	//updateChart();
				 				    		  	//loadAllDashboard();
				 				    		  											

				 				    		  	obj.updateChart(data['cat']);

				 				    		  }  
				 				    );

							
						} 
						//alert(childrenClass+);
						//var =



					})

				}
	this.updateChart=function(name)
				{
					//alert("test");
					var value=new Object();
					value.left="";
					value.spent="";
					db.transaction(function(db){

										get_cat_balance_by_name(db,name,value);
									},errorDB,function(){
										//alert("finish");
										//this.showChart(name,"#993333","#339900",value.spent,value.left);
										//alert(value.spent+" "+value.left);
										$("#total").data('barChart').showChart('total','#993333', '#339900', value.spent,value.left);
									})

					var transactions=new Object();
					transactions.data= new Array();
					db.transaction(function(db)
								 				   {
								 				   		get_trans_last_7_days_by_cat_name(db,name,transactions);
								 				    },errorDB,function()
								 				    		  { 
								 				    		  	var chartValue=new Array();
								 				    		  	var seven_dates=new Array();
								 				    		  	seven_dates=process_seven_days(transactions.data);
								 				    		  	for (var i in seven_dates)
															 	{
															 		chartValue.push(seven_dates[i] * -1);
															 	}
															 
															 	$("#lineChart").data('barChart').lineChart('lineChart','#5E87B0',chartValue);
								 				    		  });	
					var transactions1=new Object();
					transactions1.results= new Object();
					db.transaction(function(db)
								 				   {
								 				   		var current_month= (new Date().getMonth()+1)+"";
								 				   		//alert(current_month);
								 						get_trans_perc_by_cat_name_month(db,name,current_month,transactions1);	    
								 					},errorDB,function()
								 				    		  { 
								 				    		  	//alert("test");
								 				    		  	//alert(transactions1.results.perccat+" "+transactions1.results.percothers);
								 				    		  		var chartValue1 = [transactions1.results.perccat,transactions1.results.percothers];
																	$("#pieChart").data('barChart').pieChart('pieChart','#993333', '#339900',chartValue1);
															  });

								$("#list").html("");
								
									window.localStorage.setItem("current_page",1);
									var transactions2=new Object();
									transactions2.results= new Array();
									$("#list").parent().find(".end").remove();
									addResultToList(db,transactions2,name,5);
								

									function  addResultToList(db,transactions2,name,itemPerLoad)
									{
										db.transaction(function(db)
								 		{
							 	  		    var current_page=window.localStorage.getItem("current_page");
								 			var offset=itemPerLoad*(current_page-1);
								 			var limit=itemPerLoad;
								 			get_trans_date_paging_by_cat_name(db,name,offset,limit,transactions2);
								 			   
								 		},errorDB,function()
								 				    {
								 				 	 var current_page=window.localStorage.getItem("current_page");
								 		 		  	 var str="";
								 		 		  		
								 		 		  		for (var i in transactions2.results)
								 		 		  		{	
								 		 		  			//	alert(transactions2.results[i]);
								 		 		  				var aDate=transactions2.results[i];
								 		 		  				var idName='collapse'+i+'page'+current_page+'';
								 		 		  				//alert(transactions2.results[i]);
											 		 		  	var str='<div data-role="collapsible">'+
																'<h2 data-icon="false">'+
																	'<span style="float:left">'+formatDate(aDate)+'</span>'+
																	'<span style="float:right" id="pricecollapse'+i+'page'+current_page+'"></span>'+
																'</h2><ul id="collapse'+i+'page'+current_page+'" data-role="listview"></ul></div>'
																 	  
																$("#list").append(str).collapsibleset("refresh");
																
														 		get_trans_date_by_cat_name_date(db,name,aDate,idName,addToCollapse);
						
		 		 		  								}
		 		 		  								$("#list").parent().find(".loading").remove();
		 		 		  								$(".loadmore").show();

		 		 		  								if (transactions2.results.length==0)
		 		 		  								{
															$("#list").parent().append('<div class="end">No more transactions</div>');
															$(".loadmore").hide();
		 		 		  								}
						 				    		});
						
									}										
									var addToCollapse = function (alltrans)
									{
										var str="";
										$("#price"+alltrans.divname).text("$"+alltrans.total+" ("+alltrans.results.length+")");

										for (var i in alltrans.results)
										{
											str+= '<li data-icon="false" style="overflow:hidden">';
											str+= '<span style="float:left">'+ capitaliseFirstLetter(alltrans.cat)+'</span>';
											str+= '<span style="float:right">$'+alltrans.results[i]+'</span>';
											str+= '</li>'
										}
							
										$("#"+alltrans.divname).append(str);
										$("#"+alltrans.divname).listview();
										$("#"+alltrans.divname).listview("refresh");
							
									}


				}

	this.decompose=function (trans)
				{

					var data=new Object();
					trans= this.trimString(trans);
					//alert(trans);
					var string,amount="",cat="",opt="";



					var postSign= trans.indexOf("$");
					string=trans.substring(postSign+1,trans.length);

					var postNextSign= this.findNextSign(0,string);
					var amount=string.substring(0,postNextSign);
					//console.log(amount);

					/*var postHash= trans.indexOf("#");
					string=trans.substring(postHash+1,trans.length);
					postNextSign= findNextSign(0,string);
					var cat =string.substring(0,postNextSign);*/
					//console.log(cat);				
					cat=this.trimString($("#catTitle").text());
				//	alert(cat);

					var postOpt= trans.indexOf("~"),opt;
					if (postOpt>-1)
					{	
						string=trans.substring(postOpt+1,trans.length);
						//postNextSign= this.findNextSign(0,string);
						var opt =string;
						//console.log(opt);				
					}
					else 
						opt="";


						data['amount']=parseFloat(amount);
						//alert(amount);
						if (trans.charAt(0)=="-")
							data['amount']=-data['amount'];
						//alert(data['amount']);
						data['cat']=cat.toLowerCase();
						data['opt']=opt;

					
					
					return data;
				}
						


	this.entertoPending=function(text)
						{
							  $('#'+name+'errorMsg').html("");
    						  var line=text.substr(0,text.length);
    						  var newline="\n"+line;
    						  var posBreak=newline.lastIndexOf("\n");
    						 // console.log(newline);
    						 // console.log(posBreak);
    						  var msg=this.stringValidate(newline.substring(posBreak,newline.length));
    						//  alert(msg);
    						  //alert(msg);
    						   if (msg!="")
    						   {
    						 //  	e.preventDefault();
    						   	//alert(msg);
    						   	elem.val(line);
    						   	$('#'+name+'errorMsg').html(msg);
    						   //	return false;
    						   }
    						   else
    						   {
    						   	 var daten=$("#"+name+"scroller").scroller('getDate');
    						   	 var date=jQuery.scroller.formatDate('yy-mm-dd',daten);
    						   	 	
    						     if (lastdate.getTime()!=daten.getTime())
    						   	 {
    						   	 	//alert(daten+" "+lastdate);
    						   	 	
    						   	 	var string=this.trimString($('#'+name+'resultMsg').html())+"<div class='"+date+"'> On "+ date +" :</div>";
    						   	 	$('#'+name+'resultMsg').html(string);
    						   	 	date_pending[date]=0;
    						   	 	lastdate=daten;
    						   	 }
    						   
    						    var transType=$('input[name=transTypeCat]:checked', '#'+name+'radioBtns').val();
    						   	

    						   //	 alert($('#resultMsg').html());
    						   	var resultMsg= $('#'+name+'resultMsg').html()+"<div class='"+date+"'' style='font-size:11px'>"+transType+this.trimString(text)+"<a class='deleteLink' href='#''> <img src='img/round_delete.png' width='7px' height='7px'/></a></div>";
    						   
    						   	date_pending[date]++;
    						   	//console.log(resultMsg);
    						   	$('#'+name+'resultMsg').html(resultMsg);
    						   	elem.val("$0.00");
    						   
    						   	trackDecimal=0;
    						   	symbols[symbol]=false;
    							symbol="$";
    						   }
    						  // else
    						 
						}

		this.enterNumber=function(last_char)
				{
					//alert("sarewqrwq");
					if (this.isNumber(last_char))
					{
						
						trackDecimal++;
					//	if ((trackDecimal==1) && (last_char=="0"))
					//		trackDecimal--;
						//alert(trackDecimal);
						//alert(last_char);
						var text=elem.val();
						//alert(text);
						elem.val("");
		    		
						var pos=this.findNextSign(1,text);
						var afternumber="";
					
						if (pos!=text.length)
							afternumber=text.substring(pos,text.length);
						
							
						//alert(afternumber);
					
						text=text.substring(0, pos);
						//alert(afternumber);
					//	alert(text);
		    			if (trackDecimal<=2)
		    			{
		    				//text=text.substr(0,text.length-1);
		    				//console.log(text+" before text");
		    				var previousLastChar = text.substr(text.length-1,1);
		    				//console.log(text+" previousLastChar");
		    				//alert(previousLastChar);
		    				final_text= text.substr(0,text.length-2);
		    				//alert(final_text);
		    				//console.log(text+" previousLastChar");
		    				final_text+= previousLastChar + last_char;
		    				
		    			
		    			}
		    			else
		    			{
		    				text=text+last_char;
		    				//console.log(text);
		    			//	alert(trackDecimal);
		    				//text=text.substr(0,text.lengthgth-1);
		    				var decimal_portion=text.substr(text.length-2,2);
		    		//		alert(decimal_portion+" decimal");
		    			

		    				var digit=text.substr(0,text.length-2);
		    			//	alert(digit);
		    				if (trackDecimal==3)
		    				{
		    				//	alert("test");
		    					var number=digit.substr(digit.length-1,1);

		    					digit=digit.substring(0,digit.indexOf('0'))+number;
		    			//		alert(digit);
		    					//var number=;
		    					//alert(number);
		    					//number=+number;
		    					//alert(number);
		    				}
		    				else
		    					digit=digit.replace(".","");
		    				//alert(digit+" digit");
		    				final_text=digit+"."+decimal_portion;
									    								

		    			/*	if (last_char==0 && trackDecimal==3)
		    				{
		    					trackDecimal--;
		    				}
		    				else
			    			{
			    				if (trackDecimal==3)
			    				{
			    					final_text= text.substr(0,text.length-4);	
			    				}
			    				else
			    					final_text= text.substr(0,text.length-3);
			    				
			    				final_text += last_char+decimal_portion; 
		    				}*/
		    				//$('#track_area').val("");
		    			}
		    			final_text+=afternumber;

		    			elem.val(final_text);
		    			text=elem.val();
		    			//$('#track_area').setCursorPosition(pos);
		    			pos=this.findNextSign(text.indexOf("$")+1,text);
    					elem.setCursorPosition(pos);
		    			//$('#track_area').selectRange($('#track_area').val().length,$('#track_area').val().length);
		    			//alert("test");
		    			//setCaretToPos($('#track_area'), $('#track_area').val().length-1);

					}
					else
						$('#'+name+'errorMsg').html("Enter Number Only");
									
				} 

		this.stringValidate=function(string)
				{

						string=this.trimString(string);
						//console.log(string);
						var msg="";
					//	var symbols= ["+","-","#"];
						var text=string;
						var posPlus= text.indexOf("+");
						var posMinus=text.indexOf("-");
	    				var posSign=0;
	    				var posHash=0;

	    			/*	if 	((posPlus*posMinus >0) && (posPlus+posMinus==-2))
	    				{
	    					msg+='Enter either "+" or "-"<br>';
	    				}*/
	    				//console.log(posPlus);
	    				//console.log(posMinus);

	    				if (this.trimString(string) == this.trimString(elem[0].title))
						{ 
							//alert(string);
							return "Transaction can't be blank";
						}
						
						posSign= text.indexOf("$");
					
	    				if (posSign>=0)
	    				{
	    					var amount= text.substring(posSign+1,text.length);
		    				var charCut=text.length;
		    				if (amount.indexOf(" ")>-1)
		    				{
		    					charCut=amount.indexOf(" ");
		    				}
		    				//alert(charCut);
		    				if ((amount.indexOf("#")< charCut) && (amount.indexOf("#")>-1))			
		   						charCut=amount.indexOf("#");
		   					//if (charCut=-1)
		   					if (charCut>-1)
		    					amount=amount.substring(0,charCut);
		    				//alert(amount+" "+charCut);


		 					if (this.isNumber(amount)==false)
		 						msg+="Amount is not a number <br>";
		 					if (amount=="0.00")
		 						msg+="Amount must not be zero <br>";
	    				}
	    				else
	    						msg+="Enter the currency ($) <br>";		

	    				/*posHash= text.indexOf("#");
	    				if (posHash==-1)
	    				{
	    					msg+= "Enter a category starts with #<br>";
	    				}
	    				else
	    					{
		    					var category= text.substring(posHash+1,text.length);
			    				if (category.indexOf("~")>-1)
			    				{
			    					category=category.substring(0,category.indexOf("~"));
			    				}
			 					if (category=="")
			 						msg+= "Category cannot be blank<br>";
		 					}	
						*/
	    	
						return msg;
				}
		this.isNumber=function(n) {
				  return !isNaN(parseFloat(n)) && isFinite(n);
				}
		this.enterHashtag= function(e) 
		{
			elem.val(elem.val()+" #");
	    	symbols[symbol]=0;
	    	symbol="#";
	    	symbols[symbol]= elem.val().length-1;
	    	this.turnAutoOn();
	    	this.populateList(symbol);
			$("#"+name+"errorMsg").text("");
	    	e.preventDefault();
		}
		this.turnAutoOn = function()
		{
			//symbols[symbol]=true;
			//alert("on");
			$('#'+name+'track_area').css('max-height',"35px");
	    	$('#'+name+'instructionTxt').hide();
	    	$('#'+name+'suggestions').show();
			//return true;

		}
		this.turnAutoOff= function()
		{
			//symbols[symbol]=false;
    		$('#'+name+'instructionTxt').show();	
    		$('#'+name+'track_area').css('max-height',"100px");
    		$('#'+name+'suggestions').hide();
    		this.clearSuggestList();
    		return false;
		}
		this.clearSuggestList=function ()
		{
			var sugList = $("#"+name+"suggestions");
   			sugList.html("");
    		sugList.listview("refresh");
		}


		this.searchStringInArray=function (string) {
					search_results=new Object();
			 		search_results.result=new Array();

					//search_result.result=new Array();
				 	str="";

					db.transaction(function(db)
				   	{
				  		search_results=new Object();
				  		search_results.result=new Array();
				  		//alert("test");
				 		searchCatsByName(db,string,search_results);
				    },errorDB,function(){  	
				 				    		  	str="";
				 				    		  	var sugList = $("#"+name+"suggestions");
											  //  alert(search_results.result);

				 				    		  	for (var i=0, len=search_results.result.length;i<len;i++)
    											{
    												str += "<li data-icon='false' title='"+search_results.result[i]+"''><a style='font-size:12px'>" +search_results.result[i] +"</a></li>";
    											}

    											if (search_results.result.length==0)
    											{
													str += "<li data-icon='false' title='not found'><a style='font-size:12px'>not found</a></li>";
    				    						}

    											sugList.html(str);
    											sugList.listview("refresh");
				 			  		    }  
				 			  );
									
				   /* for (var j=0; j<stringArray.length; j++) {
				        if (stringArray[j].match (string)) 
				        	{
				        		search_results.push(stringArray[j]);
				        		//alert(stringArray[j]);
				        	}
				        	

				    }*/
				    return search_results;
				}


		this.populateList= function(symbol)
			{
				var text= elem.val();	
					
				this.processKey(symbol,text);
				//alert(symbol);    			
			}
		this.processKey= function(symbol,text)
		{	
			//	alert(symbol+" "+text+"a");
			var position = text.indexOf(" ",text.indexOf(symbol));
			position = text.length;
    		string= text.substring(text.indexOf(symbol)+1,position);
    	//	alert(string+"a");
    		//trimString(string);
    		var str="";
    		//	console.log(string);
    		//	alert(string);
    		if (this.trimString(string)=="")
    		{
    			this.setListDefault();
    		}
    		else
    			this.searchStringInArray(this.trimString(string));
 		}



		this.length_numbers = function()
		{

			var i=this.findNextSign(1,elem.val());
					 		//alert(i);
			var string=elem.val().substring(0,i);
					 		//alert(string);
			return string.length;
		}

		this.findNextSign=function(pos,string)
		{
					for (var i=pos; i<string.length;i++)
    				{
    					//alert(string.charAt(i));
    					if ((string.charAt(i)==" ")||(string.charAt(i)=="#")||(string.charAt(i)=="$")||(string.charAt(i)=="~"))
    					return i; 
    				}
    				return string.length;
		}

		this.findLastSign=function(string)
				{
					for (var i=string.length-1; i>=0;i--)
    				{
    					if ((string.charAt(i)=="#")||(string.charAt(i)=="$")||(string.charAt(i)=="~")||(string.charAt(i)==" "))
    				
    					return i; 
    				}
    				return string.length;
				}	

		this.setSettings=function(options)
		{
			//alert(settings.id);
			settings= $.extend( {
      				'id'         : '',
      				'color1'	 : '#993333',
      				'color2'	 : '#339900',
      				'value1'	 : 0,
      				'value2'	 : 0
    			}, options)			
		}
		this.trimString=function (str) {
					    str = str.replace(/^\s+/, '');
					    for (var i = str.length - 1; i >= 0; i--) {
					        if (/\S/.test(str.charAt(i))) {
					            str = str.substring(0, i + 1);
					            break;
					        }
					    }
					    return str;
					}
		this.setListDefault=function ()
					{

							//alert("test");
							search_results=cat;
							str="";
							//console.log(search_results);	
							var sugList = $("#"+name+"suggestions");
				 				//console.log(search_results);
				 			for (var i=0, len=search_results.length;i<len;i++)
    						{

    							str += "<li data-icon='false' title='"+search_results[i]+"''><a style='font-size:12px'>" +search_results[i] +"</a></li>";
    						}
    						//console.log(str);
    						
    						sugList.html(str);
    						sugList.listview("refresh");

					}



		
		this.init=function()
		{
				var $this=$(element);
				//alert("test");
				var name=($this.attr("id"));
				

				elem.parent().find('#'+name+'txtSection').remove();
				$this.after('<div id="'+name+'txtSection"><div style="clear:both"></div><div id="'+name+'functionBar" style="display:none">'+
            					'<div style="font-size:11px;color:dark-gray; padding-bottom:0px;" id="'+name+'instructionTxt">'+
									'<div class="navlink ui-grid-a" data-role="none">'+
										'<div class="ui-block-a scrollable" id="'+name+'resultMsg" style="text-align: left;height:50px"></div>'+
										'<div class="ui-block-b scrollable" id="'+name+'errorMsg"  style="color:red;text-align:left;height:50px"></div>'+
									'</div>'+
								'</div>'+
								'<ul id="'+name+'suggestions" data-role="listview" data-inset="true" class="scrollable" style="display:none"> </ul>'+
								'<div style="background-color:lightgray; height:25px;" >'+
									'<div class="navlink" data-role="none">'+
										'<div style="width:100%;float:left">'+
												'<a class="'+name+'links" data-role="none" name="~"  href="#" style="float:left;width:5%;">~ </a>'+
												'<div class="navlink" style="text-align: right; margin-top:3px;padding-right:10px;float:left;width:30%;">'+
													'<input id="'+name+'scroller" name="scroller" style="display:none;" />'+
													'<a href="#" id="'+name+'dateLnk" style="font-size:16px;color: gray;" >12-20-32</a>'+
												'</div>'+
												'<fieldset data-role="controlgroup" data-mini="true" data-type="horizontal" id="'+name+'radioBtns" style="float:left;width:40%;padding-top:5px">'+
												     	'<input type="radio" name="transTypeCat" id="'+name+'radioIncome" value="+" style="font-size:10px; height:0px" />'+
												     	'<label for="'+name+'radioIncome" class="radiobtn" >Income</label>'+
												     	'<input type="radio" name="transTypeCat" id="'+name+'radioExpense" value="-" checked="true" style="font-size:10px; height:0px"/>'+
												     	'<label for="'+name+'radioExpense" class="radiobtn">Expense</label>'+
												'</fieldset>'+	
										'</div>'+
									'</div>'+
								'</div>'+ 
							'</div></div>');
          		
			$this.parent().trigger('create');
			db= openDB();
			/*date picker */
						$("#"+name+"scroller").scroller({ 
													display :'modal',
													preset : 'date',
													theme : 'android-ics',
													dateOrder: 'ddmmyy',
													dateFormat:  'dd-mm-yy',
													setText : 'Select',
 													anchor : $("#"+name+"dateLnk"),
 													height:40,
 													width:60,
 													headerText:false,
 													onSelect: function(value,inst){
 														 $("#"+name+"dateLnk").text(jQuery.scroller.formatDate('dd-mm-yy',$("#"+name+"scroller").scroller('getDate')));	
					
 													}
												});
					 	$("#"+name+"dateLnk").text(jQuery.scroller.formatDate('dd-mm-yy',$("#scroller").scroller('getDate')));	
					 	$("#"+name+"dateLnk").click(function(event){
							event.preventDefault();
							
							$("#"+name+"scroller").scroller("show");

							return false;
						});


		
	}
	this.switchOnTextScreen=function ()
				{
					//disable top
					//alert("test");
					//$("#profileCat").hide();
					//enable nav link
					$("#"+name+"functionBar").show();
					$("#todayTxtCat").text("E.g: $10 #food or $20 #groceries ~optional text");
					$.mobile.silentScroll(0);
					//$("#add").show();
					//$("#deleteBtn").show();
					//add button
				} 
	this.switchOffTextScreen=function ()
				{
					//after save data 
					//disable nav link
					//enable title 
					//refresh chart
					//$("#profileCat").show();
					//enable nav link
					$("#"+name+"functionBar").hide();
					$("#todayTxtCat").text("Today's transaction");
					//$("#add").hide();
					//$("#deleteBtn").hide();
			
					//return
					//hide button

				}
  }
	$.fn.inputText = function() {
	    /*
	    // Method calling logic
	    if ( methods[method] ) {
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	      return methods.init.apply( this, arguments );
	    } else {
	      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
	    } */

	    return this.each(function(){
	    	var element= $(this);
	    	
	    	if (element.data('inputText')) return;
	    	
	    	var inputtext= new InputText(this);
	    	
	    	element.data('inputText',inputtext);

	    })

    }   
    $.fn.getCursorPosition = function() {
				        var el = $(this).get(0);
				        var pos = 0;
				        if('selectionStart' in el) {
				            pos = el.selectionStart;
				        } else if('selection' in document) {
				            el.focus();
				            var Sel = document.selection.createRange();
				            var SelLength = document.selection.createRange().text.length;
				            Sel.moveStart('character', -el.value.length);
				            pos = Sel.text.length - SelLength;
				        }
				        return pos;
				    }
})(jQuery);
})
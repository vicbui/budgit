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
						$('selectRecurring').selectmenu({ preventFocusZoom: true });

					
				
						populateRecurring();

						$("#scroller").scroller({ 
													display :'modal',
													preset : 'date',
													theme : 'android-ics',
													dateOrder: 'ddmmyy',
													dateFormat:  'dd-mm-yy',
													setText : 'Select',
 													anchor : $("#dateLnk"),
 													height:40,
 													width:60,
 													headerText:false,
 													onSelect: function(value,inst){
 														 $("#dateLnk").text(jQuery.scroller.formatDate('dd-mm-yy',$("#scroller").scroller('getDate')));	
					
 													}
												});
					 	$("#dateLnk").text(jQuery.scroller.formatDate('dd-mm-yy',$("#scroller").scroller('getDate')));	
					 	$("#dateLnk").click(function(event){
							event.preventDefault();
							
							$("#scroller").scroller("show");

							return false;
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
						
					 	function length_numbers()
					 	{

					 		var i=findNextSign(1,$("#track_area").val());
					 		//alert(i);
					 		var string=$("#track_area").val().substring(0,i);
					 		//alert(string);
					 		return string.length;
					 	}

					
						$("#track_area").bind("click taphold",function(e) {
							//alert($("#track_area").getCursorPosition());
					      e.stopImmediatePropagation();
					        //alert("Test");

					        if ($('#track_area').getCursorPosition()<length_numbers())
    						{
    							$('#track_area').setCursorPosition(length_numbers());	
    							if (symbol!="$")
    							{
    									symbols[symbol]=0;
    									symbol="$";
    									symbols[symbol]=0;
    							}	
    						}

    						var text=$("#track_area").val();
								/*********** find nearest symbol *********************/
    					    var currentString=text.substring(0,$("#track_area").getCursorPosition());
    					    var pos=findLastSign(currentString);

    					  //  alert(currentString.charAt(pos));
    					    if ((currentString.charAt(pos)!=symbol)|| (pos!=symbols[symbol]))
    					    {
    					    	if (symbol=="#")
									turnAutoOff();
								if (pos!=currentString.length)
    								{	
    									symbols[symbol]=0;
    									symbol=currentString.charAt(pos);
    									symbols[symbol]=pos;
    								}
    							
    					    }	
    						/******************************************************/
						});
						
    					
//  alert($("#track_area").getCursorPosition()<4);


					 	$('#track_area').keypress(function(e) {


					 		if ((e.which==36)||(e.which==35)||(e.which==126))
					 		{	
					 			//alert(String.fromCharCode(e.which)+" "+$('#track_area').val());
					 			//console.log("aaa"+e.which+"aaa");
					 			if ($('#track_area').val().indexOf(String.fromCharCode(e.which))>-1)
					 			{
					 				//alert($('#track_area').val());
					 				$("#errorMsg").text("You can't enter "+String.fromCharCode(e.which)+" more than once");
					 				e.preventDefault();
					 				return false;
					 			}
					 		//	else

					 		}
					 	//	alert
					 	

							if ((symbol=="$")&&(e.keyCode!=8))
    						{
    							 if(e.charCode == 35) { //@ Symbol
    							 	//alert("test");
    							 	 //$("#track_area").setCursorPosition(2);

					             enterHashtag(e);
    							////	$("#errorMsg").text("");

					         	 }
					         	 else
					         	 {
					         

	    							if (e.keyCode==32)
	    							{
	    								enterHashtag(e);
	    							}
	    							else
	    							{
	    								var character=String.fromCharCode(e.keyCode);
	    								console.log(character+" "+e.keyCode);
	    								
	    								enterNumber(character);
	    								//if (e.keyCode!= 32)
	    								e.preventDefault();
	    								
	    							}

    							}
    						}
    						else{

	    					 		clearInterval(timer);
	    					 		timer = setInterval(trackInput, 100);
	    								console.log("input");
    						}

					 		e.stopImmediatePropagation();


					    });



    					$('#track_area').keyup(function(e){

    						e.stopImmediatePropagation();
    					//	if ($("#errorMsg").text().indexOf("more than once")>-1)
					 	//		alert($('#track_area').val());
    						

    						var text= $('#track_area').val();
    						if (text=="")
    							$('#track_area').val("$0.00");


    						/*********** find nearest symbol *********************/
    					    var currentString=text.substring(0,$("#track_area").getCursorPosition());
    					    var pos=findLastSign(currentString);

    					  //  alert(currentString.charAt(pos));
    					    if ((currentString.charAt(pos)!=symbol)|| (pos!=symbols[symbol]))
    					    {
    					    	if (symbol=="#")
									turnAutoOff();
								if (pos!=currentString.length)
    								{	
    									symbols[symbol]=0;
    									symbol=currentString.charAt(pos);
    									symbols[symbol]=pos;
    								}
    							
    					    }	
    						/******************************************************/


    					/*	if ((text.lastIndexOf(symbol)==-1) || (text.lastIndexOf(symbol)!=symbols[symbol])) 
    							{
    								//alert(symbol+" symbol");
    								text.lastIndexOf(symbol);
    								//alert(symbol+"a"+symbols[symbol]+"a"+text.lastIndexOf(symbol));
    								if (symbol=="#")
										turnAutoOff();

    								var deleteString=text.substring(0,$("#track_area").getCursorPosition());
    								//alert(deleteString+"string");
    								var pos=findLastSign(deleteString);
    								//alert(pos);
    								if (pos!=deleteString.length)
    								{	
    									symbols[symbol]=0;
    									symbol=deleteString.charAt(pos);
    									symbols[symbol]=pos;
    								}
    								else
    									symbol="~";
    								//alert(symbol);
    							}
					*/

    						
    						
	    						 if (e.keyCode == 13)
	    						 {
	    						 	enterToSave();
	    						 	//switchOffTextScreen();
	    						 	//entertoPending(text);
	    						 }

    						 	if (symbol=="#") 
	    						{

	    							//alert("test");
	    							var last_char=text.substr(text.length-2,1);
	    							if (last_char!=" ")
	    							{
	    								turnAutoOn();	
		    							populateList(symbol);
		    						}	
	    						}

								



	    						if (symbol=="$")
    							{
    									var pos=findNextSign(text.indexOf("$")+1,text);
    									$('#track_area').setCursorPosition(pos);
    								
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

    					$('#track_area').keydown(function(e){
    						$("#errorMsg").text("");
    						e.stopImmediatePropagation();
    						if ($("#track_area").is(":focus")) {
								if ($("#profile").is(':visible'))
								{
									switchOnTextScreen();
								}
							}

    						//e.preventDefault();


    						//alert(e.charCode);
    						//if ((e.shiftKey) && (String.fromCharCode(e.keyCode)=="3"))
    						//	alert("test");

    						//alert();


       						var text= $('#track_area').val();
    						/*if ($('#track_area').getCursorPosition()<length_numbers())
    						{
    							$('#track_area').setCursorPosition(length_numbers());
    							if (symbol!="$")
    							{
    									symbols[symbol]=0;
    									symbol="$";
    									symbols[symbol]=0;
    							}

    							e.preventDefault();
    							return false;
    							//alert("test");	
    						}
    						else*/
    						{

	    						if (e.keyCode==8)
	    						{
	    							
	    							//alert(symbol);

	    							//alert();

	    							//alert(symbol);
	    							//alert(text.substr(text.length-1,1)+ symbol);

	    						//	alert(last_char);
		    						/*if (text.indexOf(symbol)==-1)
		    						{
		    						}*/
		    					/*	if (text.indexOf("$")==-1) 
		    						{

		    							if (symbol=="+")
		    							{
		    								text=text.replace("+ ","");
		    								$('#track_area').val(text);
		    							}
		    							else
		    								if (symbol=="-")
		    								{
		    									text= text.replace("- ","");
		    								 	$('#track_area').val(text);
		    								}
		    							 
		    						}*/
		    					
		    						if (symbol=="$") 
		    						{
		    							//alert("test");
		    						//	var last_space=text.indexOf(" ",text.indexOf("$")+2);
		    							var beforeSign=text.substring(0,text.indexOf("$")+1);
		    							var afterSign=text.substring(text.indexOf("$")+1,text.length);
		    							//alert(beforeSign+"before"+afterSign);
		    							//var last_space=findNextSign(afterSign)+beforeSign.length;
		    							//alert(last_space);
		    							//alert(last_space+" "+text.charAt(last_space)+" last pace");
									    							
		    							//alert(last_space+" last last_space");
		    							//if (last_space==-1)
		    							//{
		    							//	last_space=text.length;
		    							//}

		    							var deleteString=text.substring(0,$("#track_area").getCursorPosition());
		    							//alert(deleteString+"aaa");
		    							var last_space=$("#track_area").getCursorPosition()-1;
		    							//alert(text.charAt(last_space));

		    							var last_char=text.charAt(last_space);
		    							//alert(text.charAt(last_space-2));
		    							
		    			//				if (isNumber(last_char)) alert(text+" "+last_char);
		    					//		afternumber="";
		    							if ((isNumber(last_char)) && (text.charAt(last_space-2)=="."))
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
		    									
		    									$('#track_area').val(text.substring(0,text.indexOf("$")+1)+n+"."+decimal);
		    									$('#track_area').val($('#track_area').val()+afternumber);

		    								text=$('#track_area').val();	
			    							var pos=findNextSign(text.indexOf("$")+1,text);
	    									$('#track_area').setCursorPosition(pos);
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
		    						
		    				
		    						/*if ((text.indexOf(symbol)==-1)|| (symbol==" "))
		    						{
		    							if (symbol=="#")
	    									turnAutoOff();
	    								if (symbol!=" ")
		    							{	
		    								symbols[symbol]=false;
	    									symbol=" ";
	    								}
	    								for (var i=text.length-1; i>=0;i--)
	    								{
	    									if (iSym(text.charAt(i)))
	    									{
	    										symbol=text.charAt(i);
	    										if (symbol=="#")
			    								{
			    									turnAutoOn();	
			    									populateList(symbol);
			    									//alert("test");
			    									//	console.log(symbol+"symbol");
			    								}
			    								symbols[symbol]=true;
	    										break;
	    									}
	    								}
	    								

	    							}*/
		    						//trackInput();
		    						//alert(symbol);
	    						}
		      				}
		      				//trackInput();

    							
    					});


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


						
						$("#suggestions li").live('click', function(e) {
							e.preventDefault();
							//alert("test");
							var title=$(this).attr('title');
							if (title!='not found')
							{
								var text=$('#track_area').val();
								text=text.substr(0,text.indexOf("#")+1)+title;
								
								turnAutoOff();
								symbols[symbol]=false;
	    						symbol=" ";

								$('#track_area').focus();
	    						$('#track_area').val(text+" ");
    						}
						});
						function entertoPending(text)
						{
							  $('#errorMsg').html("");
    						  var line=text.substr(0,text.length);
    						  var newline="\n"+line;
    						  var posBreak=newline.lastIndexOf("\n");
    						 // console.log(newline);
    						 // console.log(posBreak);
    						  var msg=stringValidate(newline.substring(posBreak,newline.length));

    						   if (msg!="")
    						   {
    						 //  	e.preventDefault();
    						   	//alert(msg);
    						   	$('#track_area').val(line);
    						   	$('#errorMsg').html(msg);
    						   //	return false;
    						   }
    						   else
    						   {
    						   	 var daten=$("#scroller").scroller('getDate');
    						   	 var date=jQuery.scroller.formatDate('yy-mm-dd',daten);
    						   	 	
    						     if (lastdate.getTime()!=daten.getTime())
    						   	 {
    						   	 	//alert(daten+" "+lastdate);
    						   	 	
    						   	 	var string=trimString($('#resultMsg').html())+"<div class='"+date+"'> On "+ date +" :</div>";
    						   	 	$('#resultMsg').html(string);
    						   	 	date_pending[date]=0;
    						   	 	lastdate=daten;
    						   	 }
    						   
    						    var transType=$('input[name=transType]:checked', '#radioBtns').val();
    						   	

    						   //	 alert($('#resultMsg').html());
    						   	var resultMsg= $('#resultMsg').html()+"<div class='"+date+"'' style='font-size:11px'>"+transType+trimString(text)+"<a class='deleteLink' href='#''> <img src='img/round_delete.png' width='7px' height='7px'/></a></div>";
    						   
    						   	date_pending[date]++;
    						   	//console.log(resultMsg);
    						   	$('#resultMsg').html(resultMsg);
    						   	$('#track_area').val("$0.00");
    						   
    						   	trackDecimal=0;
    						   	symbols[symbol]=false;
    							symbol="$";
    						   }
    						  // else
    						 
						}

						function enterHashtag(e) {
							//alert("rewq");
	    								$('#track_area').val($('#track_area').val()+" #");
	    								symbols[symbol]=0;
	    								symbol="#";
	    								symbols[symbol]= $('#track_area').val().length-1;
	    								

	    								turnAutoOn();
	    								populateList(symbol);

	    								
	    								$("#errorMsg").text("");
	    								e.preventDefault();
	    						

						}

						function iSym(chara)
						{
							//console.log(chara);
							//console.log(symbols);
							//alert(chara);
							for (var sym in symbols)
							{	
								//alert(sym);
								if (chara==sym)
									return true;
							}
							return false;

						}
						
						function trackInput(){
							//alert(symbol);
							//alert("test")
							clearInterval(timer);
    						var text= $('#track_area').val();
    						//alert(trimString(text)+"a");

    						var last_char=text.substr(text.length-1,1);
    						//alert(last_char);
    					//	
    						//alert(isSymbol(" "));

    						//alert(symbol+"symbol");
    						//console.log(symbol+ "symbol");
    						if ((iSym(last_char)) || (text=="")|| (last_char==" ") )
    						{
    						//	if ((text.indexOf(symbol)==-1)||((text.indexOf(symbol)>=-1)&&(last_char==" ")))
    							{
	    							if (symbol=="#")
	    							{
	    								//alert("test");
	    								turnAutoOff();
	    							}
	    							symbols[symbol]=0;
	    							symbol=last_char;
	    							symbols[symbol]=text.length-1;
		    						
	    								if (symbol=="#")
			    								{
			    									turnAutoOn();	
			    									populateList(symbol);
			    									//	console.log(symbol+"symbol");
			    									//symbols[symbol]=true;
			    								}
			    								else
			    									if (symbol=="$")
		    										{

		    											//$('#track_area').val(text+" $0.00");
		    											//trackDecimal=0;
		    											//$$('#track_area').
		    										}
		    					}	
    						}
    						else
    						{

    							if (symbol=="#") 
	    						{	
	    							//turnAutoOn();	
	    							populateList(symbol);
	    						}
	    						else
	    						{
	    							//if (symbol=="+" || symbol=="-")
	    							//{
	    							//	if (isNumber(last_char))
	    							//	{
	    									//var final_text="";
	    									
	    							//	}

	    							//}
	    						}

    						}

    						
    					/*	if (symbol==" ") 
    						{
    							
	    						
	    						
    						}

    					*/


					}

					function setListDefault()
					{

							//alert("test");
							//search_results=cat;
							str="";
							//console.log(search_results);	
							var sugList = $("#suggestions");

				 				//console.log(search_results);
				 			for (var i=0, len=all_cat_static.length;i<len;i++)
    						{

    							str += "<li data-icon='false' title='"+all_cat_static[i]+"''><a style='font-size:12px'>" +all_cat_static[i] +"</a></li>";
    						}
    						//console.log(str);
    						
    						sugList.html(str);
    						sugList.listview("refresh");

					}

					function turnAutoOn()
					{
						//symbols[symbol]=true;
						//alert("on");
						$('#track_area').css('max-height',"35px");
	    				$('#instructionTxt').hide();
	    				$('#suggestions').show();
						//return true;

					}
					function turnAutoOff()
					{
						//symbols[symbol]=false;
    					$('#instructionTxt').show();	
    					$('#track_area').css('max-height',"100px");
    					$('#suggestions').hide();
    					clearSuggestList();
    					return false;
					}

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


					$("input[name=transType]",'#radioBtns').bind( "click", function(event, ui) {
  							//alert("test");
  							$("#track_area").focus();
					});


					$("input[name='chkRecurring']").bind( "click", function(event, ui) {
					 		//alert("test");
					});

					$(".links").click(function(event){
							event.stopImmediatePropagation();
							event.preventDefault(); 
						
							var text= $('#track_area').val();
							//alert(text+" "+$('#track_area')[0].title);
							var lastSymbol="";

							 if ($('#track_area').val() == $('#track_area')[0].title)
			        		 {
			            		$('#track_area').removeClass("defaultTextActive");
			            		$('#track_area').val("$0.00");
			            		text="$0.00";
			        		 }

			        		if ($('#track_area').val().indexOf($(this).attr("name"))>-1)
					 			{
					 				//alert($(this).attr("name")+ " " +$('#track_area').val());
					 				$("#errorMsg").text("You can't enter "+$(this).attr("name")+" more than once");
					 				event.preventDefault();
					 				return;
					 			}
					 			else
					 				$("#errorMsg").text("");
 	



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
							
							
								$('#track_area').focus();
	    						$('#track_area').val(text);
	    					
								if (symbol=="#")
			    				{
			    			

			    									turnAutoOn();
			    									populateList(symbol);
			    									//alert("test");
			    				}
			 	   				trackInput();
							
							//return false;

					});
					$("#add").click(function(event){
						event.preventDefault();
						//alert("test1");
						enterToSave();
						//alert("test");
						return false;
					});

					$("#deleteBtn").click(function(event){
						event.preventDefault();
						//alert("test1");
						//enterToSave();
						switchOffTextScreen();
						//alert("test");
						return false;
					});
					function enterToSave()
					{
						
						var text=$('#track_area').val();
						if ((text!=""))
						{
							entertoPending(text);
							//alert(+" enter pending");
					
						}

						text=$('#track_area').val();
						//alert(text+"a");
						//alert(trimString($("#resultMsg").text())+" "+);

						if (trimString($("#resultMsg").text())!="")
						{	
							if ((text=="") || ($("#track_area")[0].title==text)  || (text=="$0.00") )
							{
							//	if ((text== ) &&()!=""))
								{
									saveTrans();		
									clear();
									switchOffTextScreen();

									/*$.mobile.changePage( "index.html", {
														transition: "slideup",
												reverse: true,
													
									});*/
								}
							}
						}						
					}


				/************ save transaction *******************/
				function saveTrans()
				{
					//$("#re")
					var results=$("#resultMsg");
					//console.log(results);
					results.children('div').each(function(){
						var insertDate=$(this).attr("class");
						var trans=$(this).text();
						if (trans.charAt(1)!="O")
						{
							var data=decompose(trans);

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
							var recurType=$("#selectRecurring").val();
							data['recurring']=recurType;
							//alert(recurType);
							//searchCatsByName(db,"");
						//	tst();
							db.transaction(function(db)
				 				   {
				 				   		catFindIdName(db,data);
				 				   		//alert("test");
				 				  	 	//searchCatsByName(db,string);
				 				  	
				 				    },errorDB,function()
				 				    		  {  	
				 				    			//alert("success");
				 				    		  	//refreshDashboard();

				 				    		  	loadAllCats();
				 				    		  	loadAllDashboard();
				 								initTransDetails();	
				 				    		  	//updateChart(data['cat']);
				 				    		  /*	SYNCDATA.synServer(function(){
													alert("sync complete");
												})*/
				 				    		  	
				 				    		  }  
				 				    );

							
						} 
						//alert(childrenClass+);
						//var =



					})

				}
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
													if ((cats.results[i].totalSpend!=0) && (budgetValue!=0)&&(cats.results[i].name!="ad-hoc"))
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
											$("#allcats").append("<div id='"+catAdhocTransactions.results.name+"'></div><div style='clear:both'></div>");

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

				function findLastSign(string)
				{
					for (var i=string.length-1; i>=0;i--)
    				{
    					if ((string.charAt(i)=="#")||(string.charAt(i)=="$")||(string.charAt(i)=="~")||(string.charAt(i)==" "))
    				
    					return i; 
    				}
    				return string.length;
				}

				function findNextSign(pos,string)
				{
					for (var i=pos; i<string.length;i++)
    				{
    					//alert(string.charAt(i));
    					if ((string.charAt(i)==" ")||(string.charAt(i)=="#")||(string.charAt(i)=="$")||(string.charAt(i)=="~"))
    					return i; 
    				}
    				return string.length;
				}

				function decompose(trans)
				{

					var data=new Object();
					trans= trimString(trans);
					//alert(trans);
					var string,amount="",cat="",opt="";



					var postSign= trans.indexOf("$");
					string=trans.substring(postSign+1,trans.length);

					var postNextSign= findNextSign(0,string);
					var amount=string.substring(0,postNextSign);
					//console.log(amount);

					var postHash= trans.indexOf("#");
					string=trans.substring(postHash+1,trans.length);
					postNextSign= findNextSign(0,string);
					var cat =string.substring(0,postNextSign);
					//console.log(cat);				

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
			


				function populateList(symbol)
				{
						var text= $('#track_area').val();	
					
						processKey(symbol,text);
						//alert(symbol);


    			
				}

				function clearSuggestList()
				{
					var sugList = $("#suggestions");
   					sugList.html("");
    				sugList.listview("refresh");

				}
				function processKey(symbol,text)
				{	
					//	alert(symbol+" "+text+"a");
							var position = text.indexOf(" ",text.indexOf(symbol));
							    								
    								position = text.length;
    								string= text.substring(text.indexOf(symbol)+1,position);
    				//				alert(string+"a");
    								//trimString(string);
    								var str="";
    							//	console.log(string);
    					//			alert(string);
    								if (trimString(string)=="")
    								{
    									//alert("test");
    									setListDefault();
    								}
    								else
    									searchStringInArray(trimString(string));
    								
    				//	return str;
				}

				function searchStringInArray (string) {
					search_results=new Object();
			 		search_results.result=new Array();
				//	search_result()
					str="";
					db.transaction(function(db)
				 				   {
				 				   		search_results=new Object();
			 							search_results.result=new Array();
				 				   		//alert("test");
				 				  	 	searchCatsByName(db,string,search_results);
				 				  	
				 				    },errorDB,function()
				 				    		  {  	
				 				    		  	str="";
				 				    		  	var sugList = $("#suggestions");
				 				    		  	for (var i=0, len=search_results.result.length;i<len;i++)
    											{
    												str += "<li data-icon='false' title='"+search_results.result[i]+"''><a style='font-size:12px'>" +search_results.result[i] +"</a></li>";
    											}

    											if (search_results.result.length==0)
    											{
													str += "<li data-icon='false' title='not found'><a style='font-size:12px'>not found</a></li>";
    				    						}

    											//alert(str);
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
					/*validation*/
				function isNumber(n) {
				  return !isNaN(parseFloat(n)) && isFinite(n);
				}
				function stringValidate(string)
				{

						string=trimString(string);
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

	    				if (trimString(string) == trimString($("#track_area")[0].title))
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


		 					if (isNumber(amount)==false)
		 						msg+="Amount is not a number <br>";
		 					if (amount=="0.00")
		 						msg+="Amount must not be zero <br>";
	    				}
	    				else
	    						msg+="Enter the currency ($) <br>";		

	    				posHash= text.indexOf("#");
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

	    	
						return msg;
				}

				function trimString (str) {
					    str = str.replace(/^\s+/, '');
					    for (var i = str.length - 1; i >= 0; i--) {
					        if (/\S/.test(str.charAt(i))) {
					            str = str.substring(0, i + 1);
					            break;
					        }
					    }
					    return str;
					}


				function enterNumber(last_char)
				{
					if (isNumber(last_char))
					{
						
						trackDecimal++;
					//	if ((trackDecimal==1) && (last_char=="0"))
					//		trackDecimal--;
						//alert(trackDecimal);
						//alert(last_char);
						var text=$("#track_area").val();
						//alert(text);
						$('#track_area').val("");
		    		
						var pos=findNextSign(1,text);
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

		    			$('#track_area').val(final_text);
		    			text=$('#track_area').val();
		    			//$('#track_area').setCursorPosition(pos);
		    			pos=findNextSign(text.indexOf("$")+1,text);
    					$('#track_area').setCursorPosition(pos);
		    			//$('#track_area').selectRange($('#track_area').val().length,$('#track_area').val().length);
		    			//alert("test");
		    			//setCaretToPos($('#track_area'), $('#track_area').val().length-1);

					}
					else
						$('#errorMsg').html("Enter Number Only");
									
				} 

				/*******************************************/    		
					$("#showScroller").click(function(event){
						event.preventDefault();
						$("#scroller").scroller("show");
						return false;
					});

			
	

			//	stringValidate(" - 100.3e rewqrqw #");

				function clear()
				{
					turnAutoOff();
					$("#resultMsg").html("");
					$("#errorMsg").html("");
					lastdate=new Date("01/01/1001");
					last_word="",
					symbol="$";
					trackDecimal=0;
					date_pending=new Object();	

					var cat=new Object();
						cat.results=new Array();
						db.transaction(function(db)
								{
									getCats(db,cat);
								},errorDB,function(){
									search_results=cat.results;
									//alert(search_results.length+" search results");

								});						
				}

				function switchOnTextScreen()
				{
					//disable top
					$("#profile").hide();
					$(".swipe").hide();
					//enable nav link
					$("#functionBarTime").show();
					$("#functionBar").show();
					$("#todayTxt").text("E.g: $10 #food or $20 #groceries ~optional text");
					$.mobile.silentScroll(0);
					$("#add").show();
					$("#deleteBtn").show();
					//add button
				} 
				function switchOffTextScreen()
				{
					//after save data 
					//disable nav link
					//enable title 
					//refresh chart
					$("#profile").show();
					$(".swipe").show();
					//enable nav link
					$("#functionBar").hide();
					$("#functionBarTime").hide();
					$("#todayTxt").text("Today's transaction");
					$("#add").hide();
					$("#deleteBtn").hide();
			
					//return
					//hide button

				}

				

				function populateRecurring()
				{
					$("#selectRecurring").html("");
					var selectRecurring=$("#selectRecurring");	
					selectRecurring.selectmenu();
					var recurring= ['Never','Daily','Weekly', 'Monthly', 'Yearly'];
					for (var i=0;i<recurring.length;i++)
					{
						var aRecurr= '<option value="'+(i)+'">'+recurring[i]+'</option>';
						selectRecurring.append(aRecurr);
					}
					selectRecurring.selectmenu('refresh');

					selectRecurring.bind("change",function(event,ui){
							$('#track_area').focus();
							event.stopImmediatePropagation();
					})
				}

				$("#track_area").focus(function(e)
			    {
			        if ($(this).val() == $(this)[0].title)
			        {
			            $(this).removeClass("defaultTextActive");
			            $(this).val("$0.00");
			            symbol="$";
			        }
			        switchOnTextScreen();
			     	//$("#track_area").focus();   
			       //
			      
			     	 if ($('#track_area').getCursorPosition()<length_numbers())
    						{
    							$('#track_area').setCursorPosition(length_numbers());
    							if (symbol!="$")
    							{
    									symbols[symbol]=0;
    									symbol="$";
    									symbols[symbol]=0;
    							}

    							e.preventDefault();
    							return false;
    							//alert("test");	
    						}
    					

			    });
			    
			    $("#track_area").blur(function()
			    {
			        if (($(this).val() == "")|| ($(this).val() == "$0.00"))
			        {
			            $(this).addClass("defaultTextActive");
			            $(this).val($(this)[0].title);
			        }
			    });
			    $('#track_area').bind('paste', function(e) {
			    	e.preventDefault();
			    	return false;
				});
							
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
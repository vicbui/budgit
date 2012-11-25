/*(function ($)
{
	var TransDetails= function(element,options)
	{
		var elem=$(element);
		var obj=this;
		var settings = $.extend( {
					db : null,
					catName :"",
					itemPerLoad:5,
					day:1,
					month:1,
					year:2001,
					contextObject:"",
					callback:"",
					callbackResults:"",
    			}, options)
		//alert(elem);
		this.setSettings=function(options)
		{
			//alert(settings.id);
			settings= $.extend( {
      				'id'         : '',
      				'color1'	 : '#993333',
      				'color2'	 : '#339900',
      				'value1'	 : 0,
      				'value2'	 : 0,
      				'isBudget'	 : 0,
      				'scale'		 : 1
    			}, options)			
		}

		this.addResultToList=function(){
			transactions2=new Object();
			transactions2.results= new Array();

			var now = new Date();
											
			if (day.length == 1 && day!="-1")
		 	{
				day = "0" + day;
		   	}
		  	else 
				day="01";
										   
		 	if (month.length==1)
				month="0"+month;
			
			var firstday = year+ "-" + month+ "-"+day;
			var lastday= year+"-"+month+ "-"+noDaysInMonth(month,year);
											
			if (((now.getMonth()+1)== month) && (now.getFullYear()==year))
			{
				lastday =  year+"-"+month+"-"+now.getDate();
			}
			listTrans(db,firstday,lastday, function(trans){
				if (callbackResult!="")
				{
					alert(callbackResult);
					callbackResult(trans);
				}
				if (name=="")
					name="%";

												for (var i=0;i< trans.length; i++)
												{
														
													if (((trans[i].name==name) && (name!="%")) || (name=="%"))
													{

														if (typeof transactions2.results[trans[i].current_date] ==="undefined" )	
															transactions2.results[trans[i].current_date]=new Array();
															transactions2.results[trans[i].current_date].push(trans[i]);
														//console.log(trans[i].current_date+" "+trans[i].name+" "+trans[i].amount);
													
													}
												}
												var results= new Array();
												for (var date in transactions2.results)
												{
													obj=new Object();
													obj.date=date;
													obj.trans=transactions2.results[date];
													var amount=0;
													for (var j=0;j<transactions2.results[date].length;j++)
													{
														amount=amount+Math.abs(transactions2.results[date][j].amount);
													}
													obj.amount=amount;
													results.push(obj);
												
												}
												results.sort(function(a,b) { return  b.date -a.date} );
												//alert(results[0].date);
												$(contextObject).find(".list").html("");
												$(contextObject).find(".list").collapsibleset();

												//console.log("init collapse")
												for (var i=0;i<results.length;i++)
												{
													//console.log(results[i].date+" "+results[i].trans.length);
													var aDate=convertUnixToString(results[i].date);
													var idName='collapse'+i+'page'+current_page+'';
													var str='<div data-role="collapsible">'+
																	'<h2 data-icon="false">'+
																		'<span style="float:left">'+formatDate(aDate)+'</span>'+
																		'<span style="float:right" class="pricecollapse'+i+'page'+current_page+'"></span>'+
																	'</h2>'+	
																	'<span style="float:left" class="dateSelected">'+aDate+'</span>'+
																	'<ul class="collapse'+i+'page'+current_page+'"data-role="listview"></ul></div>'
																	
													//console.log(str);
													$(contextObject).find(".list").append(str);
													$(contextObject).find(".list").collapsibleset("refresh");
													$(contextObject).find(".price"+idName).text("$"+results[i].amount);
													var string="";
													for (var ii in results[i].trans)
													{
														//console.log(results[i].trans[ii].id);
														var optional="<br>"+results[i].trans[ii].optional;
														string+= '<li class="itemDetails" data-icon="false" style="overflow:hidden;font-size:11px;color:gray">';
														string+= '<span style="float:left">'+ capitaliseFirstLetter(results[i].trans[ii].name)+optional+'</span><span id="transId" style="display:none">'+results[i].trans[ii].id+"id"+i+'</span>';
														string+= '<span valign="top" style="float:right">$'+Math.abs(results[i].trans[ii].amount)+'<div id="edit_delete'+results[i].trans[ii].id+"id"+i+'" class="edit_delete" style="padding-left:5px;display:none;float:right">test</div></span>';
														string+= '</li>'
													
													//	$('.edit_delete'+alltrans.results[i].transid)

													}

													$(contextObject).find("."+idName).html(string);
													$(contextObject).find("."+idName).listview();
													$(contextObject).find("."+idName).listview("refresh");
												

												}

												//console.log($("#transDetails").html());

		}







		$.fn.TransDetails = function(options) {
	
	    return this.each(function(){
	    	var element= $(this);
	    	
	    	if (element.data('transDetails')) return;
	    	
	    	var transDetails= new TransDetails(this,options);
	    	
	    	element.data('barChart',transDetails);

	    })

    }   

})(jQuery);*/
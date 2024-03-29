//import helper in here !!

(function ($)
{
	$.jqplot.LabelFormatter = function(format, val){return abbrNum(val,2); };
	$.jqplot.DateFormatter = function(format,val)
	{

	}
	var BarChart= function(element,options)
	{
		var elem=$(element);
		var obj=this;
		var settings = $.extend( {
      				'id'         : '',
      				'color1'	 : '#993333',
      				'color2'	 : '#339900',
      				'value1'	 : 0,
      				'value2'	 : 0,
      				'isBudget'  :0,
      				'scale'		:1
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
      				'scale'		:1
    			}, options)			
		}

		this.lineChart=function(id,color,data,maxData,minData,minDate,maxDate,min,max,avg)
		{
			/*alert(min+" "+(min+max)/data.length);
			if (min< (min+max)/data.length)
				min=0;*/
			//alert(data);
		var plot1=	$.jqplot (id, [data,maxData,minData],
								{
									
									seriesDefaults: {
														//   linePattern: 'dashed',
      													 shadow: false, 

														lineWidth:2,
														 rendererOptions: {
												         // smooth: true
												        },
														pointLabels: { 
													    show: false,
													   // formatString: '$%s'
													   location:'s', ypadding:5 
														},
													  	       // showMarker:false,
													 	  markerOptions: {
												            show: true,             // wether to show data point markers.
												            style: 'filledCircle',  // circle, diamond, square, filledCircle.
												            //lineWidth: 2,       // width of the stroke drawing the marker.
												           // size: 5,            // size (diameter, edge length, etc.) of the marker.
												            //color: '#666666',    // color of marker, set to color of line by default.
												           shadow:false
												         }

													 },
									series:[{
											showLine:true,
											highlighter: {formatString: "%s - %s"},
								          	markerOptions: {
												           // style: 'circle',  // circle, diamond, square, filledCircle.
												            //color: '#666666',    // color of marker, set to color of line by default.
												         }

											},
											{
												showLine:false,
												highlighter: {formatString: "%s - %s (Max Spent)"},
												markerOptions: {
												            //style: 'circle',  // circle, diamond, square, filledCircle.
												            color: 'green',    // color of marker, set to color of line by default.
												         }},
											{
												showLine:false,
												highlighter: {formatString: "%s - %s (Min Spent)"},

												markerOptions: {
												            //style: 'circle',  // circle, diamond, square, filledCircle.
												            color: 'red',    // color of marker, set to color of line by default.
												         }}
								        ],
									grid: {
									    drawGridLines: false,        // wether to draw lines across the grid or not.
									    gridLineColor: '#dddddd',   // *Color of the grid lines.
									    background: 'transparent',      // CSS color spec for background color of grid.
									    borderColor: '#dddddd',     // CSS color spec for border around grid.
									    borderWidth: 0,          // pixel width of border around grid.
									    shadow: false,               // draw a shadow for grid.
									
									},
									canvasOverlay: {
							            show: true,
							            objects: [
							                 /*{horizontalLine: {
							                    name: 'min',
							                    y: 2,
							                    lineWidth: 3,
							                    xOffset: 0,
							                    color: '#bc4427',
							                    shadow: false
							                }},*/
							                {horizontalLine: {
							                	linePattern: 'dashed',
							                    name: 'avg',
							                    y: avg,
							                    lineWidth: 2,
							                    xOffset: 0,
							                    color: '#cccccc',
							                    shadow: false,
							                    showTooltip: true,
							                    tooltipAxes: 'y',

							                    tooltipFormatString: '%.0s $%.2f (Average Spent)',
							                    //formatString: '%s (%%)', 
												formatter: $.jqplot.LabelFormatter,
												tooltipAxisGroups:[['yaxis']],
							                    tooltipLocation: 'nw',
							                    useAxesFormatters:false,
							                    followMouse: false
							                }},
							             /*   {horizontalLine: {
							                    name: 'max',
							                    y: 2000,
							                    lineWidth: 3,
							                    xOffset: 0,
							                    color: '#56A00E',
							                    shadow: false
							                }},*/
							            ]
							        },
									axesDefaults: {
								        tickRenderer: $.jqplot.CanvasAxisTickRenderer,
								        tickOptions: {
								         // fontFamily: 'Georgia',
								          fontSize: '10px',
								        },
								    },
									axes:{
											xaxis: {
											 		//label: data.length+" Days",
												   renderer:$.jqplot.DateAxisRenderer,
													  //autoscale:true,
 													min:(minDate),max:(maxDate),pad: 1.2,
 													//pad:0.5,
											          tickOptions: {
															         showGridline: false,
															         showMark: false,
															          showLabel:false,
															          formatString:'%#d/%m/%y'
															         /* fontFamily: 'DosisBold',
															          textColor: '#ffffff',
															          fontSize: 'larger',*/
															        
															        },
													},
											yaxis: {
												 		min:min,max: max, pad:0,
														tickOptions: {
															          showGridline: false,
															          showMark: false,
															          formatString: '$%.2f '
															         /* fontFamily: 'DosisBold',
															          textColor: '#ffffff',
															          fontSize: 'larger',
															          showLabel:true,
															          formatString: '%s (%%)', 
															          formatter: $.jqplot.LabelFormatter ,*/

															        },

												      }

										 },
								//	seriesColors: [color],

									highlighter: {
								        show: true,
								        sizeAdjust: 7.5
								    },
								    cursor: {
								        show: false
								    },
								   

								}).replot({clear: true});

/*
					var co = plot1.plugins.canvasOverlay;
				    var line = co.get('avg');
				   // line.options.y += 20;
				    co.draw(plot1);
				//    alert(line.html());
					line.bind('click',function(){ alert("testt")});
					/*	$('#'+id).bind('jqplotDataClick',
						            function  (ev, seriesIndex, pointIndex, data) 
						            { 
						            	alert('series: '+seriesIndex+', point: '+pointIndex+', data: '+data); 
						           	});
					*/	        
			

        

		}
		this.donutChart=function(id,color1,color2,data)
		{
		//	alert("test");
			jQuery.jqplot (id, [data],
			{
				seriesDefaults: {
									shadow:false,
			 	 					color: '#666666',
									// Make this a pie chart.
									renderer: jQuery.jqplot.DonutRenderer,
									rendererOptions:{
								  // Put data labels on the pie slices.
								 // By default, labels show the percentage of the slice.
									//showDataLabels: true,
									//sliceMargin:3
									//diameter: 100,
									// startAngle: -90,
									//  sliceMargin: 3, 
									highlightMouseOver: false,
									highlightMouseDown: false,
									highlightColor: null
							        
									}
								},
				seriesColors: [color1, color2],
				grid:{
					  	background: 'transparent',
						drawGridLines: false,
						borderWidth: 0.0,
						shadow: false,
				    },
				highlighter: { show: false },
					 						
			}
			).replot({clear: true, resetAxes:true});
		}
		this.pieChart=function(id,data)
		{
						
			  var plot1 = jQuery.jqplot ('pieChartInsight', [data],
			    {
			      seriesDefaults: {
			        				shadow:true,
			 	 					color: '#ffffff',
									// Make this a pie chart.
									renderer: jQuery.jqplot.PieRenderer,
									rendererOptions:{
									  // Put data labels on the pie slices.
								 	// By default, labels show the percentage of the slice.
										showDataLabels: true,
									//sliceMargin:3
									//diameter: 100,
									//   sliceMargin: 3, 
									/*	highlightMouseOver: false,
										highlightMouseDown: false,
										highlightColor: null*/
			      					},
			      },
			      grid:{
					  	background: 'transparent',
						drawGridLines: false,
						borderWidth: 0.0,
						shadow: false,
				    },
			      legend: { 
					  show: true, 
					  location: 's',
					  rendererOptions: {numberColumns: 3}
					}
			    }).replot({clear: true, resetAxes:true});

			     
					

		}
			this.showProgressBar=function(id,value1,value2,isBudget,scale)
						{
													//	alert("test");

							var budget=260*scale;
							//alert(budget);

							var name="barChart"+id;
							var idw2=name+"L";
							var idw=name+"S";
							var total=value1+value2;
							var perc1=Math.round(Number((value1/total)*budget));
							var perc2=Math.round(Number((value2/total)*budget));
							
							value1=Math.abs(value1);
							value2=Math.abs(value2);


							//alert($("#"+name).html());
							$("#"+name).css("width",perc2+"px");
							$("#" + idw).text("$"+abbrNum(value1,0) +" of $"+abbrNum(Math.abs(total),0));
							$("#" + idw2).text("$"+abbrNum(Math.abs(value2),0));
							//$("#" + idw2).text("$"+abbrNum(value2,2));
					

							

							$("#"+name).parent().removeClass();
							$("#"+name).parent().addClass("progress-bar");
							$("#"+name).parent().addClass("shine");

							var now = new Date();
							var totalDays= noDaysInMonth((now.getMonth()+1)+"",now.getFullYear()) ;

							var curr_date = parseInt(now.getDate());
							var limit=Math.round(curr_date*budget/totalDays);
							//alert(totalDays);

							//alert($("#"+name).parent().find(".limitLine").html());
							$("#"+name).parent().find(".limitLine").css("width",limit+"px");
							//$("#"+name).parent().find(".dateCirle").css("left",(limit-15)+"px");

							/*if (limit<=3) 
								limit=3;
							else
								if (limit>=98)
									limit=98*/


							//alert(limit+" "+perc2)
							if (limit >= perc2)
							{
								$("#"+name).parent().addClass("red");
							}
							else
							{
									$("#"+name).parent().addClass("green");
							}

							
							if ((total>0))
							{
								if (perc2<=0)
								{
									//alert("test");
									$("#" + idw2).parent().find(".desc").text("Over");

									$("#" + idw2).css("color","red");
									$("#" + idw2).parent().find(".desc").css("color","red");
									//$("#" + idw2).text("$("+Math.abs(abbrNum(value2,2))+")");
								}
								else
								{
									$("#" + idw2).parent().find(".desc").text("Left");

									$("#" + idw2).css("color","gray");
									$("#" + idw2).parent().find(".desc").css("color","gray");

								}

							}
							else
							{
									$("#"+name).css("width","260px");
									$("#"+name).parent().addClass("orange");


									$("#" + idw2).text("");
									$("#" + idw2).parent().find(".desc").text("No Budget Set");
									//$("#" + idw).parent().find(".total").text("");
									$("#" + idw).text("$"+abbrNum(value1,0));

									//$("div.ui-page-active #" + idw2).text("");
										//alert("Test");
							}

							//$("#"+name).parent().find(".ribbon").css("left",(limit)+"px");

							
							/*var curr_month=now.getMonth();

							var day=curr_date+"";
							if (day.length==1)
							{
								day="0"+day;
							}
							//$("#"+name).parent().find(".dateCirle").find(".date").text(day+" "+getMonthNames(curr_month));

							//$("#"+name).parent().find(".ribbon").find(".date").text(day);

							/*$("#"+name).parent().removeClass();
							$("#"+name).parent().addClass('progressBar');
							$("#"+name).parent().addClass('shine');*/


							/*limitLine
							dateCirle*/
							

						
							//alert(value2);	


							var canvas= $("#"+name).parent();
							canvas.css("cursor","pointer");
																	//alert(settings.isBudget+" test");

									//alert(canvas.html());
									canvas.click(function(){
										//alert();
										
										var data=new Object();
										data.catName=id;
										data.spent=value1;
										data.left=value2;
										data.isBudget=isBudget;

										var now = new Date();


										data.month =now.getMonth()+1+"";
										data.year = now.getFullYear()+"";
										data.day =-1;
										window.localStorage.setItem('cat',JSON.stringify(data));
										
										$.mobile.changePage("#cat",{
														transition: "slideup",
												reverse: true});
									})
							
						/*	var barChartName=$("div.ui-page-active #"+id).find('.barChartName');
							barChartName.css("cursor","pointer");
							
							//alert(barChartName.html());
								barChartName.click(function()
								{
									//alert("test");
								})
								*/


						}

		this.showChart=function(id,color1,color2,value1,value2,isBudget)
		{
						//	);
				//alert("showca");
							var name="barChart"+id;
							var idw2=name+"L";
							var idw=name+"S";
							var total=value1+value2;
							var perc1=Math.round(Number((value1/total)*100));
							var perc2=Math.round(Number((value2/total)*100));
							//alert(idw);
							$("div.ui-page-active #"+name).html("");

							/*if ((isBudget==1))
							{
								//alert()

								$("div.ui-page-active #" + idw2+"Label").text("Left");
								
							}
							else
							{ 			
								//barCharttotalSLabel
								//alert("test");
								$("div.ui-page-active #" + idw2+"Label").text(value2);
								$("div.ui-page-active #" + idw2).text("");
								value2=0;
				
							}*/

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

							$("div.ui-page-active #"+name).width(w).height(h);								
						//	plot;
//var balance=$("").find("#balance1");

							//$("#barChart").remove('barChartW');
								$("div.ui-page-active #" + idw).text("$"+abbrNum(value1,2));
								if (isBudget==1)
								{
									$("div.ui-page-active #" + idw2).text("$"+abbrNum(value2,2));
								}
								else
								{
										$("div.ui-page-active #" + idw2+"Label").text("No budget set");
										$("div.ui-page-active #" + idw2).text("");
										//alert("Test");
								}
							//alert(value2);		
							var canvas= $("div.ui-page-active #"+name).find('.jqplot-event-canvas');
							canvas.css("cursor","pointer");
																	//alert(settings.isBudget+" test");

									//alert(canvas.html());
									canvas.click(function(){
										//alert();
										
										var data=new Object();
										data.catName=id;
										data.spent=value1;
										data.left=value2;
										data.isBudget=isBudget;

										var now = new Date();


										data.month =now.getMonth()+1+"";
										data.year = now.getFullYear()+"";
										data.day =-1;
										window.localStorage.setItem('cat',JSON.stringify(data));
										
										$.mobile.changePage("#cat",{
														transition: "slideup",
												reverse: true});
									})
							
							var barChartName=$("div.ui-page-active #"+id).find('.barChartName');
							barChartName.css("cursor","pointer");
							
							//alert(barChartName.html());
								barChartName.click(function()
								{
									//alert("test");
								})


							
		}
		this.initProgress = function()
		{
			var $this=$(element);
            	
          		var spentId="barChart"+settings.id+"S";
      
          		var leftId="barChart"+settings.id+"L";
         		
         		var catname=settings.id;
         		var chartname="barChart"+settings.id;


         		//alert(chartname);
         		var str='<div class="description">'+
							'<div class="title barChartName" style="float:left">'+capitaliseFirstLetter(catname)+'</div>'+
							'<div class="left" style="float:right">' +
								'<span id="'+leftId+'">$20</span>  <span class="desc" style="font-size:10px">Left</span>'+
							'</div>'+
							'<div style="clear:both;"></div>'+
						'</div>'+
						'<div style="width:260px;margin-top:0px;" class="progress-bar red shine">'+
							'<span id="'+chartname+'" style= "width: 15%"></span>'+
							'<div  id="'+spentId+'" class="spent">'+
								'<b>$10</b> of $250'+ 
							'</div>'+		
							'<div class="limitLine" style="width:30px">'+
							'</div>'+			
						'</div>';


         		/*var str='<div style="font-size:15px;padding-top:5px;margin-left:5px">'+
									'<div style="font-weight:bold;z-index:100;float:left;width:45px;text-align:center"> <div id="'+leftId+'" >$'+settings.value2+ '</div>'+
											'<div class="left" style="font-size:11px;font-weight:bold;">Left</div>'+
									'</div>'+
									'<div style="position:relative;float:left;width:190px;margin-left:5px;">'+
										
										'<div style="width:180px;margin-left:12px;margin-top:0px;" class="progress-bar red shine">'+
										   '<span id="'+chartname+'" style="width: 25%"></span>'+
										
											 '<div class="ribbon" style="left:44px">'+
											  '<div class="date">23</div>'+
											'</div>'+	
										'</div>'+

										

										'<div class="barChartName" style="position:absolute;top:9px;left:20px;font-weight:bold;z-index:9;color:white">'+capitaliseFirstLetter(catname)+'</div>' +
										
											
									'</div>'+
									'<div style="margin-top:0px;font-weight:bold;z-index:100;float:left;margin-left:5px;width:60px;text-align:center">'+
										'<div id="'+spentId+'" >$'+settings.value1+ '</div>'+
										'<div style="font-size:11px;padding-top:0px;margin-top:0px;font-weight:bold;">Spent</div>'+
									'</div>'+
							'</div>';*/
         			$this.append(str);
         			this.showProgressBar(settings.id,settings.value1,settings.value2,settings.isBudget,settings.scale);

		}
		this.init=function()
		{
				var $this=$(element);
            	
          		var spentId="barChart"+settings.id+"S";
      
          		var leftId="barChart"+settings.id+"L";
         		
         		var catname=settings.id;
         		var chartname="barChart"+settings.id;
         		
         		var str='<div style="font-size:15px;padding-top:5px;margin-left:5px">'+
									'<div style="font-weight:bold;z-index:100;float:left;width:45px;text-align:center"> <div id="'+leftId+'" >$'+settings.value2+ '</div>'+
											'<div style="font-size:11px;font-weight:bold;">Left</div>'+
									'</div>'+
									'<div style="position:relative;float:left;width:190px" class="smallChart">'+
										'<div id="'+chartname+'" style="width:180px;height:50px;z-index:0;margin-left:0px;margin-top:-10px;float:left">'+
										'</div>'+

										'<div class="barChartName" style="position:absolute;top:5px;left:20px;font-weight:bold;z-index:100;color:white">'+capitaliseFirstLetter(catname)+'</div>' +
										
											
									'</div>'+
									'<div style="margin-top:0px;font-weight:bold;z-index:100;float:left;width:60px;text-align:center">';
								
				if (settings.isBudget==1)
				{
										str+='<div id="'+spentId+'" >$'+settings.value1+ '</div>'+
											'<div style="font-size:11px;padding-top:0px;margin-top:0px;font-weight:bold;">Spend</div>';
				}
				else
				{
					str+='<div style="font-size:11px;">No budget set</div>'
				}

				str+='</div></div>';


         		$this.append(str);
				//alert("test");
				this.showChart(settings.id,settings.value1,settings.value2,settings.isBudget);
	

		}
	}
	//showChart(id,color1,color2,value1,value2)
	/*var methods={
		/*init : function( options ) {

       		return this.each(function(){

       				//showChart("Food", "#993333","#339900",10,20);
         	  
         		
         		//alert(settings.id);
         		var $this = $(this),
            	data = $this.data('barChart');
          		
          		var spentId="barChart"+settings.id+"S";
      
          		var leftId="barChart"+settings.id+"L";
         		
         		var catname=settings.id;
         		var chartname="barChart"+settings.id;
         		//alert(barChartNamez)
         // If the plugin hasn't been initialized yet
           if ( ! data ) {
         		
         		$this.append('<div style="font-size:15px;padding-top:5px;margin-left:5px">'+
									'<div style="font-weight:bold;z-index:100;float:left;width:45px;text-align:center"> <div id="'+spentId+'" >$'+settings.value1+ '</div>'+
											'<div style="font-size:11px;font-weight:bold;">Spent</div>'+
									'</div>'+
									'<div style="position:relative;float:left;width:190px" class="smallChart">'+
										'<div id="'+chartname+'" style="width:180px;height:50px;z-index:0;margin-left:0px;margin-top:-10px;float:left">'+
										'</div>'+

										'<div class="barChartName" style="position:absolute;top:5px;left:20px;font-weight:bold;z-index:100;color:white">'+catname+'</div>' +
										
											
									'</div>'+
									'<div style="margin-top:0px;font-weight:bold;z-index:100;float:left;width:60px;text-align:center">'+
											 '<div id="'+leftId+'" >$'+settings.value2+ '</div>'+
											'<div style="font-size:11px;padding-top:0px;margin-top:0px;font-weight:bold;">Left</div>'+
									'</div>'+
							'</div>');
				//alert($this.html());
           /*
             Do more setup stuff here
           */

           /*$(this).data('barChart', {
           		target: $this,
           		barChart:barChart
               /*target : $this,
               tooltip : tooltip

           });*/
           					/* */

      /*   }
       });
     },
     destroy : function( ) {

      /* return this.each(function(){

         var $this = $(this),
             data = $this.data('barChart');

         // Namespacing FTW
         $(window).unbind('.barChart');
         data.tooltip.remove();
         $this.removeData('barChart');

       })

     },

	};*/
	$.fn.barChart = function(options) {
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
	    	
	    	if (element.data('barChart')) return;
	    	
	    	var barchart= new BarChart(this,options);
	    	
	    	element.data('barChart',barchart);

	    })

    }   

})(jQuery);
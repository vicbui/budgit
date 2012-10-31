(function ($)
{
	var BarChart= function(element,options)
	{
		var elem=$(element);
		var obj=this;
		var settings = $.extend( {
      				'id'         : '',
      				'color1'	 : '#993333',
      				'color2'	 : '#339900',
      				'value1'	 : 0,
      				'value2'	 : 0
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
      				'value2'	 : 0
    			}, options)			
		}
		this.lineChart=function(id,color,data)
		{
			$.jqplot (id, [data],
								{
									seriesDefaults: {
														pointLabels: { 
													    show: true,
													    formatString: '$%s'
														},
													  
													 },
									axes:{
											xaxis: {
													},
											yaxis: {
														tickOptions: {
															          showGridline: false,
															          showMark: false,
															          fontFamily: 'DosisBold',
															          textColor: '#ffffff',
															          fontSize: 'larger',
															          showLabel:false,
															        },

												      }

										 },
									seriesColors: [color],
								}

						).replot({clear: true, resetAxes:true});

		}
		this.pieChart=function(id,color1,color2,data)
		{
			jQuery.jqplot (id, [data],
			{
				seriesDefaults: {
			 	 					color: '#666666',
									// Make this a pie chart.
									renderer: jQuery.jqplot.PieRenderer,
									rendererOptions:{
								  // Put data labels on the pie slices.
								 // By default, labels show the percentage of the slice.
									showDataLabels: true,
									highlightMouseOver: false,
									highlightMouseDown: false,
									highlightColor: null
							        		
									}
								},
				seriesColors: [color1, color2],
				grid:{
					  	background: '#1d1d1d',
						drawGridLines: false,
						borderWidth: 0.0,
						shadow: false,
				    },
				highlighter: { show: false },
					 						
			}
			).replot({clear: true, resetAxes:true});
		}
		this.showChart=function(id,color1,color2,value1,value2)
		{
						//	);
				//alert("showca");
							var name="barChart"+id;
							console.log(name);
							var idw2=name+"L";
							var idw=name+"S";
							var total=value1+value2;
							var perc1=Math.round(Number((value1/total)*100));
							var perc2=Math.round(Number((value2/total)*100));
							//alert(idw);
							$("div.ui-page-active #"+name).html("");
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
						      background: '#1d1d1d',
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
							$("div.ui-page-active #" + idw2).text("$"+abbrNum(value2,2));
					
							var canvas= $("div.ui-page-active #"+name).find('.jqplot-event-canvas');
							canvas.css("cursor","pointer");
									//alert(canvas.html());
									canvas.click(function(){
										//alert();
										
										var data=new Object();
										data.catName=id;
										data.spent=value1;
										data.left=value2;
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

		this.init=function()
		{
				var $this=$(element);
            	
          		var spentId="barChart"+settings.id+"S";
      
          		var leftId="barChart"+settings.id+"L";
         		
         		var catname=settings.id;
         		var chartname="barChart"+settings.id;
         		

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
				//alert("test");
				this.showChart(settings.id,"#993333","#339900",settings.value1,settings.value2);
	

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
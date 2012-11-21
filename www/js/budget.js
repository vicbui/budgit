$("#budget").live( 'pageshow',function(event, ui){
	loadCats();
	$("#budgetTxt").keydown(function(e){
		//alert(e.which);
		
			if ((e.which>=48) && (e.which<=57))
			{
				$("#txtparsed").html($("#txtparsed").html()+String.fromCharCode(e.which));
			}
		
		if (e.which == 8)
		{
			{
				//alert("delete");
				var curr=$("#txtparsed").html();
				$("#txtparsed").html(curr.substring(0,curr.length-1));			
			}
		}
		e.stopImmediatePropagation();
	})
	$("#budgetTxt").keyup(function(e){
	    var number = $("#txtparsed").html();

	    var newValue = ((Math.round(parseFloat(number)*100)/100)/100).toFixed(2);
	    //console.log(newValue);
	    var txt=newValue+"";
	    //console.log(txt.substring(txt.indexOf("."),txt.length));

		var curr=$("#txtparsed").html();
	    if (curr.length >=1)
	    {
		    $("#budgetTxt").val(txt);
		}
		else
			$("#budgetTxt").val("0.00");

		e.stopImmediatePropagation();

	});
	/*$("input[name='cat']").each(function(index){
		console.log($(this).attr('id')+" "+$(this).attr('checked'));	
	})
	//console.log($("#expenses #all").attr('checked'));
	*/
	$("#budgetTxt").blur(function(){
		if ($("#budgetTxt").val()!="0.00")
		{
			$("#budgetDetails").show('fade');
			loadCats();

		}
		else
			$("#budgetDetails").hide();

	})
	$(".slider").live('slidestop',function(event){
		//alert($(this).val());
		var total=0;
		$(".slider").each(function(index){
			//alert(total);
			var value=$(this).val();
			total=total+ parseFloat(value);
		})
		total=parseFloat(total).toFixed(2);
		$("#amount").text(total);
		$("#budgetTxt").val(total);


	})
	function loadCats()
	{
		var ids=$("#selectedCatId").text();

			get_cats_by_id(db,ids,function(cats){
				var total= parseFloat($("#budgetTxt").val()).toFixed(2);
				$("#amount").text(total);
				var each = Math.round((total/cats.length));
				var str="";

				for (var i=0;i<cats.length;i++)
				{
					if (i==cats.length-1)
						each=total-(each*(i));
					str+='<li style="padding-top:5px;padding-bottom:5px">'+ 
						  cats[i].name+" ($)<br>"+
						  '<input type="range" class="slider" id="'+cats[i].id+'" value="'+each+'" min="0" max="'+total+'">'+
						  '</li>'	
				}
				$("#cats").html(str);
				$("#cats").trigger("create");
				$("#cats").listview("refresh");
				$("#budget #catCounter").text(cats.length);

			})

	}
	$("#saveBtn").click(function(e){
		//alert("save");
		remove_budget(db,function(){
			var budgetInfo= new Object();
			var budgetItem= new Array();
			budgetInfo.amount = parseFloat($("#budgetTxt").val());
			budgetInfo.start_date = timeNow();
			budgetInfo.end_date="*";
			
			$(".slider").each(function(index){
				var value=$(this).val();
				var item= new Object();
				item.amount = parseFloat(value);
				item.catid = $(this).attr("id");
				budgetItem.push(item);
			})

			add_budget(db,budgetInfo,budgetItem,function(){
					alert("Budget Saved!");
				});	
		})
		
		e.stopImmediatePropagation();

	});

})
$("#expensesPage").live( 'pageshow',function(event, ui){

	loadCks();	

		
	function loadCks()
	{
		var ids=$("#budget #selectedCatId").text();
			
			get_cats_by_id(db,ids,function(cats){
			
				$(".catChks").html("");

				var str='<fieldset data-role="controlgroup"><input type="checkbox" name="cat" id="all" class="all" /><label for="all">All Categories</label>';

				for (var i=0;i<cats.length;i++)
				{
					str+='<input type="checkbox" name="cat" id="'+cats[i].id+'" class="item"/>'+
					'<label for="'+cats[i].id+'">'+cats[i].name+'</label>'
					$(".catChks").append(str);
				}
				str+="</fieldset>";
				$(".catChks").html(str);
				$(".catChks").trigger("create");
				//$(".catsChks").trigger("create");
				//$(".all").checkboxradio("refresh");
				$("input[name='cat']").attr("checked",true).checkboxradio("refresh");

				/*var ids=$("#budget #selectedCatId").text();

				if (ids=="0")
				{
				//	alert(ids);
					$("#expensesPage #all").attr('checked',true);	
					$("#expensesPage #all").checkboxradio("refresh");
					 $("input[name='cat']").attr({
					            checked: true
					        });
					 $("input[name='cat']").checkboxradio("refresh");

				}*/
				$("#expensesPage #all").click(function(e){
						//alert("test");
						  $("input[name='"+this.name+"']").attr({
					            checked: $(this).is(':checked')
					        });
					   		 $("input[name='"+this.name+"']").checkboxradio("refresh");
						})
				$("#expensesPage .item").click(function(e){
					$("#expensesPage #all").attr('checked',false);
					$("#expensesPage #all").checkboxradio("refresh");

				})

				$("#expenseDone").click(function(){
					//alert("Test");
					var str="";
					$("#expensesPage .item").each(function(index){
						//alert("test");
						//attr("checked",true)
						if ($(this).is(':checked')==true)
							str+=$(this).attr("id")+",";

					})
					$("#budget #selectedCatId").text(str.substring(0,str.length-1));
					$("#budget #catCounter").text(str.split(",").length-1);
					//alert($("#budget #selectedCatId").text());
					// $.mobile.changePage("#budget");

				})
				
			})

	}

})

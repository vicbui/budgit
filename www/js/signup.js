$("#register").live( 'pageshow',function(event, ui){

	//alert($("#register").attr('data-needs-auth'));

			$('#signupForm').validate({
				rules: {
					username: {
						required:true
					},
					email: {
						required: true,
						email:true,
						remote: "http://localhost:3000/email"
					},
					password: {
						required: true,	
						minlength:6

					}
				},
				messages: {
					email: {
						required: "Email is required",
						email:"Email address is not valid",
						remote: "Email is already existed"
					}
				},
				submitHandler: function(form){
					jQuery(form).ajaxSubmit({
						beforeSubmit: showRequest,
						success: showResponse,
						url: "http://localhost:3000/users.json",
						type: "post",
						dataType: "json"
					});
				}
			});	
	function showRequest(formData, jqForm, options) { 
		 
		  
		    return true; 
		} 
	function showResponse(data, statusText, xhr, $form)  { 
		//data=jQuery.parseJSON(data);
		if (data.message==true)
		{
			 localStorage.setItem('Token', "true");
			 localStorage.setItem('user', data.user.username);
			 localStorage.setItem('email',data.user.email);
			 $.mobile.changePage("#home");
				
		}	
		else
			{
				//alert(responseText);
				$("#result").html("Wrong email or password") ;
			}
		}		 

})

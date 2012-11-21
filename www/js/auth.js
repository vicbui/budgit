
$(document).bind("pagebeforechange", function (event, data) {
   // alert("test");
    if (typeof data.toPage == 'object' && data.toPage.attr('data-needs-auth') == 'true') {

             if (!localStorage.getItem("Token")) {

                event.preventDefault();
                localStorage.setItem("toPage",data.toPage.attr("id"));
                $.mobile.changePage("#login");
            }
        }
    });


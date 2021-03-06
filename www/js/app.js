// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {
	


    /* ---------------------------------- Local Variables ---------------------------------- */
		var homeTpl = Handlebars.compile($("#home-tpl").html());
		var employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
		var employeeTpl = Handlebars.compile($("#employee-tpl").html());
		
		
		var detailsURL = /^#employees\/(\d{1,})/;
		
		var slider = new PageSlider($('body'));
		
    var adapter = new MemoryAdapter();
    adapter.initialize().done(function () {
        // console.log("Data adapter initialized");
				// renderHomeView();
				// $('body').html(new HomeView(adapter, homeTpl, employeeLiTpl).render().el);
				route();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    // $('.search-key').on('keyup', findByName);
    // $('.help-btn').on('click', function() {
    //     alert("Some help here...")
    // });
		$(window).on('hashchange', route);
		
    document.addEventListener('deviceready', function () {
			FastClick.attach(document.body);
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        }
    }, false);


    /* ---------------------------------- Local Functions ---------------------------------- */
		function route() {
			var hash = window.location.hash;
			if (!hash) {
				// $('body').html(new HomeView(adapter, homeTpl, employeeLiTpl).render().el);
				slider.slidePage(new HomeView(adapter, homeTpl, employeeLiTpl).render().el);
				return;
			}
			var match = hash.match(detailsURL);
			if (match) {
				adapter.findById(Number(match[1])).done(function(employee) {
					// $('body').html(new EmployeeView(adapter, employeeTpl, employee).render().el);
					slider.slidePage(new EmployeeView(adapter, employeeTpl, employee).render().el);
				});
			}
		}
			//     function findByName() {
			// adapter.findByName($('.search-key').val()).done(function(employees){
			// 	$('.employee-list').html(employeeLiTpl(employees));
			// });
        // adapter.findByName($('.search-key').val()).done(function (employees) {
        //     var l = employees.length;
        //     var e;
        //     $('.employee-list').empty();
        //     for (var i = 0; i < l; i++) {
        //         e = employees[i];
        //         $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
        //     }
        // });
    // }
		
		// function renderHomeView() {			
		// 	// var html = 
		// 	// 	"<h1>Directory</h1>" +
		// 	// 	"<input class='search-key' type='search' placeholder='Enter name'/>" +
		// 	// 	"<ul class='employee-list'></ul>";
		// 	$('body').html(homeTpl());
		// 	$('.search-key').on('keyup', findByName);
		// }

}());
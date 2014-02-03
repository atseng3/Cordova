var EmployeeView = function(adapter, template, employee) {
	
	this.initialize = function() {
		this.el = $('<div/>');
		this.el.on('click', '.add-location-btn', this.addLocation);
		this.el.on('click', '.add-contact-btn', this.addToContacts);
		this.el.on('click', '.change-pic-btn', this.changePicture);
	};
	
	this.changePicture = function(event) {
		event.preventDefault();
		if (!navigator.camera) {
			alert("Camer API not supported", "Error");
			return;
		}
		var options = {
			quality: 50,
			destinationType: Camer.DestinationType.DATA_URL,
			sourceType: 1,
			encodingType: 0
		};
		navigator.camera.getPicture(
				function(imageData) {
					$('.employee-image', this.el).attr('src', "data:image/jpeg;base64," + imageData);
				},
				function() {
					alert('Error taking picture', 'Error');
				},
				options);
			return false;
	};
	
	this.addToContacts = function(event) {
		event.preventDefault();
		console.log('addToContacts');
		if (!navigator.contacts) {
			alert("Contacts API not supported", "Error");
			return;
		}
		var contact = navigator.contacts.create();
		contact.name = {givenName: employee.firstName, familyName: employee.lastName};
		var phoneNumbers = [];
		phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
		phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true);
		contact.phoneNumbers = phoneNumbers;
		contact.save();
		alert("Successfully saved " + employee.firstName + " " + employee.lastName + " to your contacts!");
		return false;
	};
	
	this.addLocation = function(event) {
		event.preventDefault();
		navigator.geolocation.getCurrentPosition(
			function(position) {
				alert(position.coords.latitude + ',' + position.coords.longitude);
			},
			function() {
				alert('Error getting location');
			});
			return false;
	};
	
	this.render = function() {
		this.el.html(template(employee));
		return this;
	};
	
	this.initialize();
}
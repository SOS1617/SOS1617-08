describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('https://sos1617-08.herokuapp.com/#!/victims/');
		var victims = element.all(by.repeater('dataUnit in data'));

		expect(victims.count()).toBeGreaterThan(1);
	});
});
describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('https://sos1617-08.herokuapp.com/#!/wages/');
		var wages = element.all(by.repeater('dataUnit in data'));

		expect(wages.count()).toBeGreaterThan(1);
	});
});
describe('Wage is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('https://localhost:8080');
		var wages = element.all(by.repeater('wage in wages'));

		expect(wages.count()).toBeGreaterThan(3);
	});
});
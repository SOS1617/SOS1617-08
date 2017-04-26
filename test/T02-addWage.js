describe('Add wage', function () {
	it('should add a new wage', function (){
		browser.get('https://sos161708rmn-sandbox-sos161708rmn.c9users.io/wages/index.html');

		element.all(by.repeater('wage in wages')).then(function (initialResults){
				browser.driver.sleep(2000);
	
				element(by.model('newWage.province')).sendKeys('Malaga');
				element(by.model('newWage.year')).sendKeys('2015');
				element(by.model('newWage.varied')).sendKeys('1,23%');
				element(by.model('newWage.averageWage')).sendKeys('15.921');

				element(by.buttonText('add')).click().then(function (){

					element.all(by.repeater('wage in wages')).then(function (results){
						expect(results.length).toEqual(initialResults.length+1);
					});
				
				});
			
		});
	});
	
});
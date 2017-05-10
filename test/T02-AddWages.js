describe('Add wages', function () {
	it('should add a new wage', function (){
		browser.get('https://sos1617-08.herokuapp.com/#!/wages/');

		element.all(by.repeater('dataUnit in data')).then(function (initialWages){
				browser.driver.sleep(2000);
	
				element(by.model('newData.province')).sendKeys('Andorra');
				element(by.model('newData.year')).sendKeys('2020');
				element(by.model("newData['varied']")).sendKeys('2');
				element(by.model("newData['averageWage']")).sendKeys('19.50');

				
				element(by.buttonText('add')).click().then(function (){

					element.all(by.repeater('dataUnit in data')).then(function (wages){
						expect(wages.length).toEqual(initialWages.length);
					});
				
				});
			
		});
	});
	
});
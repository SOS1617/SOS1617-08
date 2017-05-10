describe('Add victims', function () {
	it('should add a new victim', function (){
		browser.get('https://sos1617-08.herokuapp.com/#!/victims/');

		element.all(by.repeater('dataUnit in data')).then(function (initialVictims){
				browser.driver.sleep(2000);
	
				element(by.model('newData.province')).sendKeys('Andorra');
				element(by.model('newData.year')).sendKeys('2020');
				element(by.model("newData['numberVictims']")).sendKeys('2');
				element(by.model("newData['averageYear']")).sendKeys('31');

				
				element(by.buttonText('add')).click().then(function (){

					element.all(by.repeater('dataUnit in data')).then(function (victims){
						expect(victims.length).toEqual(initialVictims.length);
					});
				
				});
			
		});
	});
	
});
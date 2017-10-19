var PageObject = require('../e2e/surveyPageObject.js');
var testdata = require('../e2e/testdata.json');

etTEXTfields = function(textID, textVAL) {
	element(by.id(textID)).getAttribute('value').then(function(value){
		var textfield = value;
	expect (textfield).toEqual(textVAL);
});}
isSelectedfields = function(selectedField, fieldVAL){
	element(by.id(selectedField)).isSelected().then(function(selected){
		expect (selected).toEqual(fieldVAL);
});}
geTAttributevalues = function(cscDropID){
element(by.id(cscDropID)).getAttribute('value').then(function(value){
	expect(value).toBe('select');
});}
getCountSC = function(scID, val){
	element.all(by.id(scID)).count('count').then(function(count){
		expect(count).toEqual(val);
});}
getCSCCount = function(countryID, val){
	element(by.id(countryID)).all(by.tagName('option')).count('count').then(function(count){
		expect(count).toEqual(val);	
});}
dropdownselected = function(dropID,dropVAL){
	element(by.css(dropID)).getText('text').then(function(text){
		expect(text).toBe(dropVAL);
		});}

describe(
		'TEST Form Validation: ', 
		function() {
			beforeEach(function() {
				get();
	});
	testdata.forEach(function(data){
	it('Test form: Verify whether Input values given in Take survey should be displayed in Read-Only form', function(){
				tESTTakeSurvey();
				browser.sleep('1000');
				enterText(data.textBox1test, data.testvaltext1)
				.enterText(data.textBox2test, data.testvaltext2)
				.enterText(data.textBox3test, data.mailtexttest)
				.enterText(data.textBox4test, data.testvaltext4)
				.radioButton(data.radiobutton1Yestest)
				.radioButton(data.radiobutton2Yestest)
				.enterDate(data.dateTexttest, data.dateValid)
				.dropdown(data.drop1ID, data.drop1Val)
				.dropdown(data.drop2ID, data.drop2Val)
				element(by.id(data.countryDropID)).sendKeys(data.countryDropVal);
				element(by.id(data.stateDropID)).sendKeys(data.stateDropVal);
				element(by.id(data.cityDropID)).sendKeys(data.cityDropVal);
				checkBox(data.checkBox1test);
				submitButtonClick();
				element.all(by.linkText('Click here')).get(1).click();
				etTEXTfields(data.textBox1test, data.testvaltext1);
				etTEXTfields(data.textBox2test, data.testvaltext2);
				etTEXTfields(data.textBox3test, data.mailtexttest);
				etTEXTfields(data.textBox4test, data.testvaltext4);
				isSelectedfields(data.radiobutton1Yestest, true);
				isSelectedfields(data.radiobutton2Yestest, true);
				geTAttributevalues = function(){
					element(by.id(data.data.drop1ID)).getAttribute('value').then(function(value){
						expect(value).toBe(data.drop1Val);
					});}
				geTAttributevalues = function(){
					element(by.id(data.data.drop2ID)).getAttribute('value').then(function(value){
						expect(value).toBe(data.drop2Val);
					});}
				geTAttributevalues = function(){
					element(by.id(data.data.countryDropID)).getAttribute('value').then(function(value){
						expect(value).toBe(data.countryDropVal);
					});}
				geTAttributevalues = function(){
					element(by.id(data.data.countryDropID)).getAttribute('value').then(function(value){
						expect(value).toBe(data.stateDropVal);
					});}
				geTAttributevalues = function(){
					element(by.id(data.data.countryDropID)).getAttribute('value').then(function(value){
						expect(value).toBe(data.cityDropVal);
					});}						
		});
	});
	testdata.forEach(function(data){
	it(
			'Verify whether default value for DropDowns should be SELECT on FORM LOAD',
			function() {
				tESTTakeSurvey();	
				geTAttributevalues = function(){
					element(by.id(data.countryDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				geTAttributevalues = function(){
					element(by.id(data.data.stateDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				geTAttributevalues = function(){
					element(by.id(data.data.cityDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.countryDropID)).count('count').then(function(count){
						expect(count).toEqual(6);
				});}
				getCountSC = function(){
					element.all(by.id(data.stateDropID)).count('count').then(function(count){
						expect(count).toEqual(1);
				});}
				getCountSC = function(){
					element.all(by.id(data.cityDropID)).count('count').then(function(count){
						expect(count).toEqual(1);
				});}
		});
	});
	testdata.forEach(function(data){
		it(
			'Verify whether STATE dropDown should be refreshed when selection made in COUNTRY dropdown, Same for CITY',
			function() {
				tESTTakeSurvey();
				geTAttributevalues = function(){
					element(by.id(data.countryDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				geTAttributevalues = function(){
					element(by.id(data.data.stateDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				geTAttributevalues = function(){
					element(by.id(data.data.cityDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.countryDropID)).count('count').then(function(count){
						expect(count).toEqual(6);
				});}
				getCountSC = function(){
					element.all(by.id(data.stateDropID)).count('count').then(function(count){
						expect(count).toEqual(1);
				});}
				getCountSC = function(){
					element.all(by.id(data.cityDropID)).count('count').then(function(count){
						expect(count).toEqual(1);
				});}
				
				element(by.id(data.countryDropID)).sendKeys(data.countryDropVal);
				geTAttributevalues = function(){
					element(by.id(data.data.stateDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.stateDropID)).count('count').then(function(count){
						expect(count).toEqual(6);
				});}	
				geTAttributevalues = function(){
					element(by.id(data.data.cityDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.cityDropID)).count('count').then(function(count){
						expect(count).toEqual(1);
				});}
				element(by.id(data.stateDropID)).sendKeys('New York');
				geTAttributevalues = function(){
					element(by.id(data.data.cityDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.cityDropID)).count('count').then(function(count){
						expect(count).toEqual(6);
				});}
			
			});		
		});
		testdata.forEach(function(data){
		it(
			'Verify when changes made or select SELECT value in STATE drop then CITY should be refreshed and COUNTRY remain same',
			function() {
				tESTTakeSurvey();				
				geTAttributevalues = function(){
					element(by.id(data.countryDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				geTAttributevalues = function(){
					element(by.id(data.data.stateDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				geTAttributevalues = function(){
					element(by.id(data.data.cityDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.countryDropID)).count('count').then(function(count){
						expect(count).toEqual(6);
				});}
				getCountSC = function(){
					element.all(by.id(data.stateDropID)).count('count').then(function(count){
						expect(count).toEqual(1);
				});}
				getCountSC = function(){
					element.all(by.id(data.cityDropID)).count('count').then(function(count){
						expect(count).toEqual(1);
				});}
				
				element(by.id(data.countryDropID)).sendKeys(data.countryDropVal);
				geTAttributevalues = function(){
					element(by.id(data.data.stateDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.stateDropID)).count('count').then(function(count){
						expect(count).toEqual(6);
				});}	
				geTAttributevalues = function(){
					element(by.id(data.data.cityDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.cityDropID)).count('count').then(function(count){
						expect(count).toEqual(1);
				});}
				element(by.id(data.stateDropID)).sendKeys('New York');
				geTAttributevalues = function(){
					element(by.id(data.data.cityDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.cityDropID)).count('count').then(function(count){
						expect(count).toEqual(6);
				});}
				element(by.id(data.cityDropID)).sendKeys(data.cityDropVal);
				
				element.all(by.id(data.stateDropID)).sendKeys(data.stateDropVal1);
				geTAttributevalues = function(){
					element(by.id(data.data.cityDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.cityDropID)).count('count').then(function(count){
						expect(count).toEqual(1);
				});}
				geTAttributevalues = function(){
					element(by.id(data.data.countryDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('United States');
					});}
			});		
		});
		testdata.forEach(function(data){
		it(
			'Vaues from STATE and CITY should be refreshed and default value should be SELECT when COUNTRY changed',
			function() {
				tESTTakeSurvey();				
				geTAttributevalues = function(){
					element(by.id(data.countryDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				geTAttributevalues = function(){
					element(by.id(data.data.stateDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				geTAttributevalues = function(){
					element(by.id(data.data.cityDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.countryDropID)).count('count').then(function(count){
						expect(count).toEqual(6);
				});}
				getCountSC = function(){
					element.all(by.id(data.stateDropID)).count('count').then(function(count){
						expect(count).toEqual(1);
				});}
				getCountSC = function(){
					element.all(by.id(data.cityDropID)).count('count').then(function(count){
						expect(count).toEqual(1);
				});}
				
				element(by.id(data.countryDropID)).sendKeys(data.countryDropVal);
				geTAttributevalues = function(){
					element(by.id(data.data.stateDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.stateDropID)).count('count').then(function(count){
						expect(count).toEqual(6);
				});}	
				geTAttributevalues = function(){
					element(by.id(data.data.cityDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.cityDropID)).count('count').then(function(count){
						expect(count).toEqual(1);
				});}
				element(by.id(data.stateDropID)).sendKeys('New York');
				geTAttributevalues = function(){
					element(by.id(data.data.cityDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.cityDropID)).count('count').then(function(count){
						expect(count).toEqual(6);
				});}
				element(by.id(data.cityDropID)).sendKeys(data.cityDropVal);				
				element(by.id(data.countryDropID)).sendKeys(data.countryDropVa2);
				geTAttributevalues = function(){
					element(by.id(data.data.stateDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.stateDropID)).count('count').then(function(count){
						expect(count).toEqual(1);
				});}	
				geTAttributevalues = function(){
					element(by.id(data.data.cityDropID)).getAttribute('value').then(function(value){
						expect(value).toBe('select');
					});}
				getCountSC = function(){
					element.all(by.id(data.cityDropID)).count('count').then(function(count){
						expect(count).toEqual(1);
				});}			
		});
		});
});	

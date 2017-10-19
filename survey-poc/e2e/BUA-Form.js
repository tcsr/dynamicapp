var PageObject = require('../e2e/surveyPageObject.js');
var testdata = require('../e2e/testdata.json');
reqFieldCount = function(ToTReqField) {
	element.all(by.css('[class="text-danger required-error"]')).count().then(
		function(count) {
			expect(count).toBe(ToTReqField);
	});	
}
gettextfield = function(textfield, savetext){
	element(by.id(textfield)).getAttribute('value').then(function(value){
		expect (value).toEqual(savetext);
	});
}
isselectedfield = function(selectfield, savefield){
	element(by.id(selectfield)).isSelected().then(function(selected){
		expect (selected).toEqual(savefield);
	});
}
describe(
		'BUA Form Validation: ', 
		function() {
			beforeEach(function() {
				get();
	});
	it(
		'Check Whether required field message displayed when input values are NOT given into required fields',
		function() {
			bUATakeSurvey();
			browser.sleep('1000');
			submitButtonClick();
			reqFieldCount(19);
			element(by.css('[class="validation-messages"]')).getText().then(
			function(text) {
				expect(text).toBe('* Missing/invalid answers. Please check your answers.');
			});			
	});
	testdata.forEach(function(data){
	it(
		'Check Whether user able to submit the form by giving all the required values',
		function() {
			bUATakeSurvey();
			browser.sleep('1000');
			enterText(data.textBox1,data.textBox1text);
			enterDate(data.dateID1,data.dateValid);
			enterText(data.textBox2, data.textBox2text);
			checkBox(data.checkBoxID1BUA);
			enterText(data.textBox4, data.textBox4text);
			enterDate(data.dateID2,data.dateValid);
			enterDate(data.dateID3,data.dateValid);
			checkBox(data.checkBoxID8BUA);
			enterText(data.textBox5, data.textBox5text);
			radioButton(data.radiobuttonIDBUA1yes);
			enterText(data.textBox6, data.textBox6text);
			checkBox(data.checkBoxID15BUA);
			radioButton(data.radiobuttonIDBUA2yes);
			checkBox(data.checkBoxID35BUA);
			checkBox(data.checkBoxID20BUA);
			enterText(data.textBox8, data.textBox8text);
			radioButton(data.radiobuttonIDBUA3yes);
			enterText(data.textBox9, data.textBox9text);
			checkBox(data.checkBoxID27BUA);
			radioButton(data.radiobuttonIDBUA4yes);
			checkBox(data.checkBoxID32BUA);
			submitButtonClick();
			browser.sleep('1000');
			//expect(element(by.css('[class="validation-messages"]')).isPresent()).toBe(false);
			element(by.css('[class="col-xs-offset-1"]')).element(by.tagName('h1')).getText().then(function(text){
					expect(text).toBe('Your form has been successfully submitted!!');
			});			
	});
	});
	testdata.forEach(function(data){
	it(
			'Check Whether Date component is working with valid date ',
			function() {
				bUATakeSurvey();
				browser.sleep('1000');
				enterDate(data.dateID2,data.dateValid)
				submitButtonClick();
				reqFieldCount(18);			
	});
	});
	testdata.forEach(function(data){
	it(
		'Check Whether Date component is working with Invalid date ',
		function() {
			bUATakeSurvey();
			browser.sleep('1000');				
			enterDate(data.dateID2,data.dateInvalid)
			.submitButtonClick();				
			element(by.id('3a4b5c6d-3a4b-3a4b-3a4b-a3a4b5c6d7e6_7_div')).element(by.css('[class="text-danger validDate-error"]')).getText().then(
			function(text) {
				expect(text).toBe('Please enter a valid date');
			});									
	});
	});
	testdata.forEach(function(data){
	it(
		'Check Whether User able to view the Sub-Question component when the condition is valid ',
		function() {
			bUATakeSurvey();				
			checkBox(data.checkBoxID17BUA)
			.radioButton(data.radiobuttonIDBUA2yes);
			expect(element(by.id('3a4b5c6d-3a4b-3a4b-3a4b-a3a4b5c6d7e7_7_div')).isPresent()).toBe(true);		
	});
	});	
	testdata.forEach(function(data){
	it(
		'Check Whether User able to view the Sub-Question component when the condition is not met',
		function() {
			bUATakeSurvey();				
			checkBox(data.checkBoxID19BUA)
			.radioButton(data.radiobuttonIDBUA2yes);				
			element(by.id('3a4b5c6d-3a4b-3a4b-3a4b-a3a4b5c6d7e7_7_div')).getAttribute('disabled').then(function(attribute){
				expect(attribute).toBe(null);
			});
	});
	});
	testdata.forEach(function(data){
	it(
			'Check Whether Required error message is displayed when the form submitted without answering the question ',
			function() {
				bUATakeSurvey();				
				checkBox(data.checkBoxID17BUA)
				.radioButton(data.radiobuttonIDBUA2yes)
				.submitButtonClick();
				expect(element(by.id('3a4b5c6d-3a4b-3a4b-3a4b-a3a4b5c6d7e7_7_div')).element(by.css('[class="text-danger required-error"]')).isPresent()).toBe(true);		
	});
	});
	testdata.forEach(function(data){
	it(
		'Check Whether Required error message is displayed when the form submitted with Sub-question',
		function() {
				bUATakeSurvey();
				checkBox(data.checkBoxID17BUA)
				.radioButton(data.radiobuttonIDBUA2yes)
				.radioButton(data.checkBoxID35BUA)
				submitButtonClick();
				reqFieldCount(16);				
	});
	});
	testdata.forEach(function(data){
	it(
		'Check Whether all the CheckBoxes are disabled when user select N/A option',
		function() {
			bUATakeSurvey();				
			 checkBox(data.checkBoxID1BUA)
			.checkBox(data.checkBoxID2BUA)
			checkBox(data.checkBoxID7BUA);				
			expect(element(by.id(data.checkBoxID1BUA)).getAttribute('checked') ).toBe(null);
			expect(element(by.id(data.checkBoxID2BUA)).getAttribute('checked') ).toBe(null);
	});	
	});	
	testdata.forEach(function(data){
	it(
		'Check Whether N/A option is disabled when an user select other checkboxes',
		function() {
			bUATakeSurvey();
			checkBox(data.checkBoxID7BUA)
			.checkBox(data.checkBoxID1BUA)
			.checkBox(data.checkBoxID2BUA)
			expect(element(by.id(data.checkBoxID7BUA)).getAttribute('checked') ).toBe(null);
	});
	});	
	testdata.forEach(function(data){
		it(
			'Check Whether Input value in the take survey should be present in the View survey BUA form',
			function() {
				bUATakeSurvey();
				enterText(data.textBox1,data.textBox1text)
				.enterDate(data.dateID1,data.dateValid)
				.enterText(data.textBox2, data.textBox2text)
				.checkBox(data.checkBoxID1BUA)
				.enterText(data.textBox4, data.textBox4text)
				.enterDate(data.dateID2,data.dateValid)
				.enterDate(data.dateID3,data.dateValid)
				.checkBox(data.checkBoxID8BUA)
				.enterText(data.textBox5, data.textBox5text)
				.radioButton(data.radiobuttonIDBUA1yes)
				.enterText(data.textBox6, data.textBox6text)
				.checkBox(data.checkBoxID15BUA)
				.radioButton(data.radiobuttonIDBUA2yes)
				.checkBox(data.checkBoxID35BUA)
				.checkBox(data.checkBoxID20BUA)
				.enterText(data.textBox8, data.textBox8text)
				.radioButton(data.radiobuttonIDBUA3yes)
				.enterText(data.textBox9, data.textBox9text)
				.checkBox(data.checkBoxID27BUA)
				.radioButton(data.radiobuttonIDBUA4yes)
				.checkBox(data.checkBoxID32BUA);			
				submitButtonClick();
				element.all(by.linkText('Click here')).get('1').click();				
				gettextfield(data.textBox1, 'Biological');
				gettextfield(data.dateID1, '12-12-1212');
				gettextfield(data.textBox2, 'Department');
				isselectedfield(data.checkBoxID1BUA, true);				
				gettextfield(data.textBox4, 'Biology Department');
				gettextfield(data.dateID2, '12-12-1212');
				gettextfield(data.dateID3, '12-12-1212');
				isselectedfield(data.checkBoxID8BUA, true);				
				gettextfield(data.textBox5, 'Strain or type');
				isselectedfield(data.radiobuttonIDBUA1yes, true);				
				gettextfield(data.textBox6, 'Strain or type');
				isselectedfield(data.checkBoxID15BUA, true);
				isselectedfield(data.radiobuttonIDBUA2yes, true);
				isselectedfield(data.checkBoxID35BUA, true);
				isselectedfield(data.checkBoxID20BUA, true);				
				gettextfield(data.textBox8, 'Strain or type');
				isselectedfield(data.radiobuttonIDBUA3yes, true);				
				gettextfield(data.textBox9, 'Strain or type');
				isselectedfield(data.checkBoxID27BUA, true);
				isselectedfield(data.radiobuttonIDBUA4yes, true);
				isselectedfield(data.checkBoxID33BUA, false);
		});
		});
});
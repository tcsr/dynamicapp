var checkBoxval, dateval, radiobutton1, radiobutton2, radiobutton3, radiobutton4, radiobutton5, radiobutton6,
radiobutton7, radiobutton8, radiobutton9, radiobutton10, radiobutton11;
var PageObject = require('../e2e/surveyPageObject.js');
var testdata = require('../e2e/testdata.json');
reqFieldCount = function(ToTReqField) {
	element.all(by.css('[class="text-danger required-error"]')).count().then(
		function(count) {
			expect(count).toBe(ToTReqField);
	});	
};
isSelectedfield = function(isselect, fieldoption){
	element(by.id(isselect)).isSelected().then(function(selected){
		expect (selected).toEqual(fieldoption);
	});
}
testdata.forEach(function (data) {
getTextfield = function(expectedtext){
	element(by.id(data.dateID)).getAttribute('value').then(function(value){
		expect(value).toBe(expectedtext);
	});
}
});
describe(
		'LHA Form Validation: ', 
		function() {
			beforeEach(function() {
				get();
	});		
	it(
		'Check Whether required field message displayed when input values are NOT given into required fields',
		function() {
			lHATakeSurvey();
			browser.sleep('1000');
			submitButtonClick();
			reqFieldCount(12);
			element(by.css('[class="validation-messages"]')).getText().then(
					function(text) {
						expect(text).toBe('* Missing/invalid answers. Please check your answers.');
					});		
	});	
	testdata.forEach(function (data) {
		it(
			'Check Whether user able to submit the form by giving all the required values',
			function() {
				browser.ignoreSynchronization = true;
				lHATakeSurvey();
				checkBox(data.checkBoxID1);
				radioButton(data.radiobuttonID11yes);
				enterDate(data.dateID,data.dateValid);
				radioButton(data.radiobuttonID1yes);
				radioButton(data.radiobuttonID2yes);
				radioButton(data.radiobuttonID3yes);
				radioButton(data.radiobuttonID10yes);
				radioButton(data.radiobuttonID4yes);
				radioButton(data.radiobuttonID5yes);
				radioButton(data.radiobuttonID6yes);
				radioButton(data.radiobuttonID7yes);
				radioButton(data.radiobuttonID8yes);
				radioButton(data.radiobuttonID9yes);
				submitButtonClick();
				browser.sleep('1000');
				element(by.css('[class="col-xs-offset-1"]')).element(by.tagName('h1')).getText().then(function(text){
					expect(text).toBe('Your form has been successfully submitted!!');
			});
		});
	});
	testdata.forEach(function(data){
	it(
		'Check Whether Date component is working with valid date ',
		function() {
			lHATakeSurvey();
			browser.sleep('1000');
			enterDate(data.dateID,data.dateValid);
			submitButtonClick();
			reqFieldCount(11);
						
	});
	});
	testdata.forEach(function(data){
	it(
		'Check Whether Date component is working with Invalid date ',
		function() {
			lHATakeSurvey();				
			enterDate(data.dateID,data.dateInvalid)
			.submitButtonClick();				
			element(by.id('3a4b5c6d-3a4b-3a4b-3a4b-a3a4b5c6d7e2_2_div')).element(by.css('[class="text-danger validDate-error"]')).getText().then(
				function(text) {
					expect(text).toBe('Please enter a valid date');
			});						
	});
	});
	testdata.forEach(function(data){
	it(
		'Check Whether User able to view the Sub-Question component when the condition is valid ',
		function() {
			lHATakeSurvey();				
			radioButton(data.radiobuttonID2yes)
			.radioButton(data.radiobuttonID3yes);
			expect(element(by.id('3a4b5c6d-3a4b-3a4b-3a4b-a3a4b5c6d7e4_4_div')).isPresent()).toBe(true);		
	});
	});
	testdata.forEach(function(data){
	it(
		'Check Whether User able to view the Sub-Question component when the condition is not met',
		function() {
			lHATakeSurvey();				
			radioButton(data.radiobuttonID2yes)
			.radioButton(data.radiobuttonID3no);				
			element(by.id('3a4b5c6d-3a4b-3a4b-3a4b-a3a4b5c6d7e4_4_div')).getAttribute('disabled').then(function(attribute){
				expect(attribute).toBe(null);
			});
	});
	});
	testdata.forEach(function(data){
	it(
			'Check Whether Required error message is displayed when the form submitted without answering the question ',
			function() {
				lHATakeSurvey();				
				radioButton(data.radiobuttonID2yes)
				.radioButton(data.radiobuttonID3yes)
				.submitButtonClick();
				expect(element(by.id('3a4b5c6d-3a4b-3a4b-3a4b-a3a4b5c6d7e4_4_div')).element(by.css('[class="text-danger required-error"]')).isPresent()).toBe(true);		
	});
	});
	testdata.forEach(function(data){
	it(
		'Check Whether Required error message is displayed when the form submitted with Sub-question',
			function() {
				lHATakeSurvey();				
				radioButton(data.radiobuttonID2yes)
				.radioButton(data.radiobuttonID3yes)
				.radioButton(data.radiobuttonID10yes)			
				.submitButtonClick();
				reqFieldCount(9);
	});
	});
	testdata.forEach(function(data){
	it(
		'Check Whether all the checkboxes are disabled when user select N/A option',
		function() {
			lHATakeSurvey();				
			 checkBox(data.checkBoxID1)
			.checkBox(data.checkBoxID2)
			checkBox(data.checkBoxIDNA);		
			 expect(element(by.id(data.checkBoxID1)).getAttribute('checked') ).toBe(null);
			 expect(element(by.id(data.checkBoxID2)).getAttribute('checked') ).toBe(null);
	});
	});
	testdata.forEach(function(data){
	it(
		'Check Whether N/A option disabled when an user select othe checkboxes',
		function() {
			lHATakeSurvey();
			checkBox(data.checkBoxIDNA)
			.checkBox(data.checkBoxID1)
			 checkBox(data.checkBoxID2);			
			expect(element(by.id(data.checkBoxIDNA)).getAttribute('checked') ).toBe(null);
	});
	});
	testdata.forEach(function (data) {		
		it(
			'Check Whether Input value in the take survey should be present in the View survey LHA form',
			function() {
				lHATakeSurvey();
				checkBox(data.checkBoxID1)
				.radioButton(data.radiobuttonID11yes)
				enterDate(data.dateID,data.dateValid);
				browser.sleep('1000');
				radioButton(data.radiobuttonID1yes)
				.radioButton(data.radiobuttonID2yes)
				.radioButton(data.radiobuttonID3yes)
				.radioButton(data.radiobuttonID10yes)
				.radioButton(data.radiobuttonID4yes)
				.radioButton(data.radiobuttonID5yes)
				.radioButton(data.radiobuttonID6yes)
				.radioButton(data.radiobuttonID7yes)
				.radioButton(data.radiobuttonID8yes)
				radioButton(data.radiobuttonID9yes);				
				submitButtonClick();
				browser.sleep('1000');
				element.all(by.linkText('Click here')).get('1').click();	
				browser.sleep('1000');
				isSelectedfield(data.checkBoxID1, true);
				getTextfield(data.dateValid);
				isSelectedfield(data.radiobuttonID11yes, true);
				isSelectedfield(data.radiobuttonID1yes, true);		
				isSelectedfield(data.radiobuttonID2yes, true);
				isSelectedfield(data.radiobuttonID3yes, true);
				isSelectedfield(data.radiobuttonID10yes, true);
				isSelectedfield(data.radiobuttonID4yes, true);
				isSelectedfield(data.radiobuttonID5yes, true);
				isSelectedfield(data.radiobuttonID6yes, true);
				isSelectedfield(data.radiobuttonID7yes, true);
				isSelectedfield(data.radiobuttonID8yes, true);
				isSelectedfield(data.radiobuttonID9yes, true);		
		});
		});
});


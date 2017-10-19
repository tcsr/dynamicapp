var PageObject = require('../e2e/surveyPageObject.js');
var testdata = require('../e2e/testdata.json');
reqFieldCount = function(ToTReqField) {
	element.all(by.css('[class="text-danger required-error"]')).count().then(
		function(count) {
			expect(count).toBe(ToTReqField);
	});	
};
browserWAIT = function(milliseconds){
	browser.sleep(milliseconds);
};
isPresentfield = function(fieldID,fieldVal){
	expect(element(by.id(fieldID)).isPresent()).toBe(fieldVal);
	browser.sleep('1000');
};
keyENTER = function(fieldID){
	element(by.id(fieldID)).sendKeys(protractor.Key.ENTER);
};

describe(
		'SLIP Resistant Form Validation: ', 
		function() {			
			beforeEach(function() {
				slipResistTakeSurvey();
	});
		testdata.forEach(function(data){
			it(
			'Search Box should be displayed while loading the form',
				function() {
				browser.ignoreSynchronization = true;
				browserWAIT('5000');
				isPresentfield(data.searchPrimeSRF, true);
				isPresentfield(data.searchAltCont, true);
				isPresentfield(data.searchAuthPurchase, true);
				isPresentfield(data.searchPurchaser, true);
				isPresentfield(data.searchAddauthPurch, true);
				isPresentfield(data.searchAltSuper, true);
				isPresentfield(data.searchIndiEMP, true);
				});
			});
		testdata.forEach(function(data){		
		it(
				'Search Box should be displayed when max iteration is not reached',
					function() {
					browser.ignoreSynchronization = true;
					browserWAIT('1000');					
					enterText(data.searchAltCont, 'aa')
					browserWAIT('1000');
					keyENTER(data.searchAltCont)
					browserWAIT('1000');
					enterText(data.searchAltCont, 'aa')
					browserWAIT('1000');
					keyENTER(data.searchAltCont)
					browserWAIT('1000');
					enterText(data.searchAltCont, 'aa')
					browserWAIT('1000');
					keyENTER(data.searchAltCont)
					browserWAIT('1000');
					enterText(data.searchAltCont, 'aa')
					browserWAIT('1000');
					keyENTER(data.searchAltCont)
					browserWAIT('1000');
					enterText(data.searchAltCont, 'aa')
					browserWAIT('1000');
					keyENTER(data.searchAltCont)
					browserWAIT('1000');
					enterText(data.searchAltCont, 'aa')
					browserWAIT('1000');
					keyENTER(data.searchAltCont)
					browserWAIT('1000');
					enterText(data.searchAltCont, 'aa')
					browserWAIT('1000');
					keyENTER(data.searchAltCont)
					browserWAIT('1000');
					isPresentfield(data.searchAltCont, true);
					browser.sleep('1000');
					});});
		
		testdata.forEach(function(data){	
			it(
			'Search Box should be disappear when it reaches MAX iteration and Chosen Response should be displayed',
				function(done) {
				browser.ignoreSynchronization = true;
				browserWAIT('1000');				
				element(by.id(data.searchPrimeSRF)).sendKeys('An');
				browser.sleep('1000');
				element(by.id(data.searchPrimeSRF)).sendKeys(protractor.Key.ENTER);
				browser.sleep('1000');
				expect(element(by.id(data.searchPrimeSRF)).isPresent()).toBe(false);
				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys('aa');
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys(protractor.Key.ENTER);
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys('aa');
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys(protractor.Key.ENTER);
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys('aa');
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys(protractor.Key.ENTER);
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys('aa');
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys(protractor.Key.ENTER);
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys('aa');
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys(protractor.Key.ENTER);
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys('aa');
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys(protractor.Key.ENTER);
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys('aa');
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys(protractor.Key.ENTER);
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys('aa');
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys(protractor.Key.ENTER);
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys('aa');
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys(protractor.Key.ENTER);
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys('aa');
//				browser.sleep('1000');
//				element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).sendKeys(protractor.Key.ENTER);
//				browser.sleep('500');
//				expect(element(by.id('961b482b-2ecb-41d2-baaa-4423bc8743e9_17')).isPresent()).toBe(false);
				done();
				});	
		});
		testdata.forEach(function(data){	
		it(
		'Submitting the form and verify the drop down values in read only form',
		function() {
			browser.ignoreSynchronization = true;
			browser.sleep('1000')
			element(by.id(data.radioUnitStatus1)).click();
			element(by.id(data.radioSupplier1)).click();
			browser.sleep('1000')
			element(by.id(data.dropUClocation)).sendKeys('Physics');
			browser.sleep('1000')
			element(by.id(data.dropDepartment)).sendKeys('Chemistry');
			browser.sleep('1000')
			element(by.id(data.textUnitName)).sendKeys('uuuuuuuuuu');
			browser.sleep('1000')
			element.all(by.id(data.textShipping)).sendKeys('uuuuu');
			element.all(by.id(data.textRoomNo)).sendKeys('uuuuu');
			browser.sleep('1000')
			element.all(by.id(data.textCity)).sendKeys('uuuuuuuuuu');
			browser.sleep('1000')
			element(by.id(data.dropState)).sendKeys('Alaska');
			browser.sleep('1000')
			element.all(by.id(data.textZipCodeg)).sendKeys('2222222222');
			element(by.id(data.textAreaEnroll)).sendKeys('uuuuuuuuuu');
			element(by.id(data.textAreaEnvironment)).sendKeys('uuuuuuuuuu');
			element(by.id(data.textAreaHazard)).sendKeys('uuuuuuuuuu');
			element(by.id(data.searchPrimeSRF)).sendKeys('An');
			browser.sleep('1000');
			element(by.id(data.searchPrimeSRF)).sendKeys(protractor.Key.ENTER);
			element(by.id(data.textPhone1)).sendKeys('1111111111');
			element(by.id(data.searchAltCont)).sendKeys('Amy Smith (amy@uctest.edu)');
			browser.sleep('1000');
			element(by.id(data.searchAltCont)).sendKeys(protractor.Key.ENTER);
			browser.sleep('1000');
			element(by.id(data.searchAltCont)).sendKeys('Andrew Smith (andrew@uctest.edu)');
			browser.sleep('1000');
			element(by.id(data.searchAltCont)).sendKeys(protractor.Key.ENTER);
			browser.sleep('1000');
			element(by.id(data.searchAuthPurchase)).sendKeys('Andrew Smith (andrew@uctest.edu)');
			browser.sleep('1000');
			element(by.id(data.searchAuthPurchase)).sendKeys(protractor.Key.ENTER);
			browser.sleep('1000');
			element(by.id(data.textPhone2)).sendKeys('2222222222');
			element(by.id(data.searchPurchaser)).sendKeys('Andrea Johnson (andrea@uctest.edu)');
			browser.sleep('1000');
			element(by.id(data.searchPurchaser)).sendKeys(protractor.Key.ENTER);
			browser.sleep('1000');
			element(by.id(data.searchAddauthPurch)).sendKeys('Andy Johnson (andy@uctest.edu)');
			browser.sleep('1000');
			element(by.id(data.searchAddauthPurch)).sendKeys(protractor.Key.ENTER);
			browser.sleep('1000');
			element(by.id(data.textPhone3)).sendKeys('3333333333');
			element(by.id(data.searchAltSuper)).sendKeys('Ana Smith (ana@uctest.edu)');
			browser.sleep('1000');
			element(by.id(data.searchAltSuper)).sendKeys(protractor.Key.ENTER);
			browser.sleep('1000');
			element(by.id(data.searchIndiEMP)).sendKeys('Aura Johnson (aura@uctest.edu)');
			browser.sleep('1000');
			element(by.id(data.searchIndiEMP)).sendKeys(protractor.Key.ENTER);
			browser.sleep('1000');			
			submitButtonClick();
			browser.sleep('1000');
			element.all(by.linkText('Click here')).get('1').click();
			browser.sleep('1000');
			element.all(by.id(data.searchTestField)).all(by.tagName('td')).get(0).getText().then(function(text){
				expect(text).toBe('Amy Smith (amy@uctest.edu)')
			});
			element.all(by.id(data.searchTestField)).all(by.tagName('td')).get(2).getText().then(function(text){
				expect(text).toBe('Andrew Smith (andrew@uctest.edu)')
			});
			browser.sleep('5000');
	});
	});
});


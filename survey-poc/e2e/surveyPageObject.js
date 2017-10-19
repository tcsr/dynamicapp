var PageObject = function() {
	submitButtonClick = function() {
		element.all(by.tagName('button')).get(1).click();
	}
	tESTTakeSurvey = function(){
		element(by.css('a[href="/menu/takeSurvey/TEST"]')).click();
	}
	slipResistTakeSurvey = function(){
		browser.get('http://localhost:4200/menu/takeSurvey/8c446b06-99d2-11e6-9f33-a24fc0d9649c');
		browser.manage().window().maximize();
		browser.manage().timeouts().implicitlyWait(5000);
	}
	lHATakeSurvey = function(){
		element(by.css('a[href="/menu/takeSurvey/LHA"]')).click();
	}
	bUATakeSurvey = function(){
		element(by.css('a[href="/menu/takeSurvey/BAU"]')).click();
	}
	lHAViewSurvey = function(){
		element(by.css('a[href="/menu/viewSurvey/VIEWLHA"]')).click();	
	}
	bUAViewSurvey = function(){
		element(by.css('a[href="/menu/viewSurvey/VIEWBUA"]')).click();	
	}
	get = function() {
		browser.ignoreSynchronization = true;
		browser.get('http://localhost:4200/menu');
		browser.manage().window().maximize();
		browser.manage().timeouts().implicitlyWait(50000);
	}
	checkBox = function(CheckID) {
		element(by.id(CheckID)).click();
		return this
	}
	radioButton = function(RadioID) {
		element(by.id(RadioID)).click();
		return this;
	}
	enterDate = function(DateId, InputText) {
		element(by.id(DateId)).sendKeys(InputText);
		return this;
	}
	enterText = function(textID, textvalue) {
		element(by.id(textID)).sendKeys(textvalue);
		return this;
	}
	dropdown = function(dropID,getVal){
		element(by.id(dropID)).sendKeys(getVal);
		return this;
	}
	searchBox= function(searchID, getID, textval){
		element.all(by.xpath(searchID)).get(getID).sendKeys(textval);
	}
	geTAttributevalues = function(cscDropID, cscDropVal){
		element(by.id(cscDropID)).getAttribute('value').then(function(value){
			expect(value).toBe(cscDropVal);
		});}
	
};
module.export = new PageObject();
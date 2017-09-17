

constructor(private _fb: FormBuilder, private empService: EmpService) { }
  loadPositions() {
    return this.empService.GetPositions().subscribe(data => {
      this.dynamicData = data;
      this.myForm = this.buildForm(data.panelData);
    },
      error => {
        console.log(error)
      });
  }


buildForm(data) {
    //console.log(data);
    let formGroup = {};
    data.forEach(panel => {
      // console.log(panel.PANEL_CONTENT);
      if (panel.PANEL_CONTENT) {
        panel.PANEL_CONTENT.forEach(content => {
          if (content && content.name) {
            formGroup[content.name] = [''];
          }
        });
      }
    });
    return this._fb.group(formGroup);
  };


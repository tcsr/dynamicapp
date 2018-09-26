 <p-dataTable #dt [value]="rows" [editable]="true" [immutable]="false" [rows]="10" [paginator]="true" [pageLinks]="3" [rowsPerPageOptions]="[10,20,30]">
        <p-column field="studentId" header="Student Id" [style]="{'width':'100px'}"></p-column>
        <p-column field="studentName" header="Student Name" [style]="{'width':'200px'}">
          <ng-template let-row="rowData" pTemplate="body">
            <div *ngIf="!row.isEditable">
              <span> {{ row.studentName }}</span>
            </div>
            <div *ngIf="row.isEditable">
              <input type="text" class="form-control" [(ngModel)]="row.studentName">
            </div>
          </ng-template>
        </p-column>
        <p-column field="testScore" header="Test Score" [style]="{'width':'140px'}">
          <ng-template let-row="rowData" pTemplate="body">
            <div *ngIf="!row.isEditable">
              {{row.testScore}}
            </div>
            <div *ngIf="row.isEditable">
              <input type="number" (change)="testScoreChanged(row)" class="form-control" [(ngModel)]="row.testScore">
            </div>
          </ng-template>
        </p-column>
        <p-column field="grade" header="Grade" [style]="{'width':'120px'}">
          <ng-template let-row="rowData" pTemplate="body">
            <span class="badge" [ngClass]="( row.grade=='FAIL')?'fail':'pass'"> {{ row.grade }}</span>
          </ng-template>
        </p-column>

        <p-column styleClass="col-button" [style]="{'width':'120px'}">
          <ng-template pTemplate="header">
            <span>
              Operations
            </span>
          </ng-template>
          <ng-template let-row="rowData" pTemplate="body" let-i="rowIndex">
            <div class="text-center">
              <span style="margin: 2px;">
                <span *ngIf="!row.isEditable">
                  <a href="javascript:" (click)="editRecord(row)">
                    <i class="fa fa-edit" style="background-color: green; color:white; padding:5px;"></i>
                  </a>
                </span>

                <span *ngIf="isEditable && row.isEditable">
                  <a href="javascript:" (click)="saveRecord(row)" style="margin: 2px;">
                    <i class="fa fa-save" style="background-color: green; color:white; padding:5px;"></i>
                  </a>
                  <a href="javascript:" (click)="cancelRecord(row)" style="margin: 2px;">
                    <i class="fa fa-remove" style="background-color: #777; color:white; padding:5px;"></i>
                  </a>
                </span>

              </span>
              <span style="margin: 2px;" *ngIf="!row.isEditable">
                <a href="javascript:" (click)="deleteRecord(i)">
                  <i class="fa fa-trash-o" style="background-color: red; color:white; padding: 5px;"></i>
                </a>
              </span>
            </div>
          </ng-template>
        </p-column>
      </p-dataTable>
      
      
      -----------------------------------
      export class StudentComponent implements OnInit {
  studentForm: any;
  studentDetails = [];
  editStudentData = {};
  total: any;
  maxGrade: number;
  avgGrade: number;
  minGrade: number;

  isNewRecord: boolean = false;
  isEditable: boolean = false;
  display: boolean = false;
  isNewTableRecord: boolean = false;
  editStudent: boolean = false;
  @ViewChild(DataTable) dt: any;

  rows: any = [];

  cols = [
    { field: 'studentId', header: 'Student Id' },
    { field: 'studentName', header: 'Student Name' },
    { field: 'subject1', header: 'Subject1' },
    { field: 'subject2', header: 'Subject2' },
    { field: 'subject3', header: 'Subject3' },
    { field: 'grade', header: 'Grade' },
  ];

  constructor(private fb: FormBuilder, private studentService: StudentService) {

  }
  ngOnInit() {
    console.log(this.dt.immutable);
    this.buildForm();
    this.studentService.getStudentDetails().subscribe(res => {
      console.log(res);
      this.rows = res.students;
      this.rows.forEach(row => {
        row['isEditable'] = false;
        this.calculateGrade(row);
      });
      this.assignGrade();
    })
  }


  addRecord(){
    this.isNewRecord = !this.isNewRecord;
  }

  assignGrade() {
    this.maxGrade = this.filterGrade('MAX');
    this.avgGrade = this.filterGrade('AVG');
    this.minGrade = this.filterGrade('FAIL');
    console.log(this.maxGrade, this.avgGrade, this.minGrade)
  }

  filterGrade(grade) {
    if (grade) {
      return this.rows.filter(student => student.grade == grade).length;
    }
  }

  buildForm() {
    this.studentForm = this.fb.group({
      'studentId': ['', [Validators.required]],
      'studentName': ['', [Validators.required]],
      "testScore": ['', [Validators.required]]
    })
  }
  add(student) {
    console.log(this.studentForm.value)
    this.rows.push(this.studentForm.value);
    this.calculateGrade(this.studentForm.value);
    this.assignGrade();
    this.studentForm.reset();
    this.isNewRecord =  false;
  }

  editRecord(student) {
    this.editStudentData = student;
    this.isEditable = true;
    this.editStudentData['isEditable'] = true;
    console.log(student);
  }
  cancel(student) {
    this.editStudentData = student;
    this.editStudent = false;
    this.editStudentData['isEditable'] = false;
  }

  saveRecord(student) {
    this.editStudentData = student;
    this.isEditable = false;
    this.calculateGrade(this.editStudentData);
    this.editStudentData['isEditable'] = false;
  }

  cancelRecord(student) {
    this.isEditable = false;
    student.isEditable = false;
  }

  deleteRecord(index) {
    console.log("Delete")
    this.rows.splice(index, 1);
    this.isNewTableRecord = false;
  }

  calculateGrade(row) {
    let testScore = row['testScore'];
    let grade = "";
    if (testScore >= 90) {
      grade = "MAX"
    }
    else if (testScore >= 65 && testScore < 90) {
      grade = "AVG"
    }
    else if (testScore < 65) {
      grade = "FAIL"
    }
    row['grade'] = grade;
  }

  testScoreChanged(row) {
    console.log(row)
    this.calculateGrade(row);
    this.assignGrade();
  }
      

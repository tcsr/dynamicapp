 ages = [25, 8, 45, 100, 92, 3];
  myList = [
    {
      name: "Chandra",
      age: 32,
      location: ""
    },
    {
      name: "Sai",
      age: 5,
      location: "chennai"
    },
    {
      name: "Anitha",
      age: 28,
      location: "chennai"
    }
  ];
  fiilterdArray = [];

  ngOnInit() {
    this.fiilterdArray = this.myList.filter(list => !list.location);
    console.log(this.fiilterdArray, this.fiilterdArray.length);

    let sortedAges = this.ages.sort((a, b) => b - a);
    console.log(sortedAges);
    let myReduce = this.myList.reduce((total, age) => total + age.age, 0);
    
    console.log(myReduce)

  }
  
  ----------------------
  
  
  
  import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seat-list',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss']
})
export class SeatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //variable declarations
  movieTitle: string = "Captain America: The Winter Soldier";
  screen: string = "LUXE CINEMAS";
  time: string = "FRI, 6:45PM"

  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I','J'];
  cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  reserved: string[] = ['A2', 'A3', 'F5', 'F1', 'F2', 'F6', 'F7', 'F8', 'H1', 'H2', 'H3', 'H4'];
  selected: string[] = [];

  ticketPrice: number = 120;
  convFee: number = 30;
  totalPrice: number = 0;
  currency: string = "Rs";

  //return status of each seat
  getStatus = function (seatPos: string) {
    if (this.reserved.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (this.selected.indexOf(seatPos) !== -1) {
      return 'selected';
    }
  }
  //clear handler
  clearSelected = function () {
    this.selected = [];
  }
  //click handler
  seatClicked = function (seatPos: string) {
    var index = this.selected.indexOf(seatPos);

    if (index !== -1) {
      // seat already selected, remove
      this.selected.splice(index, 1)
    } else {
      //push to selected array only if it is not reserved
      if (this.reserved.indexOf(seatPos) === -1)
        this.selected.push(seatPos);
    }
  }
  //Buy button handler
  showSelected = function () {
    if (this.selected.length > 0) {
      alert("Selected Seats: " + this.selected + "\nTotal: " + (this.ticketPrice * this.selected.length + this.convFee));
    } else {
      alert("No seats selected!");
    }
  }

}
---------------------------


<!-- Template for the seat component -->
<div class="container">
  <main class="innerContainer">
    <div class="movie">
      <h3 class="movieTitle">{{movieTitle}}</h3>
      <div class="movieDetails">{{screen}} - {{time}}</div>
    </div>

    <!-- Showing a static legend bar -->
    <div class="legend">
      <span class="glyphicon glyphicon-stop freeSeat"></span> FREE
      <span class="glyphicon glyphicon-ban-circle reservedSeat padding-left"></span> TAKEN
      <span class="glyphicon glyphicon-ok-sign selectedSeat padding-left"></span> SELECTED
    </div>

    <p class="font14 marginTop5">SCREEN THIS WAY</p>
    <div class="screen"></div>

    <!-- Generate the seating grid -->
    <div *ngFor="let row of rows; let i=index" style="border-radius: 100%;">{{ row }}
      <span class="seat" *ngFor="let col of cols" (click)="seatClicked(row + col)" [ngSwitch]="getStatus(row + col)">
        <button style="margin:3px; padding:2px; border-radius: 5px;"> 
        <span *ngSwitchCase="'selected'" class="glyphicon glyphicon-ok-sign selectedSeat">{{ col }} </span>
        <span *ngSwitchCase="'reserved'" class="glyphicon glyphicon-ban-circle reservedSeat">{{ col }} </span>
        <span *ngSwitchDefault class="glyphicon glyphicon-stop freeSeat">{{ col }} </span>
      </button>
      </span>
    </div>

    <!-- Structural directive - only visible on selection -->
    <div *ngIf="selected.length > 0" class="font14 marginTB10">
      <div class="wordWrap">SEATS RESERVED : {{selected}} - {{(selected.length)}}
        <!-- <span class="count">({{selected}})</span> -->
      </div>
      <div>PRICE : {{ticketPrice}} * {{selected.length}} = {{currency}}.{{ticketPrice*selected.length}} </div>
      <div>CONVENIENCE FEE : {{currency}}.{{convFee}}</div>
      <div>TOTAL : {{currency}}.{{ticketPrice * selected.length + convFee}}</div>
    </div>

    <!-- Action buttons -->
    <div class="buttonBar marginTop5">
      <button (click)="clearSelected()" [disabled]="selected.length === 0" class="btn btn-default btn-sm">Clear</button>
      <button (click)="showSelected()" [disabled]="selected.length === 0" class="btn btn-success btn-sm">Buy Tickets</button>
    </div>
  </main>
</div>


---------------------


/* CSS Helpers */
.font14 {
    font-size: 14px;
}
.font16 {
    font-size: 16px;
}
.marginTop5 {
    margin-top: 5px;
}
.marginTB10 {
    margin: 10px 0px;
}
.wordWrap {
    word-break: break-all;
}
/* End CSS Helpers */

.innerContainer {
    // color: #fff;
    text-align: center;
}
.movie {
    margin: -10px -5px 10px -5px;
    height: 70px;
    background: hsla(216, 81%, 53%, 0.65);   
}
.movieDetails {
    font-size: 15px;
    margin-top: -3px;
}
.movieTitle {
    font-size: 20px;
    padding-top: 10px;
    margin-top: -3px;
}
.seat {
    padding-right: 5px;
}

.legend {
    font-size: 14px;
}
.legend > .padding-left {
    padding-left: 15px;
}
.screen {
    background: hsla(216, 72%, 50%, 0.65);
    height: 3px;
    border-radius: 15px;
    margin: -5px 50px 10px;
    box-shadow: 0px 3px 6px #fff;
}
.reservedSeat {
    background-color: red;
    color: white;
}
.selectedSeat {
    background-color: green;
    color: white;
}
.freeSeat {
    background-color: rgb(205, 182, 50);
    color: white;
}

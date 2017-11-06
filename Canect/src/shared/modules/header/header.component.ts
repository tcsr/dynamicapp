import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'canect-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoPath: string;
  constructor() { }

  ngOnInit() {
    this.logoPath = "/assets/images/HED_Logo.png";
  }

  ngAfterViewInit() {

    $('[data-toggle="offcanvas"]').click(function () {
      $('#wrapper').toggleClass('toggled');
    });

    $('#search-button').on('click', function (e) {
      if ($('#search-input-container').hasClass('hdn')) {
        e.preventDefault();
        $('#search-input-container').removeClass('hdn')
        return false;
      }
    });

    $('#hide-search-input-container').on('click', function (e) {
      e.preventDefault();
      $('#search-input-container').addClass('hdn')
      return false;
    });

  }

}

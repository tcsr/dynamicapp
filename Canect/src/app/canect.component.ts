import { Component, AfterViewInit,OnInit } from '@angular/core';

@Component({
  selector: 'canect',
  templateUrl: './canect.component.html',
  styleUrls: ['./canect.component.css'] 
})
export class CanectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    
        var trigger = $('.hamburger'),
          overlay = $('.overlay'),
          isClosed = true;
        trigger.addClass("is-open");
        trigger.click(function () {
          hamburger_cross();
        });
    
        function hamburger_cross() {
          if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = !isClosed;
          } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = !isClosed;
          }
        }
    
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

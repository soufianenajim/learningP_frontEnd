import {Component, OnInit, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import {state, style, transition, animate, trigger, AUTO_STYLE} from "@angular/animations";

@Component({
  selector: 'app-with-social-header-footer',
  templateUrl: './with-social-header-footer.component.html',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideOnOff', [
      state('on', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('off', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('on => off', animate('400ms ease-in-out')),
      transition('off => on', animate('400ms ease-in-out'))
    ]),
    trigger('mobileMenuTop', [
        state('no-block, void',
            style({
                overflow: 'hidden',
                height: '0px',
            })
        ),
        state('yes-block',
            style({
                height: AUTO_STYLE,
            })
        ),
        transition('no-block <=> yes-block', [
            animate('400ms ease-in-out')
        ])
    ])
  ]
})
export class WithSocialHeaderFooterComponent implements OnInit {
  deviceType = 'desktop';
  verticalNavType = 'expanded';
  verticalEffect = 'shrink';
  chatToggle:string = 'out';
  chatInnerToggle:string = 'off';
  innerHeight: string;
  isScrolled: boolean = false;
  isCollapsedMobile = 'no-block';
  windowWidth: number;
  @ViewChild('searchFriends') search_friends: ElementRef;

  constructor() {
    let scrollHeight = window.screen.height - 150;
    this.innerHeight = scrollHeight+'px';
      this.windowWidth = window.innerWidth;
      this.setMenuAttributs(this.windowWidth);
  }

  ngOnInit() { }

    onResize(event) {
        this.innerHeight = event.target.innerHeight + 'px';
        /* menu responsive */
        this.windowWidth = event.target.innerWidth;
        this.setMenuAttributs(this.windowWidth);
    }

    setMenuAttributs(windowWidth) {
        if (windowWidth >= 768 && windowWidth <= 1024) {
            this.deviceType = 'tablet';
            this.verticalNavType = 'collapsed';
            this.verticalEffect = 'push';
        } else if (windowWidth < 768) {
            this.deviceType = 'mobile';
            this.verticalNavType = 'offcanvas';
            this.verticalEffect = 'overlay';
        } else {
            this.deviceType = 'desktop';
            this.verticalNavType = 'expanded';
            this.verticalEffect = 'shrink';
        }
    }

  searchFriendList(event) {
    let search = (this.search_friends.nativeElement.value).toLowerCase();
    let search_input: string;
    let search_parent: any;
    let friendList = document.querySelectorAll('.userlist-box .media-body .chat-header');
    Array.prototype.forEach.call(friendList, function(elements, index) {
      search_input = (elements.innerHTML).toLowerCase();
      search_parent = (elements.parentNode).parentNode;
      if (search_input.indexOf(search) !== -1) {
        search_parent.classList.add('show');
        search_parent.classList.remove('hide');
      } else {
        search_parent.classList.add('hide');
        search_parent.classList.remove('show');
      }
    });
  }

  toggleChat() {
    this.chatToggle = this.chatToggle === 'out' ? 'in' : 'out';
  }

  toggleChatInner() {
    this.chatInnerToggle = this.chatInnerToggle === 'off' ? 'on' : 'off';
  }

  onScroll(event) {
    this.isScrolled = false;
  }

  onMobileMenu() {
      this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
  }
}

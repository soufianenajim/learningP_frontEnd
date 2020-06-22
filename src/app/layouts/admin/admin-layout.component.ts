import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
  AfterViewInit,
  AfterViewChecked,
} from "@angular/core";
import "rxjs/add/operator/filter";
import {
  state,
  style,
  transition,
  animate,
  trigger,
  AUTO_STYLE,
} from "@angular/animations";

import { MenuItems } from "../../shared/menu-items/menu-items";
import { TranslateService } from "@ngx-translate/core";
import { LocalService } from "../../core/services/local/local.service";
import { AuthenticationService } from "../../core/services/authentication/authentication.service";
import { TokenStorageService } from "../../core/services/token_storage/token-storage.service";
import { UserService } from "../../core/services/user/user.service";
import { Notifications } from "../../core/models/notification.model";
import moment from "moment";
import { SharedService } from "../../core/services/shared/shared.service";
import { Router } from "@angular/router";
export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
}

@Component({
  selector: "app-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.css"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger("slideInOut", [
      state(
        "in",
        style({
          transform: "translate3d(0, 0, 0)",
        })
      ),
      state(
        "out",
        style({
          transform: "translate3d(100%, 0, 0)",
        })
      ),
      transition("in => out", animate("400ms ease-in-out")),
      transition("out => in", animate("400ms ease-in-out")),
    ]),
    trigger("slideOnOff", [
      state(
        "on",
        style({
          transform: "translate3d(0, 0, 0)",
        })
      ),
      state(
        "off",
        style({
          transform: "translate3d(100%, 0, 0)",
        })
      ),
      transition("on => off", animate("400ms ease-in-out")),
      transition("off => on", animate("400ms ease-in-out")),
    ]),
    trigger("mobileMenuTop", [
      state(
        "no-block, void",
        style({
          overflow: "hidden",
          height: "0px",
        })
      ),
      state(
        "yes-block",
        style({
          height: AUTO_STYLE,
        })
      ),
      transition("no-block <=> yes-block", [animate("400ms ease-in-out")]),
    ]),
  ],
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  deviceType = "desktop";
  verticalNavType = "expanded";
  verticalEffect = "shrink";
  chatToggle = "out";
  chatInnerToggle = "off";
  innerHeight: string;
  isScrolled = false;
  isCollapsedMobile = "no-block";
  toggleOn = true;
  windowWidth: number;
  @ViewChild("searchFriends") search_friends: ElementRef;
  @ViewChild("toggleButton") toggle_button: ElementRef;
  @ViewChild("sideMenu") side_menu: ElementRef;

  lang;
  fullName: string;
  dataImage: String;
  isStudent = false;
  listNotification = [];
  listUser = [];
  selectedUser;
  mapNotReadMessages = new Map();
  countNotReadMessages=0;
  constructor(
    public menuItems: MenuItems,
    private translateService: TranslateService,
    private localeService: LocalService,
    private authenticasionService: AuthenticationService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private sharedService: SharedService, 
    private router: Router,
  ) {
    const scrollHeight = window.screen.height - 150;
    this.innerHeight = scrollHeight + "px";
    this.windowWidth = window.innerWidth;
    this.setMenuAttributs(this.windowWidth);
    this.lang = "en";
  }
  onCountMessages(event){
    this.mapNotReadMessages.set(event.user,event.count);
    this.countNotReadMessages=0;
    this.mapNotReadMessages.forEach((value, key) => {
     this.countNotReadMessages+=value;
    });
  }
  ngOnInit() {
    this.getNotificationsAndFullName();
  }
  ngAfterViewInit() {
    this.sharedService.logo.subscribe((resp) => {
      console.log("resp");
      if (resp) this.dataImage = resp;
    });
  }
  getNotificationsAndFullName() {
    const user = this.tokenStorageService.getUser();
    this.dataImage = user.organization.logo;
    this.userService.getNotificationsByUser(user.id).subscribe((resp: any) => {
      this.userService
        .findAllByOrgaWithoutUser(user.organization.id,user.id)
        .subscribe((resp: any) => {
          this.listUser = resp;
        });
      this.buildNotification(resp.examList);
      this.fullName = user.firstName + " " + user.lastName;
      this.isStudent = user.refRole.name === "ROLE_STUDENT";
    });
  }
  buildNotification(exams) {
    exams.forEach((element) => {
      this.listNotification.push(
        new Notifications(
          element.module.name,
          element.name,
          new Date(element.startDateTime)
        )
      );
    });

    if (this.listNotification.length > 0) {
      this.listNotification.sort(function (a: any, b: any) {
        return a.dateNotif - b.dateNotif;
      });
    }
    console.log("notifications", this.listNotification.length);
  }
  getFormaterDate(date) {
    const lang = this.translateService.getLangs();
    const length = lang.length - 1;
    moment.locale(lang[length]);
    return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  }
  isAfterCurrentDate(date) {
    return moment().isSameOrAfter(moment(date));
  }
  onClickedOutside(e: Event) {
    if (
      this.windowWidth < 768 &&
      this.toggleOn &&
      this.verticalNavType !== "offcanvas"
    ) {
      this.toggleOn = true;
      this.verticalNavType = "offcanvas";
    }
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + "px";
    /* menu responsive */
    this.windowWidth = event.target.innerWidth;
    this.setMenuAttributs(this.windowWidth);
  }

  setMenuAttributs(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.deviceType = "tablet";
      this.verticalNavType = "collapsed";
      this.verticalEffect = "push";
    } else if (windowWidth < 768) {
      this.deviceType = "mobile";
      this.verticalNavType = "offcanvas";
      this.verticalEffect = "overlay";
    } else {
      this.deviceType = "desktop";
      this.verticalNavType = "expanded";
      this.verticalEffect = "shrink";
    }
  }

  searchFriendList(event) {
    const search = this.search_friends.nativeElement.value.toLowerCase();
    let search_input: string;
    let search_parent: any;
    const friendList = document.querySelectorAll(
      ".userlist-box .media-body .chat-header"
    );
    Array.prototype.forEach.call(friendList, function (elements, index) {
      search_input = elements.innerHTML.toLowerCase();
      search_parent = elements.parentNode.parentNode;
      if (search_input.indexOf(search) !== -1) {
        search_parent.classList.add("show");
        search_parent.classList.remove("hide");
      } else {
        search_parent.classList.add("hide");
        search_parent.classList.remove("show");
      }
    });
  }
  equalsLanguage(lang: string): boolean {
    return this.lang === lang;
  }
  changeLanguage(lang: string) {
    this.lang = lang;
    this.translateService.use(lang);
    if (this.lang === "en") {
      this.localeService.registerLocale("en-US");
    } else if (this.lang === "fr") {
      this.localeService.registerLocale("fr-FR");
    } else {
      this.localeService.registerLocale("ar-FR");
    }
  }
  toggleChat() {
    this.chatToggle = this.chatToggle === "out" ? "in" : "out";
  }

  toggleChatInner(user) {
   this.selectedUser=user;
    this.chatInnerToggle = this.chatInnerToggle === "off" ? "on" : "off";
  }

  toggleOpened() {
    if (this.windowWidth < 768) {
      this.toggleOn =
        this.verticalNavType === "offcanvas" ? true : this.toggleOn;
      this.verticalNavType =
        this.verticalNavType === "expanded" ? "offcanvas" : "expanded";
    } else {
      this.verticalNavType =
        this.verticalNavType === "expanded" ? "collapsed" : "expanded";
    }
  }
  onMobileMenu() {
    this.isCollapsedMobile =
      this.isCollapsedMobile === "yes-block" ? "no-block" : "yes-block";
  }

  onScroll(event) {
    this.isScrolled = false;
  }
  logout() {
    this.authenticasionService.logout().subscribe(resp=>{
      localStorage.clear();
      this.router.navigate(['login']);
    });
  }
}

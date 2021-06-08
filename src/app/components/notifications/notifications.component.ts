import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {createPopper} from '@popperjs/core';
import {NotificationService} from '../../services/notification.service';
import {Notification} from '../../models/Notification.model';
import {List} from 'postcss/lib/list';
import {PostService} from '../../services/post.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef', {static: false}) btnDropdownRef: ElementRef;
  @ViewChild('popoverDropdownRef', {static: false}) popoverDropdownRef: ElementRef;


  notifsList: Notification[];
  showAllNotifsFlag: boolean;
  @Input() showNotifBar: boolean;

  constructor(
    private notificationService: NotificationService,
    private toastr: ToastrService,
  ) {
    this.showAllNotifsFlag = false;
  }

  ngOnInit(): void {
    this.getListNotifications();

  }

  ngOnDestroy() {
    for (const n of this.notifsList) {
      this.updateNotification(n.id);
    }
  }

  toggleDropdown(event) {
    event.preventDefault();
    this.dropdownPopoverShow = !this.dropdownPopoverShow;
  }

  public getListNotifications(): void {
    this.notificationService.getAllNotifs().subscribe(
      response => {
        this.notifsList = response;
        console.log(this.notifsList);
      },
      error => {
        console.log(error);
        this.toastr.error('Erreur interne du systéme', '');
      }
    )
  }

  public updateNotification(id: number): Notification {
    this.notificationService.updateNotif(new Notification(), id).subscribe(
      response => {
        console.log(response);
        return response;
      },
      error => {
        this.toastr.error('Erreur interne du systéme', '');
      }
    )
    return null;
  }


  toggleShowAllNotifsFlag() {
    this.showAllNotifsFlag = !this.showAllNotifsFlag;
  }

  showAllNotifs(index: number): boolean {
    console.log(index);
    return !(index < 3 && this.showAllNotifsFlag === false);
  }
}

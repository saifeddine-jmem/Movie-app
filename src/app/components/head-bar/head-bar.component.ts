import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { WishListService } from '../../services/wish-list.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-head-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent implements OnInit, OnDestroy {
  faHeart = faHeart;
  wishListCount = 0;
  private wishListService = inject(WishListService);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.wishListService.wishList$
      .pipe(takeUntil(this.destroy$))
      .subscribe(wishList => {
        this.wishListCount = wishList.length;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

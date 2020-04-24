import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnChanges {
  @Input() rating: number; // @Input(): In order to expose its 'rating' property to it's container component
  starWidth: number;

  ngOnChanges(): void {
    this.starWidth = (this.rating * 75) / 5;
  }
}

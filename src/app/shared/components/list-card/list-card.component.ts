import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() shortDescription: string;
  @Input() time: string = "";
  @Input() imgLink: string;
  @Input() tagName: string = "";
  @Input() tagIcon: string = "";
  @Input() tagColor: string = "";
  @Input() reviewTitle: string = "";

  constructor() { }

  ngOnInit() { }
}

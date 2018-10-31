
import { Component,  Input , ContentChildren, QueryList} from '@angular/core';
import {TabChild} from './tab-child';

@Component({
  selector: 'tab',
   styles: [`
    .pane{
      padding: 1em;
    }
  `],
  template: `  
    <div *ngIf="active" class="pane">
      <ng-content></ng-content>
    </div>
  `
})

export class Tab {
   @Input('tabTitle') title: string;
  @Input() active = false;

  @ContentChildren(TabChild) content:QueryList<TabChild>;

  public activate(){
    this.active = true;
    this.content.toArray().forEach(dc => dc.tabActivated());
  }

  public disable(){
    this.active = false;
    this.content.toArray().forEach(dc => dc.tabDisabled());
  }
}
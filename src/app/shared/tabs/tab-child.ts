import {Directive} from "@angular/core";

@Directive({selector: "TabChild"})

export class TabChild {
  public tabActivated() : void{}
  public tabDisabled() : void{}

}
import { Component, Input } from '@angular/core';
import { Toast } from '../toast';

@Component({
  template: '<div class="close-button" (click)="toast.close()">&times;</div><div class="content-body"><div *ngIf="toast.caption" class="title">{{toast.caption}}</div><div>{{toast.text}}</div></div>',
  styles: ['.close-button{border:0;background:none;position:absolute;font-size:1.6rem;top:.5rem;right:.8rem;line-height:.6;font-weight:bold;opacity:.3;color:inherit;cursor:pointer}@media(min-width: 576px){.close-button{font-size:1rem;top:.3rem;right:.4rem}}.close-button:hover{opacity:1}.content-body{padding:.5rem 2.2rem .5rem .5rem;font-size:.8rem}@media(min-width: 576px){.content-body{padding-right:1rem}}.content-body .title{font-weight:bold}.content-body{padding:.5rem 2.2rem calc(.5rem - 1px) .5rem;font-size:.8rem}@media(min-width: 576px){.content-body{padding-right:1rem}}.content-body .title{font-weight:bold}'],
})
export class BasicToastContentComponent {
  @Input() toast: Toast;
}

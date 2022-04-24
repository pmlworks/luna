import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {View, ViewAction} from '@app/model';
import * as jQuery from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'elements-content-tab',
  templateUrl: './content-tab.component.html',
  styleUrls: ['./content-tab.component.css'],
})
export class ElementContentTabComponent implements OnInit {
  @Input() view: View;
  @Output() onAction: EventEmitter<ViewAction> = new EventEmitter<ViewAction>();
  public iconCls: string;

  isDragging = false;
  isDragover = false;

  ngOnInit(): void {
    if (!this.view.node) {
      this.iconCls = 'fa-linux';
    } else {
      this.iconCls = 'fa-' + this.view.node.iconSkin;
    }
  }

  close() {
    const action = new ViewAction(this.view, 'close');
    this.onAction.emit(action);
  }

  setActive() {
    const action = new ViewAction(this.view, 'active');
    this.onAction.emit(action);
  }

  // 在元素开始被拖动时候触发
  dragstart(event) {
    this.isDragging = true;
    event.dataTransfer.setData('Text', event.target.id);
  }
  // 在拖动操作完成时触发
    dragend(event) {
    this.isDragging = false;
  }
  // 当被拖动元素在目的地元素内时触发
    dragover(e) {
    const dom = document.getElementById(e.target.id);
    e.preventDefault();
    this.isDragover = true;
  }
  // 当被拖动元素没有放下就离开目的地元素时触发
  dragleave(event) {
    this.isDragover = false;
  }

  drop(e) {
    this.isDragging = false;
    this.isDragover = false;
    const data = e.dataTransfer.getData('Text');
    const dom = document.getElementById(data);
    const cur = document.getElementById(e.currentTarget.id);
    // this.temp = e.currentTarget.innerHTML;
    // e.currentTarget.innerHTML = dom.innerHTML;
    // dom.innerHTML = this.temp;

    let startLen = cur.children.length;
    let endLen = dom.children.length;
    for (; startLen--;) {
      dom.appendChild(cur.children[0]);
    }
    for (; endLen--;) {
      cur.appendChild(dom.children[0]);
    }
    e.preventDefault();
  }
}

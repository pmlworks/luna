import {Component, Input, OnInit, ViewChild, ElementRef, Inject} from '@angular/core';
import {View, SystemUser, TreeNode} from '@app/model';
import {LogService} from '@app/services';


@Component({
  selector: 'elements-connector-koko',
  templateUrl: './koko.component.html',
  styleUrls: ['./koko.component.scss']
})
export class ElementConnectorKokoComponent implements OnInit {
  @Input() view: View;
  @ViewChild('terminal') iframe: ElementRef;

  iframeURL: any;
  node: TreeNode;
  sysUser: SystemUser;
  protocol: string;

  constructor(private _logger: LogService) {
  }

  ngOnInit() {
    const {node, sysUser, protocol} = this.view;
    this.node = node;
    this.sysUser = sysUser;
    this.protocol = protocol;
    this.generateIframeURL();
  }

  generateIframeURL() {
    switch (this.view.connectFrom) {
      case 'node':
        this.generateNodeConnectUrl();
        break;
      case 'token':
        this.generateTokenURL();
        break;
      case 'fileManager':
        this.generateFileManagerURL();
        break;
    }
  }

  generateNodeConnectUrl() {
    const baseUrl = `${document.location.origin}/koko/terminal`;
    this.iframeURL = `${baseUrl}/?target_id=${this.node.id}&type=${this.view.protocol}&system_user_id=${this.sysUser.id}`;
  }

  generateTokenURL() {
    const tokenUrl = `${document.location.origin}/koko/token`;
    this.iframeURL = `${tokenUrl}/?target_id=${this.view.token}&type=token`;
  }

  generateFileManagerURL() {
    this.iframeURL = `/koko/elfinder/sftp/${this.node.id}/`;
  }
}

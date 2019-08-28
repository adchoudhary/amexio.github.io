/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*  Created by sagar on 4/02/2019.
*/
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit, Component, ElementRef, EventEmitter, Inject,
  Input, OnInit, Output, ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';

@Component({
  selector: 'amexio-header-ce',
  templateUrl: './amexio.header.component.html',
  styles: [
    `
  .cursor-style {
  cursor:pointer;
  }
  `,
  ],
})
export class AmexioCardCEHeaderComponent implements AfterViewInit, OnInit {

  @Input('align') align = '';

  @Input('icon-align') verticalalign = '';

  @Input('bg-image') bgimage: string;

  @Input('color') color: string;

  @Input('background') background: string;

  @Input('height') height: string;

  @Input('border-bottom') borderbottom: boolean;

  @Input('direction') direction = 'row';

  @Input('apply-theme-color') applyThemeColor = false;

  @ViewChild('contentWrapper') content: ElementRef;

  @Output() minimizeWindow: any = new EventEmitter<any>();

  @Output() maximizeWindow: any = new EventEmitter<any>();

  @Output() closeDataEmit: any = new EventEmitter<any>();

  @Input('minimized-icon') minimizeIcon: any;

  cclass = '';

  closeable = false;

  maximizeCe = false;

  minimize = false;

  isFullWindowCe = false;

  windowFlag: boolean;

  textName: any;

  themeCss: any;

  closeableBehaiour = new BehaviorSubject(false);

  maximizeBehaiourCe = new BehaviorSubject(false);

  amexioComponentId: string;

  fullScreenFlag: boolean;
  elem: any;
  fullscreenMax: boolean;
  desktopFlag: boolean;
  maximize = false;
  ribbonType = false;
  iconPosition: {
    top: string;
    bottom: string;
  };

  constructor( @Inject(DOCUMENT) public document: any) {
  }
  ngOnInit() {
    this.elem = document.documentElement;
    document.addEventListener('webkitfullscreenchange', this.exitHandler.bind(this), false);
    document.addEventListener('mozfullscreenchange', this.exitHandler.bind(this), false);
    document.addEventListener('fullscreenexit', this.exitHandler.bind(this), false);
    document.addEventListener('MSFullscreenChange', this.exitHandler.bind(this), false);
    if (this.borderbottom) {
      this.cclass = 'card-header-border';
    }
    this.setIconPosition();
  }
  ngAfterViewInit() {
    this.textName = this.content.nativeElement.innerText;
    if (this.textName && this.minimizeIcon) {
      return this.textName;
    }
    if (this.textName && !this.minimizeIcon) {
      return this.textName;
    } else if (!this.textName && this.minimizeIcon) {
      return this.minimizeIcon;
    } else if (!this.minimizeIcon && !this.textName) {
      this.textName = [];
      this.minimizeIcon = 'fa fa-file';
    }
  }

  onMinimizeClick() {
    this.closeableBehaiour.next(false);
    this.minimizeWindow.emit(this);
  }

  setMaximizeDataCE(maximize: boolean, isFullWindow: boolean) {
    this.maximizeCe = maximize;
    this.isFullWindowCe = isFullWindow;
    this.maximizeBehaiourCe.next(this.isFullWindowCe);
  }

  // On maximize click
  sizeChange() {
    this.isFullWindowCe = !this.isFullWindowCe;
    this.maximizeBehaiourCe.next(this.isFullWindowCe);
    this.maximizeWindow.emit(this, this.isFullWindowCe);
  }

  onCloseClick() {
    this.closeableBehaiour.next(false);
    this.closeDataEmit.emit(this);
  }

  setIconPosition() {
    switch (this.verticalalign) {
      case 'top': {
        this.iconPosition = {
          top: '0',
          bottom: '',
        };
        break;
      }
      case 'center': {
        this.iconPosition = {
          top: '',
          bottom: '',
        };
        break;
      }
      case 'bottom': {
        this.iconPosition = {
          top: '',
          bottom: '0',
        };
        break;
      }
    }
  }

  setColorPalette(themeClass: any) {
    this.themeCss = themeClass;
  }

  maxScreenChange(event: any) {
    event.stopPropagation();
    this.fullscreenMax = !this.fullscreenMax;
    if (this.elem.requestFullscreen && this.desktopFlag) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen && this.desktopFlag) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen && this.desktopFlag) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen && this.desktopFlag) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
    this.maximizeBehaiourCe.next(this.fullscreenMax);
    this.maximizeWindow.emit(this, this.fullscreenMax);
  }

  minScreenChange(event: any) {
    event.stopPropagation();
    this.fullscreenMax = !this.fullscreenMax;

    if (this.document.exitFullscreen && this.desktopFlag) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen && this.desktopFlag) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen && this.desktopFlag) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen && this.desktopFlag) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
    this.maximizeBehaiourCe.next(this.fullscreenMax);
    this.maximizeWindow.emit(this, this.fullscreenMax);
  }
  exitHandler() {
    if (!document.webkitIsFullScreen) {
     this.fullscreenMax = false;
    }
  }
}

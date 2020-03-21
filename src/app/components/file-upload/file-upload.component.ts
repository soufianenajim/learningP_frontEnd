import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;

  constructor() { }

  ngOnInit() {
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

}

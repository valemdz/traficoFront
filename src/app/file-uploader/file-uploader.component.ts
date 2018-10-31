import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent  {

  @Input() activeColor: string = 'green';
  @Input() baseColor: string = '#ccc';
  @Input() overlayColor: string = 'rgba(255,255,255,0.5)';
  
  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';
  

  ////

  borderColor:any;
  iconColor:any;


  handleDragEnter() {
      this.dragging = true;
  }
  
  handleDragLeave() {
      this.dragging = false;
  }
  
  handleDrop(e) {
      e.preventDefault();
      this.dragging = false;
      this.handleInputChange(e);
  }
  
  handleImageLoad() {
      this.imageLoaded = true;
      this.iconColor = this.overlayColor;
  }

  handleInputChange(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

      var pattern = /image-*/;
      var reader = new FileReader();

      if (!file.type.match(pattern)) {
          alert('invalid format');
          return;
      }

      this.loaded = false;

      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);

      console.log(file);
  }
  
  _handleReaderLoaded(e) {
      var reader = e.target;
      this.imageSrc = reader.result;
      this.loaded = true;
  }
  
  _setActive() {
      this.borderColor = this.activeColor;
      if (this.imageSrc.length === 0) {
          this.iconColor = this.activeColor;
      }
  }
  
  _setInactive() {
      this.borderColor = this.baseColor;
      if (this.imageSrc.length === 0) {
          this.iconColor = this.baseColor;
      }
  }



  //////
        filesToUpload: Array<File>;
        
            constructor() {
                this.filesToUpload = [];
            }
        
            upload() {
                this.makeFileRequest("http://localhost:3000/upload", [], this.filesToUpload).then((result) => {
                    console.log(result);
                }, (error) => {
                    console.error(error);
                });
            }
        
            fileChangeEvent(fileInput: any){
                this.filesToUpload = <Array<File>> fileInput.target.files;
            }
        
            makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
                return new Promise((resolve, reject) => {
                    var formData: any = new FormData();
                    var xhr = new XMLHttpRequest();
                    for(var i = 0; i < files.length; i++) {
                        formData.append("uploads[]", files[i], files[i].name);
                    }
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                resolve(JSON.parse(xhr.response));
                            } else {
                                reject(xhr.response);
                            }
                        }
                    }
                    xhr.open("POST", url, true);
                    xhr.send(formData);
                });
            }
        

  /////

}

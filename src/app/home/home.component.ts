import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadService } from '../_services/file-upload.service';
import { GroupService } from '../_services/group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  fileName: String = "";
  fileToUpload: File | null = null;
  groups: Array<any> = [];

  constructor(private fileUploadService: FileUploadService, private router: Router, private groupService: GroupService) {}

  ngOnInit() {
    this.groupService.getAllGroups().subscribe(
      (groups: any) => {
        if (typeof (groups) === 'object') {
          this.groups = groups;
        }
      }
    );
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {  // If a file is selected
      const file: File = event.target.files[0];
      if (file) {
        this.fileToUpload = file;
        this.fileName = file.name; // Easier for interface
      }
    }
  }

  onSubmitFile() {
    if (this.fileToUpload && confirm("Etes-vous sûr de vouloir écraser les données par celles du fichier " + this.fileName + " ?" )) {
      this.fileUploadService.upload(this.fileToUpload).then(() => {
        window.location.reload();
      });
    }
  }

  onDeleteGroup(id: number) {
    if (confirm("Etes-vous sûr de vouloir supprimer ce groupe ?")) {
      let index = this.groups.findIndex(g => g.id === id);
  
      this.groupService.delete(id).subscribe(
        (event: any) => {
          if (typeof (event) === 'object') {
            this.groups.splice(index, 1);
          }
        }
      );
    }
  }
}

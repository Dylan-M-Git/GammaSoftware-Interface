import { Component } from '@angular/core';
import { GroupService } from 'src/app/_services/group.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  group: any = null;
  editGroup: FormGroup;

  constructor(private groupService: GroupService, private route: ActivatedRoute, private router: Router) {
    var id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.groupService.getGroupById(parseInt(id)).subscribe(group => {
        if (typeof (group) === 'object') {
          this.group = group;
          this.editGroup.patchValue(group);
        }
      });
    }
    
    this.editGroup = new FormGroup({
      name: new FormControl(),
      state: new FormControl(),
      city: new FormControl(),
      startYear: new FormControl(),
      endYear: new FormControl(),
      founders: new FormControl(),
      members: new FormControl(),
      style: new FormControl(),
      presentation: new FormControl()
    });
  }

  onSubmit(editedGroup: any) {
    this.groupService.editGroup(this.group.id, editedGroup).subscribe(event => {
      if (typeof (event) === 'object') {
        this.goBackToHomepage();
      }
    });
  }

  goBackToHomepage() {
    this.router.navigateByUrl("/");
  }
}

import { Component,OnInit} from '@angular/core';
import { SharedService} from 'src/app/shared.service';
import { AddEditDepComponent } from '../add-edit-dep/add-edit-dep.component';
interface DepartmentItem{
  DepartmentId:number;
  DepartmentName: string;
}
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
constructor(private service:SharedService){}
DepartmentList:DepartmentItem[]=[];


ModalTitle:string='';
ActivateAddEditDepComp:boolean=false;
dep:DepartmentItem | null=null;

ngOnInit(): void {
  this.refreshDepList();
}
addClick(){
this.dep={
  DepartmentId:0,
  DepartmentName: "",
}
this.ModalTitle="Add Department";
this.ActivateAddEditDepComp=true;
}
/*deleteClick(item:DepartmentItem){
if(confirm('Are you sure?')){
this.service.deleteDepartment(item.DepartmentId).subscribe(
  (data)=>{
  alert('Department deleted succesfully');
  this.refreshDepList();
},
(error)=>{
  console.error('Error deleting department:',error);
}
);
}
}*/
deleteClick(item: DepartmentItem) {
  if (confirm('Are you sure?')) {
    this.service.deleteDepartment(item.DepartmentId).subscribe(
      (data) => {
        alert('Department deleted successfully.');
        this.refreshDepList();
      },
      (error) => {
        console.error('Error deleting department:', error);
      }
    );
  }
}

closeClick(){
this.ActivateAddEditDepComp=false;
this.refreshDepList();
}
editClick(item: DepartmentItem){
this.dep=item;
this.ModalTitle="Edit Department";
this.ActivateAddEditDepComp=true;
}
refreshDepList(){
  this.service.getDepList().subscribe(
    (data: DepartmentItem[]) => {
      this.DepartmentList = data;
    }
  );
}
}

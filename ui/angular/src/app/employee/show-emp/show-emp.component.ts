import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

interface EmployeeItem {
  EmployeeId: number;
  EmployeeName: string;
  Department: string;
  DateOfJoining: string;
  PhotoFileName: string;
}

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {
  constructor(private service: SharedService) {}
  EmployeeList: EmployeeItem[] = [];

  ModalTitle: string = '';
  ActivateAddEditEmpComp: boolean = false;
  emp: EmployeeItem | null = null;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick() {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: '',
      Department: '',
      DateOfJoining: '',
      PhotoFileName: ''
    };
    this.ModalTitle = 'Add Employee';
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item: EmployeeItem) {
    if (confirm('Are you sure?')) {
      this.service.deleteEmployee(item.EmployeeId).subscribe(
        (data) => {
          alert('Employee deleted successfully.');
          this.refreshEmpList();
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  editClick(item: EmployeeItem) {
    console.log(item);
    this.emp = item;
    this.ModalTitle = 'Edit Employee';
    this.ActivateAddEditEmpComp = true;
  }

  refreshEmpList() {
    this.service.getEmpList().subscribe(
      (data: EmployeeItem[]) => {
        this.EmployeeList = data;
      }
    );
  }
}

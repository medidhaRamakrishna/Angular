import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {EmpDetails} from './employeeDetails.component';
import {EmpList} from './employeelist.component';

const routes:Routes=[
    {path:'List',component:EmpList},
    {path:'Details',component:EmpDetails}
];
@NgModule({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule]
})
export class AppRoutingModule{}
export const routingComponents=[EmpDetails,EmpList]
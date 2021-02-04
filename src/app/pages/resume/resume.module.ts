import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeComponent } from './resume.component';
import { HomeComponent } from './components/home/home.component';
import { DesignComponent } from './components/design/design.component';


@NgModule({
  declarations: [ResumeComponent, HomeComponent, DesignComponent],
  imports: [CommonModule, ResumeRoutingModule, PrimengModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ResumeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* PrimeNG */
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';
import { FieldsetModule } from 'primeng/fieldset';

const myModule = [
  ToastModule,
  MessagesModule,
  MessageModule,
  ConfirmDialogModule,
  TabMenuModule,
  PanelModule,
  MenubarModule,
  TableModule,
  InputTextModule,
  PaginatorModule,
  SidebarModule,
  FieldsetModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, myModule],
  exports: [myModule],
})
export class PrimengModule {}

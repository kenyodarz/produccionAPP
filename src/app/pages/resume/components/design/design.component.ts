// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Service
import { DesignService } from 'src/app/core/services/design.service';
// Modelo
import { Design } from 'src/app/core/models/design';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css'],
})
export class DesignComponent implements OnInit {
  design: Design;
  listDesign: Design[] = [];

  constructor(private designService: DesignService) {}

  obtenerDesigns() {
    this.designService.getAll().subscribe((array: Design[]) => {
      let listDesign: Design[] = [];
      array.forEach((design) => {
        listDesign.push(design);
      });
      this.listDesign = listDesign.sort(function (a, b) {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      });
      console.log(this.listDesign);
    });
  }



  ngOnInit(): void {
    this.obtenerDesigns();
  }
}

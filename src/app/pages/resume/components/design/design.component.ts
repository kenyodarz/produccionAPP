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
  design: Design = new Design();
  selectedDesign: Design = new Design();
  listDesign: Design[] = [];
  formDesign: FormGroup;

  displaySaveEditDialog: boolean = true;
  title: string = '';

  constructor(
    private designService: DesignService,
    private messageService: MessageService
  ) {}

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

  guardarDesign() {
    this.designService.save(this.design).subscribe((design: Design) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Guardado',
        detail: `Se ha guardado correctamente el diseño ${design.id}`,
      });
      this.validarDesign(design);
      this.displaySaveEditDialog = false;
    });
  }

  validarDesign(design: Design) {
    let index = this.listDesign.findIndex((e) => e.id == design.id);
    if (index != -1) {
      this.listDesign[index] = design;
    } else {
      this.listDesign.push(design);
    }
  }

  mostrarDialogoGuardar(editar: boolean) {
    if (editar) {
      if (this.selectedDesign != null && this.selectedDesign.id != null) {
        this.title = 'Editar';
        this.formDesign.patchValue(this.selectedDesign);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe Seleccionar un Diseño',
        });
      }
    } else {
      this.title = 'Guardar';
      this.design = new Design();
    }
    this.displaySaveEditDialog = true;
  }

  ngOnInit(): void {
    this.obtenerDesigns();
  }
}

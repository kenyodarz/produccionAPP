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

  items: MenuItem[] = [];
  displaySaveEditDialog: boolean = false;
  displayDataSidebar: boolean = true;
  title: string = '';

  constructor(
    private designService: DesignService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  obtenerDesigns() {
    this.designService.getAll().subscribe((array: Design[]) => {
      let listDesign: Design[] = [];
      array.forEach((design) => {
        listDesign.push(design);
        this.formDesign.patchValue(design);
      });
      this.listDesign = listDesign.sort(function (a, b) {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      });
      console.log(this.formDesign.value);
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
    this.formDesign.reset();
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

  onGuardar() {
    this.design = this.formDesign.value;
    this.guardarDesign();
  }

  eliminarDesign() {
    if (this.selectedDesign === null || this.selectedDesign.id === null) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe Seleccionar un Diseño',
      });
      return;
    }
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar este diseño?',
      accept: () => {
        this.designService.delete(this.selectedDesign.id).subscribe(
          (design: Design) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Resultado',
              detail: `Se eliminó el equipo ${design.id} correctamente`,
            });
            this.validarEliminar(design);
          },
          (error) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: `${error.error.error}`,
              detail: `No se puede eliminar el diseño si tienes transformadores anidados a el`,
            });
          }
        );
      },
    });
  }

  validarEliminar(design: Design) {
    this.listDesign.splice(
      this.listDesign.findIndex((e) => e.id == design.id),
      1
    );
  }

  ngOnInit(): void {
    this.obtenerDesigns();
    this.formDesign = this.fb.group({
      id: new FormControl(null, Validators.required),
      kva: new FormControl(null, Validators.required),
      marca: new FormControl(null, Validators.required),
      fecha: new FormControl(),
      fase: new FormControl(null, Validators.required),
      voltajeNominalPrimario: new FormControl(null, Validators.required),
      voltajeNominalSecundario: new FormControl(null, Validators.required),
      tipoDeNucleo: new FormControl(null, Validators.required),
      formaDelNucleo: new FormControl(null, Validators.required),
      cantidadDeFe: new FormControl(null, Validators.required),
      anchoDeFe: new FormControl(null, Validators.required),
      anchoVentana: new FormControl(null, Validators.required),
      altoVentana: new FormControl(null, Validators.required),
      conductorSecundario: new FormControl(null, Validators.required),
      grupoConnection: new FormControl(null, Validators.required),
      tipoLaminaMagnetic: new FormControl(null, Validators.required),
      positionNominalConmutador: new FormControl(null, Validators.required),
      pesoNucleo1: new FormControl(null, Validators.required),
      pesoNucleo2: new FormControl(null, Validators.required),
      pesoTotal: new FormControl(null, Validators.required),
      poW: new FormControl(null, Validators.required),
      induction: new FormControl(null, Validators.required),
      inductionTDesign: new FormControl(null, Validators.required),
      connectionBajaTension: new FormControl(null, Validators.required),
      connectionAltaTension: new FormControl(null, Validators.required),
      lmn1: new FormControl(null, Validators.required),
      lmn2: new FormControl(null, Validators.required),
      anet: new FormControl(null, Validators.required),
      wkgCalculado: new FormControl(null, Validators.required),
      wkgTablaLamina: new FormControl(null, Validators.required),
      inductionTablaLamina: new FormControl(null, Validators.required),
      inductionIngresoManual: new FormControl(null, Validators.required),
      cantidadAceite: new FormControl(null, Validators.required),
      tipoAceite: new FormControl(null, Validators.required),
      tipoTransformador: new FormControl(null, Validators.required),
    });
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => this.mostrarDialogoGuardar(false),
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.mostrarDialogoGuardar(true),
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
        command: () => this.eliminarDesign(),
      },
      {
        label: 'Actualizar',
        icon: 'pi pi-fw pi-refresh',
        command: () => this.obtenerDesigns(),
      },
    ];
  }
}

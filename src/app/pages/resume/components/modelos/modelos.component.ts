// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Service
import { ModeloService } from 'src/app/core/services/modelo.service';
import { DesignService } from 'src/app/core/services/design.service';
// Modelo
import { Design } from 'src/app/core/models/design';
import { Modelo } from 'src/app/core/models/modelo';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css'],
})
export class ModelosComponent implements OnInit {
  modelo: Modelo = new Modelo();
  selectecModelo: Modelo = null;
  listModelo: Modelo[] = [];
  formModelo: FormGroup;

  items: MenuItem[] = [];
  displaySaveEditDialog: boolean = false;
  tituloModal: String = '';

  constructor(
    private designService: DesignService,
    private modeloService: ModeloService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  obtenerModelos() {
    this.modeloService
      .obtenerModeloConStock()
      .subscribe((modelosResult: Modelo[]) => {
        let modelosList: Modelo[] = [];
        modelosResult.forEach((modelo) => {
          modelosList.push(modelo);
        });
        this.listModelo = modelosList.sort(function (a: Modelo, b: Modelo) {
          if (a.nombreModelo > b.nombreModelo) {
            return 1;
          }
          if (a.nombreModelo < b.nombreModelo) {
            return -1;
          }
          return 0;
        });
        console.log(this.listModelo);
      });
  }

  guardarModelo() {
    this.modeloService.save(this.modelo).subscribe(
      (modelo: Modelo) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: `Se ha creado correctamente el modelo ${modelo.nombreModelo}`,
        });
        this.displaySaveEditDialog = false;
        this.validarGuardado(modelo);
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${err}`,
        });
      }
    );
  }

  validarGuardado(modelo: Modelo) {
    let index = this.listModelo.findIndex(
      (e) => e.idModelo === modelo.idModelo
    );
    if (index != -1) {
      this.listModelo[index] = modelo;
    } else {
      this.listModelo.push(modelo);
    }
  }

  mostarDialogoGuardarEditar(editar: boolean) {
    this.formModelo.reset();
    if (editar) {
      if (
        this.selectecModelo === null ||
        this.selectecModelo.idModelo === null
      ) {
        this.messageService.add({
          severity: 'warn',
          summary: '!!!Advertencia¡¡¡',
          detail: 'Debe seleccionar un Modelo para Editarlo',
        });
        return;
      } else {
        this.tituloModal = 'Editar';
        this.formModelo.patchValue(this.selectecModelo);
      }
    } else {
      this.tituloModal = 'Nuevo';
      this.modelo = new Modelo();
    }
    this.displaySaveEditDialog = true;
  }

  onGuardar() {
    this.modelo = this.formModelo.value;
    this.guardarModelo();
  }

  eliminarModelo() {
    if (this.selectecModelo === null || this.selectecModelo.idModelo === null) {
      this.messageService.add({
        severity: 'warn',
        summary: '!!!Advertencia¡¡¡',
        detail: 'Debe seleccionar un Modelo para Eliminarlo',
      });
      return;
    }
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar este modelo?',
      accept: () => {
        this.modeloService.delete(this.selectecModelo.idModelo).subscribe(
          (modelo: Modelo) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Información',
              detail: `se elimino el modelo ${modelo.nombreModelo} correctamente`,
            });
            this.validarEliminacion(modelo);
          },
          (e) => {
            this.messageService.add({
              severity: 'error',
              summary: `${e.error.error}`,
              detail: `No se puede eliminar el equipo si tienes registros anidados a el`,
            });
          }
        );
      },
    });
  }

  validarEliminacion(modelo: Modelo) {
    this.listModelo.splice(
      this.listModelo.findIndex((e) => e.idModelo === modelo.idModelo),
      1
    );
  }

  ngOnInit(): void {
    this.obtenerModelos();
    this.formModelo = this.fb.group({
      idModelo: new FormControl(),
      nombreModelo: new FormControl(null, Validators.required),
      kva: new FormControl(),
      fase: new FormControl(),
      peso: new FormControl(null, Validators.required),
      cantidadAceite: new FormControl(null, Validators.required),
      tipoAceite: new FormControl(null, Validators.required),
      tipoTransformador: new FormControl(null, Validators.required),
      stock: new FormControl(),
      design: new FormControl(null, Validators.required),
    });
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => this.mostarDialogoGuardarEditar(false),
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.mostarDialogoGuardarEditar(true),
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
        command: () => this.eliminarModelo(),
      },
      {
        label: 'Actualizar',
        icon: 'pi pi-fw pi-refresh',
        command: () => this.obtenerModelos(),
      },
    ];
  }
}

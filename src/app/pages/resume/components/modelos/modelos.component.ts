// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Service
import { ModeloService } from "src/app/core/services/modelo.service";
import { DesignService } from 'src/app/core/services/design.service';
// Modelo
import { Design } from 'src/app/core/models/design';
import { Modelo } from 'src/app/core/models/modelo';

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

  constructor(
    private designService: DesignService,
    private modeloService: ModeloService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  obtenerModelos(){
    
  }

  ngOnInit(): void {}
}

import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { Demande } from '../../models/Demande';
import { DemandeService } from 'src/app/services/demande.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss'],
})
export class DemandeComponent implements OnInit {
  demandes: Demande[] = [];

  constructor(private demandeService: DemandeService) {}

  ngOnInit() {
    this.demandeService.getAllDemandes().subscribe((demandes) => {
      this.demandes = demandes;
    });
  }
}

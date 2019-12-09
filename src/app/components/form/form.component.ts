import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    CountryService
  ]
})
export class FormComponent implements OnInit {

  chevyForm: FormGroup;

  documentTypes: any[] = [
    {id: 0, name: 'Cédula ciudadanía'},
    {id: 1, name: 'Cédula extranjería'},
    {id: 2, name: 'Pasaporte'},
    {id: 3, name: 'Registro civil'},
  ];

  countries: Country[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService
  ) { }

  ngOnInit() {
    this.chevyForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      typeDocument: [-1, Validators.required],
      document: ['', [
        Validators.required, 
        Validators.min(1000000), 
        Validators.max(9999999999)]
      ],
      country: [-1, Validators.required],
      phone: ['', [
        Validators.required,
        Validators.min(1000000000),
        Validators.max(9999999999)]
      ],
      email: ['', [
        Validators.required,
        Validators.email]
      ],
      terms: [false, Validators.required]
    });

    this.getCountries();
    this.chevyForm.controls['name'].disable;
  }

  getCountries() {
    this.countryService.getCountry().subscribe(
      (country) => {
        this.countries = country;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  sendData() {
    console.log(this.chevyForm.value);
  }

}

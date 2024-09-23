import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AssetType} from "../../constants";

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, NgIf],
  template: `

    <form (ngSubmit)="applyFilter()" [formGroup]="filterForm" class="h-full m-2">
      <div class="flex flex-col h-full m-2">

        <!-- Autocomplete Province Field -->
        <div class="relative autocomplete-container">
          <label
            class="flex-none my-4 block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm
                focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            for="province"
          >
            <span class="text-xs font-medium text-gray-700"> Province </span>
            <input
              class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm
          {{ filterForm.get('province')?.invalid && filterForm.get('province')?.touched ? 'border-red-500' : '' }}"
              formControlName="province"
              id="province"
              placeholder="Example: Madrid"
              type="text"
              autocomplete="off"
            />
          </label>
          <ul
            *ngIf="filteredProvinces.length > 0"
            class="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            <li
              *ngFor="let option of filteredProvinces"
              (click)="selectProvince(option)"
              class="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {{ option }}
            </li>
          </ul>
        </div>
        <!-- Validation Error Message -->
        <div *ngIf="filterForm.get('province')?.invalid && filterForm.get('province')?.touched">
          <p class="text-red-500 text-sm mb-2 ml-2">
            The province entered is not valid.
          </p>
        </div>

        <div class="flex-grow">
          <details class="overflow-hidden rounded border" open>
            <summary class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
              <span class="text-sm font-medium">Asset Type</span>
              <span class="transition group-open:-rotate-180">
              <svg
                class="size-4"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            </summary>
            <div class="border-t border-gray-200 bg-white">
              <!-- Add Select All / Unselect All Buttons -->
              <div class="flex p-4">
                <button type="button" class="text-sm text-blue-600 hover:underline mr-4"
                        (click)="selectAllAssetTypes()">
                  Select All
                </button>
                <button type="button" class="text-sm text-blue-600 hover:underline" (click)="unselectAllAssetTypes()">
                  Unselect All
                </button>
              </div>
              <ul class="space-y-1 border-t border-gray-200 p-4">
                <li *ngFor="let type of assetTypes">
                  <label class="inline-flex items-center gap-2">
                    <input
                      class="size-5 rounded accent-rose-300 border-gray-300"
                      formControlName="{{ type }}"
                      type="checkbox"
                    />
                    <span class="text-sm font-medium text-gray-700">{{ type }}</span>
                  </label>
                </li>
              </ul>
            </div>
          </details>
          <details
            class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary
              class="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
            >
              <span class="text-sm font-medium"> Price </span>

              <span class="transition group-open:-rotate-180">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
        </svg>
      </span>
            </summary>

            <div class="border-t border-gray-200 bg-white">
              <header class="flex items-center justify-between p-4">
                <span class="text-sm text-gray-700"> The highest price is $600 </span>

                <button type="button" class="text-sm text-gray-900 underline underline-offset-4">
                  Reset
                </button>
              </header>

              <div class="border-t border-gray-200 p-4">
                <div class="flex justify-between gap-4">
                  <label for="FilterPriceFrom" class="flex items-center gap-2">
                    <span class="text-sm text-gray-600">$</span>

                    <input
                      type="number"
                      id="FilterPriceFrom"
                      placeholder="From"
                      class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                  </label>

                  <label for="FilterPriceTo" class="flex items-center gap-2">
                    <span class="text-sm text-gray-600">$</span>

                    <input
                      type="number"
                      id="FilterPriceTo"
                      placeholder="To"
                      class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                  </label>
                </div>
              </div>
            </div>
          </details>
        </div>

        <div class="m-2">
          <button class="w-full rounded bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium py-3 px-4"
                  type="submit"
          >Apply Filter
          </button>
        </div>
      </div>
    </form>
  `,
  styles: [``]
})
export class FilterDialogComponent {
  @Output() filter = new EventEmitter<any>();
  filterForm: FormGroup;

  assetTypes = [AssetType.Garaje, AssetType.Vivienda, AssetType.LocalComercial, AssetType.NaveIndustrial,
    AssetType.Solar, AssetType.FincaRustica, AssetType.Trastero
  ];

  provinces: string[] = [
    'Araba/Álava',
    'Albacete',
    'Alicante/Alacant',
    'Almería',
    'Ávila',
    'Badajoz',
    'Illes Balears',
    'Barcelona',
    'Burgos',
    'Cáceres',
    'Cádiz',
    'Castellón/Castelló',
    'Ciudad Real',
    'Córdoba',
    'A Coruña',
    'Cuenca',
    'Girona',
    'Granada',
    'Guadalajara',
    'Gipuzkoa',
    'Huelva',
    'Huesca',
    'Jaén',
    'León',
    'Lleida',
    'La Rioja',
    'Lugo',
    'Madrid',
    'Málaga',
    'Murcia',
    'Navarra',
    'Ourense',
    'Asturias',
    'Palencia',
    'Las Palmas',
    'Pontevedra',
    'Salamanca',
    'Santa Cruz de Tenerife',
    'Cantabria',
    'Segovia',
    'Sevilla',
    'Soria',
    'Tarragona',
    'Teruel',
    'Toledo',
    'Valencia/València',
    'Valladolid',
    'Bizkaia',
    'Zamora',
    'Zaragoza',
    'Ceuta',
    'Melilla',
  ];

  filteredProvinces: string[] = [];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      province: ['', this.provinceValidator.bind(this)],
      Garaje: [true],
      Vivienda: [true],
      'Local comercial': [true],
      'Nave industrial': [true],
      'Solar': [true],
      'Finca rústica': [true],
      'Trastero': [true],
    });

    this.filterForm.get('province')!.valueChanges.subscribe((value) => {
      this.filteredProvinces = this._filterProvinces(value || '');
      this.filterForm.get('province')!.updateValueAndValidity({onlySelf: true, emitEvent: false});
    });
  }

// Method to select all asset types
  selectAllAssetTypes() {
    this.assetTypes.forEach((type) => {
      this.filterForm.get(type)?.setValue(true);
    });
  }

  // Method to unselect all asset types
  unselectAllAssetTypes() {
    this.assetTypes.forEach((type) => {
      this.filterForm.get(type)?.setValue(false);
    });
  }

  selectProvince(option: string) {
    this.filterForm.get('province')!.setValue(option);
    this.filteredProvinces = [];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-container')) {
      this.filteredProvinces = [];
    }
  }

  applyFilter() {
    if (this.filterForm.invalid) {
      this.filterForm.markAllAsTouched();
      return;
    }
    this.filter.emit(this.filterForm.value);
  }

  provinceValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) return null;
    if (this.provinces.includes(value)) return null;

    // Otherwise, return validation error
    return {invalidProvince: true};
  }

  private _filterProvinces(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.provinces.filter((province) =>
      province.toLowerCase().includes(filterValue)
    );
  }
}

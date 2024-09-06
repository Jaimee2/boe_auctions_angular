import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {AssetType} from "../../constants";

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  template: `
    <div class="m-6 space-y-2">
      <form [formGroup]="filterForm" (ngSubmit)="applyFilter()">
        <div class="p-2 m-2">
          <label for="province" class="block font-medium text-gray-700 text-center">Province</label>
          <input
            type="text"
            id="province"
            formControlName="province"
            placeholder="Example: Madrid"
            class="p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />
        </div>

        <details class="mx-2 overflow-hidden rounded border border-gray-300">
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
            <ul class="space-y-1 border-t border-gray-200 p-4">
              <li *ngFor="let type of assetTypes">
                <label class="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    formControlName="{{type}}"
                    class="size-5 rounded border-gray-300"
                  />
                  <span class="text-sm font-medium text-gray-700">{{ type }}</span>
                </label>
              </li>
            </ul>
          </div>
        </details>

        <div class="p-2 justify-end">
          <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded">Apply Filter</button>
        </div>
      </form>
    </div>
  `,
  styles: [``]
})
export class FilterDialogComponent {
  @Output() filter = new EventEmitter<any>();

  filterForm: FormGroup;
  assetTypes = [AssetType.Garaje, AssetType.Vivienda, AssetType.LocalComercial, AssetType.NaveIndustrial];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      province: ['Madrid'],
      Garaje: [true],
      Vivienda: [true],
      'Local comercial': [true],
      'Nave industrial': [true]
    });
  }

  applyFilter() {
    this.filter.emit(this.filterForm.value);
  }

}

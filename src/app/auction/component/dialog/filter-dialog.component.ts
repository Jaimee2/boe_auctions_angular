import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {AssetType} from "../../constants";

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  template: `

    <form (ngSubmit)="applyFilter()" [formGroup]="filterForm" class="h-full m-2">
      <div class="flex flex-col h-full m-2">

        <label class="flex-none my-4 block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm
                focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
               for="UserEmail"
        >
          <span class="text-xs font-medium text-gray-700"> Province </span>
          <input
            class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            formControlName="province"
            id="province"
            placeholder="Example: Madrid"
            type="text"
          />
        </label>

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
  assetTypes = [AssetType.Garaje, AssetType.Vivienda, AssetType.LocalComercial, AssetType.NaveIndustrial, AssetType.Solar, AssetType.FincaRustica];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      province: [], Garaje: [true],
      Vivienda: [true],
      'Local comercial': [true],
      'Nave industrial': [true],
      'Solar': [true],
      'Finca rústica': [true]
    });
  }

  applyFilter() {
    this.filter.emit(this.filterForm.value);
  }

}

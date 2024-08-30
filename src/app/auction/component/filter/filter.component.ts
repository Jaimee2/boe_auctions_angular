import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  template: `


    <div class="mt-1 space-y-2">
      <details
        class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
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
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
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
      <details
        class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
        >
          <span class="text-sm font-medium"> Availability </span>

          <span class="transition group-open:-rotate-180">
                  <svg
                    class="size-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
        </summary>

        <div class="border-t border-gray-200 bg-white">
          <header class="flex items-center justify-between p-4">
            <span class="text-sm text-gray-700"> 0 Selected </span>

            <button class="text-sm text-gray-900 underline underline-offset-4" type="button">
              Reset
            </button>
          </header>

          <ul class="space-y-1 border-t border-gray-200 p-4">
            <li>
              <label class="inline-flex items-center gap-2" for="FilterInStock">
                <input
                  class="size-5 rounded border-gray-300"
                  id="FilterInStock"
                  type="checkbox"
                />

                <span class="text-sm font-medium text-gray-700"> In Stock (5+) </span>
              </label>
            </li>

            <li>
              <label class="inline-flex items-center gap-2" for="FilterPreOrder">
                <input
                  class="size-5 rounded border-gray-300"
                  id="FilterPreOrder"
                  type="checkbox"
                />

                <span class="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
              </label>
            </li>

            <li>
              <label class="inline-flex items-center gap-2" for="FilterOutOfStock">
                <input
                  class="size-5 rounded border-gray-300"
                  id="FilterOutOfStock"
                  type="checkbox"
                />

                <span class="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
              </label>
            </li>
          </ul>
        </div>
      </details>
    </div>`
})
export class FilterComponent {

}

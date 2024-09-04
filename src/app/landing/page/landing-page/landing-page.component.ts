import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `

    <section class="relative bg-[url('assets/img/img.png')] bg-cover bg-center h-full w-full">

      <div
        class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
      >
        <div class="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right bg-white rounded p-10"
        >
          <h1 class="text-3xl font-extrabold sm:text-5xl animate-bounce ">
            Let us find your

            <strong class="pt-1 block font-extrabold text-rose-700"> Best bid. </strong>
          </h1>

          <p class="mt-4 max-w-lg sm:text-xl/relaxed">
            We have millions of robots finding <span class="font-extrabold">FOR YOU</span>, all the auctions in Spain
          </p>

          <div class="mt-8 flex flex-wrap gap-4 text-center justify-center">
            <a [routerLink]="'/map'"
               href="#"
               class="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [``]
})
export class LandingPageComponent {

}

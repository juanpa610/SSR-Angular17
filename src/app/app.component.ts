import { afterNextRender, afterRender, Component, inject, OnInit, PLATFORM_ID, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './services/seo.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { BodyComponent } from "./components/body/body.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'proyecto-ssr';

  constructor() {
    const platformId = inject(PLATFORM_ID);
    console.log("Platform Id:", platformId);

    //De esta manera se puede validar si estamos del lado el cliente 
    // o del servidor y asi no tener problemas cmo por ejemplo con el localStorage
    if (isPlatformServer(platformId)) {
      console.log("Estoy en el servidor");
    }

    if (isPlatformBrowser(platformId)) {
      console.log("Estoy en el clienteee");
      localStorage.setItem('usageLocaleStoarage', 'localeStoarage con SSR mediante el browser');
      console.log(localStorage.getItem('usageLocaleStoarage'));
    }

    // Tambien estan estos Hooks como el afterRender o afterNextRender 
    afterRender(() => {
      console.warn("Estoy en el cliente con el hook  afterRender");
      console.warn(localStorage.getItem('usageLocaleStoarage'));
    });

  }

  seoServie = inject(SeoService);

  ngOnInit(): void {
    this.seoServie.title.setTitle("Pagina de prueba de SSR");

    this.seoServie.meta.addTags([
      { property: 'og:title', content: 'Titulo de Open Graph' },
      { property: 'og:description', content: 'Descripcion de Open Graph' },
      { property: 'og:image', content: 'URL de la imagen' },
    ]);


    this.seoServie.meta.updateTag({
      name: 'description',
      content: "Se esta probando SSR"
    });

    this.seoServie.setCanonicalUrl("www.https//:juanssr");
    this.seoServie.setIndexFollow(true);

    // localStorage.setItem('seoServie', 'seoServie');
    // console.log( localStorage.getItem('seoServie'))

  }

}

declare module 'donutty' {
  export class Donutty {
    constructor(element: HTMLElement | null, options)
  }
  declare global {
    interface Window { Donutty: Donutty; }
  }

  window.Donutty = Donutty;
}

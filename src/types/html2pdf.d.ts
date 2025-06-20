declare module "html2pdf.js" {
  const html2pdf: () => {
    set: (options: any) => any;
    from: (element: HTMLElement) => { save: () => void };
  };
  export default html2pdf;
}

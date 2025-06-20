declare module "html2pdf.js" {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: { scale?: number };
    jsPDF?: { unit?: string; format?: string | number[]; orientation?: string };
  }

  interface Html2PdfInstance {
    set: (opt: Html2PdfOptions) => Html2PdfInstance;
    from: (element: HTMLElement) => Html2PdfInstance;
    save: () => void;
  }

  function html2pdf(): Html2PdfInstance;

  export default html2pdf;
}


class XLSExport{
    constructor(id,filename){
        this.content=document.getElementById(id).innerHTML
        this.filename=filename+'.xsl'
        this.exportXls(this.content,this.filename)
    }
    exportXls(content,filename){
        // let content=document.getElementById(id).innerHTML
        let uri='data:application/vnd.ms-excel;base64,',
            template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name="renderer" content="webkit"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
        let ctx={worksheet:"Worksheet",table:content};
        let aDom=document.createElement("a");
        document.body.appendChild(aDom);
        aDom.hreflang="zh";
        aDom.charset='utf8';
        aDom.type="application/vnd.ms-excel"
        let blob= new Blob([(this.format(template,ctx))])
        aDom.href=URL.createObjectURL(blob)
        // aDom.target = '_blank';
        aDom.download = filename + '.xls';
        aDom.tableBorder = 1;
        aDom.click();
        document.body.removeChild(aDom)
    }
    format(s, c) {
        return s.replace(/{(\w+)}/g,
            function(m, p) {
                return c[p];
            }
        )
    }
}

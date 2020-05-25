function getdate(x) {
  var now = x ? new Date(x) : new Date(),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate();
  return y + "/" + (m < 10 ? "0" + m : m) + "/" + (d < 10 ? "0" + d : d) ;
};
var city = data.consignee_province + data.consignee_city;
LODOP.PRINT_INITA("0mm","0mm","60mm","25mm","自动打印标签模板");
LODOP.SET_PRINT_PAGESIZE(1,"60mm","25mm","25×60mm");
LODOP.ADD_PRINT_TEXT("1mm","1mm","32mm","4mm","物料编码：" + data.sku_code);
LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
LODOP.ADD_PRINT_TEXT("1mm","30mm","30mm","4mm","网点代码："+ data.package_site_code);
LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
LODOP.ADD_PRINT_TEXT("5.5mm","1mm","16mm","4mm","数量："+ data.quantity);
LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
if(city.length > 4){
  LODOP.ADD_PRINT_TEXT("5.5mm","18mm","48mm","4mm",`日期：${getdate(data.creation_date)}`);
  LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
  LODOP.ADD_PRINT_TEXT("9.5mm","1mm","50mm","4mm","单据号："+ data.out_order_code);
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  LODOP.ADD_PRINT_TEXT("11.8mm","1mm","48mm","4mm",`${city}`);
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
}else {
  LODOP.ADD_PRINT_TEXT("5.5mm","18mm","48mm","4mm",`日期：${getdate(data.creation_date)} ${city}`);
  LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
  LODOP.ADD_PRINT_TEXT("10mm","1mm","50mm","4mm","单据号："+ data.out_order_code);
  LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
}

LODOP.ADD_PRINT_BARCODE("14.5mm","1mm","50mm","6mm","128B", data.bar_code);
LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
LODOP.SET_PRINT_STYLEA(0,"ShowBarText",0);
LODOP.ADD_PRINT_TEXT("21mm","1mm","59mm","4mm", "描述：" + data.remark);
LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
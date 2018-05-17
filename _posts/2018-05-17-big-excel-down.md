---

title: 대용량 엑셀 다운로드
author: jaycee
description: 대용량 엑셀 다운로드
category: spring
tag: spring,poi

---
## 목적
대용량 엑셀의 다운로드

## 스프링 기존 방식으로 대용량 엑셀 다운로드 구현 시 발생 오류
대용량 엑셀 생성 시 스프링 기존 방식으로하면 OOM(out of memory) 발생. 아래와 같이 두가지 경우에서 오류가 발생한다.
- ibatis,mybatis에서는 쿼리결과를 보통 List\<map> 또는 List\<vo>형태로 담게 되는데. 이 List에 수십만 건이상 쌓이게 되면 oom발생
- List가 잘 처리되는 경우에도, poi에서 workbook객체로 엑셀을 작성하는데, workbook객체에 수십만 건이상이 쌓이게 되면 oom발생

## 방법
아래와 같이 세가지 방법이 있다. 그나마 로우핸들러를 이용하는 것이 가장 안정적이어서 이방법을 사용하기로 한다.
- 서버의 메모리를 늘린다. >> 당장은 테스트하여 처리될 수 있으나, 앞으로 운영 도중 엑셀로 받을 데이터가 늘어날 경우 안정성을 보장할 수 없다.
- poi의 writebook(100) 과 같이 버퍼 사이즈를 선택해준다. >> 현재 운영 중인 시스템 poi의 버젼이 낮아 버퍼를 지원안함. 버퍼를 지원한다고 해도 ibatis에서 List를 담는 과정에서 oom이 발생할 수 있다.
- ibatis 로우핸들러를 이용한다. 이게 가장 이상적인듯하다. 이 방법을 사용하여 구현한다ㅓ.

## 프로세스 흐름
1. ibatis 로우핸들러를 구현한다. 로우핸들러는 쿼리 조회 결과를 List로 담는 것이 아니라, 레코드 한건이 조회될 때마다 핸들러에서 지정한 작업을 수행한다. 로우핸들러 인터페이스는 이미 있으므로, 이를 구현(implements)하면된다. 인터페이스에는 handleRow라는 메소드 하나만 있으므로 구현도 이 메소드하나만 하면 됨. 
2. 1번에서 구해온 object를 이용하여 xml파일을 작성한다. 여기서 shpreadsheetwriter 클래스를 이용한다. 하단 소스에 있음.
3. xml 용량이 매우 크므로 압축하여 xlsx파일을 생성한다.

## 한계점
- 구현 시 테스트할 것이 많아 개발 시간이 오래걸린다.(작업 요청한 사람은 매우 간단한 작업이라 생각할지도..)
- 속도 느린 것은 어쩗 수 없다.
- 대용량 엑셀다운로드 기능은 서버 부하가 발생한다. 일반적으로 고려하지 않는다. 즉, DB담당자나 개발자가 직접 뽑아주도록 하고, 불가피할 때 구현해야한다.

## 소스코드
``` java
import java.io.*;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFDataFormat;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class BigGridDemo {
   private static final String XML_ENCODING = "UTF-8";

   public static void main(String[] args) throws Exception {

       // Step 1. Create a template file. Setup sheets and workbook-level objects such as
       // cell styles, number formats, etc.

       XSSFWorkbook wb = new XSSFWorkbook();
       XSSFSheet sheet = wb.createSheet("Big Grid");

       Map<String, XSSFCellStyle> styles = createStyles(wb);
       //name of the zip entry holding sheet data, e.g. /xl/worksheets/sheet1.xml
       String sheetRef = sheet.getPackagePart().getPartName().getName();

       //save the template
       FileOutputStream os = new FileOutputStream("template.xlsx");
       wb.write(os);
       os.close();

       //Step 2. Generate XML file.
       File tmp = File.createTempFile("sheet", ".xml");
       Writer fw = new OutputStreamWriter(new FileOutputStream(tmp), XML_ENCODING);
       generate(fw, styles);
       fw.close();

       //Step 3. Substitute the template entry with the generated data
       FileOutputStream out = new FileOutputStream("big-grid.xlsx");
       substitute(new File("template.xlsx"), tmp, sheetRef.substring(1), out);
       out.close();
   }

   /**
    * Create a library of cell styles.
    */
   private static Map<String, XSSFCellStyle> createStyles(XSSFWorkbook wb){
       Map<String, XSSFCellStyle> styles = new HashMap<String, XSSFCellStyle>();
       XSSFDataFormat fmt = wb.createDataFormat();

       XSSFCellStyle style1 = wb.createCellStyle();
       style1.setAlignment(XSSFCellStyle.ALIGN_RIGHT);
       style1.setDataFormat(fmt.getFormat("0.0%"));
       styles.put("percent", style1);

       XSSFCellStyle style2 = wb.createCellStyle();
       style2.setAlignment(XSSFCellStyle.ALIGN_CENTER);
       style2.setDataFormat(fmt.getFormat("0.0X"));
       styles.put("coeff", style2);

       XSSFCellStyle style3 = wb.createCellStyle();
       style3.setAlignment(XSSFCellStyle.ALIGN_RIGHT);
       style3.setDataFormat(fmt.getFormat("$#,##0.00"));
       styles.put("currency", style3);

       XSSFCellStyle style4 = wb.createCellStyle();
       style4.setAlignment(XSSFCellStyle.ALIGN_RIGHT);
       style4.setDataFormat(fmt.getFormat("mmm dd"));
       styles.put("date", style4);

       XSSFCellStyle style5 = wb.createCellStyle();
       XSSFFont headerFont = wb.createFont();
       headerFont.setBold(true);
       style5.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
       style5.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
       style5.setFont(headerFont);
       styles.put("header", style5);

       return styles;
   }

   private static void generate(Writer out, Map<String, XSSFCellStyle> styles) throws Exception {

       Random rnd = new Random();
       Calendar calendar = Calendar.getInstance();

       SpreadsheetWriter sw = new SpreadsheetWriter(out);
       sw.beginSheet();

       //insert header row
       sw.insertRow(0);
       int styleIndex = styles.get("header").getIndex();
       sw.createCell(0, "Title", styleIndex);
       sw.createCell(1, "% Change", styleIndex);
       sw.createCell(2, "Ratio", styleIndex);
       sw.createCell(3, "Expenses", styleIndex);
       sw.createCell(4, "Date", styleIndex);

       sw.endRow();

       //write data rows
       for (int rownum = 1; rownum < 100000; rownum++) {
           sw.insertRow(rownum);

           sw.createCell(0, "Hello, " + rownum + "!");
           sw.createCell(1, (double)rnd.nextInt(100)/100, styles.get("percent").getIndex());
           sw.createCell(2, (double)rnd.nextInt(10)/10, styles.get("coeff").getIndex());
           sw.createCell(3, rnd.nextInt(10000), styles.get("currency").getIndex());
           sw.createCell(4, calendar, styles.get("date").getIndex());

           sw.endRow();

           calendar.roll(Calendar.DAY_OF_YEAR, 1);
       }
       sw.endSheet();
   }

   /**
    *
    * @param zipfile the template file
    * @param tmpfile the XML file with the sheet data
    * @param entry the name of the sheet entry to substitute, e.g. xl/worksheets/sheet1.xml
    * @param out the stream to write the result to
    */
       private static void substitute(File zipfile, File tmpfile, String entry, OutputStream out) throws IOException {
       ZipFile zip = new ZipFile(zipfile);

       ZipOutputStream zos = new ZipOutputStream(out);

       @SuppressWarnings("unchecked")
       Enumeration<ZipEntry> en = (Enumeration<ZipEntry>) zip.entries();
       while (en.hasMoreElements()) {
           ZipEntry ze = en.nextElement();
           if(!ze.getName().equals(entry)){
               zos.putNextEntry(new ZipEntry(ze.getName()));
               InputStream is = zip.getInputStream(ze);
               copyStream(is, zos);
               is.close();
           }
       }
       zos.putNextEntry(new ZipEntry(entry));
       InputStream is = new FileInputStream(tmpfile);
       copyStream(is, zos);
       is.close();

       zos.close();
   }

   private static void copyStream(InputStream in, OutputStream out) throws IOException {
       byte[] chunk = new byte[1024];
       int count;
       while ((count = in.read(chunk)) >=0 ) {
         out.write(chunk,0,count);
       }
   }
```

shpreadsheetwriter.java
``` java
   /**
    * Writes spreadsheet data in a Writer.
    * (YK: in future it may evolve in a full-featured API for streaming data in Excel)
    */
   public static class SpreadsheetWriter {
       private final Writer _out;
       private int _rownum;

       public SpreadsheetWriter(Writer out){
           _out = out;
       }

       public void beginSheet() throws IOException {
           _out.write("<?xml version=\"1.0\" encoding=\""+XML_ENCODING+"\"?>" +
                   "<worksheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\">" );
           _out.write("<sheetData>\n");
       }

       public void endSheet() throws IOException {
           _out.write("</sheetData>");
           _out.write("</worksheet>");
       }

       /**
        * Insert a new row
        *
        * @param rownum 0-based row number
        */
       public void insertRow(int rownum) throws IOException {
           _out.write("<row r=\""+(rownum+1)+"\">\n");
           this._rownum = rownum;
       }

       /**
        * Insert row end marker
        */
       public void endRow() throws IOException {
           _out.write("</row>\n");
       }

       public void createCell(int columnIndex, String value, int styleIndex) throws IOException {
           String ref = new CellReference(_rownum, columnIndex).formatAsString();
           _out.write("<c r=\""+ref+"\" t=\"inlineStr\"");
           if(styleIndex != -1) _out.write(" s=\""+styleIndex+"\"");
           _out.write(">");
           _out.write("<is><t>"+value+"</t></is>");
           _out.write("</c>");
       }

       public void createCell(int columnIndex, String value) throws IOException {
           createCell(columnIndex, value, -1);
       }

       public void createCell(int columnIndex, double value, int styleIndex) throws IOException {
           String ref = new CellReference(_rownum, columnIndex).formatAsString();
           _out.write("<c r=\""+ref+"\" t=\"n\"");
           if(styleIndex != -1) _out.write(" s=\""+styleIndex+"\"");
           _out.write(">");
           _out.write("<v>"+value+"</v>");
           _out.write("</c>");
       }

       public void createCell(int columnIndex, double value) throws IOException {
           createCell(columnIndex, value, -1);
       }

       public void createCell(int columnIndex, Calendar value, int styleIndex) throws IOException {
           createCell(columnIndex, DateUtil.getExcelDate(value, false), styleIndex);
       }
   }
}

```

## 출처
- <a href="https://stackoverflow.com/questions/4740179/whats-the-difference-between-c-t-str-and-cis-in-office-open-xml?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa" target="_blank">스택오버플로 -How to add Cell Comments to Excel sheet using POI?</a>

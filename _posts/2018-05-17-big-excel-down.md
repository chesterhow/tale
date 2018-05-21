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
대용량 엑셀 생성 시 스프링의 일반적인 방식인 queryForList를 호출하게 되면 OOM(out of memory) 발생. 아래와 같이 두가지 경우에서 오류가 발생한다.
- ibatis,mybatis에서는 쿼리결과를 보통 List\<map> 또는 List\<vo>형태로 담게 되는데. 이 List에 수십만 건이상 쌓이게 되면 oom발생
- List가 잘 처리되는 경우에도, poi에서 workbook객체로 엑셀을 작성하는데, workbook객체에 수십만 건이상이 쌓이게 되면 oom발생

## 방법
아래와 같이 세가지 방법이 있다. 그나마 로우핸들러를 이용하는 것이 가장 안정적이어서 이방법을 사용하기로 한다.
- 서버의 메모리를 늘린다. >> 당장은 테스트하여 처리될 수 있으나, 앞으로 운영 도중 엑셀로 받을 데이터가 늘어날 경우 안정성을 보장할 수 없다.
- poi의 writebook(100) 과 같이 버퍼 사이즈를 선택해준다. >> 현재 운영 중인 시스템 poi의 버젼이 낮아 버퍼를 지원안함. 버퍼를 지원한다고 해도 ibatis에서 List를 담는 과정에서 oom이 발생할 수 있다.
- ibatis 로우핸들러를 이용한다. 이게 가장 이상적인듯하다. 이 방법을 사용하여 구현한다.

## 알아둬야할 내용들
 - XML로 엑셀파일을 생성하는 것은 엑셀로 XML파일을 여는 것이 아니다. XML과 템플릿 파일을 압축하여 XLSX파일을 생성해야한다. 아래 차례대로 진행하면 된다. 나도 자세한 것은 모르지만 XML과 템플릿을 압축하는 것이 XLSX파일이 스펙이 인 듯하다. 그냥 따르자.
 1. XML파일을 만든다.
 2. 템플릿(매핑)할 엑셀 파일을 만든다.
 3. XML파일과 템플릿 파일을 ZIP형식으로 압축한다. 압축된 파일의 확장자는 XLSX로 정한다.

## 프로세스 흐름
1. ibatis 로우핸들러를 구현한다. 로우핸들러는 쿼리 조회 결과를 List로 담는 것이 아니라, 레코드 한건이 조회될 때마다 핸들러에서 지정한 작업을 수행한다. 로우핸들러 인터페이스는 이미 있으므로, 이를 구현(implements)하면된다. 인터페이스에는 handleRow라는 메소드 하나만 있으므로 구현도 이 메소드하나만 하면 됨. 
2. 1번에서 구해온 object를 이용하여 xml파일을 작성한다. 여기서 shpreadsheetwriter 클래스를 이용한다. 하단 소스에 있음.
3. XML파일을 생성하고 템플릿용 엑셀 파일을 생성하고, 이 두 파일을 zip형식으로 압축한다. 그러나 확장자는 XLSX로 지정한다.
4. 생성된 파일을 responseBody를 이용하여 다운로드 시키거나, 클라이언트(웹브라우져) 콜백으로 다운로드 시킨다.

## 한계점
- 구현 시 테스트할 것이 많아 개발 시간이 오래걸린다.(작업 요청한 사람은 매우 간단한 작업이라 생각할지도..)
- 속도 느린 것은 어쩗 수 없다.
- 대용량 엑셀다운로드 기능은 서버 부하가 발생한다. 일반적으로 고려하지 않는다. 즉, DB담당자나 개발자가 직접 뽑아주도록 하고, 불가피할 때 구현해야한다.

## 실행 코드
``` java
public void main() throws Exception {

	Map paramMap = null; //select 쿼리에 넣을 파라미터 맵
	String fileName = null; //파일명
	Map rtnMap = null; 

	try {
		// 엑셀의 헤더/데이터 VO 설정
		List<ExcelCellInfoVO> arrExcelCellInfo = new ArrayList<ExcelCellInfoVO>();
		arrExcelCellInfo.add(new ExcelCellInfoVO("COMPCD","제조사","text","center","",0));
		arrExcelCellInfo.add(new ExcelCellInfoVO("GCODE","대분류","text","center","",0));
		arrExcelCellInfo.add(new ExcelCellInfoVO("GCODENM","대분류명","text","left","",0));
		arrExcelCellInfo.add(new ExcelCellInfoVO("MCODE","중분류","text","center","",0));
		arrExcelCellInfo.add(new ExcelCellInfoVO("MCODENM","중분류명","text","left","",0));
		arrExcelCellInfo.add(new ExcelCellInfoVO("DCODE","소분류","text","center","",0));
		arrExcelCellInfo.add(new ExcelCellInfoVO("DCODENM","소분류명","text","left","",0));
		arrExcelCellInfo.add(new ExcelCellInfoVO("PRDCD","상품코드","text","left","",200));
		arrExcelCellInfo.add(new ExcelCellInfoVO("PRDNM","상품명","text","left","",200));
		arrExcelCellInfo.add(new ExcelCellInfoVO("PRC","가격","number","right","#,##0",0));

		// 엑셀 생성 관련 정보 설정
		ExcelInfoVO excelInfoVO = new ExcelInfoVO("com.test.project.selectPrdtCd", fileName, arrExcelCellInfo);

	rtnMap = excelService.createXlsxExcel(paramMap, excelInfoVO);			
	}catch(Exception e) {
		log.error(this.getClass().toString(),e);
	}

	return rtnMap;

}

```

## 엑셀 파라미터용 VO 코드
``` java
public class ExcelInfoVO {

	/** 처리 건수*/
	private int rowCnt;
	
	/** 처리 결과*/
	private String result;
	
	/** 결과를 받아올 쿼리 id */
	private String queryId;
	
	/** 엑셀의 헤더/셀 정보 리스트*/
	private List<ExcelCellInfoVO> arrExcelCellInfo;
	
	/** 생성할 엑셀 파일 이름 */
	private String fileName;


	/**
	 * 생성할 엑셀 정의
	 * @param queryId 겨로가 받아올 쿼리 아이디
	 * @param fileName 다운로드할 엑셀 파일 명칭
	 * @param arrExcelCellInfo 엑셀의 헤더/셀 정보 리스트
	 */
	public ExcelInfoVO(String queryId, String fileName, List<ExcelCellInfoVO> arrExcelCellInfo) {
		this.setQueryId(queryId);
		this.setFileName(fileName);
		this.arrExcelCellInfo = arrExcelCellInfo;
	}


	public int getRowCnt() {
		return rowCnt;
	}

	public void setRowCnt(int rowCnt) {
		this.rowCnt = rowCnt;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public List<ExcelCellInfoVO> getArrExcelCellInfo() {
		return arrExcelCellInfo;
	}

	public void setArrExcelCellInfo(List<ExcelCellInfoVO> arrExcelCellInfo) {
		this.arrExcelCellInfo = arrExcelCellInfo;
	}


	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getQueryId() {
		return queryId;
	}

	public void setQueryId(String queryId) {
		this.queryId = queryId;
	}
}
```

## 엑셀 셀정보 VO 
``` java
public class ExcelCellInfoVO {

	private String columnId;		// - 셀에 넣을 Column ID. ex) coCd, dtbtGpCd
	private String[] headerDesc;	// - 헤더에 표현할 문자열. 다중 헤더 구성 가능(테스트 필요). ex) {"회사코드"}
	private String displayType;		// - 데이터를 표현할 방법. 기본은 "text". ex) "text", "number"
	private String align;			// - 데이터의 정렬 방법. 기본은 "left". ex) "left", "center", "right"
	private String format;			// - 데이터의 표현이 숫자(number)일 경우, 해당 표현법. 엑셀 포맷팅을 사용한다. ex) "#,##0", "#,##0.00", "0.0%"
	private double columnWidth = 72; // - 컬럼의 너비. 기본값은 72px(72px * 0.125 = 9 로 들어갈 예정)

	/**
	 * 셀의 표현정보를 정의한다.
	 * @param columnId 셀에 넣을 Column ID. ex) coCd, dtbtGpCd
	 * @param headerDesc 헤더에 표현할 문자열
	 * @param displayType 데이터를 표현할 방법. 기본은 "text". ex) "text", "number"
	 * @param align 데이터의 정렬 방법. 기본은 "left". ex) "left", "center", "right"
	 * @param format 데이터의 표현이 숫자(number)일 경우, 해당 표현법. 엑셀 포맷팅을 사용한다. ex) "#,##0", "#,##0.00", "0.0%"
	 * @param columnWidth 컬럼의 너비. 기본값은 72px(72px * 0.125 = 9 로 들어갈 예정)
	 */
	public ExcelCellInfoVO(String columnId, String headerDesc, String displayType, String align, String format, double columnWidth) {
		this.columnId = columnId;
		this.headerDesc = new String[]{headerDesc};
		this.displayType = displayType;
		this.align = align;
		this.format = format;
		this.columnWidth = columnWidth;
	}

	/**
	 * 셀의 표현정보를 정의한다.
	 * @param columnId 셀에 넣을 Column ID. ex) coCd, dtbtGpCd
	 * @param headerDesc 헤더에 표현할 문자열
	 * @param displayType 데이터를 표현할 방법. 기본은 "text". ex) "text", "number"
	 * @param align 데이터의 정렬 방법. 기본은 "left". ex) "left", "center", "right"
	 * @param format 데이터의 표현이 숫자(number)일 경우, 해당 표현법. 엑셀 포맷팅을 사용한다. ex) "#,##0", "#,##0.00", "0.0%"
	 */
	public ExcelCellInfoVO(String columnId, String headerDesc, String displayType, String align, String format) {
		this.columnId = columnId;
		this.headerDesc = new String[]{headerDesc};
		this.displayType = displayType;
		this.align = align;
		this.format = format;
	}

	/**
	 * 셀의 표현정보를 정의한다.
	 * <li>문자형(text)은 좌측, 숫자형(number)은 우측 정렬
	 * <li>숫자형(number)은 "#,##0" 형식으로 표현
	 * @param columnId 셀에 넣을 Column ID. ex) coCd, dtbtGpCd
	 * @param headerDesc 헤더에 표현할 문자열
	 * @param displayType 데이터를 표현할 방법. 기본은 "text". ex) "text", "number"
	 */
	public ExcelCellInfoVO(String columnId, String headerDesc, String displayType) {
		this.columnId = columnId;
		this.headerDesc = new String[]{headerDesc};
		this.displayType = displayType;
		this.align = ("number".equals(displayType) ? "right" : "left");
		this.format = ("number".equals(displayType) ? "#,##0" : "");
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "ExcelCellInfoVO [columnId=" + columnId + ", headerDesc="
				+ Arrays.toString(headerDesc) + ", displayType=" + displayType
				+ ", align=" + align + ", format=" + format + "]";
	}

	/**
	 * @return the columnId
	 */
	public String getColumnId() {
		return columnId;
	}

	/**
	 * @param columnId the columnId to set
	 */
	public void setColumnId(String columnId) {
		this.columnId = columnId;
	}

	/**
	 * @return the headerDesc
	 */
	public String[] getHeaderDesc() {
		return headerDesc;
	}

	/**
	 * @param headerDesc the headerDesc to set
	 */
	public void setHeaderDesc(String[] headerDesc) {
		this.headerDesc = headerDesc;
	}

	/**
	 * @return the displayType
	 */
	public String getDisplayType() {
		return displayType;
	}

	/**
	 * @param displayType the displayType to set
	 */
	public void setDisplayType(String displayType) {
		this.displayType = displayType;
	}

	/**
	 * @return the align
	 */
	public String getAlign() {
		return align;
	}

	/**
	 * @param align the align to set
	 */
	public void setAlign(String align) {
		this.align = align;
	}

	/**
	 * @return the format
	 */
	public String getFormat() {
		return format;
	}

	/**
	 * @param format the format to set
	 */
	public void setFormat(String format) {
		this.format = format;
	}

	/**
	 * @return the columnWidth
	 */
	public double getColumnWidth() {
		return columnWidth;
	}

	/**
	 * @param columnWidth the columnWidth to set
	 *                    <br>기본값은 72px(72px * 0.125 = 9 로 들어갈 예정)
	 */
	public void setColumnWidth(double columnWidth) {
		this.columnWidth = columnWidth;
	}
}
```

## 엑셀 서비스 공통 코드
``` java
public class ExcelService {
	@Autowired
	SqlMapClientTemplate mapTemplate;

	String filePath =  "C:\\";
	
	Logger log = LoggerFactory.getLogger(this.getClass());
	
	private static final String XML_ENCODING = "UTF-8";
   
   @SuppressWarnings({ "rawtypes", "unchecked"})
	public Map createXlsxExcel(Map paramMap, ExcelInfoVO excelInfoVO) throws Exception {
		Map rtnMap = new HashMap();

        XSSFWorkbook wb = new XSSFWorkbook();
        //시트명칭 설정
        XSSFSheet sheet = wb.createSheet("Big Grid");
        
        /*
        int headStyleSize = excelInfoVO.getArrExcelCellInfo().size();
        
        for (int i = 0; i < headStyleSize; i++) {
        	log.error(String.valueOf(i)+"번째 width:"+String.valueOf(excelInfoVO.getArrExcelCellInfo().get(i).getColumnWidth()));
			sheet.setColumnWidth(i, (int)excelInfoVO.getArrExcelCellInfo().get(i).getColumnWidth());
		}
        sheet.createFreezePane(0, 1,0,1);
        */
        
        //셀스타일을 생성
        Map<String, XSSFCellStyle> styles = createStyles(wb, excelInfoVO);
        
        //name of the zip entry holding sheet data, e.g. /xl/worksheets/sheet1.xml
        String sheetRef = sheet.getPackagePart().getPartName().getName();

        //save the template
        //템플릿 파일 생성
        FileOutputStream os = new FileOutputStream(filePath + File.separator +"template.xlsx");
        wb.write(os);
        os.close();

        //Step 2. Generate XML file.
        //엑셀에 담길 실제 내용인 XML파일을 생성
        File tmp = File.createTempFile("sheet", ".xml");
        Writer fw = new OutputStreamWriter(new FileOutputStream(tmp), XML_ENCODING);

        //헤더 생성
        generateHead(fw, styles, excelInfoVO);
        
        //generateBody(fw, styles);
        ExcelResultHandler handler = new ExcelResultHandler();
        handler.setOut(fw);
        handler.setStyleMap(styles);
        handler.setExcelInfoVO(excelInfoVO);
        mapTemplate.queryWithRowHandler(excelInfoVO.getQueryId(), paramMap, handler);
        
        //푸터 생성
        generateFoot(fw, styles);
        
        fw.close();

        //Step 3. Substitute the template entry with the generated data
        //템플릿과 생성된 XML을 압축하여 XLSX파일을 만든다.
        FileOutputStream out = new FileOutputStream(filePath + File.separator +excelInfoVO.getFileName());
        substitute(new File(filePath + File.separator +"template.xlsx"), tmp, sheetRef.substring(1), out);
        out.close();
		
		rtnMap.put("fileName",excelInfoVO.getFileName());
		rtnMap.put("listCnt", handler.getRowNum());
		
		return rtnMap;
	}
	
	private static Map<String, XSSFCellStyle> createStyles(XSSFWorkbook wb, ExcelInfoVO prmExcelInfoVO){
	       
		Map<String, XSSFCellStyle> styleMap = new HashMap<String, XSSFCellStyle>();

		XSSFDataFormat fmt = wb.createDataFormat();

		
		// 헤더 스타일
		XSSFCellStyle styleHead = wb.createCellStyle();
		XSSFFont headerFont = wb.createFont();
		headerFont.setBold(true);
		styleHead.setFont(headerFont);
		styleHead.setBorderBottom(BorderStyle.THIN);
		styleHead.setVerticalAlignment(VerticalAlignment.CENTER);
		styleMap.put("head", styleHead);

		
		// 2. 각 컬럼별로 스타일 생성
		// [{columnId, headerDesc, displayType, align, format}]
		List<ExcelCellInfoVO> arrExcelCellInfo = prmExcelInfoVO.getArrExcelCellInfo();
		for (int iColIndex = 0; iColIndex < arrExcelCellInfo.size(); iColIndex++) {
			
			// 2.1. 컬럼 설정 정보 가져오기
			String sColumnId = arrExcelCellInfo.get(iColIndex).getColumnId();
			String sDisplayType = arrExcelCellInfo.get(iColIndex).getDisplayType();
			String sAlign = arrExcelCellInfo.get(iColIndex).getAlign();
			String sFormat = arrExcelCellInfo.get(iColIndex).getFormat();
			
			// 2.2. Data 셀 스타일 생성
			XSSFFont dataFont = wb.createFont();
			XSSFCellStyle dataStyle = wb.createCellStyle();
			dataStyle.setWrapText(true); // - 텍스트 줄 바꿈
			dataStyle.setFont(dataFont);

			// - 정렬 : left(Default), center, right
			if ("right".equalsIgnoreCase(sAlign)) {
				dataStyle.setAlignment(HorizontalAlignment.RIGHT);
			} else if ("center".equalsIgnoreCase(sAlign)) {
				dataStyle.setAlignment(HorizontalAlignment.CENTER);
			} else {
				dataStyle.setAlignment(HorizontalAlignment.LEFT);
			}
			
			// - 포맷팅 : 타입이 "number"일 경우, 처리 : "#,##0", "#,##0.00", "0.0%"
			if ("number".equalsIgnoreCase(sDisplayType)) {
				if (sFormat != null && !"".equals(sFormat)) {
					dataStyle.setDataFormat(fmt.getFormat(sFormat));
				}
			}
			styleMap.put(sColumnId, dataStyle);
		}
		
		return styleMap;
	}

   private static void generateHead(Writer out, Map<String, XSSFCellStyle> styleMap, ExcelInfoVO prmExcelInfoVO) throws Exception {

	   List<ExcelCellInfoVO> arrExcelCellInfo = prmExcelInfoVO.getArrExcelCellInfo();
       SpreadsheetWriter sw = new SpreadsheetWriter(out);

       sw.beginSheet();
       
       sw.insertRow(0);
       for(int iColIndex = 0 ; iColIndex < arrExcelCellInfo.size() ; iColIndex++) {

			// 2. 스타일 가져오기
			XSSFCellStyle cellStyle = null;
			cellStyle = styleMap.get("head");

			// 3. 생성할 컬럼 값 가져오기
			String oValue = arrExcelCellInfo.get(iColIndex).getHeaderDesc()[0];
         
			// 4. 컬럼 생성
			sw.createCell(iColIndex, oValue, cellStyle.getIndex());
       }
       sw.endRow();
       
   }
   
   private static void generateFoot(Writer out, Map<String, XSSFCellStyle> styles) throws Exception {
       SpreadsheetWriter sw = new SpreadsheetWriter(out);
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
       zip.close();
   }

   private static void copyStream(InputStream in, OutputStream out) throws IOException {
       byte[] bfSize = new byte[1024];
       int count;
       while ((count = in.read(bfSize)) >=0 ) {
         out.write(bfSize,0,count);
       }
   }

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
			// 컬럼의 너비 정의
			this._out.write("<cols>");
			for (int c = 0; c < prmExcelInfoVO.getArrExcelCellInfo().size(); c++) {
				double columnWidthPx = 0;
				columnWidthPx = (prmExcelInfoVO.getArrExcelCellInfo().get(c).getColumnWidth() == 0) ? 72d
						: (double) prmExcelInfoVO.getArrExcelCellInfo().get(c).getColumnWidth();

				// - 엑셀의 XML 너비 = ?? px * 0.125
				this._out.write("<col min=\"" + (c + 1) + "\" max=\"" + (c + 1) + "\" width=\""
						+ (columnWidthPx * 0.125) + "\" customWidth=\"true\"/>");
			}
			this._out.write("</cols>");
				
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

       public void createCell(int columnIndex, Object value, int styleIndex) throws IOException {
           String ref = new CellReference(_rownum, columnIndex).formatAsString();

           if(value instanceof BigDecimal) {
               _out.write("<c r=\"" + ref + "\" t=\"n\"");
               if(styleIndex != -1) _out.write(" s=\"" + styleIndex + "\"");
               _out.write(">");
               _out.write("<v><![CDATA[" + (value == null ? "" : value) + "]]></v>");
           } else {
               _out.write("<c r=\"" + ref + "\" t=\"inlineStr\"");
               if(styleIndex != -1) _out.write(" s=\"" + styleIndex + "\"");
               _out.write(">");
               _out.write("<is><t><![CDATA[" + (value == null ? "" : value) + "]]></t></is>");
           }
           
           _out.write("</c>");
       }

       public void createCell(int columnIndex, Object value) throws IOException {
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

로우 핸들러 코드 

``` java

public class ExcelResultHandler implements RowHandler {
	private Logger log = LoggerFactory.getLogger(ExcelResultHandler.class);

	private int rowNum;
	private Writer out;
	private Map<String, XSSFCellStyle> styleMap;
	private ExcelInfoVO excelInfoVO;
	

	public int getRowNum() {
		return rowNum;
	}

	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}

	public Writer getOut() {
		return out;
	}

	public void setOut(Writer out) {
		this.out = out;
	}


	public Map<String, XSSFCellStyle> getStyleMap() {
		return styleMap;
	}

	public void setStyleMap(Map<String, XSSFCellStyle> styleMap) {
		this.styleMap = styleMap;
	}

	public ExcelInfoVO getExcelInfoVO() {
		return excelInfoVO;
	}

	public void setExcelInfoVO(ExcelInfoVO excelInfoVO) {
		this.excelInfoVO = excelInfoVO;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public void handleRow(Object obj) {
		Map objMap = (Map)obj;
		List<ExcelCellInfoVO> arrExcelCellInfo = excelInfoVO.getArrExcelCellInfo();

		rowNum++;

		SpreadsheetWriter sw = new SpreadsheetWriter(out);
		try {
			
			sw.insertRow(rowNum);
			for (int iColIndex = 0; iColIndex < arrExcelCellInfo.size(); iColIndex++) {

				// 1. 컬럼 설정 정보 가져오기
				String sColumnId = arrExcelCellInfo.get(iColIndex).getColumnId();

				XSSFCellStyle cellStyle = this.styleMap.get(sColumnId);

				// 3. 생성할 컬럼 값 가져오기
				Object oValue = (objMap == null)? "" : objMap.get(sColumnId);

				// 4. 컬럼 생성
				sw.createCell(iColIndex, oValue, cellStyle.getIndex());

			}
			sw.endRow();
		} catch (Exception e) {
			log.error(String.valueOf(rowNum)+"번째 본문 생성중 에러발생",e);
		}

	}

}

```

## 출처
- <a href="https://stackoverflow.com/questions/4740179/whats-the-difference-between-c-t-str-and-cis-in-office-open-xml?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa" target="_blank">스택오버플로 -How to add Cell Comments to Excel sheet using POI?</a>

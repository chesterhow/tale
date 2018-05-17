---
layout: post
title:  "스프링으로 엑셀 다운로드 구현#1"
author: "jaycee"
category: "spring"
tags: spring, poi, excel
description: "poi라이브러리를 이용하여 엑셀다운로드를 구현해본다."
---

## 이것을 하는 이유
- 엑셀형태로 내려주기 위해서
- xlsx형태로 내려주기 위해서


## 구현방법

### 1. 라이브러리 추가하기
메이븐에 라이브러리 추가
> 오늘 기준 3.17이 최신 버젼임.

### 2. 소스를 구현한다.
1. 데이터 구현
2. 자료 구현
3. 컨트롤러 구현

[githublink]: https://github.com "go Github"


강조
*single asterisks*
_single underscores_
**double asterisks**
__double underscores__
++underline++
~~cancelline~~

![Alt text](/path/to/img.jpg "Optional title")

``` java

@SuppressWarnings({ "rawtypes", "unchecked" })
public Map createXlsxExcel(List<Map> srcList, String fileName, String[][] prmArrHdInfo) throws Exception {
	Map retMap = new HashMap();

	System.out.println("=============================================");
	System.out.println("map===>" + fileName);
	System.out.println("=============================================");

	int listCnt = -1;


	/* 파일을 만든다 & 파일 작성 객체를 받아온다. */
	FileOutputStream os = new FileOutputStream(filePath + seperator + fileName);
	
	/*헤더와 본문을 작성한다*/
	try {
		/**
			* csv 파일을 쓰기위한 설정 설명 egovPropertyService.getString("excelDownloadPath") : csv
			* 파일저장할 위치+파일명 EUC-KR : 한글깨짐설정을 방지하기위한 인코딩설정(UTF-8로 지정해줄경우 한글깨짐) ',' : 배열을 나눌
			* 문자열 '"' : 값을 감싸주기위한 문자
			**/
		Workbook workbook = new XSSFWorkbook();		
		
		Sheet sheet = workbook.createSheet("test sheet");
		Row row = null;
		Cell cell = null;
		int rowCount = 0;
		int cellCount = 0;
		
		
		//헤더쓰기
		int prmArrSize = prmArrHdInfo.length;

		// 첫번째 로우 폰트 설정
		Font headFont = workbook.createFont();
		headFont.setFontHeightInPoints((short) 11);
		headFont.setBoldweight(Font.BOLDWEIGHT_BOLD);

		// Cell style(border & backgroundColor & align)
		CellStyle headStyle = workbook.createCellStyle();
		headStyle.setFillForegroundColor(IndexedColors.SKY_BLUE.getIndex());
		headStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
		headStyle.setAlignment(CellStyle.ALIGN_CENTER);
		headStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
		headStyle.setFont(headFont);
		headStyle.setBorderBottom(CellStyle.BORDER_THIN);

		row = sheet.createRow(rowCount++);
		for (int i = 0; i < prmArrSize; i++) {
			cell = row.createCell(cellCount++);
			
			cell.setCellStyle(headStyle);
			cell.setCellValue(prmArrHdInfo[i][0]);
		}
		
		//본문쓰기
		listCnt = srcList.size();

		for (int i = 0; i < listCnt; i++) {
			row = sheet.createRow(rowCount++);
			cellCount = 0;
			
			for (int j = 0; j < prmArrSize; j++) {
				row.createCell(cellCount++).setCellValue(nullToBlank(srcList.get(i).get(prmArrHdInfo[j][1])));
			}
		}
		
		workbook.write(os);

	} catch (Exception e) {
		e.printStackTrace();
	} finally {
		/* 자원을 해제한다. */
		// 무조건 stream 객체 close
		os.close();
		retMap.put("listCnt", listCnt);
	}

	return retMap;
}

public String nullToBlank(Object object) {
	return object == null ? "" : String.valueOf(object);
}


```

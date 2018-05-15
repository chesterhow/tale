---
layout: post
title: 부족합한 열 인덱스
author: jaycee
category: "spring"
tags: spring, error, ibatis, mybatis
discription: "부족합한 열 인덱스 오류가 발생한 경우"
---

## 원인
아래 쿼리에서 부적합한 열 인덱스 오류가 발생.

이 에러는 거의 주석안에 변수를 넣거나, 홑따옴표안에 변수를 넣는 경우 발생함.

150분 디버깅 결과 select절 ''" 부분에서 쌍따옴표(") 있는 것을 발견... ㅡㅡ;


## 처리
위 쿼리에서 쌍따옴표 제거하여 처리 완료..... 어이없는 실수였음..


## 쿼리
```
 UNION ALL 
	SELECT B.COMPCD, 
	       B.ACCUNT, 
	       B.SBACCUNT, 
	       B.PCSLYMD, 
	       C.GCODE, 
	       F_GET_UP_GMDNM_NEW (B.COMPCD, #w_serchym#, A.PARTCD, C.DCODE, '3', '2'), 
	       C.MCODE, 
	       F_GET_UP_GMDNM_NEW (B.COMPCD, #w_serchym#, A.PARTCD, C.DCODE, '2', '2'), 
	       C.DCODE, 
	       F_GMDNM_NEW(B.COMPCD, #w_serchym#, A.PARTCD, '1', C.DCODE), 
	       B.SKUCD, 
	       C.SKUNM, 
	       '69'                    IODIVCD, 
	       '대출' IODIVNM, 
	       B.EXSYSLNO              CASLNO, 
	       B.CSPC, 
	       '', 
	       '', 
	       '', 
	       '', 
	       '', 
	       '', 
	       '', 
	       '', 
	       ''" 
	FROM   tblA A, 
	       tblB B, 
	       tblC C 
	WHERE  A.COMPCD = '10' 
	AND    A.ACCUNT = 'C04' 
	AND    A.COMPCD = B.COMPCD 
	AND    A.ACCUNT = B.ACCUNT 
	AND    A.SBACCUNT = B.SBACCUNT 
	AND    B.PCSLYMD BETWEEN #w_serchym# || '01' AND #w_serchymd# 
	AND    A.COMPCD = C.COMPCD 
	AND    A.PARTCD = C.PARTCD 
	AND    B.SKUCD = C.SKUCD 
	AND    #w_serchymd# BETWEEN C.TRDSTDAT AND    C.TRDEND  
```

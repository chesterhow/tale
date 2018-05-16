---

title: 스프링 vo 변수값 가져오기
author: jaycee
discription: 리플렉션을 이용해 스프링 vo 변수값 가져오기
tag: reflection.spring

---


``` java
/**
 * vo에서 특정 변수의 값을 반환
 * @param vo
 * @param property
 * @return
 * @throws Exception
 */
public static Object getValue(Object vo, String property) throws Exception {
  Object oValue = null;
  if(property == null || "".equals(property)) return null;
  BeanInfo info = Introspector.getBeanInfo(vo.getClass());
    for (PropertyDescriptor pd : info.getPropertyDescriptors()) {
        Method reader = pd.getReadMethod();
        if(reader != null && property.equals(pd.getName())) {
          oValue = reader.invoke(vo);
          break;
        }
    }
  return oValue;
}

/**
 * vo에 특정 변수의 값을 설정한다.
 * @param vo
 * @param property
 * @param value
 * @throws Exception
 */
public static void setValue(Object vo, String property, Object value) throws Exception {
  BeanInfo info = Introspector.getBeanInfo(vo.getClass());
    for (PropertyDescriptor pd : info.getPropertyDescriptors()) {
      if(pd.getWriteMethod() == null) continue;
      if(property.equals(pd.getName())) {
          Method writter = pd.getWriteMethod();
          Class<?> paramType = writter.getParameterTypes()[0];
          try {
            writter.invoke(vo, new Object[]{value});
          } catch(Exception ex) {
            Exception e = new Exception("Invalid " + paramType.getName() + " value: " + value);
          e.initCause(ex);
          throw e;
          }
          return;
      }
    }
  throw new Exception("No such property: " + property + ", exists.");
}

```

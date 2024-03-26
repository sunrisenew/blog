---
title: JPA注解@Convert
tags:
  - Java
  - JPA
  - SpringBoot
---

日常开发中我们经常会遇到这样一种情况：有两个实体`图书Book`和`文件File`是多对多的关系，但是一般我们只关心与图书关联了多少文件而不关心文件关联了多少图书。所以通常我们在`Book`中用一个属性`file_ids`以`逗号分割`的方式存储多个`File`的id。

但是`File`的id是一个`Long`类型的`自增主键`，我们将`Book`对象查询出来后还要再对`file_ids`属性进行分割处理，处理完保存时又要进行逗号拼接，非常麻烦。有没有一个办法可以将这个繁琐的操作简化呢？`JPA`有一个注解`@javax.persistence.Convert`可以帮我们做这件事。
<!-- more -->
## 使用`@Convert`注解自动转换实体中的属性

先上代码：

``` java
import cn.sunrisenew.bms.converter.CommaDelimitedValueConverter;

@Data
@Entity
@Table(name = "book")
public class Book implements Serializable {

    @Column(name = "file_ids")
    @Convert(converter = CommaDelimitedValueConverter.class)
    private Long[] fileIds;

}
```

在我们定义的`Book`实体类中，属性`fileIds`上加了一个注解`@Convert(converter = CommaDelimitedValueConverter.class)`，其中参数`converter`传入的类，便是`JPA`帮我们做属性值转换时使用的转换器类。这个转换器类不是随便传一个类都可以，而是需要符合一定的规范。`符合规范`这个概念在Java的世界中，一般是实现接口或者继承抽象类。

## 创建自定义转换器来转换逗号分割值

要想创建我们的自定义转换器，先要实现接口`javax.persistence.AttributeConverter`。

``` java
public interface AttributeConverter<X,Y> {

    public Y convertToDatabaseColumn(X attribute);

    public X convertToEntityAttribute(Y dbData);

}
```

根据该接口的定义我们可以知道：

- 该接口是一个泛型接口，有`<X, Y>`两个泛型。
- 接口中有两个方法，顾名思义：
  - 方法`convertToDatabaseColumn`是在实体对象保存到数据库时，将`X`类型的`属性值`转换为`Y`类型的`数据库列值`。
  - 方法`convertToEntityAttribute`是在读取数据库创建实体对象时，将`Y`类型的`数据库列值`转换为`X`类型的`属性值`。

搞清楚接口的定义之后，我们就可以来实现一个自定义转换器了。下面的代码创建了一个逗号分割值转换器，实现了接口的泛型`<Long[], String>`。借助于`Spring`为我们提供的`StringUtils`，我们用简洁且`空安全`的代码来处理`Long`数组和逗号分割字符串之间的转换。

``` java
package cn.sunrisenew.converter;

import org.springframework.util.StringUtils;

import javax.persistence.AttributeConverter;
import java.util.Arrays;

public class CommaDelimitedValueConverter implements AttributeConverter<Long[], String> {

    @Override
    public String convertToDatabaseColumn(Long[] longs) {
        return StringUtils.arrayToCommaDelimitedString(longs);
    }

    @Override
    public Long[] convertToEntityAttribute(String s) {
        return Arrays.stream(StringUtils.commaDelimitedListToStringArray(s)).map(Long::valueOf).toArray(Long[]::new);
    }

}
```

有了这个转换器，以后处理数据库中的逗号分隔值就更方便啦。

> 从根本上防止属性名的冲突
>
> Symbol类型:表示一直独一无二的值
>
> Symbol值通过Symbol函数生成,函数不能使用new
>
> 如果参数是一个对象,首先将该参数转为字符串,然后生成一个Symbol值
>
> 函数的参数只是对当前Symbol值的描述,相同参数的Symbol函数的返回值是不相等的,
>
> Symbol值不能与其他类型的值进行运算
>
> 可以转为字符串
>
> 也可转为布尔值,不能转为Number值

属性:description属性返回当前描述

1. Symbol作为属性名

不能使用点运算符:

2. 可以放在方括号之中

3. 属性名的遍历

`Object.getOwnPropertySymbols()`

4. Symbol.for()搜索有没有以该参数作为名称的Symbol值,有就返回,没有就创建,并注册到全局

5. 内置的Symbol值

   
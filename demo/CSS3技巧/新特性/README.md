1. transition(过渡)

   - 语法：css属性 过渡时长 效果曲线(默认为ease) 延迟时间

2. animation（动画）

   - 动画名称 周期时间 效果曲线（默认ease） 延迟时间 播放次数 是否反向  是否暂停
   - @keyframe定义动画名称

3. 形状转换

   transform：适用于2D和3D

   transform-origin：转换过元素的位置

4. 提供的选择器

   p~div:选择前面元素的有p元素的所有div的元素

   [attribute^=value]: ^ 以value开头，×包含，&结尾

   p:first-of-type 指定父元素的首个p元素

   p:last-of-type 指定父元素的最后一个p元素

   p:only-of-type 指定父元素子元素中p元素只有一个的p元素的的样式

   :nth-of-type（n）   类似的有last-child  nth-child(n)  nth-last-child(n) only-child first-child  

   :root 选择文档的根节点

   

   p:empty  选择没有子元素的每个p

   #news:target 选择当前活动的#news

   :enabled

   :disabled

   :checked

   :not(selector)

   ::selection 选择用户选取的部分

   

   not(选择器)

   ...

5. 阴影

   - 语法  box-shadow： 水平位置 垂直阴影 模糊距离 阴影大小 颜色  方向（outset inset）

6. 边框图片  边框圆角

7. 背景

   - clip :背景的作用盒子
   - origin：指定 background-position的相对位置  属性值也是盒子
   -  size：可以是contain  auto  cover  以及数值

8. 反射

   -webkit-box-refect:方向 偏移量 遮罩图片

   - 方向可以是：above ，below，right，left

   - 遮罩可以是渐变或者图片

9. 文字

   - 换行：

     - word-break 属性值 normal |break-all|keep-all   
     - word-wrap 属性值为break-work或者normal

   - 超出省略号：

     - 禁止换行:white-spape:nowrap
     - 超出隐藏:overflow:hidden
     - 超出省略号：text-overflow:ellipsis

   - 超出多行省略号

     - display: -webkit-box;
       -webkit-line-clamp: 2;
       -webkit-box-orient: vertical

     ​      text-overflow: ellipsis;

   - 文字阴影

     text-shadow:水平 垂直 模糊距离 阴影颜色

10. 颜色

    - rgab
    - hsla（）

11. 渐变

    > 线性渐变，径向渐变，圆锥渐变

12. 滤镜

13. 弹性布局

14. 栅格布局

15. 多列布局

16. 盒模型

17. 媒体查询

18. 混合模式
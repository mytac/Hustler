## 问题汇总
1. 解决`stockList`必须填写沪深代码的问题
2. `polling`单独提一个模块 √
3. 添加cli
4. [性能]`polling`中会重复找dom，应进行优化
## 需求汇总
1. `polling`中添加时间判断条件，每次获取本地时间不影响性能
2. `polling`定时器 -> 午盘结束后，13：00 自动触发`polling`
3. 添加命令行交互，用来设置并存储代码列表
4. 存储昨日成交额 √
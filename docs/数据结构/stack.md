## 栈
栈是一种一端进出的数据结构

## 常用操作

+ push: 将一个元素插入到栈顶

+ pop: 将栈顶元素弹出

+ empty: 判断当前栈是否为空

## python代码实现
```python
class Stack:

    def __init__(self):
        self.items: List = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        return self.items.pop()
    
    def is_empty(self) -> bool:
        return len(self.items) == 0
```
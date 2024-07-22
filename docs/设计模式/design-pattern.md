## 组合模式（对象聚合）

优势：很容易添加组件

劣势：很难去限制组合的对象，使之在指定范围内的几种组件

```python
class Display:
    r"""
    Interface
    """

    def display(self, level=0):
        raise NotImplementedError


class Folder(Display):
    r"""
    Compound
    """

    def __init__(self, name):
        self.name = name
        self.children = []

    def add_child(self, child):
        self.children.append(child)

    def display(self, level=0):
        print("  " * level + "-" * 4 + self.name)
        for child in self.children:
            child.display(level + 1)


class File(Display):
    r"""
    Leaf
    """

    def __init__(self, name, content):
        self.name = name
        self.content = content

    def display(self, level=0):
        print("  " * level + "File: " + self.name)
        print("  " * (level + 1) + "Content: " + self.content)


if __name__ == "__main__":
    root = Folder("Root")
    folder1 = Folder("Folder1")
    folder2 = Folder("Folder2")
    file1 = File("File1", "Some content")
    file2 = File("File2", "Other content")
    root.add_child(folder1)
    root.add_child(folder2)
    folder1.add_child(file1)
    folder2.add_child(file2)
    root.display()

```

## 策略模式（数据客户端不知晓、算法数据分离）

## 装饰器（添加功能）

退化的组合模式

动态添加移除、可嵌套

## 命令模式

支持撤销、支持上下文情景命令、命令宏、日志记录、事务概念

## 桥接模式

```python
class Color:
    def __init__(self, color_type: str) -> None:
        self.color_type = color_type


class Red(Color):
    def __init__(self) -> None:
        super().__init__("red")


class Blue(Color):
    def __init__(self) -> None:
        super().__init__("blue")


class Shape:
    def __init__(self, color: Color) -> None:
        self.color = color

    def draw(self):
        raise NotImplementedError


class Circle(Shape):
    def __init__(self, color: Color) -> None:
        super().__init__(color)

    def draw(self):
        print(f"Draw a {self.color.color_type} Circle")


class Square(Shape):
    def __init__(self, color: Color) -> None:
        super().__init__(color)

    def draw(self):
        print(f"Draw a {self.color.color_type} Square")


if __name__ == "__main__":
    red = Red()
    blue = Blue()
    circle = Circle(red)
    square = Square(blue)
    circle.draw()
    square.draw()

```

## 适配器

```python
class O:
    def say_hello(self):
        print("Hello from O")


def say(o: O):
    o.say_hello()


class B:
    def say_hi(self):
        print("Hello from B")


class BAdapter(O):
    def __init__(self, b: B) -> None:
        super().__init__()
        self.b = b

    def say_hello(self):
        self.b.say_hi()


if __name__ == "__main__":
    b = B()
    try:
        say(b)
    except Exception as e:
        print(e)
    b_adapter = BAdapter(b)
    say(b_adapter)
```

## 单例模式

```python
class Singleton:
    instance = None

    def __init__(self) -> None:
        print("Create Singleton!")

    @staticmethod
    def get_instance():
        if Singleton.instance is None:
            Singleton.instance = Singleton()
        return Singleton.instance


if __name__ == "__main__":
    s1 = Singleton.get_instance()
    s2 = Singleton.get_instance()
```

## 工厂模式

```python
class AbstractProduct:
    def __init__(self, name: str) -> None:
        self.name = name

    def info(self):
        return f"<Product: {self.name}>"


class AbstactFactory:
    def __init__(self) -> None:
        pass

    def produce(self) -> AbstractProduct:
        raise NotImplementedError


class ConcreteProduct(AbstractProduct):
    def __init__(self) -> None:
        super().__init__("C1")


class ConcreteFactory(AbstactFactory):
    def __init__(self) -> None:
        super().__init__()

    def produce(self) -> AbstractProduct:
        return ConcreteProduct()


if __name__ == "__main__":
    factory = ConcreteFactory()
    product = factory.produce()

    print(product.info())

```

## 建造者

隐藏了内部结构和细节

```python
class Product:
    def __init__(self) -> None:
        self.name = None
        self.level = None

    def info(self):
        return f"<name: {self.name}, level: {self.level}>"


class ProductBuilder:
    def __init__(self) -> None:
        self.product = Product()

    def set_name(self, name):
        self.product.name = name
        return self

    def set_level(self, level):
        self.product.level = level
        return self

    def build(self):
        return self.product


if __name__ == "__main__":
    builder = ProductBuilder()
    product = builder.set_name("orange").set_level(5).build()

    print(product.info())
```

## 访问者

```python
class Visitor:
    def visit_circle(self, circle):
        return "visit circle"

    def visit_square(self, square):
        return "visit square"


class Circle:
    def accept(self, visitor: Visitor):
        return visitor.visit_circle(self)


class Square:
    def accept(self, visitor: Visitor):
        return visitor.visit_square(self)


if __name__ == "__main__":
    v = Visitor()
    shapes = [Circle(), Square()]
    for shape in shapes:
        print(shape.accept(v))
```

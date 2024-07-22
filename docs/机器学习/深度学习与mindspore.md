# 深度学习与 mindspore

利用一些算法对数据的高层次抽象概念进行建模

**优势**：是可以自动提取特征

## 神经网络发展史

-   多层解决异或问题
-   梯度消失问题->BP 反向传播
-   2010 崛起，更多的标注数据、更强的算力、应用环境的改善

## 深度学习的两大领域

### 计算机视觉

### 模型

#### CNN

Convolutional Neural Network
简单结构、少量参数、更强的适应性

不需要对数据预处理、直接用图像即可

组成

-   卷积层（Convolution Layers）-> 减少参数数量
    卷积核，与图像的每一块按位置对应相乘，将结果加和，形成新的图像
-   池化层（Pooling Layers）-> 减少参数数量
    max-pooling
    mean-pooling
-   全连接层（Fully connected Layers）-> 融合前面提取到的特征

#### CNN 演变

-   LeNet（LeCun）->手写数字识别 ， 最具代表性的 CNN 之一
    3 卷积 2 池化 1 全连接 1 输出
-   AlexNet
    5 卷积 3 全连接
    激活函数：ReLU
    预防过拟合：Dropout、Data Augmentation
-   VGG-Net
    5 池化 3 全连接
-   GoogLeNet
    取消了全连接层
-   ResNet
    减少连接
-   GANs
    Generate Adversarial
    灵感来源于零和博弈
    一个生成网络和一个鉴别网络
    同时训练，直至生成的伪造的与真实的几乎难以区别

### 自然语言处理

-   基础任务：文本向量化、语言模型
-   应用：文本分类、机器翻译、情感分析

### 模型

#### RNN

Recurrent Neural Network，循环神经网络
处理序列数据、可以记忆之前的信息并利用其计算当前的输出

应用于机器翻译、生成图像描述、语音辨识

BPTT 训练

#### LSTM

Long Short-Term Memory

#### Transformer

#### BERT

### 训练技巧

#### Data Augmentation

数据扩充
旋转、切割等待

#### Dropout

根据输出层每个输出的概率将对应置零，其在之后的前向传播和不会参与前向和后向传播

#### ReLU(Non-Saturating nonlinearly)

$f(x)=max(0, x)$

#### Saturating nonlinearly

-   Sigmoid
-   Hyperbolic tangent
    $f(x)=tanh(x)=\frac{e^{x}-e^{-x}}{e^{x}+e^{-x}}$

#### BatchNormalization

对这一层数据进行标准化

### GCN\GNN

图卷积神经网络

#### 深度神经网络本质

-   特征构建（节点间关联变成节点特征）
-   分类

### AdaGrad

学习率随更新次数增加而下降

通过累加历史梯度的平方，得到 r（历史梯度平方的和），利用 r 位于分母控制梯度更新的幅度

### RMSProp

首先为各权重变化赋一个初始值，设定权重变化**加速因子**与**减速因子**，在网络前馈迭代中当**连续误差梯度符号不变时**，采用加速策略，加快训练速度；当**连续误差梯度符号变化时**，采用减速策略，以期稳定收敛。网络结合当前误差梯度符号与变化步长实现 BP，同时，为了**避免网络学习发生振荡或下溢**，算法要求**设定权重变化的上下限**

### ADAM（自适应矩估计）

替代传统梯度下降的一阶优化算法，使用一阶矩（均值）和二阶矩（方差）估计。计算更合适的步长

适用于非稳目标，可解决高噪和稀疏梯度问题

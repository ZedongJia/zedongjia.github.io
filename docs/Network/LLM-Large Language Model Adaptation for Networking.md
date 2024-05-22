# LLM-Large Language Model Adaptation for Networking

## Motivation

利用 LLM 的预训练知识+强大的推理能力去解决网络方面的问题

## Problem（C1）

#### 监督学习 & 强化学习

1. 建模代价高（针对不同的任务手工搭建模型）

2. 生成效果差（训练只针对于特定分布的数据），甚至不如基于规则的方法

#### 将 LLM 用于 Network 的挑战

1. 输入不同（token != image、DAG、time series etc）

2. 生成结果准确性差（hallucination）、生成时间长（require < 1s etc）

3. 适应的代价高（微调大模型在监督学习、强化学习【与环境交互时间长】）

## Design（C2）

1. 多种模态的特征提取（Multimodal encoder）
    - Target： 提取原始数据表征形成 LLM 的输入
    - Challenge： prompt learning：template prompt。转换多模态数据不可行。得到的结果是次优（去掉了视频信息因为无法被直接转成 prompt）
    - Design：Feature Encoder（ViT、CNN、GNN）+ Linear projection（map to d_model）
2. 应对网络方面任务的输出端（Networking head）替换 LLM 的输出端
    - Target：确保结果针对于特定任务的准确性、以及减少生成时间
    - Challenge：预测的不确定性导致生成的内容物理上没有意义。LLM 生成需要多次推理，耗时长。网路方面任务需要高可靠性+快速响应
    - Design：Linear layer to predict answers
3. 数据驱动的 RL 训练 + 利用低秩矩阵完成 LLM 的适应性训练（矩阵分解）
    - Target1：利用预先构造的 experience pool 去减少 LLM 与环境交互的时间消耗
    - Target2：利用低秩矩阵减少训练参数（fine-tune）
    - Challenge：大量的时间浪费在与环境的交互上、微调所有的参数成本太高、会破坏预训练模型的知识
    - Design：利用存在的策略构建经验集，然后 s -predict-> a。低秩矩阵更新代替原参数矩阵

三个维度：兼容、可靠、高效

## Task Selection and evaluation（C3）

1. viewport prediction（VP）
2. adaptive bitrate streaming（ABR）
3. cluster job scheduling（CJS）

任务有代表性

-   涵盖了大部分的输入类型（image、time series、DAG）
-   任务类型（prediction、decision making）+ 集中控制和分布式控制的网络任务
-   模型方法（监督、强化学习）
-   VP 需要多种模态+模态融合，任务难度更高

相同环境下的测试结果和不同环境下的对于未知的泛化能力、真实世界种的测试效果都很好

## Insights

预训练知识和领域知识很重要

LLama2 比较适合网络方面，相比于其他模型

LLM 大小 1B 以上适合

模型压缩技术，减少训练部署消耗 OPT-1.3B

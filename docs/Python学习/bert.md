# Bidirectional Encoder Representation from Transformers

-   语言模型预训练，在预训练阶段采用了类似 ELMO 的双向语言模型，即双向的 Transformer，

    -   Embedding
        -   Token Embeddings 是词向量，第一个单词是 CLS 标志，可以用于之后的分类任务
        -   Segment Embeddings 用来区别两种句子，因为预训练不光做 LM 还要做以两个句子为输入的分类任务
        -   Position Embeddings 和之前文章中的 Transformer 不一样，不是三角函数而是学习出来的
    -   Masked LM
        随机 mask 每一个句子中 15%的词，用其上下文来做预测，例如：my dog is hairy → my dog is [MASK]
    -   Next Sentence Prediction

        选择一些句子对 A 与 B，其中 50%的数据 B 是 A 的下一条句子，剩余 50%的数据 B 是语料库中随机选择的，学习其中的相关性，添加这样的预训练的目的是目前很多 NLP 的任务比如 QA 和 NLI 都需要理解两个句子之间的关系，从而能让预训练的模型更好的适应这样的任务。

-   使用 Fine-Tuning 模式解决下游任务。

import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/*
        <h3>
          Private Aggregation of Teacher Ensembles
        </h3>
        <p>
          Private Aggregation of Teacher Ensembles or PATE is an alternative method to DPSGD for conducting differentially private learning. The key idea is to, rather than train a single strong model which captures a complex criterion in a differentially private manner, train a set of weaker, non-private models on partitions of the data and then perform a noisy aggregation of their predictions. Overall the method has been shown to be quite effective at the expense of some assumptions about the training procedure. There has even been an application of this technique to GANs via PATE-GAN.
        </p>

        <h3>
          Differentially Private Federated Learning
        </h3>

        <h3>
          Proper Development
        </h3>
        <p>
          There are a number of common gotchas involved with the proper development and deployment of differentially private deep learning models.
        </p>
        <p>
          The biggest is hyperparameter search and model selection. You might think intuitively that, as long as you implement and execute something like DP-SGD, you can sleep soundly at night knowing your model is privacy preserving. Although, typically many models are trained in the process of during the hyperparameter . Although in theory, the hyperparameters you{"\'"}re selecting are technically data-inspired, and hence indirectly leak information. Frankly this detail is swept under the rug in research contexts. But in industry, this absolutely needs to be taken into consideration, or at the very least consciously acknowledged as a risk.
        </p>
        <p>
          The second is proper evaluation. It does not suffice to simply train a single model and report its accuracy. Recall that
        </p>
*/


function Post() {
    return (
      <>
        <h2>
          A Guide to Differentially Private Deep Learning
        </h2>
        <p>
          In this post we tackle the topic of privacy-preserving deep learning. This commentary will be less so concerned with precision and proof, and moreso geared towards convincing a deep learning practitioner what privacy should mean, why its important, and how it can be achieved.
        </p>

        <h3>
          Differential Privacy
        </h3>
        <p>
          Before talking about anything else, we need to define what privacy is. There{"\'"}s a near infinite continuum of what privacy <em>could</em> mean, and naturally some definitions are less vacuous than others.
        </p>
        <p>
          One such definition is <em>differential privacy</em>. Differential privacy is concerned with <em>algorithms</em>, namely functions responsible for mapping a given dataset to some output space, e.g., linear regression mapping a dataset to its coefficients <InlineMath math="w" /> and <InlineMath math="b" />.
        </p>
        <p>
          On a high level, such an algorithm would "preserve privacy" under the notion of differential privacy if it were to behave (approximately) the same regardless of whether you removed any individual point from the dataset. If you could achieve this property, then you <em>should</em> be convinced that this algorithm is privacy-preserving.
        </p>
        <p>
          Why? Well, let{"\'"}s consider how you would feel if one of these points actually corresponded to you. By the definition put forth, you wouldn{"\'"}t have grounds to care whether your data is given to the algorithm - the outcome will be the same regardless. In other words, <em>you should feel like this algorithm preserves your privacy because its outputs look the same whether or not your data is given to it</em>. This is the core idea.
        </p>
        <p>
          Formally, we can express this notion via the following<sup><a href="https://stephentu.github.io/writeups/6885-lec20-b.pdf">1</a></sup>:
        </p>
        <p><em>
          Let <InlineMath math="A : \mathcal{D} \rightarrow \mathcal{Y}" /> be a randomized algorithm. We call <InlineMath math="A" /> "<InlineMath math="\varepsilon" />-differentially private" if for all <InlineMath math="D_1, D_2 \in \mathcal{D}" /> differing in exactly one entry, and for all outputs <InlineMath math="y \in \mathcal{Y}" />, we have that:
        <BlockMath math="e^{-\varepsilon} \leq \frac{\Pr[\mathcal{A(D_1) = y}]}{\Pr[\mathcal{A(D_2) = y}]} \leq e^\varepsilon" />
        </em></p>
        <p>
          Upon inspection, you{"\'"}ll notice that this is saying exactly what we established earlier. Namely, the probability of a particular outcome occuring is about the same whether or not you include any particular individual in the dataset.
        </p>

        <h3>
          Deep Learning
        </h3>
        <p>
          It goes without saying that deep learning has become an extremely popular form of statistical analysis. And conveniently, the algorithms of concern in the context of deep learning align perfect with the interface prescribed by differential privacy, namely in mapping provided datasets to some output space, in this context the model parameters.
        </p>
        <p>
          One of the most pervasive approaches to this is the process of stochastic gradient descent. When conducting stochastic gradient descent, we iteratively update the parameters of a model by repeatedly sampling data and taking small steps over the parameters in the direction which minimizes our loss function. In other words, we repeatedly follow something resembling the following steps:
        </p>
        <BlockMath math="\{ x^{(1)}, x^{(1)}, \ldots x^{(b)} \} \sim sample(X, b)" />
        <BlockMath math="\ell(\theta) = \frac{1}{b} \sum_i \ell(x^{(i)} ; \theta)" />
        <BlockMath math="\theta \leftarrow \theta - \eta \nabla_\theta \ell(\theta)" />
        <p>
          It then begs the question as to how one would have to augment this procedure to achieve differential privacy, if at all possible.
        </p>

        <h3>
          Differentially Private Stochastic Gradient Descent
        </h3>
        <p>
          <a href="https://arxiv.org/abs/1607.00133">Abadi et al.</a> detail the differentially private stochastic gradient descent (DP-SGD) algorithm to make traditional SGD yield a differential privacy guarantee. To describe it, we need to introduce a number of augmentations.
        </p>
        <p>
          First, we have to augment our typical method for sampling. In the context of non-private deep learning, sampling is often achieved by shuffling the dataset and running through partitions of size <InlineMath math="b" /> such that each example is viewed by the model exactly once per epoch. Although in the context of DP-SGD, we must opt for either Poisson<sup>2</sup> or uniform<sup>3</sup> subsampling if we want to retain an actual differential privacy guarantee.
        </p>
        <p>
          Second, we need to augment the gradient calculatoin. In particular, we need to introduce a clipping parameter <InlineMath math="C" />, an upper bound on the <InlineMath math="\ell_2" />-norm of each per-example gradient, as well as the noise multiplier <InlineMath math="\sigma" />, which scales the variance of the Gaussian noise applied to each gradient update after clipping. All of this together, we execute the following augmented training loop:
        </p>
        <BlockMath math="\{ x^{(1)}, x^{(1)}, \ldots x^{(b)} \} \sim sample(X, b)" />
        <BlockMath math="g^{(i)} \leftarrow \nabla_{\theta} \ell(x^{(i)} ; \theta)" />
        <BlockMath math="\bar{g}^{(i)} \leftarrow g^{(i)} / \max\{ 1, ||g^{(i)}||_2 / C\}" />
        <BlockMath math="\tilde{g} \leftarrow \frac{1}{b} (\sum_i \bar{g}^{(i)} + \sigma \cdot C \cdot \mathcal{N}(0, I))" />
        <BlockMath math="\theta \leftarrow \theta - \eta \tilde{g}" />
        <p>
          In order to calculate the privacy loss corresponding to <InlineMath math="t" /> executions of the above update rule, Abadi et al. also details the <em>moments accountant</em>, a specialized analysis capable of reporting the privacy loss over time. A full deep dive into tools used in the moments accountant is beyond the scope of this post, but it can be understood as simply a black box which takes in your training loop parameters (<InlineMath math="C" />, <InlineMath math="\sigma" />, <InlineMath math="t" />, etc.) and gives you <InlineMath math="\varepsilon" />. If interested in learning more, there exists a corresponding implementation within Tensorflow Privacy.
        </p>

        <h3>
          Conlusion
        </h3>
        <p>
          Hopefully this was a useful tutorial outlining differential privacy and its applications to deep learning in plain English. If you have any questions or have caught any errors, feel free to reach out!
        </p>
      </>
    );
}

export default Post;

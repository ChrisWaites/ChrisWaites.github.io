import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';


function Post() {
    return (
      <>
        <h2>
          A Guide to Differentially Private Deep Learning
        </h2>
        <p>
          In this post we review differential privacy, the task of deep learning, what privacy means in this context, and reference current results in this area.
        </p>

        <h3>
          Differential Privacy
        </h3>
        <p>
          Finding a definition which fully satisfies one’s intuitive understanding of privacy is surprisingly tricky. One such definition is <em>differential privacy</em>. On a high level, the idea behind differential privacy is that given a randomized algorithm which performs some statistical task on subsets of a dataset, such an algorithm would “preserve privacy” if it behaved approximately the same regardless of the inclusion or exclusion of any individual in the subset it was acting on. That is, the data of each entry would be thought to be hidden since the behavior of the algorithm closely resembles every possible case where the entry would not have been included.
        </p>
        <p>
          Formally, this is expressed as the following<sup><a href="https://stephentu.github.io/writeups/6885-lec20-b.pdf">1</a></sup>:
        </p>

        <h3>
          Deep Learning
        </h3>
        <p>
Deep learning is currently one of the most predominant forms of statistical analysis used today and has been shown to be remarkably effective for a variety of tasks. Deep neural networks, in their standard form, define a function composed of a sequence of layers where each layer represents an operation to be performed on the output of the previous layer. Typically the goal associated with such models is to find the set of parameters which map a set of inputs to a set of outputs in a way which minimizes some function, referred to as the loss function.
        </p>
        <BlockMath math="\{ x^{(1)}, x^{(1)}, \ldots x^{(b)} \} \sim sample(X, b)" />
        <BlockMath math="\ell(\theta) = \frac{1}{b} \sum_i \ell(x^{(i)} ; \theta)" />
        <BlockMath math="\theta \leftarrow \theta - \eta \nabla_\theta \ell(\theta)" />
        <p>
          A popular method for finding such parameters is via a process of stochastic gradient descent. When conducting stochastic gradient descent, one iteratively updates the parameters of the model by sampling an individual input-output pair from the dataset and partially applying their values to the error function so that the gradient of the error with respect to the parameters of the model can be computed. Then, one would update the parameters of the model in the direction opposite of the gradient, in turn minimizing the error function with respect to that example. Formally, if we let θ0 be the randomly initialized parameters of the model, θt be the parameters of the model at iteration t, (xt, yt) be our sampled input-output pair, L be our error function, and ηt be the learning rate, we iteratively apply the following update rule:
        </p>
        <p>
          Although, it’s more common in practice to opt for minibatch gradient descent. Rather than calculating gradients with respect to individual examples, one uniformly samples a subset of B examples without replacement, calculates the gradient with respect to each example, and applies the average of the gradients to the model. This corresponds to the following update rule:
        </p>

        <h3>
          Differentially Private Stochastic Gradient Descent
        </h3>
        <p>
          <a href="https://arxiv.org/abs/1607.00133">Abadi et al.</a> detail the differentially private stochastic gradient descent (DP-SGD) algorithm to make traditional SGD yield a differential privacy guarantee. To describe it, we need to introduce a number of augmentations.
        </p>
        <p>
          First, we have to augment our typical method for sampling examples from the dataset. In the context of non-private deep learning, sampling is often achieved by shuffling the dataset and running through partitions of size <InlineMath math="b" /> such that each example is viewed by the model exactly once per epoch. In the context of DP-SGD, we have to opt for either Poisson<sup>2</sup> or uniform<sup>3</sup> subsampling if we want a differential privacy guarantee.
        </p>
        <p>
          Second, we need to introduce a number of additional training parameters. In particular, we need to introduce a clipping parameter <InlineMath math="C" />, an upper bound on the <InlineMath math="\ell_2" />-norm of each per-example gradient, as well as the noise multiplier <InlineMath math="\sigma" />, which acts as the ratio between the clipping parameter and variance of the Gaussian noise applied to each gradient update after clipping.
        </p>
        <BlockMath math="\{ x^{(1)}, x^{(1)}, \ldots x^{(b)} \} \sim sample(X, b)" />
        <BlockMath math="g^{(i)} \leftarrow \nabla_{\theta} \ell(x^{(i)} ; \theta)" />
        <BlockMath math="\bar{g}^{(i)} \leftarrow g^{(i)} / \max\{ 1, ||g^{(i)}||_2 / C\}" />
        <BlockMath math="\tilde{g} \leftarrow \frac{1}{b} (\sum_i \bar{g}^{(i)} + \sigma C \mathcal{N}(0, I))" />
        <BlockMath math="\theta \leftarrow \theta - \eta \tilde{g}" />
        <p>
          In order to calculate the privacy loss corresponding to k executions of the above update rule, Abadi et al. detail the moments accountant as a method to report privacy loss over time. A full deep dive into the foundations backing the moments accountant are likely outside the scope of this post, but on a high level it can be thought of as a black box which takes in values which characterize your training loop (sampling probabilities, number of minibatches, delta, etc.) and outputs epsilon. But importantly, their method yields much tighter bounds on the privacy loss achieved than what is reported via the strong composition theorem. If interested in learning more, the algorithm was originally introduced in Abadi et al. and has a corresponding implementation within Tensorflow Privacy.
        </p>

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
      </>
    );
}

export default Post;

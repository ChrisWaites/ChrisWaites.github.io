import React from 'react';

function Post() {
  return (
    <div>
      <h2>
          Differentially Private Deep Learning
      </h2>
      <p>
          In this post, we review the definition of differential privacy, the task of deep learning and how it pertains to privacy, differentially private stochastic gradient descent, and reference current results in the general area.
      </p>

      <h3>
          Differential Privacy
      </h3>
      <p>
          Finding a definition which fully satisfies one’s intuitive understanding of privacy is surprisingly tricky. With little thought, there seems to be a paradox in what we’re trying to achieve. We wish to publish the results of some statistical analysis on some dataset, but we also wish for that results to convey no information about the rows of which it’s composed. Truly achieving this is indeed intractable, by the Fundamental Law of Information Recovery, basically stating that reasonably accurate answers to too many statistical analyses will always allow for an adversary to learn perfect information about the information underlying a dataset. That is, in some sense, for an analysis to be useful it must necessarily convey some amount of information about the items contained within the dataset it pertains to. Hence, a reconsideration of what we wish to achieve in “preserving privacy” is in need for.
      </p>
      <p>
          One such definition is Differential Privacy, proposed by Cynthia Dwork. On a high level, the idea behind differential privacy is that given a randomized algorithm which performs some statistical task on subsets of a dataset, such an algorithm would “preserve privacy” if it behaved approximately the same regardless of the inclusion or exclusion of any individual in the subset it was acting on. That is, the data of each entry would be thought to be hidden since the behavior of the algorithm closely resembles every possible case where the entry would not have been included.
      </p>
      <p>
          Formally this is expressed as the following (source).
      </p>
      <p>
          Hence privacy is a property which an algorithm acting on a database must achieve and is not a property of a dataset itself, as is the case in other formalizations such as K-anonymity.
      </p>

      <h3>
          Deep Learning
      </h3>
      <p>
Deep learning is currently one of the most predominant forms of statistical analysis used today and has been shown to be remarkably effective for a variety of tasks. Deep neural networks, in their standard form, define a function composed of a sequence of layers where each layer represents an operation to be performed on the output of the previous layer. Typically the goal associated with such models is to find the set of parameters which map a set of inputs to a set of outputs in a way which minimizes some function, referred to as the loss function.
      </p>
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
          Abadi et al. in Deep Learning with Differential Privacy detail the differentially private stochastic gradient descent (DPSGD) algorithm to make traditional SGD differentially private. To describe it, we need to introduce a number of augmentations to the standard SGD procedure.
      </p>
      <p>
          First we introduce C, referred to as the clipping parameter. This value acts as an upper bound on the L2-norm of each gradient update, achieved by applying the function [x]C = x / max(1, ||x||2 / C) to each gradient observed throughout training. We also introduce σ, referred to as the noise multiplier. This value controls the ratio between the clipping parameter and the standard deviation of Gaussian noise applied to each gradient update after clipping.
      </p>
      <p>
          Second, we have to augment our typical method for sampling examples from the dataset. Typical sampling performed in practice is achieved by shuffling the dataset at hand and running through partitions of size B such that each example is viewed by the model exactly once per epoch. Alternatively, in the standard model of DPSGD, each minibatch will correspond to a sample where each example has probability B / N of being included in the minibatch. Hence the minibatch has expected size B, but not necessarily actual size B. Learning via DPSGD using the former sampling method with tight privacy guarantees is currently an open problem.
      </p>
      <p>
          In order to calculate the privacy loss corresponding to k executions of the above update rule, Abadi et al. detail the moments accountant as a method to report privacy loss over time. A full deep dive into the foundations backing the moments accountant are likely outside the scope of this post, but on a high level it can be thought of as a black box which takes in values which characterize your training loop (sampling probabilities, number of minibatches, delta, etc.) and outputs epsilon. But importantly, their method yields much tighter bounds on the privacy loss achieved than what is reported via the strong composition theorem. If interested in learning more, the algorithm was originally introduced in Abadi et al. and has a corresponding implementation within Tensorflow Privacy.
      </p>
      <p>
          A final observation concerning DPSGD is that several variants and modifications to the update rule have been proposed, often centered around more intelligent strategies for managing how clipping bounds and Gaussian noise are applied to gradients. For example, as long as you’re being careful and making the correct privacy considerations, you are able to vary the clipping bound by iteration via adaptive clipping, so as to maybe alleviate the practical difficulties surrounding the selection of a good clipping value.
      </p>

      <h3>
          Related Work
      </h3>
      <p>
          Given DPSGD as a generic, privacy-preserving primitive which asserts relatively few assumptions about the training context, a number of interesting applications of the algorithm have been applied to various learning tasks.
      </p>
      <p>
          For example, Xie et al. in Differentially Private Generative Adversarial Network detail an augmentation of traditional Generative Adversarial Networks (GANs) to make their training process differentially private. The tl;dr is to train the discriminator in a differentially private manner via DPSGD and leave the generator training untouched, as the only information it is ever exposed to are the outputs of the discriminator, and hence updating the generator can be considered a form of post-processing that incurs no additional overall privacy loss. With this, they were able to train models which could generate synthetic data while achieving explicit privacy guarantees, from MNIST to discrete medical data.
      </p>
      <p>
          Private Aggregation of Teacher Ensembles or PATE is an alternative method to DPSGD for conducting differentially private learning. The key idea is to, rather than train a single strong model which captures a complex criterion in a differentially private manner, train a set of weaker, non-private models on partitions of the data and then perform a noisy aggregation of their predictions. Overall the method has been shown to be quite effective at the expense of some assumptions about the training procedure. There has even been an application of this technique to GANs via PATE-GAN.
      </p>
      <p>
          There have also been a number of attempts to rigorously associate differential privacy with resistance to overfitting. Recall that in making a training algorithm differentially private via DPSGD, we are asserting the property that the probability distribution of the eventual parameters of the model is not too different from the alternative reality where any given datapoint did not exist in the dataset. One could make a reasonable argument that this indifference is, at the very least, in the direction of a reasonable formalization for what it means for a model to resist overfitting. In conjunction with this it’s also reassuring that, in order to attain this property, we do things like clipping and applying noise to gradients which are not unreasonable tactics for limiting overfitting in practice. Some work has been done in formalizing the connection between differential privacy and overfitting, for example Carlini et al. in The Secret Sharer: Evaluating and Testing Unintended Memorization in Neural Networks.
      </p>

      <h3>
          Conclusion
      </h3>
      <p>
Hopefully this post has been a potentially enlightening introduction to differentially private deep learning and the algorithms we have at our disposal. To read more, a more comprehensive introduction to differential privacy in general can be found here, and as it pertains to to machine learning in particular, I would suggest this post by Nicolas Papernot. In addition, if you find that any of the statements within this post to be misleading or incorrect, please reach out and let me know so that any errors can be remediated.
      </p>
    </div>
  );
}

export default Post;

import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';


function Post() {
    return (
      <>
        <h2>
          Machine Unlearning
        </h2>
        <p>
          Here{"\'"}s an interesting problem: let{"\'"}s imagine your data was used to train some machine learning model. Now, you want to request that your data be <em>unlearned</em> from the model. That is, the model is updated so that its parameters and outputs have no knowledge of you anymore.
        </p>
        <p>
          For <InlineMath math="k"/>-nearest neighbors, the problem is trivial - simply remove the point from the data. For something more complex like a neural network, it{"\'"}s not immediately clear what you would do. Is their an interesting middle-ground?
        </p>
        <p>
          First, let{"\'"}s define the problem. Consider the two following scenarios:
        </p>
        <ul>
          <li>
          <em>
            Case A (Real): We train the model on the full dataset containing <InlineMath math="x"/>, we remove <InlineMath math="x"/> from the model parameters, and then we publish the model to the public.
          </em>
          </li>
          <li>
          <em>
            Case B (Imaginary): The point <InlineMath math="x"/> was never in the dataset, we train the model on the dataset (which doesn{"\'"}t contain <InlineMath math="x"/>), and then publish the model to the public.
          </em>
          </li>
        </ul>
        <p>
          If we can find a procedure for Case A which yields an indistinguishable outcome to Case B, then we will have achieved our goal. In this respect, I will detail the <a href="https://arxiv.org/abs/2007.02923">descent-to-delete</a> approach by Neel et al.
        </p>
        <p>
          For the purposes of this post, we are going to tackle the case of a convex parametric model. For example, this would include logistic regression with binary cross entropy loss and <InlineMath math="\ell_2" /> regularization.
        </p>
        <p>
          To be concrete, let{"\'"}s say our loss function is:
        </p>
        <BlockMath math="\ell(\theta) = - \frac{1}{n} \left( \sum_{i \in [n]} y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right) + \lambda ||\theta||_2"/>
        <p>
          Then we would have that our loss function is <InlineMath math="m"/>-strongly convex and <InlineMath math="M"/>-smooth where <InlineMath math="m = \lambda"/> and <InlineMath math="M = 4 - \lambda"/>.
        </p>
        <p>
          Now, the great part about working in this setting is that we have convergence guarantees. That is, as long as we know how far we are at most from the global optimum, if we run gradient descent, we know we will be at most some distance after some number of steps we take.
        </p>
        <em>
          Let <InlineMath math="\ell(\theta)" /> be <InlineMath math="m" />-strongly convex and M-smooth, and let <InlineMath math="\theta^* = argmin_{\theta \in \Theta} \ell(\theta)" />. We have that after <InlineMath math="T" /> steps of gradient descent with step size <InlineMath math="\eta = \frac{2}{m + M}" />:
        </em>
        <BlockMath math="||\theta_T - \theta^*||_2 \leq \left( \frac{M - m}{M + m} \right)^T || \theta_0 - \theta^*||_2" />
        <p>
          Now, for sake of intuition, I will give a geometric argument for showing how we can get some notion of machine unlearning to work.
        </p>

        <center style={{ 'background-color': 'white', 'padding': '20px', 'border-radius': '20px' }}>
          <img src="../machine-unlearning/image2.svg" width="50%"/>
        </center>

        <br/><p>
          We begin with Case A, where we perform gradient descent on the full dataset for <InlineMath math="t"/> steps until <InlineMath math="\theta_0"/> becomes <InlineMath math="\theta_t"/>. The dotted line represents how far away <InlineMath math="\theta_t"/> can possibly be from <InlineMath math="\theta^D"/> due to our convergence guarantee.
        </p>

        <center style={{ 'background-color': 'white', 'padding': '20px', 'border-radius': '20px' }}>
          <img src="../machine-unlearning/image1.svg" width="50%"/>
        </center>

        <br/><p>
          Now, let{"\'"}s say that this point in training we receive a deletion request for point <InlineMath math="x"/>. To handle this, we{"\'"}ll need to establish the notion of <em>sensitivity</em>. That is, if we have some global optimum across the entire dataset <InlineMath math="\theta^D"/>, then the <em>sensitivity</em> is the furthest away the global minimum can move due to the removal of a single point. When we remove <InlineMath math="x"/>, we know that the resulting global minimum <InlineMath math="\theta^{D \setminus x}"/> can{"\'"}t be <em>too</em> far away.
        </p>

        <center style={{ 'background-color': 'white', 'padding': '20px', 'border-radius': '20px' }}>
          <img src="../machine-unlearning/image3.svg" width="50%"/>
        </center>

        <br/><p>
          Given this, we know how far away <InlineMath math="\theta_t"/> can be from <InlineMath math="\theta^D"/> and how far <InlineMath math="\theta^D"/> can be from <InlineMath math="\theta^{D \setminus x}"/>. Therefore, we know how far <InlineMath math="\theta_t"/> could possibly be from <InlineMath math="\theta^{D \setminus x}"/>. Given this information, we can again apply the convergence guarantee and perform gradient descent for some required number of steps in the direction of <InlineMath math="\theta^{D \setminus x}"/> until we know we{"\'"}re some distance away, resulting in <InlineMath math="\theta_T"/>. This finishes Case A, where we{"\'"}ve gone from an initial point <InlineMath math="\theta_0"/> and gotten close to <InlineMath math="\theta^{D \setminus x}"/> without knowing <InlineMath math="x"/> beforehand.
        </p>

        <center style={{ 'background-color': 'white', 'padding': '20px', 'border-radius': '20px' }}>
          <img src="../machine-unlearning/image4.svg" width="50%"/>
        </center>

        <br/><p>
          Now we consider alternative reality, Case B. That is, we start from our initial point and train regularly but <InlineMath math="x"/> was never in the dataset. Given our convergence guarantee, again we can know after some number of steps that we are at least within some distance of the optimum.
        </p>

        <center style={{ 'background-color': 'white', 'padding': '20px', 'border-radius': '20px' }}>
          <img src="../machine-unlearning/image5.svg" width="50%"/>
        </center>

        <br/><p>
          Now given that we can guarantee a certain distance from <InlineMath math="\theta^{D \setminus x}"/> in either case, we can guarantee that <InlineMath math="\theta_T"/> and <InlineMath math="\theta"/> are within some distance of one another.
        </p>

        <center style={{ 'background-color': 'white', 'padding': '20px', 'border-radius': '20px' }}>
          <img src="../machine-unlearning/image6.svg" width="50%"/>
        </center>

        <br/><p>
          Finally, in either case, we publish the models according to the same publishing scheme, namely an injection of Gaussian noise to the model parameters scaled to how far <InlineMath math="\theta_T"/> and <InlineMath math="\theta"/> could possibly be from one another. All of this entails that both outcomes are statistically indistinguishable from one another.
        </p>

        <h3>
          Conlusion
        </h3>
        <p>
          Hopefully this was a useful introduction into the problem of machine unlearning and how it can be addressed. For further reading, make sure to check out the amazing blog post about an alternative approach, <a href="http://www.cleverhans.io/2020/07/20/unlearning.html">SISA</a>, proposed by Papernot et al.
        </p>
      </>
    );
}

export default Post;

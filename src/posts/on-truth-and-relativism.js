import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

function Post() {
  return (
    <>
      <h2>
          Risk-Aware Reinforcement Learning
      </h2>

      <p>
          In this post, we will investigate the notion of risk in the context of reinforcement learning.
      </p>

      <h3>
        Actor-Critic
      </h3>
      <p>
        Actor critic methods, in my opinion, are often described in strangely confusing ways despite not being a particularly complex topic. Here we{"\'"}ll offer a brief introduction.
      </p>
      <p>
        First we have a notion of a critic <InlineMath math="\hat{Q}: \mathcal{S} \times \mathcal{A} \rightarrow \mathbb{R}" /> which takes in a state <InlineMath math="s" /> and an action <InlineMath math="a" /> and produces an estimate <InlineMath math="\hat{Q}(s, a)" /> of the expected long-term reward of taking action <InlineMath math="a" /> in state <InlineMath math="s" />, and following the policy afterwards. To learn a good estimate of this function, we compare this estimate against a target <InlineMath math="Q(s, a) = r + \gamma \sum_{s'} p(s' | s, a) \hat{Q}(s', a')" /> during training, which partially incorporates ground-truth information in the form of an observed reward combined with a bootstrapped estimate. We then simply take a gradient step in the direction minimizing the difference between our computed estimate and our target.
      </p>
      <BlockMath math="\theta_Q \leftarrow \theta_Q - \eta \nabla_{\theta_Q} (\hat{Q}(s, a) - Q(s, a))^2" />
      <p>
        Second we introduce a notion of an actor <InlineMath math="A: \mathcal{S} \rightarrow \mathcal{A}" /> which simply takes in a state <InlineMath math="s" /> and outputs an action <InlineMath math="a" />. To quantify the quality of this predicted action, we pass <InlineMath math="s" /> and <InlineMath math="a" /> into the critic, which then outputs the expected long-term reward of taking <InlineMath math="a" /> in <InlineMath math="s" />. Assuming this estimate is decent, we would then want to update the actor in such a manner so as to maximize this value, so we take a gradient step in the direction achieving this.
      </p>
      <BlockMath math="\theta_A \leftarrow \theta_A + \eta \nabla_{\theta_A} \hat{Q}(s, A(s))" />
      <p>
        After alternating between training the actor and training the critic while exploring the environment, we should eventually converge on a good value function and a good actor characterizing the policy of the agent.
      </p>

      <h3>
        What is Risk?
      </h3>
      <p>
        Now, imagine that our critic didn{"\'"}t just estimate the expected long-term reward, but it estimated the entire <em>distribution</em> of long term rewards. Maybe we could assume that this distribution is a Gaussian, and predict its mean and variance. Assuming we could do that, then how might we define risk?
      </p>
      <p>
        Well, one way you could think about risk is that it{"\'"}s <em> the degree to which you are concerned about worst-case outcomes</em>. If you are risk-averse, that means you <em>only</em> care about worst case outcomes. If you are risk-willing, then you might only care about average-case outcomes.
      </p>
      <p>
        A way to formalize this notion is through <em>conditional value at risk (CVaR)</em>. Given a distribution, it is defined as the expectation of the distribution up to the <InlineMath math="\alpha" />-th percentile. If <InlineMath math="\alpha \approx 0" />, then you essentially only care about the worst case. If <InlineMath math="\alpha = 1" />, then you only care about expected case (which would be regular actor-critic!) Anything in between is simply some domain-specific tradeoff.
      </p>
      <p>
          This is the idea followed in the paper <em><a href="https://arxiv.org/abs/1911.03618">Worst Case Policy Gradient</a></em> by Tang et al., and the basis for this post.
      </p>

      <h3>
        Training the Critic
      </h3>
      <p>
          Getting the estimated means and variances from your model is fairly straightforward - just feedforward your critic model! Give it a state and an action and it will spit out the estimated mean and variance.
      </p>
      <BlockMath math="\{ \hat{Q}(s, a), \hat{\Upsilon}(s, a) \} = critic(s, a)" />
      <p>
          Now how will we attain good estimates for <InlineMath math="\hat{Q}(s, a)" /> and <InlineMath math="\hat{\Upsilon}(s, a)" />? By the same idea of computing targets given observed reward information. Fist, the mean is actually quite easy because it has precisely the same semantic interpretation of the regular Q-value, hence going unchanged.
      </p>
      <BlockMath math="Q(s, a) = r + \gamma \sum_{s'} p(s' | s, a) \hat{Q}(s', a')" />
      <p>
          Now we just need to sort out what the proper variance target should look like. By simply expanding the definition of variance, you should end up with an expression resembling the following.
      </p>
      <BlockMath math="\Upsilon(s, a) \leftarrow r^2 + 2 \gamma r \sum_{s} p(s' | s, a) \hat{Q}(s', a')" />
      <BlockMath math="+ \gamma^2 \sum_{s'} p(s' | s, a) \hat{\Upsilon}(s', a') + \gamma^2 \sum_{s'} p(s' | s, a) \hat{Q}(s', a')^2 - \hat{Q}(s, a)^2" />
      <p>
          Now we have our <em>estimates</em>, namely <InlineMath math="\hat{Q}(s, a)"/> and <InlineMath math="\hat{\Upsilon}(s, a)"/>, as well as our <em>targets</em>, namely <InlineMath math="Q(s, a)"/> and <InlineMath math="\Upsilon(s, a)"/>.
      </p>
      <p>
        Now we have to construct a loss function which will quantify how good our estimates are. Why not define our loss function as some statistical distance metric between the Gaussian distributions characterized by our estimate and target? It turns out, the Wasserstein distance between the two Gaussians can be characterized by the following expression.
      </p>
      <BlockMath math="\ell(\theta) = (\hat{Q}(s, a) - Q(s, a))^2" />
      <BlockMath math="+ \hat{\Upsilon}(s, a) + \Upsilon(s, a) - 2\sqrt{\hat{\Upsilon}(s, a) \Upsilon(s, a)}" />
      <p>
        This expression should satisfy our intuition - the loss is zero when <InlineMath math="\hat{Q}(s, a) = Q(s, a)" /> and <InlineMath math="\hat{\Upsilon}(s, a) = \Upsilon(s, a)" />, and positive otherwise.
      </p>

      <h3>
        Training the Actor
      </h3>
      <p>
        Now how should we train our actor? This part is easy assuming we have a trained critic. Just as before, we pass in a state <InlineMath math="s" /> to our actor which will give us an action <InlineMath math="a" />. This action is then passed into the critic, which yields a mean <InlineMath math="\hat{Q}(s, a)" /> and a variance <InlineMath math="\hat{\Upsilon}(s, a)" />. Given this mean and variance, we can directly calculate the <emph>CVaR</emph> metric as the following where <InlineMath math="\phi(\alpha)" /> is the PDF of the Gaussian distribution evaluated at <InlineMath math="\alpha" /> and <InlineMath math="\Phi(\alpha)" /> is the CDF.
      </p>
      <BlockMath math="\Gamma(s, a, \alpha) = \hat{Q}(s, a) - \frac{\phi(\alpha)}{\Phi(\alpha)}\sqrt{\hat{\Upsilon}(s, a)}" />
      <p>
        This is the scalar we want! Now, the actor just takes a gradient step in the direction <em>maximizing</em> this value. Super simple!
      </p>

      <h3>
        Conclusion
      </h3>
      <p>
        Hopefully this acted as a simple introduction to risk in the context of reinforcement learning. If you have any questions, feel free to shoot them my way!
      </p>
    </>
  );
}

export default Post;

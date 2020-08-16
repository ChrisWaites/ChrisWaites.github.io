import React from 'react';

function Post() {
  return (
    <div>
      <h2>
          How Differential Privacy (Could) Fit Into Industry
      </h2>
      <p>
          In the context of differential privacy, there{"\'"}s typically some data curator (e.g. some silicon valley tech giant) and the outside world. Supposedly the curator has an incentive to release some data analysis result, but in such a way where the privacy leakage associated with this analysis is trackable.
      </p>
      <p>
          Although, there are several practical issues with this. One which is common is this issue of an <em>infinite horizon</em>. That is, say this silicon valley tech giant wants to adhere to a strict privacy budget for the rest of eternity. When they want to release the result of an analysis, what epsilon should they choose? 1? 0.1? 0.0001? It’s unclear, especially if their goal is to stick around for eternity, and we assume that the privacy leakage associated with a given analysis is permanant.
      </p>
      <p>
          What will happen? Well, once they’ve inevitably creeped up on their limit, should we expect them to seriously consider halting the release of further results forever? No - more than likely, they’ll just raise the limit. And inevitably they’ll do it again. This is to say that, in the context of entities which have no foreseeable horizon, the apparent practicality of differential privacy is of concern because the privacy expenditure is a monotonically increasing value over time.
      </p>
      <p>
          This is not a problem I have a general solution to. I’m a big fan of differentially private synthetic datasets, and in certain contexts they can help in this regard. Although, not every undertaking can be easily framed as a synthetic data problem, especially if new relevant data comes in consistently.
      </p>
      <p>
          Although, the core point here I’d like to make is that <em>the continual public release of results to analyses may not be the most interesting or useful context to evaluate the utility of differential privacy within</em>.
      </p>
      <p>
          Instead, consider the case where an engineer at the aforementioned silicon valley tech giant accidentally leaves their laptop in the car and it gets stolen, and say they were doing some work concerning sensitive data. Can you begin to quantify the amount of damage done to the individuals included in the data they were working with? Not by default, but naturally if the results the engineer was working with were computed with differential privacy in mind, then you could actually start to get some form of a guarantee.
      </p>
      <p>
          So, the slight distinction I’m making here is that maybe the utility of differential privacy is not as pronounced in contexts where the forefront goal is information release. Maybe a more useful context for differential privacy is actually behind the walls of your organization.
      </p>
      <p>
          That is, the incorporation of differential privacy might be best served as a means for protection against the worst case scenario, where a data leakage happens against your will. Now the conversation shifts from saying “silicon valley tech giant, use differential privacy so that your public analyses don’t reveal too much about your users”, and it becomes “have your employees speak through the lens of differential privacy, so we know how much damage has been done in the worst case where information is leaked.”
      </p>
      <p>
          This reformulation of the problem setting, in a bit of a roundabout matter, highlights the utility of differential privacy by dampening issues concerning infinite horizons, stemming from the inherent nature of data leakages. Namely, they are <em>sparse</em> and <em>unintended</em>.
      </p>
      <p>
          Given that data leakages are canonically sparse, this allows you to talk about a global privacy budget per individual which might actually be useful. That is, you could actually get away with something like an epsilon of 1.0 per user over a very long timespan if data release occurs every ten years, not every day.
      </p>
      <p>
          In addition, it doesn’t make sense to complain about the limitations of differential privacy with respect to its monotonically increasing nature if data release is unintended by definition - if it’s going to happen regardless, you don’t have to worry as much about the number of releases you intend to perform forever onwards because that’s not a variable you can control in the first place.
      </p>
      <p>
          There are just my thoughts in isolation, and this has been said before by others. But hopefully it sparks additional discussion on the topic, on where differential privacy will make the most sense to be deployed in the real world in years to come.
      </p>
    </div>
  );
}

export default Post;

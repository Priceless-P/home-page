import Button from './components/Button.jsx';
import Art from './components/Art.jsx';
import ArrowRightUp from './components/icons/ArrowRightUp.jsx';
import DocsLayout from './components/docs/DocsLayout.jsx';
import { CodeBlock, DocFigure, DocTable, Section } from './components/docs/DocElements.jsx';
import { LINKS } from './config/links.js';
import { ctaTexture, ctaTextureMobile } from './lib/art.js';
import { cx } from './lib/cx.js';
import rewardSplitImage from './assets/slice-docs/image-1-block-reward-split.avif';
import sliceTimelineImage from './assets/slice-docs/image-2-slice-timeline.avif';
import mmevCurveImage from './assets/slice-docs/image-3-mmev-curve.avif';
import shareNormalizationImage from './assets/slice-docs/image-4-share-normalization.avif';
import lookbackWindowImage from './assets/slice-docs/image-5-lookback-window.avif';
import rampUpDownImage from './assets/slice-docs/image-6-ramp-up-down.avif';
import shareLifecycleImage from './assets/slice-docs/image-7-share-lifecycle.avif';

const PAGE_LINKS = [
  ['tldr', 'TL;DR'],
  ['glossary', 'Glossary'],
  ['introduction', 'Introduction'],
  ['adapting', 'Adapting PPLNS to SV2'],
  ['necessity', "Why it's required"],
  ['fair-slices', 'Creating fair slices'],
  ['slice-size', 'The size of a slice'],
  ['measuring', 'Measuring hashrate'],
  ['share-treatment', 'How shares are treated'],
  ['payouts', 'Payouts'],
  ['example', 'A worked example'],
  ['lifecycle', 'Life of a share'],
  ['compare', 'SLICE vs FPPS vs PPLNS'],
  ['practical', 'What this means for you'],
];

const figure = (src, width, height) => ({ src, width, height });

const FIGURES = {
  rewardSplit: figure(rewardSplitImage, 1800, 1000),
  sliceTimeline: figure(sliceTimelineImage, 1800, 840),
  mmevCurve: figure(mmevCurveImage, 1800, 1040),
  shareNormalization: figure(shareNormalizationImage, 1800, 1000),
  lookbackWindow: figure(lookbackWindowImage, 1800, 880),
  rampUpDown: figure(rampUpDownImage, 1800, 1040),
  shareLifecycle: figure(shareLifecycleImage, 1800, 1320),
};

function Callout({ children, emphasis = false }) {
  return (
    <div
      className={cx(
        'p-5 text-body-default',
        emphasis ? 'bg-bg-info' : 'bg-bg-primary',
      )}
    >
      {children}
    </div>
  );
}

function SliceHero() {
  return (
    <section className="relative h-[799px] overflow-hidden bg-bg-default lg:h-[412px]">
      <Art
        src={ctaTexture}
        srcMobile={ctaTextureMobile}
        adaptive
        loading="eager"
        fetchPriority="high"
        className="slice-hero-art pointer-events-none absolute top-[316px] left-0 h-[483px] w-full max-w-none object-cover object-bottom select-none lg:top-0 lg:left-[calc(50%-24px)] lg:h-[412px] lg:w-[824px] lg:object-fill"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pt-20 pb-0 lg:py-20 xl:px-0">
        <div className="flex max-w-[560px] flex-col gap-[23px]">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium tracking-wide text-body-alt uppercase">
              Payout system - PPLNS + Job Declaration
            </p>
            <h1 className="font-heading text-2xl font-medium tracking-tight text-body-alt lg:text-3xl lg:tracking-normal">
              SLICE. <span className="text-header-default">Fair payouts for valuable work.</span>
            </h1>
            <p className="max-w-[600px] text-base text-body-alt">
              Fair, transparent, verifiable miner payouts built for Stratum V2. SLICE offers variance
              comparable to PPLNS, fairer fee attribution, none of FPPS’s insurance overhead, and full
              compatibility with miner-built block templates.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" href={LINKS.startMining} label="Start mining with DMND">
              <ArrowRightUp />
            </Button>
            <Button variant="secondary" href="#tldr" label="Read the explainer" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SliceFooterContent() {
  return (
    <>
      <section className="bg-bg-primary px-6 py-20 lg:py-30">
        <div className="mx-auto flex max-w-[820px] flex-col items-center text-center">
          <h2 className="font-heading text-3xl font-medium text-header-default">
            Ready to mine on a pool that pays you fairly?
          </h2>
          <p className="mt-4 max-w-[700px] text-base leading-7 text-body-alt">
            DMND mined the first end-to-end Stratum V2 block built by a miner. SLICE adds transparent
            payouts, low variance, and the freedom to choose the blocks you mine.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="primary" href={LINKS.startMining} label="Join now" />
            <Button variant="secondary" href={LINKS.sliceExplainer} label="Read the deep-dive">
              <ArrowRightUp />
            </Button>
          </div>
          <a
            href={LINKS.sliceWhitepaper}
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-header-default transition-colors hover:text-blue-default"
          >
            Read the PPLNS with Job Declaration whitepaper <ArrowRightUp />
          </a>
        </div>
      </section>

      <section className="bg-bg-default px-6 py-12">
        <div className="mx-auto max-w-[1200px] border-t border-border-default/60 pt-8 text-sm leading-6 text-body-alt">
          <strong className="text-header-default">Sources:</strong>{' '}
          <a className="hover:text-header-default" href={LINKS.sliceWhitepaper}>
            Whitepaper
          </a>
          {' · '}
          <a
            className="hover:text-header-default"
            href="https://delvingbitcoin.org/t/pplns-with-job-declaration/1099"
          >
            Delving Bitcoin discussion
          </a>
          {' · '}
          <a className="hover:text-header-default" href="https://arxiv.org/abs/1112.4980">
            Rosenfeld, pooled mining reward systems
          </a>
          {' · '}
          <a
            className="hover:text-header-default"
            href="https://timroughgarden.org/papers/bitcoin.pdf"
          >
            Roughgarden, mining pool reward functions
          </a>
        </div>
      </section>
    </>
  );
}

export default function SliceDocs() {
  return (
    <DocsLayout
      current="slice"
      sections={PAGE_LINKS}
      navigationLabel="SLICE sections"
      hero={<SliceHero />}
      afterContent={<SliceFooterContent />}
    >
      <Section id="tldr" title="TL;DR">
        <Callout emphasis>
          SLICE splits each block reward in two. The subsidy uses classic PPLNS based only on
          hashrate. Transaction fees use PPLNS with Job Declaration scoring, rewarding both the
          work performed and the value of the block template. Short, time-bounded slices make
          the comparison fair for shares submitted at different moments.
        </Callout>
      </Section>

      <Section id="glossary" title="Glossary">
        <dl className="grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-header-default">PPLNS — Pay Per Last N Shares</dt>
            <dd className="mt-2">
              Miners receive a share of rewards based on the hashrate they contributed inside a
              rolling window containing the last N shares.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-header-default">FPPS — Full Pay Per Share</dt>
            <dd className="mt-2">
              The pool pays a fixed subsidy-and-fee rate for each share and absorbs the variance
              as an insurer. That is expensive to operate and creates centralizing pressure.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-header-default">JD — Job Declaration</dt>
            <dd className="mt-2">
              A Stratum V2 feature that lets miners build templates with their own node instead
              of accepting a pool-selected template.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-header-default">
              MMEV — Maximum Mempool Extractable Value
            </dt>
            <dd className="mt-2">
              The largest fee total available from a mempool at one moment. Because the true
              value cannot be measured live, SLICE uses the highest-fee template observed in a
              slice as an empirical proxy.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-header-default">
              SRI — Stratum Reference Implementation
            </dt>
            <dd className="mt-2">The free and open-source reference implementation of Stratum V2.</dd>
          </div>
        </dl>
      </Section>

      <Section id="introduction" title="Introduction">
        <p>
          On 25 June 2026, DMND Pool mined block 955,318: the first end-to-end Stratum V2 block
          constructed by a miner. Stratum V2 has been developed over the past five years by
          open-source Bitcoin contributors, particularly the SRI team, to return block-template
          creation from pool operators to miners.
        </p>
        <p>
          Decentralizing pooled mining has both a technical and an economic side. Stratum V2
          returns technical control, but FPPS still centralizes the economics. An FPPS pool
          estimates fees, pays a fixed rate, and carries the variance, favoring the few large
          operators able to finance that risk. A small number of pools can therefore continue
          deciding which transactions are mined even after broad Stratum V2 adoption.
        </p>
        <p>
          SLICE closes that economic gap. It is designed around Stratum V2 so technical and
          economic centralization are addressed together: fair, transparent, low-variance
          payouts aligned with miner choice.
        </p>
      </Section>

      <Section id="adapting" title="SLICE: adapting PPLNS to Stratum V2">
        <p>
          PPLNS is transparent, verifiable, inexpensive to operate, and proportional to work.
          It is a payout method rather than an insurance product. Without the need to bankroll
          FPPS variance, DMND can keep its incentives focused on fair payment instead of the
          scale required to absorb financial risk.
        </p>
        <p>
          Classic PPLNS assumes every miner works on the same template. Once miners construct
          their own blocks, equal hashrate can target blocks with different fee values, and
          classic PPLNS has no way to distinguish them. That limitation matters more as fees
          become a larger portion of block revenue.
        </p>
        <p>SLICE separates each reward into two tracks:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-header-default">Block subsidy:</strong> classic PPLNS based
            on hashrate contributed inside the lookback window.
          </li>
          <li>
            <strong className="text-header-default">Transaction fees:</strong> PPLNS plus Job
            Declaration scoring, weighting each share by work and template fee value.
          </li>
        </ul>
        <p>The fee track uses the Stratum V2 Job Declarator, so SLICE is also called PPLNS+JD.</p>
        <p className="font-heading text-2xl font-medium text-header-default">
          Subsidy rewards work. Fees reward valuable work.
        </p>
        <DocFigure
          asset={FIGURES.rewardSplit}
          alt="Block subsidy paid through classic PPLNS and fees paid through PPLNS with Job Declaration scoring"
          caption="The subsidy uses classic PPLNS; fees use PPLNS with Job Declaration scoring."
        />
      </Section>

      <Section id="necessity" title="Why building your own block requires template-aware payouts">
        <p>Miner-built blocks make template-aware payment necessary:</p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Classic PPLNS assumes every miner builds the same block.</li>
          <li>Miner-selected templates break that assumption because their fee values differ.</li>
          <li>
            Fair payouts must distinguish equal work performed on blocks of different value, or
            miners constructing the most valuable templates are systematically underpaid.
          </li>
        </ol>
        <p>
          Those premises do not prescribe one design, but they establish that template
          awareness is required. SLICE is DMND’s implementation of that requirement.
        </p>
        <Callout emphasis>
          <strong>Not theoretical.</strong> DMND has run miner-built Stratum V2 blocks in
          production since block 955,318. SLICE describes a live system, not a proposal.
        </Callout>
      </Section>

      <Section id="fair-slices" title="Creating fair slices">
        <p>
          A single fee benchmark across the entire lookback window would penalize earlier
          shares for transactions that had not reached the mempool yet. A share at 09:55 cannot
          use the richer mempool visible at 10:00, so comparing both against the later maximum
          asks miners to compete with a future they could not observe—the failure mode behind
          older systems such as SCORE.
        </p>
        <p>
          SLICE divides the lookback window into short periods. Each share is compared with the
          highest-value share observed inside its own slice. Within a short enough interval,
          miners had approximately the same opportunity to construct a valuable template. The
          observed MMEV proxy rises as higher-fee transactions arrive, preserving the incentive
          to build the best available block.
        </p>
        <DocFigure
          asset={FIGURES.mmevCurve}
          alt="MMEV increasing over time with shares compared inside separate time slices"
          caption="Each share is measured against the best observed share in its own slice."
        />
        <p>
          Within one slice, the best share receives a score of 1.0 and every other share is
          normalized against it.
        </p>
        <DocFigure
          asset={FIGURES.shareNormalization}
          alt="Shares normalized against the highest-value share in one slice"
          caption="The best share establishes the slice benchmark; the rest are graded against it."
        />
        <p>
          This makes SLICE fair across miners and across time, allowing Job Declaration to work
          without penalizing anyone for when their share arrived.
        </p>
      </Section>

      <Section id="slice-size" title="The size of a slice">
        <p>A slice closes when either event occurs:</p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>A new block is found.</li>
          <li>MMEV rises by the pool-defined threshold X.</li>
        </ol>
        <p>
          A smaller X creates more slices and finer-grained comparisons. Slice length is
          dynamic and responds to real mempool activity rather than a fixed clock.
        </p>
        <DocFigure
          asset={FIGURES.sliceTimeline}
          alt="Timeline showing slices closing when a block is found or MMEV rises by X"
          caption="Slices close on new blocks or when observed MMEV increases by X."
        />
        <p>
          A slice contains every share submitted during its period. Each share carries a
          difficulty representing the work performed; the sum of those difficulties is the
          slice’s size.
        </p>
      </Section>

      <Section id="measuring" title="A note on measuring hashrate">
        <Callout>
          Hashrate is inferred statistically from valid work over time; it is not directly
          observable for a machine, farm, pool, or the network. Every hashrate estimate
          fluctuates and improves with more samples, which is why pools request many shares per
          minute. As a sanity check, daily block production and network hashrate track closely
          through a two-week difficulty period, then shift at the adjustment.
        </Callout>
      </Section>

      <Section id="share-treatment" title="How SLICE treats shares">
        <p>
          Pool difficulty regulates how frequently miners submit proof of work. It is a
          measurement tool, not a value score. DMND targets six shares per minute per client
          and adjusts each miner’s pool difficulty to maintain that rate.
        </p>
        <p>
          When a valid share exceeds the miner’s assigned pool difficulty, it enters the
          current slice. Every share is valued at that assigned pool difficulty—not at the
          accidental difficulty of the individual hash.
        </p>
        <p>
          Suppose network difficulty is about 110T and the lookback window covers eight times
          network difficulty. If a lucky block-finding share were valued at its actual
          difficulty, that one share could occupy one eighth of the window and claim one eighth
          of rewards, including rewards earned by miners who performed the same amount of work.
        </p>
        <DocFigure
          asset={FIGURES.lookbackWindow}
          alt="A rolling lookback window spanning eight times network difficulty across multiple slices"
          caption="The lookback window contains 8× network difficulty; a boundary includes the complete slice it reaches."
        />
        <Callout>
          <strong>What this protects:</strong> a lucky block-finding share cannot capture the
          rewards earned by equally productive miners. Every share, including the winning one,
          is valued at pool difficulty.
        </Callout>
      </Section>

      <Section id="payouts" title="Payouts in SLICE">
        <p>
          DMND’s lookback window represents eight times the current network difficulty of work.
          After a block is found, the pool walks backward through recent slices until their
          accumulated difficulty reaches that threshold.
        </p>
        <Callout>
          <strong>No share left behind.</strong> If the boundary reaches the middle of a slice,
          SLICE includes the complete slice rather than truncating it. Every valid share is
          accounted for in full.
        </Callout>
        <p>
          Inside the window, the subsidy follows hashrate while fees follow hashrate weighted
          by each share’s fee score within its slice.
        </p>
      </Section>

      <Section id="example" title="A worked example">
        <p>
          A miner submits 100 shares at their assigned pool difficulty during a slice containing
          1,000 shares. The best template represented by a share contains 0.5 BTC in fees, while
          this miner’s templates average 0.4 BTC. These figures are illustrative.
        </p>
        <CodeBlock label="Payout math in one slice">
          {`# Subsidy portion — proportional to raw share count
subsidy_share = 100 / 1,000 = 10% of the slice subsidy allocation

# Fee portion — normalized against the best share
fee_score = 0.4 BTC / 0.5 BTC = 0.80
fee_weighted = 100 × 0.80 = 80 effective shares`}
        </CodeBlock>
        <p>
          Both allocations are then multiplied by the slice’s weight in the overall lookback
          window. In short: subsidy rewards work, while fees reward valuable work.
        </p>
      </Section>

      <Section id="lifecycle" title="Life of a share">
        <DocFigure
          asset={FIGURES.shareLifecycle}
          alt="Stages in the life of a share from miner submission through payouts and ageing out"
          caption="A share moves from submission through repeated window inclusion before ageing out."
        />
        <p>
          With an eight-times-difficulty lookback, an average share remains in the window for
          roughly eight payout rounds. It is not paid eight independent times; the moving
          window continues to include it until enough newer work pushes it out.
        </p>
        <DocFigure
          asset={FIGURES.rampUpDown}
          alt="Ramp-up after starting and ramp-down after stopping, with payouts following hashrate by about eight rounds"
          caption="Payouts follow hashrate by roughly eight rounds on the way in and on the way out."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-border-default/70 bg-bg-primary p-5">
            <h3 className="font-heading text-xl font-medium text-header-default">Ramp-up</h3>
            <p className="mt-2">
              Initial payouts are below the steady-state rate. It takes about eight rounds for
              the full contribution to fill the lookback window.
            </p>
          </div>
          <div className="border border-border-default/70 bg-bg-primary p-5">
            <h3 className="font-heading text-xl font-medium text-header-default">
              Ramp-down — your work keeps paying
            </h3>
            <p className="mt-2">
              After mining stops, contributed shares continue earning as they age out. Payment
              follows the work already delivered instead of ending at disconnection.
            </p>
          </div>
        </div>
      </Section>

      <Section id="compare" title="SLICE vs FPPS vs PPLNS">
        <DocTable
          headers={['', 'FPPS', 'PPLNS', 'SLICE']}
          rows={[
            ['Rewards template quality', 'No', 'No', 'Yes'],
            ['Independently verifiable', 'No; fee assumptions are opaque', 'Not typically; trust the share count', 'Yes; shares and scoring are published'],
            ['Payout basis', 'Insurance; fixed rate per share', 'Rolling hashrate window', 'Rolling window with fee-weighted scoring'],
            ['Miner variance', 'Very low', 'Moderate', 'Comparable to PPLNS'],
            ['Cost to pool', 'High; pool absorbs variance', 'Low', 'Low'],
            ['Centralization pressure', 'High', 'Low', 'Low'],
          ]}
        />
      </Section>

      <Section id="practical" title="What this means if you’re mining with DMND">
        <p>
          Expect smaller payouts during the first few rounds while your shares ramp up. If you
          disconnect, payouts continue for several rounds as earlier work ages out. When you
          build a more valuable template on your own node, the fee portion of your payout rises
          directly—the incentive SLICE is designed to preserve.
        </p>
        <p>
          Building your own block gives you control under Bitcoin’s existing consensus rules,
          without a protocol change or anyone’s permission. Block construction returns to
          miners, and SLICE pays them for the value they contribute.
        </p>
      </Section>
    </DocsLayout>
  );
}

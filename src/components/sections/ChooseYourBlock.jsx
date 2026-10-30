import Button from '../Button.jsx';
import Art from '../Art.jsx';
import { serverRack } from '../../lib/art.js';
import { LINKS } from '../../config/links.js';

export default function ChooseYourBlock() {
  return (
    <section className="relative overflow-hidden bg-bg-default px-6 py-20 lg:px-0 lg:py-2">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 h-px bg-border-default/50 lg:top-2"
      />

      <div className="mx-auto w-full px-3 shadow-[inset_0.5px_0_0_0_var(--color-btn-border),inset_-0.5px_0_0_0_var(--color-btn-border)] lg:max-w-[1200px] lg:px-6 xl:px-0">
        <div className="mx-auto flex w-full flex-col items-start justify-between gap-[23px] py-16 lg:max-w-[1042px] lg:flex-row lg:items-center lg:gap-6">
          <div className="flex flex-col gap-[23px]">
            <div className="flex flex-col gap-2">
              <h2 className="w-full font-heading text-2xl font-medium tracking-tight text-body-alt lg:w-[352px] lg:text-3xl lg:tracking-normal">
                Job <span className="text-header-default">Declaration.</span>
              </h2>
              <p className="w-full max-w-[518px] text-base text-body-alt">
                The most profitable block is the one you build.
                <br />
                Job Declaration lets your own Bitcoin node build the blocks your miners work on, instead of the pool building them. You decide what goes in each block and the pool still handles your payouts as always.
              </p>
            </div>
            <Button variant="primary" size="default" href={LINKS.runNode} label="Run your own node" />
          </div>

          <Art
            src={serverRack}
            adaptive
            width={331}
            height={296}
            className="pointer-events-none h-[240px] w-[268.54px] max-w-none shrink-0 select-none lg:h-[295.819px] lg:w-[331px]"
          />
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-20 h-px bg-border-default/50 lg:bottom-2"
      />
    </section>
  );
}

import LegalPage, { LegalHeading, LegalIntro } from './components/LegalPage.jsx';

export default function Terms() {
  return (
    <LegalPage title="Terms of service">
      <LegalIntro>
        THESE TERMS OF SERVICE (&quot;TERMS&quot;) APPLY TO THE SERVICES PROVIDED BY THE WEBSITE DMND
        (&quot;WEBSITE&quot;, &quot;MINING POOL&quot;, &quot;WE&quot; OR &quot;US&quot;) FOR USERS
        (&quot;MINER&quot;, &quot;YOU&quot; OR &quot;YOUR&quot;). PLEASE READ THESE TERMS CAREFULLY
        BEFORE USING THE SERVICES OF DMND. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT USE THE
        SERVICES OF DMND.
      </LegalIntro>

      <LegalHeading>General</LegalHeading>

      <p>
        By accessing and using the services of DMND, you confirm that you have read these terms and
        accept and agree to be bound by its provisions.
      </p>

      <p>
        By using the services of DMND you accept all possible risks related to experimental software
        usage. We cannot compensate for any irreversible losses but will do our best to prevent the
        worst case scenario.
      </p>

      <p>
        By using the services of DMND, you confirm that you are 21 years old and you are not
        breaking the laws of your country.
      </p>

      <LegalHeading>Disclaimer</LegalHeading>

      <p>
        The mining pool is not responsible for the safety of your coins. The mining pool does not
        keep your coins more than required for confirmation and creation of payouts. Keep your coins
        on official wallets or cryptocurrency exchanges.
      </p>

      <p>
        The mining pool is not responsible for the performance of your equipment. Only you are
        responsible for all the settings and configurations of your equipment.
      </p>

      <p>
        The mining pool is not responsible for any of your costs. You pay all your expenses, such as
        electricity, transportation, rent, and others.
      </p>

      <p>
        The mining pool is not responsible for the 100% uptime of our mining pools and website. We
        can disable our services for maintenance at any time convenient for us. You can configure
        the equipment to automatically change the mining pool for such cases.
      </p>

      <LegalHeading>Payouts</LegalHeading>

      <p>All mining pools provided by DMND have a reward system by found block.</p>

      <p>
        The miner receives a reward only if he finds a block. The miner does not receive a reward
        for shares or time spent.
      </p>

      <p>
        The fee for mining pools is 2% and deducted from the payout amount before the payment to the
        miners is done.
      </p>

      <LegalHeading>Force Majeure</LegalHeading>

      <p>
        In an event or circumstance which is beyond the control of Website, including but not
        limited to acts of Gods, riots, wars, floods, fires, explosion, strikes and other similar
        events, will not be held liable for any delay, failure or disruption to provide already
        committed mining services.
      </p>

      <LegalHeading>Inactive miners</LegalHeading>

      <p>
        We can reset the statistics of a miner if he/she has not been active for more than 90 days.
        Any remaining balance that the miner did not receive through its own fault (offline or
        invalid wallet) are considered donated to us.
      </p>

      <p className="mt-6 font-medium text-header-default">
        WE MAY MAKE CHANGES TO THESE TERMS OF SERVICE FROM TIME TO TIME. IF WE MAKE CHANGES, WE WILL
        NOTIFY YOU BY CHANGING THE DATE AT THE BOTTOM OF THIS TERMS
      </p>
    </LegalPage>
  );
}

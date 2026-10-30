import LegalPage, { LegalIntro } from './components/LegalPage.jsx';

export default function Privacy() {
  return (
    <LegalPage title="Privacy policy">
      <LegalIntro>
        THIS PRIVACY POLICY EXPLAINS HOW THE WEBSITE DMND (&quot;WEBSITE&quot;, &quot;MINING
        POOLS&quot;, &quot;WE&quot; OR &quot;US&quot;) COLLECTS, USES AND PROTECTS USERS
        (&quot;MINER&quot;, &quot;YOU&quot; OR &quot;YOUR&quot;) PERSONAL INFORMATION. BY USING THE
        DMND OR INTERACTING WITH US AS DESCRIBED BELOW, YOU CONFIRM THAT YOU ARE AWARE OF THIS
        PRIVACY POLICY AND YOU CONSENT TO OUR USING THE PERSONAL INFORMATION PROVIDED IN ACCORDANCE
        WITH THIS PRIVACY POLICY.
      </LegalIntro>

      <p>
        This policy applies to information we collect when you access or use our services: website,
        mining pools and APIs endpoints (collectively, &quot;DMND&quot;).
      </p>

      <p>
        We collect only Non-Personally Identifiable Information (Non-PII). Non-PII is information
        that does not by itself identify a specific individual. We get some information about you
        when you interact with DMND services. We may collect your IP addresses and cryptocurrency
        addresses, as well as request url, access time.
      </p>

      <p>
        Cookies are small text files that websites place on your device as you are browsing. They
        are processed and stored by your web browser. In and of themselves, cookies are harmless and
        serve crucial functions for websites. Cookies can also generally be easily viewed and
        deleted.
      </p>

      <p>
        Our website uses session cookies. Cookies are stored and processed only on your computer or
        mobile device. Cookies do not include your personal information.
      </p>

      <p>
        We use your data to operate effectively and provide the best experience with our services.
        This information is necessary for the correct working of miner shares accounting. This
        information is not shared with third parties and does not indicate your identity with public
        anonymous data on our services.
      </p>

      <p>
        We implement reasonable security practices and procedures to help protect the
        confidentiality and security of your information.
      </p>

      <p className="font-medium text-header-default">
        PLEASE NOTE: OUR PRIVACY POLICY CHANGES FROM TIME TO TIME AND CHANGES ARE EFFECTIVE UPON
        POSTING. PLEASE CHECK BACK FREQUENTLY FOR UPDATES AS IT IS YOUR SOLE RESPONSIBILITY TO BE
        AWARE OF CHANGES.
      </p>
    </LegalPage>
  );
}

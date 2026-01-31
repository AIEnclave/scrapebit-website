import type { Metadata } from 'next'
import Link from 'next/link'
import PublicHeader from '@/components/PublicHeader'
import PublicFooter from '@/components/PublicFooter'

export const metadata: Metadata = {
  title: 'Terms of Service - Scrapebit',
  description: 'Terms of Service and conditions for using Scrapebit web scraping platform.',
}

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen">
      <PublicHeader variant="light" currentPage="terms" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 pt-28">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Use</h1>
          <p className="text-gray-500">Effective Date: January 1, 2025</p>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed">
            The website located at <Link href="/" className="text-purple-600 hover:text-purple-700">scrapebit.com</Link> (the &quot;Site&quot;) is a copyrighted work belonging to Scrapebit (&quot;Company&quot;, &quot;us&quot;, &quot;our&quot;, and &quot;we&quot;). Certain features of the Site may be subject to additional guidelines, terms, or rules, which will be posted on the Site in connection with such features. All such additional terms, guidelines, and rules are incorporated by reference into these Terms.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            These Terms of Use (these &quot;Terms&quot;) set forth the legally binding terms and conditions that govern your use of the Site. By accessing or using the Site, you are accepting these Terms (on behalf of yourself or the entity that you represent), and you represent and warrant that you have the right, authority, and capacity to enter into these Terms (on behalf of yourself or the entity that you represent). You may not access or use the Site or accept the Terms if you are not at least 18 years old. If you do not agree with all of the provisions of these Terms, do not access and/or use the Site.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-8">
            <p className="text-sm text-yellow-800">
              <strong>PLEASE BE AWARE:</strong> Section 10.2 contains provisions governing how to resolve disputes between you and Company. Among other things, Section 10.2 includes an agreement to arbitrate which requires, with limited exceptions, that all disputes between you and us shall be resolved by binding and final arbitration. Section 10.2 also contains a class action and jury trial waiver. Please read Section 10.2 carefully.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Accounts</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.1 Account Creation</h3>
          <p className="text-gray-600 leading-relaxed">
            In order to use certain features of the Site, you must register for an account (&quot;Account&quot;) and provide certain information about yourself as prompted by the account registration form. You represent and warrant that: (a) all required registration information you submit is truthful and accurate; (b) you will maintain the accuracy of such information. You may delete your Account at any time, for any reason, by following the instructions on the Site. Company may suspend or terminate your Account in accordance with Section 8.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.2 Account Responsibilities</h3>
          <p className="text-gray-600 leading-relaxed">
            You are responsible for maintaining the confidentiality of your Account login information and are fully responsible for all activities that occur under your Account. You agree to immediately notify Company of any unauthorized use, or suspected unauthorized use of your Account or any other breach of security. Company cannot and will not be liable for any loss or damage arising from your failure to comply with the above requirements.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. Access to the Site</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1 License</h3>
          <p className="text-gray-600 leading-relaxed">
            Subject to these Terms, Company grants you a non-transferable, non-exclusive, revocable, limited license to use and access the Site solely for your own personal, noncommercial use.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2 Certain Restrictions</h3>
          <p className="text-gray-600 leading-relaxed">
            The rights granted to you in these Terms are subject to the following restrictions: (a) you shall not license, sell, rent, lease, transfer, assign, distribute, host, or otherwise commercially exploit the Site, whether in whole or in part, or any content displayed on the Site; (b) you shall not modify, make derivative works of, disassemble, reverse compile or reverse engineer any part of the Site; (c) you shall not access the Site in order to build a similar or competitive website, product, or service; and (d) except as expressly stated herein, no part of the Site may be copied, reproduced, distributed, republished, downloaded, displayed, posted or transmitted in any form or by any means.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.3 Modification</h3>
          <p className="text-gray-600 leading-relaxed">
            Company reserves the right, at any time, to modify, suspend, or discontinue the Site (in whole or in part) with or without notice to you. You agree that Company will not be liable to you or to any third party for any modification, suspension, or discontinuation of the Site or any part thereof.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.4 Ownership</h3>
          <p className="text-gray-600 leading-relaxed">
            Excluding any User Content that you may provide (defined below), you acknowledge that all the intellectual property rights, including copyrights, patents, trade marks, and trade secrets, in the Site and its content are owned by Company or Company&apos;s suppliers. Neither these Terms (nor your access to the Site) transfers to you or any third party any rights, title or interest in or to such intellectual property rights, except for the limited access rights expressly set forth in Section 2.1.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. User Content</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.1 User Content</h3>
          <p className="text-gray-600 leading-relaxed">
            &quot;User Content&quot; means any and all information and content that a user submits to, or uses with, the Site (e.g., content in the user&apos;s profile or postings). You are solely responsible for your User Content. You assume all risks associated with use of your User Content, including any reliance on its accuracy, completeness or usefulness by others, or any disclosure of your User Content that personally identifies you or any third party.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.2 License</h3>
          <p className="text-gray-600 leading-relaxed">
            You hereby grant (and you represent and warrant that you have the right to grant) to Company an irrevocable, nonexclusive, royalty-free and fully paid, worldwide license to reproduce, distribute, publicly display and perform, prepare derivative works of, incorporate into other works, and otherwise use and exploit your User Content, and to grant sublicenses of the foregoing rights, solely for the purposes of including your User Content in the Site.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.3 Acceptable Use Policy</h3>
          <p className="text-gray-600 leading-relaxed">
            You agree not to use the Site to collect, upload, transmit, display, or distribute any User Content (i) that violates any third-party right, including any copyright, trademark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right, (ii) that is unlawful, harassing, abusive, tortious, threatening, harmful, invasive of another&apos;s privacy, vulgar, defamatory, false, intentionally misleading, or otherwise objectionable, (iii) that is harmful to minors in any way, or (iv) that is in violation of any law, regulation, or obligations.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Indemnification</h2>
          <p className="text-gray-600 leading-relaxed">
            You agree to indemnify and hold Company (and its officers, employees, and agents) harmless, including costs and attorneys&apos; fees, from any claim or demand made by any third party due to or arising out of (a) your use of the Site, (b) your violation of these Terms, (c) your violation of applicable laws or regulations or (d) your User Content. Company reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Third-Party Links & Ads</h2>
          <p className="text-gray-600 leading-relaxed">
            The Site may contain links to third-party websites and services, and/or display advertisements for third parties (collectively, &quot;Third-Party Links & Ads&quot;). Such Third-Party Links & Ads are not under the control of Company, and Company is not responsible for any Third-Party Links & Ads. Company provides access to these Third-Party Links & Ads only as a convenience to you, and does not review, approve, monitor, endorse, warrant, or make any representations with respect to Third-Party Links & Ads.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Disclaimers</h2>
          <p className="text-gray-600 leading-relaxed uppercase text-sm">
            THE SITE IS PROVIDED ON AN &quot;AS-IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, AND COMPANY (AND OUR SUPPLIERS) EXPRESSLY DISCLAIM ANY AND ALL WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING ALL WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, ACCURACY, OR NON-INFRINGEMENT. WE (AND OUR SUPPLIERS) MAKE NO WARRANTY THAT THE SITE WILL MEET YOUR REQUIREMENTS, WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE BASIS, OR WILL BE ACCURATE, RELIABLE, FREE OF VIRUSES OR OTHER HARMFUL CODE, COMPLETE, LEGAL, OR SAFE.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. Limitation on Liability</h2>
          <p className="text-gray-600 leading-relaxed uppercase text-sm">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL COMPANY (OR OUR SUPPLIERS) BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFITS, LOST DATA, COSTS OF PROCUREMENT OF SUBSTITUTE PRODUCTS, OR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES ARISING FROM OR RELATING TO THESE TERMS OR YOUR USE OF, OR INABILITY TO USE, THE SITE, EVEN IF COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR LIABILITY TO YOU FOR ANY DAMAGES ARISING FROM OR RELATED TO THESE TERMS WILL AT ALL TIMES BE LIMITED TO A MAXIMUM OF FIFTY US DOLLARS ($50.00).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">8. Term and Termination</h2>
          <p className="text-gray-600 leading-relaxed">
            Subject to this Section, these Terms will remain in full force and effect while you use the Site. We may suspend or terminate your rights to use the Site (including your Account) at any time for any reason at our sole discretion, including for any use of the Site in violation of these Terms. Upon termination of your rights under these Terms, your Account and right to access and use the Site will terminate immediately. You understand that any termination of your Account may involve deletion of your User Content associated with your Account from our live databases.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">9. Copyright Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            Company respects the intellectual property of others and asks that users of our Site do the same. In connection with our Site, we have adopted and implemented a policy respecting copyright law that provides for the removal of any infringing materials and for the termination, in appropriate circumstances, of users of our online Site who are repeat infringers of intellectual property rights, including copyrights.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">10. General</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.1 Changes</h3>
          <p className="text-gray-600 leading-relaxed">
            These Terms are subject to occasional revision, and if we make any substantial changes, we may notify you by sending you an e-mail to the last e-mail address you provided to us (if any), and/or by prominently posting notice of the changes on our Site. Continued use of our Site following notice of such changes shall indicate your acknowledgement of such changes and agreement to be bound by the terms and conditions of such changes.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.2 Dispute Resolution</h3>
          <p className="text-gray-600 leading-relaxed">
            You agree that any dispute between you and Company relating in any way to the Site or these Terms will be resolved by binding arbitration, rather than in court, except that (1) you and Company may assert individualized claims in small claims court if the claims qualify; and (2) you or Company may seek equitable relief in court for infringement or other misuse of intellectual property rights.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.3 Entire Terms</h3>
          <p className="text-gray-600 leading-relaxed">
            These Terms constitute the entire agreement between you and us regarding the use of the Site. Our failure to exercise or enforce any right or provision of these Terms shall not operate as a waiver of such right or provision.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">11. Contact Information</h2>
          <div className="bg-gray-50 rounded-lg p-6 mt-4">
            <p className="text-gray-600">
              <strong>Dataotto</strong><br />
              Email: <a href="mailto:ashwinsingh632@gmail.com" className="text-purple-600 hover:text-purple-700">ashwinsingh632@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Last updated: January 1, 2025
          </p>
          <div className="mt-4 flex gap-4">
            <Link href="/privacy-policy" className="text-sm text-purple-600 hover:text-purple-700">
              Privacy Policy →
            </Link>
            <Link href="/refund-policy" className="text-sm text-purple-600 hover:text-purple-700">
              Refund Policy →
            </Link>
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  )
}

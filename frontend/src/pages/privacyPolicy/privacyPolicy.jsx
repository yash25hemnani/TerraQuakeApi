import MetaData from "../noPage/metaData";

export default function PrivacyPolicy() {
  return (
    <>
      <MetaData
        title='Privacy Policy'
        description='Privacy Policy Page of TerraQuake'
      />
      <div className='flex justify-center px-6 py-12 text-gray-200'>
        <div className='mt-20 max-w-4xl w-full shadow-2xl rounded-2xl p-8 space-y-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-center text-white'>
            Privacy Policy
          </h1>
          <p className='text-center text-sm text-gray-400 italic'>
            Last updated: 22-09-2025
          </p>

          <section className='space-y-4'>
            <p>
              TerraQuake ("we", "our", "us") respects your privacy. This Privacy
              Policy explains how we collect, use, and protect your data in
              compliance with GDPR, CCPA, and other applicable regulations.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              1. Data We Collect
            </h2>
            <ul className='list-disc list-inside space-y-2'>
              <li>Personal data: name, email, account information.</li>
              <li>
                Usage data: IP address, browser type, pages visited, API usage.
              </li>
              <li>
                Cookies and similar technologies for analytics and preferences.
              </li>
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              2. How We Use Your Data
            </h2>
            <ul className='list-disc list-inside space-y-2'>
              <li>Provide and maintain our services.</li>
              <li>Improve website and API functionality.</li>
              <li>Send updates or communications if consented.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              3. Legal Basis (GDPR)
            </h2>
            <p>
              We process your data based on your consent, contractual necessity,
              or legal obligations.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              4. Sharing Your Data
            </h2>
            <p>
              Data may be shared with service providers, hosting platforms, and
              API partners, strictly for purposes outlined in this Policy. We do
              not sell your personal information.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              5. User Rights (GDPR & CCPA)
            </h2>
            <ul className='list-disc list-inside space-y-2'>
              <li>Access, rectify, or delete your data.</li>
              <li>Withdraw consent at any time.</li>
              <li>Request data portability.</li>
              <li>Opt-out of sale of personal information (CCPA only).</li>
              <li>Object or restrict processing where applicable.</li>
            </ul>
            <p>
              To exercise these rights, contact us at{' '}
              <span className='text-pink-400 font-semibold'>
                support@terraquakeapi.com
              </span>
              .
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              6. Data Retention
            </h2>
            <p>
              We retain personal data only as long as necessary to provide
              services or comply with legal obligations.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              7. Cookies & Tracking
            </h2>
            <p>
              TerraQuake uses cookies and similar technologies for analytics and
              user experience. You may manage cookie preferences through your
              browser settings.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              8. International Transfers
            </h2>
            <p>
              Your data may be processed or stored outside your country. We take
              measures to ensure adequate protection in line with GDPR
              requirements.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              9. Security
            </h2>
            <p>
              We implement reasonable technical and organizational measures to
              protect your data against unauthorized access or disclosure.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              10. Changes to this Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically. Continued use of
              our services constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              11. Contact Information
            </h2>
            <p>
              Questions or requests regarding privacy? Contact us at{' '}
              <span className='text-pink-400 font-semibold'>
                support@terraquakeapi.com
              </span>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

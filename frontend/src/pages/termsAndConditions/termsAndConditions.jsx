import { Link } from 'react-router-dom';
import MetaData from '../noPage/metaData';

export default function TermsAndConditions() {
  return (
    <>
      <MetaData
        title='Terms and Conditions'
        description='Terms and Conditions Page of TerraQuake'
      />
      <div className='flex justify-center px-6 py-12 text-gray-200'>
        <div className='mt-20 max-w-4xl w-full shadow-2xl rounded-2xl p-8 space-y-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-center text-white'>
            Terms & Conditions
          </h1>
          <p className='text-center text-sm text-gray-400 italic'>
            Last updated: 22-09-2025
          </p>

          <section className='space-y-4'>
            <p>
              Welcome to <strong>TerraQuake</strong>. By accessing or using our
              website, services, or APIs, you agree to comply with these Terms
              and our
              <Link
                to='/privacy-policy'
                className='text-pink-400 underline'
              >
                Privacy Policy
              </Link>
              . Please read them carefully.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              1. General Information
            </h2>
            <p>
              TerraQuake provides access to seismic data, resources, and related
              tools. These Terms govern your use of our services, including the
              website, APIs, and related applications.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              2. Account & User Responsibilities
            </h2>
            <ul className='list-disc list-inside space-y-2'>
              <li>Use TerraQuake only for lawful and ethical purposes.</li>
              <li>
                Do not misuse services, attempt unauthorized access, or
                interfere with functionality.
              </li>
              <li>
                Provide accurate information when creating an account and
                maintain confidentiality of login credentials.
              </li>
              <li>
                Accounts may be suspended or terminated for violations of these
                Terms or Privacy Policy.
              </li>
              <li>
                By creating an account, you consent to the collection and
                processing of your personal data in accordance with our Privacy
                Policy.
              </li>
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              3. Intellectual Property
            </h2>
            <p>
              All content, branding, code, and data on TerraQuake (unless
              otherwise stated) are owned by TerraQuake or licensed to us. You
              may not copy, distribute, or commercially exploit our content
              without prior written consent.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              4. Use of Data & APIs
            </h2>
            <ul className='list-disc list-inside space-y-2'>
              <li>
                Data provided by TerraQuake is for informational and research
                purposes only.
              </li>
              <li>Do not misuse APIs or exceed rate limits.</li>
              <li>
                Redistribution or commercial use of data requires prior written
                consent.
              </li>
              <li>
                Decisions made based on provided information are at your own
                risk.
              </li>
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              5. Disclaimers
            </h2>
            <ul className='list-disc list-inside space-y-2'>
              <li>
                Services are provided “as is” and “as available” without
                warranties.
              </li>
              <li>
                TerraQuake is not liable for the accuracy or completeness of
                seismic data.
              </li>
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              6. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, TerraQuake and affiliates
              are not liable for indirect, incidental, or consequential damages
              from using or being unable to use our services.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              7. Third-Party Services & Links
            </h2>
            <p>
              TerraQuake may include links to third-party websites or services.
              We are not responsible for their content, accuracy, or privacy
              practices.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              8. Governing Law
            </h2>
            <p>
              These Terms are governed by international standards and the laws
              of Italy/Calabria. Disputes shall be subject to the jurisdiction
              of competent courts in Satriano, Italy.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              9. Force Majeure
            </h2>
            <p>
              TerraQuake is not liable for delays or failures caused by events
              beyond reasonable control, including natural disasters, power
              outages, or technical failures.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              10. Modifications
            </h2>
            <p>
              TerraQuake may update or modify these Terms at any time. Continued
              use implies acceptance.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold text-purple-400'>
              11. Contact Information
            </h2>
            <p>
              Questions about these Terms? Contact us at{' '}
              <span className='text-pink-400 font-semibold'>
                terraquakeapi@gmail.com
              </span>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

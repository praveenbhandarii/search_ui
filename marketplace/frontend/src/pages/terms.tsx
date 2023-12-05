import React from "react";
import Layout from "./component/layout/layout";
import Link from "next/link";

const terms = () => {
  return (
    <Layout>
      <div className="py-28 px-40">
        <div className="flex flex-col md:flex-row">
          <div className="order-2 md:order-1 md:w-1/2 text-center md:text-left">
            <img
              src="/lawyantra-color.svg"
              className="h-[30px] w-140"
              alt=" "
            />
          </div>
          <div className="order-1 md:order-2 md:w-1/2 text-center md:text-right">
            <Link href="/">
              <button className="bg-transperent border-2 px-4 hover:bg-secondrycolor transition hover:text-white hover:border-secondrycolor border-primarycolor rounded-full">
                Go back
              </button>
            </Link>
          </div>
        </div>
        <br />
        <div>
          <div className="text-5xl mt-10 mb-5 not-italic font-extrabold leading-normal text-[#353535] tracking-[-0.54px];">
            Terms & Conditions
          </div>

          <div className="grid text-2xl gap-4 grid-cols-1">
            <div className="font-bold">Last updated on 2 October 2023</div>
            <div>Easy, Matching You With Your Legal MVP</div>
            <div>
              Welcome to Lawyantra! Before you explore our platform and its
              offerings, we kindly request that you carefully read and
              understand the following terms and conditions.
            </div>
          </div>
        </div>
        <div>
          <div className=" text-[#353535] text-4xl mb-5 mt-10 not-italic font-bold leading-[157.523%] tracking-[-0.6px]">
            1. Acceptance of Terms
          </div>

          <div className="grid text-2xl gap-4 grid-cols-1">
            <div>
              By accessing or using our platform, you agree to comply with and
              be bound by these terms and conditions.
            </div>
          </div>
        </div>
        <div>
          <div className=" text-[#353535] text-4xl mb-5 mt-10 not-italic font-bold leading-[157.523%] tracking-[-0.6px]">
            2. User Eligibility
          </div>

          <div className="grid text-2xl gap-4 grid-cols-1">
            <div>
              You must be at least 18 years old and capable of forming a binding
              contract to use our services. If you are accessing the platform on
              behalf of a company or organization, you confirm that you have the
              authority to bind them.
            </div>
          </div>
        </div>
        <div>
          <div className=" text-[#353535] text-4xl mb-5 mt-10 not-italic font-bold leading-[157.523%] tracking-[-0.6px]">
            3. Privacy Policy
          </div>

          <div className="grid text-2xl gap-4 grid-cols-1">
            <div>
              Our Privacy Policy outlines how we collect, use, and safeguard
              your personal information. By using our platform, you consent to
              the practices described in the Privacy Policy.
            </div>
          </div>
        </div>
        <div>
          <div className=" text-[#353535] text-4xl mb-5 mt-10 not-italic font-bold leading-[157.523%] tracking-[-0.6px]">
            4. User Account
          </div>

          <div className="grid text-2xl gap-4 grid-cols-1">
            <div>
              To access certain features, you may need to create an account. You
              are responsible for maintaining the confidentiality of your
              account information and agree to accept responsibility for all
              activities that occur under your account.
            </div>
          </div>
        </div>
        <div>
          <div className=" text-[#353535] text-4xl mb-5 mt-10 not-italic font-bold leading-[157.523%] tracking-[-0.6px]">
            5. Intellectual Property
          </div>

          <div className="grid text-2xl gap-4 grid-cols-1">
            <div>
              All content on this platform, including text, graphics, logos, and
              images, is the property of Lawyantra and is protected by
              intellectual property laws. You may not use, reproduce, or
              distribute any content without our express permission.
            </div>
          </div>
        </div>
        <div>
          <div className=" text-[#353535] text-4xl mb-5 mt-10 not-italic font-bold leading-[157.523%] tracking-[-0.6px]">
            6. User Conduct
          </div>

          <div className="grid text-2xl gap-4 grid-cols-1">
            <div>
              You agree not to engage in any activity that may disrupt or
              interfere with the functionality of the platform or violate
              applicable laws.
            </div>
          </div>
        </div>
        <div>
          <div className=" text-[#353535] text-4xl mb-5 mt-10 not-italic font-bold leading-[157.523%] tracking-[-0.6px]">
            7. Legal Advice Disclaimer
          </div>

          <div className="grid text-2xl gap-4 grid-cols-1">
            <div>
              While we strive to provide accurate and up-to-date information,
              the content on this platform is for informational purposes only
              and does not constitute legal advice. Consult with a qualified
              professional for legal guidance.
            </div>
          </div>
        </div>
        <div>
          <div className=" text-[#353535] text-4xl mb-5 mt-10 not-italic font-bold leading-[157.523%] tracking-[-0.6px]">
            8. Termination of Services
          </div>

          <div className="grid text-2xl gap-4 grid-cols-1">
            <div>
              We reserve the right to terminate or suspend access to our
              platform at our discretion, without notice, for any conduct that
              we believe violates these terms or is harmful to other users or
              third parties.
            </div>
          </div>
        </div>
        <div>
          <div className=" text-[#353535] text-4xl mb-5 mt-10 not-italic font-bold leading-[157.523%] tracking-[-0.6px]">
            9. Modifications to Terms
          </div>

          <div className="grid text-2xl gap-4 grid-cols-1">
            <div>
              We may update or modify these terms at any time without prior
              notice. Continued use of the platform after changes constitutes
              acceptance of the modified terms.
            </div>
          </div>
        </div>
        <div>
          <div className=" text-[#353535] text-4xl mb-5 mt-10 not-italic font-bold leading-[157.523%] tracking-[-0.6px]">
            10. Contact Us{" "}
          </div>

          <div className="grid text-2xl gap-4 grid-cols-1">
            <div>
              If you have any questions or concerns about these terms, please
              contact us at contact@lawyantra.com
            </div>
          </div>
        </div>
        <div className="grid text-2xl gap-4 grid-cols-1">
          <div>
            Thank you for taking the time to review our terms and conditions.
            Your use of Lawyantra signifies your acceptance of these terms.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default terms;

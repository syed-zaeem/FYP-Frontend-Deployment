import Logo from "../Images/Logo-without-background.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-40">
      {/* Wave SVG */}
      <div className="w-full overflow-hidden leading-none relative -mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ede9fe"
            fillOpacity="1"
            d="M0,128L48,112C96,96,192,64,288,58.7C384,53,480,75,576,117.3C672,160,768,224,864,213.3C960,203,1056,117,1152,96C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="bg-violet-100 text-violet-800 pt-6 sm:pt-0 pb-10 transition duration-300 ease-in-out">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 transition duration-300 ease-in-out">
          <div className="grid text-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition duration-300 ease-in-out">
            {/* Logo and Description */}
            <div>
              <div className="flex justify-center">
                <img src={Logo} className="w-24 z-10 sm:-mt-8 md:-mt-12 lg:-mt-20" alt="Logo" />
              </div>
              <p className="mt-4 text-gray-600 transition duration-300 ease-in-out">
                Empowering content creators and researchers with cutting-edge
                tools to discover and analyze trending topics in Urdu media.
                From news analysis to customized topic generation, we make
                staying informed effortless.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-violet-600 transition duration-300 ease-in-out">
                Social Links
              </h3>
              <ul className="mt-4 space-y-2 transition duration-300 ease-in-out">
                <li>
                  <a
                    href="https://www.linkedin.com/company/center-for-language-engineering/"
                    target="_blank"
                    className="text-gray-600 hover:text-violet-800 transition duration-300 ease-in-out"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/centerforlanguageengineering/"
                    target="_blank"
                    className="text-gray-600 hover:text-violet-800 transition duration-300 ease-in-out"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/CenterForLanguageEngineering/"
                    target="_blank"
                    className="text-gray-600 hover:text-violet-800 transition duration-300 ease-in-out"
                  >
                    Facebook
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-violet-800 transition duration-300 ease-in-out"
                  >
                    Twitter
                  </a>
                </li> */}
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="text-lg font-semibold text-violet-600 transition duration-300 ease-in-out">
                Useful Links
              </h3>
              <ul className="mt-4 space-y-2 transition duration-300 ease-in-out">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-violet-800 transition duration-300 ease-in-out"
                  >
                    Home
                  </Link>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-violet-800 transition duration-300 ease-in-out"
                  >
                    Upload Video
                  </a>
                </li> */}
                <li>
                  <Link
                    to="/Register"
                    className="text-gray-600 hover:text-violet-800 transition duration-300 ease-in-out"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Login"
                    className="text-gray-600 hover:text-violet-800 transition duration-300 ease-in-out"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-violet-600">
                Contact Us
              </h3>
              <ul className="mt-4 space-y-2">
                <li className="text-gray-600">techtitans121526@gmail.com</li>
                <li className="text-gray-600">+9309-5273375</li>
                <li className="text-gray-600">G.T Road, Engineering University Lahore, Lahore, 39161</li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-10 border-t border-violet-200 pt-6 text-center">
            <p className="text-gray-600">
              &copy; 2025 name: All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

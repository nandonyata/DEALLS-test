import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark fixed-top">
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                {/* <span className="fs-5 d-none d-sm-inline">CMS</span> */}
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                  <li>
                    <Link href="/" className="nav-link px-0 align-middle" style={{ color: 'white' }}>
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/carts" className="nav-link px-0 align-middle" style={{ color: 'white' }}>
                      Carts
                    </Link>
                  </li>
                </ul>
                <hr />
                {/* <div className="pb-4">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                    <button>
                      <span class="d-none d-sm-inline mx-1 text-danger">Sign out</span>
                    </button>
                  </a>
              </div> */}
              </div>
            </div>
            <div className="col py-3">
              {/* <Component {...pageProps} /> */}
              {/* aaa */}
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import React from 'react';
import Header from '../Pages/Header';
import Footer from '../Pages/Footer';
import Copyright from '../Pages/CopyRights';

const PublicLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container py-4">{children}</main>
      <Footer />
      <Copyright />
    </div>
  );
};

export default PublicLayout;

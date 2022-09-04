import React from "react";

function Footer() {
  return (
    <div className="text-center text-muted pt-10">
      <p>
        Data provided by{" "}
        <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer" className="text-orange-800 hover:text-orange-600">
          openweathermap.org
        </a>
      </p>
      <p>Created by M.A.F</p>
    </div>
  );
}

export default Footer;

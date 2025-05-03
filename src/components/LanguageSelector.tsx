import React, {useState} from "react";
import {LANGUAGES} from "../constants";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

interface LanguageSelectorProps {
    language: string;
    onSelect: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onSelect }) => {
    const languages = Object.entries(LANGUAGES);

return (
  <div className="col-md-8">
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        Editor
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {language}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {languages.map(([lang, version], index) => (
              <button
                key={index}
                className="dropdown-item"
                onClick={() => onSelect(lang)}
              >
                {lang} <span className="text-muted">({version})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default LanguageSelector;
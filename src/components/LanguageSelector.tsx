import React from "react";
import {LANGUAGES} from "../constants";
import "../styles/LanguageSelector.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { getLanguages } from "../api";

interface LanguageSelectorProps {
    language: string;
    onSelect: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onSelect }) => {
    const [languages, setLanguages] = React.useState<{ [key: string]: string }>({});

    React.useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const data = await getLanguages();
                const languageList = LANGUAGES;
                const languageMap: { [key: string]: string } = {};
                data.forEach((langObj: any) => {
                    if (languageList.includes(langObj.language)){
                        languageMap[langObj.language] = langObj.version;
                    }
                });

                setLanguages(languageMap);
            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        };
        fetchLanguages();
    }, []);

    return (
        <div className="card-header">
            <div className="d-flex justify-content-between align-items-center w-100">
                <h5 className="mb-0">Editor</h5>
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
                    {Object.entries(languages).map(([lang, version], index) => (
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
    );
}

export default LanguageSelector;
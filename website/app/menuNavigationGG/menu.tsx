"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import style from "./menu.module.css";

import {
    PiCaretDownLight,
    PiCaretUpLight,
    PiUserCircleLight,
    PiGearLight,
    PiSignOutLight,
} from "react-icons/pi";

type LanguageName = "Eng" | "Rus" | "Arm";

type Language = {
    name: LanguageName;
    flagImg: string;
};

type Translation = {
    online: string;
    onlineGames: string;
    onlineApp: string;
    download: string;
    downloadGames: string;
    downloadApps: string;
    about: string;
    chatBuy: string;
    web: string;
    login: string;
    register: string;
    adminPanel: string;
    settings: string;
    logout: string;
    mainAdmin: string;
    fullAccess: string;
    news: string;
    GG_Ai: string;
};

type DropdownName = "online" | "download" | "web";

const languages: Language[] = [
    { name: "Eng", flagImg: "/imgFlag/UsaFlad_noc.png" },
    { name: "Rus", flagImg: "/imgFlag/Ruissa_flag.png" },
    { name: "Arm", flagImg: "/imgFlag/hy_flag.png" },
];

const translations: Record<LanguageName, Translation> = {
    Eng: {
        online: "Online",
        onlineGames: "Online Games",
        onlineApp: "Online App",
        download: "Download",
        downloadGames: "Download Games",
        downloadApps: "Download Apps",
        about: "About GameWebsite",
        chatBuy: "webChat",
        web: "Web",
        login: "Login",
        register: "Register",
        adminPanel: "Admin Panel",
        settings: "Settings",
        logout: "Logout",
        mainAdmin: "Main Admin",
        fullAccess: "Full access",
        news: "News",
        GG_Ai: "AI",
    },
    Rus: {
        online: "Онлайн",
        onlineGames: "Онлайн игры",
        onlineApp: "Онлайн приложение",
        download: "Скачать",
        downloadGames: "Скачать игры",
        downloadApps: "Скачать приложения",
        about: "О GameWebsite",
        chatBuy: "webChat",
        web: "Web",
        login: "Войти",
        register: "Регистрация",
        adminPanel: "Панель админа",
        settings: "Настройки",
        logout: "Выйти",
        mainAdmin: "Главный админ",
        fullAccess: "Полный доступ",
        news: "Новости",
        GG_Ai: "AI",
    },
    Arm: {
        online: "Օնլայն",
        onlineGames: "Օնլայն խաղեր",
        onlineApp: "Օնլայն հավելված",
        download: "Ներբեռնել",
        downloadGames: "Ներբեռնել խաղեր",
        downloadApps: "Ներբեռնել հավելվածներ",
        about: "GameWebsite-ի մասին",
        chatBuy: "webChat",
        web: "Web",
        login: "Մուտք",
        register: "Գրանցվել",
        adminPanel: "Ադմին պանել",
        settings: "Կարգավորումներ",
        logout: "Դուրս գալ",
        mainAdmin: "Գլխավոր Ադմին",
        fullAccess: "Ամբողջական հասանելիություն",
        news: "Նորություններ",
        GG_Ai: "AI",
    },
};

const Menull: FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const [languageOpen, setLanguageOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);
    const [isMainAdmin, setIsMainAdmin] = useState(false);
    const [selectedLang, setSelectedLang] =
        useState<LanguageName>("Eng");
    const [mobileDropdown, setMobileDropdown] =
        useState<DropdownName | null>(null);
    const [desktopDropdown, setDesktopDropdown] =
        useState<DropdownName | null>(null);

    useEffect(() => {
        const adminLogin = localStorage.getItem("mainAdminLoggedIn");
        setIsMainAdmin(adminLogin === "true");

        if (pathname.startsWith("/ru")) {
            setSelectedLang("Rus");
        } else if (pathname.startsWith("/arm")) {
            setSelectedLang("Arm");
        } else {
            setSelectedLang("Eng");
        }

        setDesktopDropdown(null);
    }, [pathname]);

    const t = translations[selectedLang];

    const currentLanguage =
        languages.find((language) => language.name === selectedLang) ??
        languages[0];

    const getLocalizedHref = (path: string) => {
        const cleanPath = path === "/" ? "" : path;

        if (selectedLang === "Rus") {
            return `/ru${cleanPath}`;
        }

        if (selectedLang === "Arm") {
            return `/arm${cleanPath}`;
        }

        return path;
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setMobileDropdown(null);
    };

    const toggleMenu = () => {
        setMenuOpen((previous) => !previous);
        setLanguageOpen(false);
        setAdminOpen(false);
        setMobileDropdown(null);
        setDesktopDropdown(null);
    };

    const toggleAdmin = () => {
        setAdminOpen((previous) => !previous);
        setLanguageOpen(false);
        setMenuOpen(false);
        setMobileDropdown(null);
        setDesktopDropdown(null);
    };

    const toggleMobileDropdown = (name: DropdownName) => {
        setMobileDropdown((current) => (current === name ? null : name));
    };

    const toggleDesktopDropdown = (name: DropdownName) => {
        setDesktopDropdown((current) => (current === name ? null : name));
    };

    const selectLanguage = (language: Language) => {
        setSelectedLang(language.name);
        localStorage.setItem("selectedLanguage", language.name);
        setLanguageOpen(false);
        setDesktopDropdown(null);
        closeMenu();

        let currentSubPath = pathname;

        if (currentSubPath.startsWith("/ru")) {
            currentSubPath =
                currentSubPath.replace(/^\/ru(?=\/|$)/, "") || "/";
        } else if (currentSubPath.startsWith("/arm")) {
            currentSubPath =
                currentSubPath.replace(/^\/arm(?=\/|$)/, "") || "/";
        }

        if (language.name === "Rus") {
            router.push(
                `/ru${currentSubPath === "/" ? "" : currentSubPath}`
            );
        } else if (language.name === "Arm") {
            router.push(
                `/arm${currentSubPath === "/" ? "" : currentSubPath}`
            );
        } else {
            router.push(currentSubPath);
        }
    };

    const logout = () => {
        localStorage.removeItem("mainAdminLoggedIn");
        setIsMainAdmin(false);
        setAdminOpen(false);
        closeMenu();
    };

    const onlineLinks = [
        {
            label: t.onlineGames,
            href: getLocalizedHref("/onlinegames"),
        },
        {
            label: t.onlineApp,
            href: getLocalizedHref("/onlineapp"),
        },
    ];

    const downloadLinks = [
        {
            label: t.downloadGames,
            href: getLocalizedHref("/domwlodGame"),
        },
        {
            label: t.downloadApps,
            href: getLocalizedHref("/downloadapps"),
        },
    ];

    const webLinks = [
        {
            label: t.GG_Ai,
            href: getLocalizedHref("/GG_Ai"),
        },
        {
            label: t.chatBuy,
            href: getLocalizedHref("/chat"),
        },
    ];

    const renderDesktopDropdown = (
        name: DropdownName,
        label: string,
        links: { label: string; href: string }[]
    ) => {
        const isOpen = desktopDropdown === name;

        return (
            <div className={style.dropdown_group}>
                <button
                    type="button"
                    className={style.dropdown_trigger}
                    onClick={() => toggleDesktopDropdown(name)}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={`desktop-${name}-menu`}
                >
                    <span>{label}</span>
                    {isOpen ? (
                        <PiCaretUpLight aria-hidden="true" />
                    ) : (
                        <PiCaretDownLight aria-hidden="true" />
                    )}
                </button>

                <div
                    id={`desktop-${name}-menu`}
                    className={`${style.dropdown_panel} ${
                        isOpen ? style.dropdown_panel_open : ""
                    }`}
                >
                    {links.map((link) => (
                        <Link
                            key={`${name}-${link.href}`}
                            className={style.dropdown_item}
                            href={link.href}
                            onClick={() => setDesktopDropdown(null)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    const renderMobileDropdown = (
        name: DropdownName,
        label: string,
        links: { label: string; href: string }[]
    ) => {
        const isOpen = mobileDropdown === name;

        return (
            <div className={style.mobile_dropdown_group}>
                <button
                    type="button"
                    className={style.mobile_dropdown_trigger}
                    onClick={() => toggleMobileDropdown(name)}
                    aria-expanded={isOpen}
                >
                    <span>{label}</span>
                    {isOpen ? (
                        <PiCaretUpLight aria-hidden="true" />
                    ) : (
                        <PiCaretDownLight aria-hidden="true" />
                    )}
                </button>

                {isOpen && (
                    <div className={style.mobile_submenu}>
                        {links.map((link) => (
                            <Link
                                key={`${name}-${link.href}`}
                                href={link.href}
                                className={style.mobile_link}
                                onClick={closeMenu}
                                tabIndex={menuOpen ? 0 : -1}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={style.estiner}>
            <div className={style.menu_continer}>
                <nav className={style.radiuse}>
                    <Link
                        href={getLocalizedHref("/")}
                        className={style.logo_link}
                        onClick={closeMenu}
                    >
                        <img src="/logo/Logo.png" alt="GameWebsite logo" />
                        <span>GameWebsite</span>
                    </Link>

                    <div className={style.nav_links}>
                        {renderDesktopDropdown(
                            "online",
                            t.online,
                            onlineLinks
                        )}

                        {renderDesktopDropdown(
                            "download",
                            t.download,
                            downloadLinks
                        )}

                        <Link
                            className={style.link_gg}
                            href={getLocalizedHref("/about")}
                            onClick={() => setDesktopDropdown(null)}
                        >
                            {t.about}
                        </Link>

                        <Link
                            className={style.link_gg}
                            href={getLocalizedHref("/news")}
                            onClick={() => setDesktopDropdown(null)}
                        >
                            {t.news}
                        </Link>

                        {renderDesktopDropdown("web", t.web, webLinks)}
                    </div>

                    <div className={style.right_side}>
                        <div className={style.leguges_div}>
                            <button
                                type="button"
                                className={`${style.btn_languge} ${
                                    languageOpen ? style.active : ""
                                }`}
                                onClick={() => {
                                    setLanguageOpen((previous) => !previous);
                                    setMenuOpen(false);
                                    setAdminOpen(false);
                                    setMobileDropdown(null);
                                    setDesktopDropdown(null);
                                }}
                                aria-expanded={languageOpen}
                                aria-label="Select language"
                            >
                                <span className={style.selected_flag}>
                                    <img
                                        src={currentLanguage.flagImg}
                                        alt={currentLanguage.name}
                                    />
                                </span>

                                <span>{currentLanguage.name}</span>

                                {languageOpen ? (
                                    <PiCaretUpLight aria-hidden="true" />
                                ) : (
                                    <PiCaretDownLight aria-hidden="true" />
                                )}
                            </button>

                            <div
                                className={`${style.lenguges_divP} ${
                                    languageOpen ? style.openGG : ""
                                }`}
                            >
                                {languages.map((language) => (
                                    <button
                                        key={language.name}
                                        type="button"
                                        className={`${
                                            style.lang_dropdown_item
                                        } ${
                                            selectedLang === language.name
                                                ? style.lang_selected
                                                : ""
                                        }`}
                                        onClick={() =>
                                            selectLanguage(language)
                                        }
                                    >
                                        <span className={style.language_flag}>
                                            <img
                                                src={language.flagImg}
                                                alt={language.name}
                                            />
                                        </span>
                                        <span>{language.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {isMainAdmin ? (
                            <div className={style.admin_profile}>
                                <button
                                    type="button"
                                    className={style.admin_button}
                                    onClick={toggleAdmin}
                                    aria-expanded={adminOpen}
                                    aria-label="Admin menu"
                                >
                                    <img
                                        src="/logo/Logo.png"
                                        alt="GameWebsite"
                                    />
                                    <span className={style.admin_a}>A</span>
                                </button>

                                <div
                                    className={`${
                                        style.admin_dropdown
                                    } ${
                                        adminOpen
                                            ? style.admin_dropdown_open
                                            : ""
                                    }`}
                                >
                                    <div className={style.admin_header}>
                                        <div className={style.admin_avatar}>
                                            A
                                        </div>

                                        <div>
                                            <strong>{t.mainAdmin}</strong>
                                            <small>{t.fullAccess}</small>
                                        </div>
                                    </div>

                                    <div className={style.admin_separator} />

                                    <Link
                                        href={getLocalizedHref("/admin")}
                                        className={style.admin_item}
                                        onClick={() => setAdminOpen(false)}
                                    >
                                        <PiUserCircleLight aria-hidden="true" />
                                        <span>{t.adminPanel}</span>
                                    </Link>

                                    <Link
                                        href={getLocalizedHref(
                                            "/admin/settings"
                                        )}
                                        className={style.admin_item}
                                        onClick={() => setAdminOpen(false)}
                                    >
                                        <PiGearLight aria-hidden="true" />
                                        <span>{t.settings}</span>
                                    </Link>

                                    <button
                                        type="button"
                                        className={style.admin_logout}
                                        onClick={logout}
                                    >
                                        <PiSignOutLight aria-hidden="true" />
                                        <span>{t.logout}</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={style.auth_links}>
                                <Link
                                    className={style.register_link}
                                    href={getLocalizedHref("/login")}
                                >
                                    {t.register}
                                </Link>

                                <Link
                                    className={style.link_ggL}
                                    href={getLocalizedHref("/login")}
                                >
                                    {t.login}
                                </Link>
                            </div>
                        )}

                        <button
                            type="button"
                            className={`${style.media_btn} ${
                                menuOpen ? style.active : ""
                            }`}
                            onClick={toggleMenu}
                            aria-label={
                                menuOpen ? "Close menu" : "Open menu"
                            }
                            aria-expanded={menuOpen}
                            aria-controls="mobile-navigation"
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>

                    <div
                        id="mobile-navigation"
                        className={`${style.mobile_menu} ${
                            menuOpen ? style.mobile_menu_active : ""
                        }`}
                        aria-hidden={!menuOpen}
                    >
                        {renderMobileDropdown(
                            "online",
                            t.online,
                            onlineLinks
                        )}

                        {renderMobileDropdown(
                            "download",
                            t.download,
                            downloadLinks
                        )}

                        <Link
                            href={getLocalizedHref("/about")}
                            className={style.mobile_link}
                            onClick={closeMenu}
                            tabIndex={menuOpen ? 0 : -1}
                        >
                            {t.about}
                        </Link>

                        <Link
                            href={getLocalizedHref("/news")}
                            className={style.mobile_link}
                            onClick={closeMenu}
                            tabIndex={menuOpen ? 0 : -1}
                        >
                            {t.news}
                        </Link>

                        {renderMobileDropdown("web", t.web, webLinks)}

                        {isMainAdmin && (
                            <Link
                                href={getLocalizedHref("/admin")}
                                className={style.mobile_admin}
                                onClick={closeMenu}
                                tabIndex={menuOpen ? 0 : -1}
                            >
                                <span className={style.mobile_admin_a}>A</span>
                                <span>{t.mainAdmin}</span>
                            </Link>
                        )}

                        {!isMainAdmin && (
                            <div className={style.mobile_auth_links}>
                                <Link
                                    href={getLocalizedHref("/login")}
                                    className={style.mobile_register}
                                    onClick={closeMenu}
                                    tabIndex={menuOpen ? 0 : -1}
                                >
                                    {t.register}
                                </Link>

                                <Link
                                    href={getLocalizedHref("/login")}
                                    className={style.mobile_login}
                                    onClick={closeMenu}
                                    tabIndex={menuOpen ? 0 : -1}
                                >
                                    {t.login}
                                </Link>
                            </div>
                        )}

                        {isMainAdmin && (
                            <button
                                type="button"
                                className={style.mobile_logout}
                                onClick={logout}
                                tabIndex={menuOpen ? 0 : -1}
                            >
                                <PiSignOutLight aria-hidden="true" />
                                <span>{t.logout}</span>
                            </button>
                        )}

                        <div className={style.mobile_languages}>
                            {languages.map((language) => (
                                <button
                                    key={language.name}
                                    type="button"
                                    className={`${
                                        style.mobile_language
                                    } ${
                                        selectedLang === language.name
                                            ? style.mobile_language_active
                                            : ""
                                    }`}
                                    onClick={() =>
                                        selectLanguage(language)
                                    }
                                    tabIndex={menuOpen ? 0 : -1}
                                >
                                    <span className={style.language_flag}>
                                        <img
                                            src={language.flagImg}
                                            alt={language.name}
                                        />
                                    </span>
                                    <span>{language.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Menull;
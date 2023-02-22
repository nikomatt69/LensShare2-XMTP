"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var solid_1 = require("@heroicons/react/20/solid");
var app_1 = require("src/store/app");
var react_1 = require("react");
var LoginWalletMobile_1 = require("../Login/LoginWalletMobile");
var BottomNav = function () {
    var currentProfile = app_1.useAppStore(function (state) { return state.currentProfile; });
    var _a = react_1.useState(true), homePage = _a[0], setHomePage = _a[1];
    return (React.createElement("div", null,
        React.createElement("nav", { className: "fixed bottom-0 left-0 right-0 h-[70px] rounded-t-md bg-blue-700 z-999 flex items-center justify-around px-4 py-3 shadow-md" },
            homePage ? (React.createElement(link_1["default"], { href: '/latest' },
                React.createElement("button", { onClick: function () {
                        {
                            setHomePage(false);
                        }
                    }, className: "text-white hover:text-gray-100 focus:outline-none focus:text-gray-100 border-gray-800" },
                    React.createElement("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }))))) : (React.createElement(link_1["default"], { href: '/' },
                React.createElement("button", { onClick: function () {
                        {
                            setHomePage(true);
                        }
                    }, className: "text-white hover:text-gray-100 focus:outline-none focus:text-gray-100 border-gray-800" },
                    React.createElement("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }))))),
            React.createElement(link_1["default"], { href: '/upload' },
                React.createElement("button", { className: "text-white hover:text-gray-100 focus:outline-none focus:text-gray-100 border-gray-800" },
                    React.createElement(solid_1.VideoCameraIcon, { className: "h-6 h-6 text-white-500" }),
                    ' ')),
            React.createElement("div", null,
                React.createElement(link_1["default"], { href: '/messages' },
                    React.createElement("button", { className: "text-white hover:text-gray-100 focus:outline-none focus:text-gray-100 border-gray-800" },
                        React.createElement(solid_1.ChatBubbleBottomCenterIcon, { className: "text-brand-500 h-6 w-6" }),
                        ' '))),
            React.createElement(link_1["default"], { href: '/discover' },
                React.createElement("button", { className: "text-white hover:text-gray-100 focus:outline-none focus:text-gray-100 border-gray-800" },
                    React.createElement("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" })))),
            currentProfile ? (React.createElement(link_1["default"], { href: "/profile/" + currentProfile.id, key: currentProfile.id },
                React.createElement("button", { className: "text-white hover:text-gray-100 focus:outline-none focus:text-gray-100 border-gray-800" },
                    React.createElement("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }))))) : (React.createElement(LoginWalletMobile_1["default"], null)))));
};
exports["default"] = BottomNav;

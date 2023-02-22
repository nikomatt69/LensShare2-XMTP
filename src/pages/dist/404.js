"use strict";
exports.__esModule = true;
var Button_1 = require("src/components/UI/Button");
var head_1 = require("next/head");
var link_1 = require("next/link");
var react_1 = require("react");
var constants_1 = require("@/constants");
function Custom404() {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(head_1["default"], null,
            react_1["default"].createElement("title", null, "404")),
        react_1["default"].createElement("div", { className: "flex flex-col items-center justify-start h-full mt-10 md:mt-20" },
            react_1["default"].createElement("img", { src: constants_1.APP_NAME + "/logo.png", alt: constants_1.APP_NAME, draggable: false, height: 50, width: 50 }),
            react_1["default"].createElement("div", { className: "py-10 text-center" },
                react_1["default"].createElement("h1", { className: "mb-4 text-3xl font-bold" }, "404"),
                react_1["default"].createElement("div", { className: "mb-6" }, "This page could not be found."),
                react_1["default"].createElement(link_1["default"], { href: "/" },
                    react_1["default"].createElement(Button_1.Button, null, "Go Home"))))));
}
exports["default"] = Custom404;

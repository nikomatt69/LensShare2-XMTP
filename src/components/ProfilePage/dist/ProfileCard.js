"use strict";
//this is just the profile pic and info 
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var FollowButton_1 = require("@/components/Buttons/FollowButton");
var app_1 = require("src/store/app");
var ProfileVideos_1 = require("@/components/ProfilePage/ProfileVideos");
var UnfollowButton_1 = require("../Buttons/UnfollowButton");
var getAvatar_1 = require("@/lib/getAvatar");
var CollectedVideos_1 = require("@/components/ProfilePage/CollectedVideos");
var Modal_1 = require("../UI/Modal");
var Followers_1 = require("./Followers");
var Following_1 = require("./Following");
var link_1 = require("next/link");
var ProfileCard = function (_a) {
    var profile = _a.profile, setFollowing = _a.setFollowing, following = _a.following;
    var currentProfile = app_1.useAppStore(function (state) { return state.currentProfile; });
    var _b = react_1.useState(true), showUserVideos = _b[0], setShowUserVideos = _b[1];
    var _c = react_1.useState(false), showFollowersModal = _c[0], setShowFollowersModal = _c[1];
    var _d = react_1.useState(false), showFollowingModal = _d[0], setShowFollowingModal = _d[1];
    var itsNotMe = (profile === null || profile === void 0 ? void 0 : profile.id) !== (currentProfile === null || currentProfile === void 0 ? void 0 : currentProfile.id);
    var videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
    var liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
    return (react_1["default"].createElement("div", { className: "flex justify-center mx-4" },
        react_1["default"].createElement("div", { className: "w-full max-w-[1150px]" },
            react_1["default"].createElement("div", { className: "flex border-4 border-grey rounded-3xl gap-3" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement(image_1["default"], { src: getAvatar_1["default"](profile), alt: "", height: 115, width: 115, className: "object-cover rounded-full" })),
                react_1["default"].createElement("div", { className: 'flex flex-col justify-center p-2' },
                    react_1["default"].createElement("h1", { className: "text-md font-semibold capitalize" }, profile === null || profile === void 0 ? void 0 : profile.name),
                    react_1["default"].createElement("span", { className: "text-md mt-2" }, profile === null || profile === void 0 ? void 0 : profile.handle),
                    react_1["default"].createElement("div", { className: "flex-shrink-0 " }, itsNotMe ? (react_1["default"].createElement("div", null, following ? (react_1["default"].createElement(UnfollowButton_1["default"], { setFollowing: setFollowing, profile: profile })) : (react_1["default"].createElement(FollowButton_1["default"], { setFollowing: setFollowing, profile: profile })))) : (react_1["default"].createElement("button", { className: 'active:bg-violet-600 py-1 px-3 drop-shadow-xl rounded-full text-sm mt-2 border-2 border-black  hover:text-[#000000] hover:bg-[#57B8FF] transition cursor-pointer bg-[#57B8FF] text-[#000000] font-semibold' },
                        react_1["default"].createElement(link_1["default"], { href: '/createstream' }, "GO LIVE")))))),
            react_1["default"].createElement("div", { className: "flex gap-4 mt-3 cursor-pointer", onClick: function () { setShowFollowingModal(!showFollowingModal); } },
                react_1["default"].createElement("div", { className: "flex items-center border-4 border-grey margin-1 rounded-3xl gap-2" },
                    react_1["default"].createElement("span", { className: "font-bold text-md" },
                        " ", profile === null || profile === void 0 ? void 0 :
                        profile.stats.totalFollowing,
                        " "),
                    react_1["default"].createElement("span", null, "Following"),
                    react_1["default"].createElement(Modal_1.Modal, { title: "Following", show: showFollowingModal, onClose: function () { return setShowFollowingModal(false); } },
                        react_1["default"].createElement(Following_1["default"], { profile: profile }))),
                react_1["default"].createElement("div", { className: "flex items-center border-4 border-grey margin-1 rounded-3xl gap-2 cursor-pointer", onClick: function () { setShowFollowersModal(!showFollowersModal); } },
                    react_1["default"].createElement("span", { className: "font-bold text-md" }, profile === null || profile === void 0 ? void 0 : profile.stats.totalFollowers),
                    react_1["default"].createElement("span", null, "Followers"),
                    react_1["default"].createElement(Modal_1.Modal, { title: "Followers", show: showFollowersModal, onClose: function () { return setShowFollowersModal(false); } },
                        react_1["default"].createElement(Followers_1["default"], { profileId: profile === null || profile === void 0 ? void 0 : profile.id })))),
            react_1["default"].createElement("div", { className: 'flex gap-10 p-5 border-b mb-5 mt-5  border-gray-200 bg-white w-full' },
                react_1["default"].createElement("span", { className: "text-md font-semibold cursor-pointer " + videos + " mt-2", onClick: function () { return setShowUserVideos(true); } }, "Videos"),
                react_1["default"].createElement("span", { className: "text-md font-semibold cursor-pointer " + liked + " mt-2", onClick: function () { return setShowUserVideos(false); } }, "Collected")),
            (showUserVideos) ? react_1["default"].createElement(ProfileVideos_1["default"], null) : react_1["default"].createElement(CollectedVideos_1["default"], { profile: profile }))));
};
exports["default"] = ProfileCard;

import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import chat from "@/assets/icons/chat.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import dollar from "@/assets/icons/dollar.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import lock from "@/assets/icons/lock.png";
import map from "@/assets/icons/map.png";
import marker from "@/assets/icons/marker.png";
import out from "@/assets/icons/out.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import point from "@/assets/icons/point.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import selectedMarker from "@/assets/icons/selected-marker.png";
import star from "@/assets/icons/star.png";
import target from "@/assets/icons/target.png";
import to from "@/assets/icons/to.png";
import check from "@/assets/images/check.png";
import getStarted from "@/assets/images/get-started.png";
import message from "@/assets/images/message.png";
import noResult from "@/assets/images/no-result.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import doctor from "@/assets/images/doctorr.png";
import medteam from "@/assets/images/medical-team.png";
import health from "@/assets/images/healthcare.png";
import ambulance from "@/assets/images/ambulance.png";

import signUpCar from "@/assets/images/signup-car.png";
import hosp from "@/assets/icons/hosp.png";


export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  getStarted,
  signUpCar,
  check,
  noResult,
  message,
  doctor,
  medteam,
  health,
  ambulance
};

export const icons = {
  arrowDown,
  arrowUp,
  backArrow,
  chat,
  checkmark,
  close,
  dollar,
  email,
  eyecross,
  google,
  home,
  list,
  lock,
  map,
  marker,
  out,
  person,
  pin,
  point,
  profile,
  search,
  selectedMarker,
  star,
  target,
  to,
  hosp,
};

export const onboarding = [
  {
    id: 1,
    title: "Emergency assistance is just a tap away!",
    description:
      "With our app, you can quickly summon an ambulance when every second counts.",
    image: images.ambulance,
  },
  {
    id: 2,
    title: "Meet your emergency response team.",
    description:
      "Our dedicated ambulance teams are ready to provide immediate care and support.",
    image: images.medteam, // Ensure this is the ambulance team image
  },
  {
    id: 3,
    title: "Your health matters most.",
    description:
      "We prioritize your well-being, connecting you with the right medical services fast.",
    image: images.health, // Ensure this is the heart image
  },
];

export const data = {
  onboarding,
};
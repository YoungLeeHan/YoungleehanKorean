import {
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineFileAdd,
  AiOutlineUnorderedList,
  AiOutlineRead,
  AiOutlineLock,
} from "react-icons/ai";
import { BsClipboard } from "react-icons/bs";
import learnerSVG from "../assets/images/Home/customer_learner.svg";
import parentsSVG from "../assets/images/Home/customer_parents.svg";
import teacherSVG from "../assets/images/Home/customer_teacher.svg";
import teacherImg from "../assets/images/Creator/teacherpic.png";

export const mobileWidth = 767;
export const desktopWidth = 1023;
export const maxWidth = 1170;
export const colorPurple = "#7b1fa2";
export const colorYellow = "#ffbf35";
export const colorGray = "#706866";
export const bgColorGray = "#f4f5f6";
export const bgColorBeige = "#f6f4ee";
export const bgColorWhite = "#fcfcfc";

export const userMenuData = [
  { _id: 0, name: "My Order", link: "user/orders", icon: AiOutlineShopping },
  { _id: 1, name: "Profile", link: "user/profile", icon: AiOutlineUser },
  {
    _id: 2,
    name: "Change Password",
    link: "user/profile/password",
    icon: AiOutlineLock,
  },
];

export const storyboxCreatorData = {
  image: teacherImg,
  title: `Why aren’t there more exercises?`,
  description:
    "While teaching Korean, I was often frustrated by the amount of exercises for each grammar point in the textbooks. I would search the web for worksheets to give my students the extra practice they needed to master a grammar point. However, that was still not enough, so I decided to create on my own.",
  buttonLinkTo: "/creator",
  buttonText: "About Creator",
};

export const storyboxStudentData = {
  image:
    "https://plus.unsplash.com/premium_photo-1682787494765-44d02d12f5be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: `I can’t have conversation after three years of learning`,
  description:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
};

export const testerWelcomeText = `
    Welcome! 👋
    <br /><br />
    For the optimal website experience, we invite you to log in using the following user credentials. Feel free to utilize a dummy card to simulate a purchase and explore all that we have to offer!
    <br />
    <br />
    <b>✅ User Info:</b>
    <br />• Email: ylh.user@gmail.com
    <br />• Pw: abcABC7@
    <br />
    <br />
    ❗️Please note: Do not enter your real credit card details. For any purchases, use a provided dummy credit card number instead.
    <br /><br />
    <b>✅ Dummy Credit Card:</b>
    <br />
    • Card#: 371449635398431
    <br />
    • Exp Date: 12/25
    <br />
    • CVV: 1234
`;

export const worksheetTextDataForOurStory = [
  {
    _id: 1,
    image:
      "https://images.unsplash.com/photo-1509909756405-be0199881695?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGZ1biUyMHN0dWR5fGVufDB8fDB8fHww",
    title: "Fun subjects",
    msg: "As a teacher of kids and adults, I have seen that students learn the best when having fun. My materials explore Korean through age-appropriate, entertaining subjects.",
  },
  {
    _id: 2,
    image:
      "https://images.unsplash.com/photo-1543269865-4430f94492b9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Practical Language",
    msg: "These worksheets are meticulously designed to immerse you in real-world scenarios, ensuring that every phrase you learn is directly applicable to daily conversations and practical situations in a Korean-speaking environment",
  },
  {
    _id: 3,
    image:
      "https://images.unsplash.com/photo-1635921185021-ce97e3e32fc5?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Accuracy",
    msg: "With a strong emphasis on linguistic precision, our worksheets guide you through the nuances of the Korean language, enhancing your ability to communicate with accuracy and confidence, whether in writing or speaking.",
  },
];

export const studentReviewForTeacher = [
  {
    name: "Catherine H.",
    msg: "With previous experience taking foreign language classes, I can say with confidence that Younghyung is the best instructor I have ever had. Her tutoring is personalized and detailed, moving at a pace that both ensures I am comfortable with the information and that pushes me to go further. Her explanations and materials are incredibly helpful and she is always willing to answer questions. She makes lessons fun and engaging and I look forward to every class. I have been learning with Younghyun for three years and will continue to do so. If you want to learn Korean and learn it correctly while having fun at the same time, I highly recommend taking lessons!",
  },
  {
    name: "Nikki D.",
    msg: "이 선생님 is one of the best Korean teachers I have ever met! I’ve studied online with other teachers and materials but her lessons actually stick with you. I struggled with grammar a lot but with her teaching the grammar just clicks. Her teaching style is friendly and fun, with cultural lessons along the way. Not only do you get to learn how to express yourself in Korean but you get to learn about the culture. I highly recommend this teacher!! You won’t ever regret that you did… because one day you’ll be creating your own complex Korean sentences. :)",
  },
  {
    name: "Mariah S.",
    msg: "Teacher Younghyun has been teaching my young children in twice weekly group lessons, and myself in weekly private lessons. I was initially impressed by her organization, preparation, and high energy. She consistently engages well with my kids and presents korean to the young children in a fun manner. I have seen great improvement in my kids korean skills. For adult private lessons, she is always well prepared with new materials and teaches the material in a dynamic and fun fashion. As a native speaker, Younghyun can explain in detail the grammar and provides real life examples in korean culture for the grammar and language being taught in video clips and music. I have been told that my Korean skills have improved greatly since starting my private lessons with Younghyun by others, and feel more comfortable speaking in public. I would highly recommend anyone considering learning korean to take lessons with Younghyun.",
  },
  {
    name: "Stephanie C.",
    msg: "선생님 is an outstanding teacher, one of the best. She has taught me, and 2 out of 3 of my children (8 and 6 years old) for the last 2 1/2 years. She has a positive and welcoming energy that immediately helps you feel comfortable in her classroom. It has helped me overcome my fears of speaking in Korean. She is well organized and always prepared. She makes lessons fun, engaging, and individualizes the content. My children have had a lot of speaking and listening practice, as well as learning hangul. I have seen them practice and initiate conversation in Korean since having her as a tutor. I highly recommend her for anyone looking for a Korean tutor.",
  },
  {
    name: "Katherine K.",
    msg: "My daughter started Korean language classes with Mrs. Lee twice a week from the age of 3. Over the past two years, my daughter's Korean speaking, writing, and reading skills have expanded considerably. Each class is structured with a set curriculum, so each lesson builds on the previous one and the kids can learn systematically. Each of the previous lessons are continually reinforced in the next. While the class has a set framework, Mrs. Lee is excellent at pivoting, engaging the kids with songs and activities that enhance the lesson, or just using the kids' conversations and curiosities to teach new vocabulary or grammar. It is amazing what she fits into 30 minutes! As an aside, as a Korean-American mom, with less than fluent Korean language skills, this class has also helped ME learn new things that I can then incorporate into everyday speaking and teaching with my daughter. Mrs. Lee is an excellent educator with a gift for working with children. I highly recommend her to any mom looking to teach their children Korean!",
  },
];

export const adminMenuData = [
  { _id: 0, name: "Dashboard", link: "admin", icon: BsClipboard },
  {
    _id: 1,
    name: "Product level category",
    link: "admin/category",
    icon: AiOutlineRead,
  },
  {
    _id: 2,
    name: "Product age category",
    link: "admin/ageCategory",
    icon: AiOutlineRead,
  },
  {
    _id: 3,
    name: "Create a new product",
    link: "admin/product",
    icon: AiOutlineFileAdd,
  },
  {
    _id: 4,
    name: "View products",
    link: "admin/products",
    icon: AiOutlineUnorderedList,
  },
  {
    _id: 5,
    name: "Blog category",
    link: "admin/blog/category",
    icon: AiOutlineRead,
  },
  {
    _id: 6,
    name: "Create a blog post",
    link: "admin/blog/createpost",
    icon: AiOutlineFileAdd,
  },
  {
    _id: 7,
    name: "View blog posts",
    link: "admin/blog/list",
    icon: AiOutlineUnorderedList,
  },
];

export const sliderSettingWithDots = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 300,
  cssEase: "linear",
  swipeToSlide: true,
  arrows: true,
};

export const sliderSettingWithoutDots = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 300,
  cssEase: "linear",
  swipeToSlide: true,
  arrows: true,
};

export const worksheetTextData = [
  {
    _id: 1,
    title: "Fun subjects",
    description:
      "As a teacher of kids and adults, I have seen that students learn the best when having fun. My materials explore Korean through age-appropriate, entertaining subjects.",
  },
  {
    _id: 2,
    title: "Practical Language",
    description:
      "These worksheets are meticulously designed to immerse you in real-world scenarios, ensuring that every phrase you learn is directly applicable to daily conversations and practical situations in a Korean-speaking environment",
  },
  {
    _id: 3,
    title: "Accuracy",
    description:
      "With a strong emphasis on linguistic precision, our worksheets guide you through the nuances of the Korean language, enhancing your ability to communicate with accuracy and confidence, whether in writing or speaking.",
  },
];

export const customerTypesData = [
  {
    _id: 1,
    name: "Language Learners",
    image: learnerSVG,
    msg: "I still struggle with verb endings after 3 years of learning.",
    subMsg:
      "Our materials will train your brain to grab the correct ending for the context of the sentence.",
    link: "/ourstory",
  },
  {
    _id: 2,
    name: "Parents",
    image: parentsSVG,
    msg: "It’s hard to get my kids excited about learning Korean with boring materials.",
    subMsg:
      "Our materials are interactive and thought-provoking, improving retention of the subject.",
    link: "/ourstory",
  },
  {
    _id: 3,
    name: "Korean Teachers",
    image: teacherSVG,
    msg: "I want to give my students practice exercises, but I don't have enough time to make them.",
    subMsg:
      "Our materials are loaded with exercises for each grammar point and each exercise includes an explanation of the context.",
    link: "/ourstory",
  },
];

export const studentReviewsData = [
  {
    _id: 1,
    name: "Priya G****",
    image:
      "https://images.unsplash.com/photo-1517256673644-36ad11246d21?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    msg: "Youngleehan Korean provides an engaging and interactive approach to mastering the Korean language.",
  },
  {
    _id: 2,
    name: "Alex C*****",
    image:
      "https://images.unsplash.com/photo-1545696968-1a5245650b36?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    msg: "Using the Youngleehan Korean's materials feels like having a personal guide through the rich tapestry of the Korean language.",
  },
  {
    _id: 3,
    name: "Emily N*****",
    image:
      "https://images.unsplash.com/photo-1529470839332-78ad660a6a82?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    msg: "These materials offer clear explanations and practical exercises that boost confidence and fluency.",
  },
];

export const faqDataColumn1 = [
  {
    _id: 1,
    question: "How To Learn Web Designing Step By Step?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui bland praesentium voluptatum deleniti atque corrupti quos dolores et quas excepturi provident.",
  },
  {
    _id: 2,
    question: "Can I add other information be added to an invoice?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui bland praesentium voluptatum deleniti atque corrupti quos dolores et quas excepturi provident.",
  },
  {
    _id: 3,
    question: "When should I use a new table vs. a view?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui bland praesentium voluptatum deleniti atque corrupti quos dolores et quas excepturi provident.",
  },
  {
    _id: 4,
    question: "How can transfer data from one base to another?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui bland praesentium voluptatum deleniti atque corrupti quos dolores et quas excepturi provident.",
  },
  {
    _id: 5,
    question: "How do I change my account email address?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui bland praesentium voluptatum deleniti atque corrupti quos dolores et quas excepturi provident.",
  },
];

export const faqDataColumn2 = [
  {
    _id: 1,
    question: "How does billing work?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui bland praesentium voluptatum deleniti atque corrupti quos dolores et quas excepturi provident.",
  },
  {
    _id: 2,
    question: "Can I share an individual app?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui bland praesentium voluptatum deleniti atque corrupti quos dolores et quas excepturi provident.",
  },
  {
    _id: 3,
    question: "Can invoices be sent to other collaborators?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui bland praesentium voluptatum deleniti atque corrupti quos dolores et quas excepturi provident.",
  },
  {
    _id: 4,
    question: "Learn web designing in basic lavel?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui bland praesentium voluptatum deleniti atque corrupti quos dolores et quas excepturi provident.",
  },
  {
    _id: 5,
    question: "Learn web designing in advance level?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui bland praesentium voluptatum deleniti atque corrupti quos dolores et quas excepturi provident.",
  },
];

// Quill Editor Settings 1
export const editorModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

// Quill Editor Settings 2
export const editorFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export const countryList = [
  "United States",
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "British Indian Ocean Territory",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Caribbean Netherlands",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "DR Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern and Antarctic Lands",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "North Korea",
  "North Macedonia",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn Islands",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Réunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Barthélemy",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "São Tomé and Príncipe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States Minor Outlying Islands",
  "Uruguay",
  "U.S. Virgin Islands",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const usStatesList = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

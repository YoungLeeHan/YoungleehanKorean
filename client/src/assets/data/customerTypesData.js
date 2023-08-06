import learnerSVG from "../images/Home/customer_learner.svg";
import parentsSVG from "../images/Home/customer_parents.svg";
import teacherSVG from "../images/Home/customer_teacher.svg";

export const customerTypesData = [
    {
        _id: 1,
        name: "Language Learners",
        image: learnerSVG,
        msg: "I still struggle with verb endings after 3 years of learning.",
        subMsg: "Our materials will train your brain to grab the correct ending for the context of the sentence.",
        link: "/",
    },
    {
        _id: 2,
        name: "Parents",
        image: parentsSVG,
        msg: "It’s hard to get my kids excited about learning Korean with boring materials.",
        subMsg: "Our materials are interactive and thought-provoking, improving retention of the subject.",
        link: "/",
    },
    {
        _id: 3,
        name: "Korean Teachers",
        image: teacherSVG,
        msg: "I want to give my students practice exercises, but I don't have enough time to make them.",
        subMsg: "Our materials are loaded with exercises for each grammar point and each exercise includes an explanation of the context.",
        link: "/",
    },
];

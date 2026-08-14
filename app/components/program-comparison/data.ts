// Content captured from the live GoAbroad study abroad directory
// (https://www.goabroad.com/study-abroad) so the prototype renders the
// same page the production directory renders.
import type {
    Ad,
    Article,
    FeaturedProgram,
    GuideSection,
    Interview,
    PopularSearchGroup,
    PremierAd,
    Review,
    SearchFilter,
} from "./types";

export const directory = {
    "id": 6,
    "name": "Study Abroad",
    "alias": "study-abroad"
};

export const breadcrumbs = [
    {
        "label": "Home",
        "link": "/"
    },
    {
        "label": "Study Abroad",
        "link": "/study-abroad"
    }
];

export const pageMeta = {
    "h1": "Study Abroad Programs",
    "explainerText": "Take your academic career abroad! Gain school credit, immerse in a new culture, and push yourself out of your comfort zone."
};

export const guideIntro = "Studying abroad is a transformative journey that goes beyond the classroom, offering you the chance to fully engage with a new culture, broaden your worldview, and build essential skills for your future career. Studying in a different country will help you become more adaptable, strengthens cross-cultural communication, and enhances problem-solving abilities. With diverse academic opportunities lasting anywhere from a few weeks to a full year, studying abroad will help you to grow both personally and professionally.\r\n";

export const guideTitle = "How to Study Abroad";

export const guideSections: GuideSection[] = [
    {
        "id": 27105,
        "title": "Types",
        "content": "<h3>Types of Study Abroad Programs</h3>\r\n<p>There are three common types of study abroad programs:</p>\r\n<ol>\r\n<li dir = \"auto\"><strong>Direct enrollment. </strong>This program allows you to study abroad in an international university, often alongside local students. Your course choices may be limited to classes in English, classes for international students, or classes designed for study abroad students, such as language and area studies. In some cases, you might be able to choose any courses offered at the university. These programs are ideal for any student and are usually the desired choice for upperclassmen who need classes in their major.</li>\r\n<li dir = \"auto\"><strong>Provider or University Program.</strong> The second type of study abroad program is one designed entirely by a study abroad provider or a university for international study abroad students. While there may be less interaction with local students, the curriculum may be ideally suited for you and other international students. You may also study alongside peers from around the world. These programs may last a week, a summer, a semester, or a year.</li>\r\n<li dir = \"auto\"><strong>Customized Program. </strong>The final type of study abroad is the customized program, or often referred to as the faculty-led program. This is a study abroad opportunity designed specifically for a group of students from one university and may or may not be hosted by an international university. This might include a research project in the field with other students and researchers, or it may be as simple as a trip organized by your professor visiting key destinations in his/her course.</li>\r\n</ol>\r\n<p>There are other types of study abroad opportunities, including service learning for university credit, internships abroad for academic credit, non-credit study abroad, including language school learning, or study programs abroad, excluding any credit. You might also consider an exchange program, which is typically a reciprocal agreement between your home university and another university, allowing students to swap places and pay their home tuition and fees.</p>\r\n"
    },
    {
        "id": 27106,
        "title": "Why",
        "content": "<h3>Why Study Abroad</h3>\r\n<p>The majority of students who study abroad report it to be their most significant learning experience during the university program. Students also often report studying abroad as a life-changing experience. It is one of the activities that will help you perform better overall at university, engage more with your classmates and faculty, and improve your communication skills and academic performance. There are <a href=https://www.goabroad.com/articles/study-abroad/why-study-abroad rel=\"\" target=\"_self\" class=\"link\">dozens of convincing reasons you should consider studying abroad</a>.</p>\r\n<p>Whether or not you study abroad for credit and how you utilize that credit is up to you.  For many students, this may be the most important question. Ask yourself important questions to decide why studying abroad might be a great choice for you. Do you want to satisfy some degree requirements? Check off some general studies or core requirements? Do you need a foreign language proficiency for your major? Do you feel like some parts of the world may be better settings for courses in your major?</p>\r\n<p>You might start by making a checklist of your goals in study abroad.  If your number one goal is to see Angkor Wat, any program to Cambodia might satisfy your goal. If your primary goal is to take Advanced Nuclear Physics, you need to find a program that offers this class, teaches in English, and allows international students to enroll in advanced courses in Nuclear Physics. If language acquisition is your goal, be sure the study abroad program offers language classes for foreign speakers and that they offer these classes at all levels.</p>\r\n"
    },
    {
        "id": 27107,
        "title": "Benefits",
        "content": "<h3>Benefits of Studying Abroad</h3>\r\n<p>There are countless benefits to studying abroad—broadened horizons, new perspectives, and marketable skills! If you’re interested in a career in international sectors or in the humanities, then studying abroad is a no-brainer. Your cross-cultural communication skills will improve tenfold, and you’ll have the opportunity to study a new language as well. But even if your long-term career goals aren’t internationally-oriented, you’ll still come away from study abroad as a more well-rounded person with cool stories to tell, having learned more than a few new things about yourself in the process.</p>\r\n<p>You know all this, the real benefit will be the internal rewards you get from this experience. You will have memories that last a lifetime, you may make friends who you will be close to for the rest of your life, and you will look at the world through a new set of eyes.  The transformation is so profound that students occasionally change their major, decide a career choice and perhaps modify their entire life plan after studying abroad.</p>\r\n<p>There are many more <a href=https://www.goabroad.com/articles/study-abroad/6-ways-studying-abroad-impacts-your-life rel=\"\" target=\"_self\" class=\"link\">benefits of studying abroad you've never even thought of</a>, too.</p>\r\n"
    },
    {
        "id": 27108,
        "title": "Funding",
        "content": "<h3>Study Abroad Scholarships &amp; Funding</h3>\r\n<p>Many students need financial help in order to study abroad. If you’re studying abroad and you expect to earn credits, federal financial aid may help cover the costs. Each university has its own policies, but most US universities will allow you to utilize federal financial aid as long as your credits are pre-approved and you enroll in the minimum number of classes to remain full-time (typically 12 credit hours during the semester and 6-9 credits in the summer. The best way to be sure is to consult your financial aid advisor, meet with your study abroad office, and talk to your academic advisor to be sure your credits will count. Institutional aid or scholarships from your home university have varied policies regarding their application to study abroad. Often, institutional aid is simply a discount and may not be used for study abroad. Other schools support study abroad and are willing to subsidize the experience by allowing your aid to be utilized.</p>\r\n<p>If you don’t <a href=https://www.goabroad.com/articles/study-abroad/financial-aid-for-study-abroad rel=\"\" target=\"_self\" class=\"link\">receive financial aid</a>, or if you’re studying through a university or provider where you can’t apply your typical aid, then you may need to rely on <a href=https://www.goabroad.com/scholarships-abroad/study-abroad rel=\"\" target=\"_self\" class=\"link\">study abroad scholarships</a>, <a href=https://www.goabroad.com/travel-resources/study-abroad-loans rel=\"\" target=\"_self\" class=\"link\">study abroad loans</a>, or crowdfunding platforms like <a href=https://www.fundmytravel.com/ rel=\"\" target=\"_blank\" class=\"link\">FundMyTravel</a>. Your study abroad department will also be a great lead on where to find study abroad scholarships and how to qualify. If you get creative, there are many other <a href=https://www.goabroad.com/articles/study-abroad/paying-for-study-abroad rel=\"\" target=\"_self\" class=\"link\">ways of paying for study abroad</a>.</p>\r\n"
    }
];

export const faqs: GuideSection[] = [
    {
        "id": 16055,
        "title": "What is study abroad?",
        "content": "<p>To put it simply, study abroad is a set time (perhaps a semester or year) when you pursue your academics overseas. This can be through a program at your home university, or it can be through an independent study abroad company in coordination with your university or degree program. Although studying abroad is typically done during college, <a href=https://www.goabroad.com/highschool-study-abroad rel=\"\" target=\"_self\" class=\"link\">you can try it out in high school too!</a></p>\r\n"
    },
    {
        "id": 16056,
        "title": "Can I study abroad?",
        "content": "<p>You absolutely can study abroad! There may be a few requirements through your university, degree program, or study abroad provider though. For instance, some universities don’t allow you to study abroad with a GPA under 3.0. You’ll also need to consider your academic goals and how studying abroad fits in. For instance, are you an accounting major? You can still study abroad of course, but it may be a bit more difficult for you to find an opportunity in your degree track. Be sure to speak with your study abroad department or academic advisor to figure out the best move for you.</p>\r\n<ul>\r\n<li><a href=https://www.goabroad.com/articles/study-abroad/ways-to-study-abroad rel=\"\" target=\"_self\" class=\"link\">8 Ways to Study Abroad</a></li>\r\n<li><a href=https://www.goabroad.com/articles/study-abroad/how-to-study-abroad-with-a-low-gpa rel=\"\" target=\"_self\" class=\"link\">Help! I Want to Study Abroad...But I Have a Low GPA</a></li>\r\n</ul>\r\n"
    },
    {
        "id": 16057,
        "title": "How long is study abroad?",
        "content": "<p>Your study abroad program could be as short as two weeks, and as long as a full academic year. It could be during any season, and during any year of your academic career. How long your study abroad program lasts is up to you and your goals! Do you want to come home fluent in a second language? Then maybe a full academic year abroad is the right choice for you. Do you want to take fun electives or knock out a few additional credits outside the regular school year? Consider studying abroad for a couple months during the summer. Your study abroad department, academic advisor, and program coordinator will be able to help you decide.</p>\r\n<p></p>\r\n<p>And by the way, if you’re interested in earning your full degree abroad, <a href=https://www.goabroad.com/degree-abroad rel=\"\" target=\"_self\" class=\"link\">there are lots of options!</a></p>\r\n<ul>\r\n<li><a href=https://www.goabroad.com/articles/study-abroad/how-long-should-i-study-abroad rel=\"\" target=\"_self\" class=\"link\">How Long Should I Study Abroad?</a></li>\r\n<li><a href=https://www.goabroad.com/articles/study-abroad/what-majors-can-study-abroad rel=\"\" target=\"_self\" class=\"link\">What Majors Can Study Abroad?</a></li>\r\n</ul>\r\n"
    },
    {
        "id": 16058,
        "title": "What are some benefits of studying abroad?",
        "content": "<p>There are countless benefits to studying abroad—broadened horizons, new perspectives, and marketable skills, just to name a few! If you’re interested in a career in international sectors or in the humanities, then studying abroad is a no brainer. Your cross cultural communication skills will improve tenfold, and you’ll have the opportunity to study a new language as well. But even if your long term career goals aren’t internationally-oriented, you’ll still come away from study abroad as a more well-rounded person with cool stories to tell, having had learned more than a few new things about yourself in the process.</p>\r\n<ul>\r\n<li><a href=https://www.goabroad.com/articles/study-abroad/6-ways-studying-abroad-impacts-your-life rel=\"\" target=\"_self\" class=\"link\">6 Unsung Benefits of Studying Abroad</a></li>\r\n<li><a href=https://www.goabroad.com/articles/study-abroad/why-study-abroad rel=\"\" target=\"_self\" class=\"link\">Why Study Abroad? 13 Super-Convincing Reasons</a></li>\r\n</ul>\r\n"
    },
    {
        "id": 16059,
        "title": "How to get scholarships to study abroad",
        "content": "<p>Most students need financial help in order to study abroad. If you’re studying abroad through your home university, the financial aid and scholarships you normally receive each semester will most likely cover at least part of the tuition. However, you’ll want to check with your financial aid office about the specifics.</p>\r\n<p></p>\r\n<p>If you don’t receive financial aid, or if you’re studying through a university or provider where you can’t apply your typical aid, then you may need to rely on <a href=https://www.goabroad.com/scholarships-abroad/study-abroad rel=\"\" target=\"_self\" class=\"link\">study abroad scholarships</a>, <a href=https://www.goabroad.com/travel-resources/study-abroad-loans rel=\"\" target=\"_self\" class=\"link\">study abroad loans</a>, or crowdfunding platforms like <a href=https://www.fundmytravel.com/ rel=\"\" target=\"_self\" class=\"link\">FundMyTravel</a>.</p>\r\n<p></p>\r\n<p>Your study abroad department will be a great lead on where to find study abroad scholarships and how to qualify. We’ve also put together the resources below to help you learn more about finding and securing funding for your study abroad experience.</p>\r\n<ul>\r\n<li><a href=https://www.goabroad.com/articles/study-abroad/paying-for-study-abroad rel=\"\" target=\"_self\" class=\"link\">21 Ideas for Paying for Study Abroad</a></li>\r\n<li><a href=https://www.goabroad.com/articles/study-abroad/financial-aid-for-study-abroad rel=\"\" target=\"_self\" class=\"link\">5 FAQs on Financial Aid for Study Abroad Answered</a></li>\r\n</ul>\r\n"
    },
    {
        "id": 16060,
        "title": "What are the best study abroad programs like?",
        "content": "<p>With so many study abroad programs available to you, how can you be sure which one is the one? To find the study abroad program that will suit you best, you’ll need to narrow down your goals. What do you want to learn? What do you want to see? Who do you want to be after studying abroad? Do you want 24/7 on-site support, pre-departure assistance, and resume writing help? And what are your absolute dealbreakers? Once you have your answers, it’ll be easy to find the best study abroad programs for you.</p>\r\n"
    }
];

export const searchFilters: SearchFilter[] = [
    {
        "filter": "country_id",
        "label": "Choose a Country",
        "fieldName": "Country",
        "options": [
            {
                "id": 104,
                "value": "online",
                "label": "Online"
            },
            {
                "id": 220,
                "value": "antarctica",
                "label": "Antarctica"
            },
            {
                "id": 115,
                "value": "antigua-barbuda",
                "label": "Antigua & Barbuda"
            },
            {
                "id": 3,
                "value": "argentina",
                "label": "Argentina"
            },
            {
                "id": 1,
                "value": "armenia",
                "label": "Armenia"
            },
            {
                "id": 2109,
                "value": "aruba",
                "label": "Aruba"
            },
            {
                "id": 4,
                "value": "australia",
                "label": "Australia"
            },
            {
                "id": 5,
                "value": "austria",
                "label": "Austria"
            },
            {
                "id": 116,
                "value": "azerbaijan",
                "label": "Azerbaijan"
            },
            {
                "id": 117,
                "value": "bahamas",
                "label": "Bahamas"
            },
            {
                "id": 118,
                "value": "barbados",
                "label": "Barbados"
            },
            {
                "id": 7,
                "value": "belgium",
                "label": "Belgium"
            },
            {
                "id": 8,
                "value": "belize",
                "label": "Belize"
            },
            {
                "id": 122,
                "value": "bhutan",
                "label": "Bhutan"
            },
            {
                "id": 10,
                "value": "bolivia",
                "label": "Bolivia"
            },
            {
                "id": 123,
                "value": "bosnia-and-herzegovina",
                "label": "Bosnia & Herzegovina"
            },
            {
                "id": 124,
                "value": "botswana",
                "label": "Botswana"
            },
            {
                "id": 11,
                "value": "brazil",
                "label": "Brazil"
            },
            {
                "id": 243,
                "value": "british-virgin-islands",
                "label": "British Virgin Islands"
            },
            {
                "id": 12,
                "value": "bulgaria",
                "label": "Bulgaria"
            },
            {
                "id": 128,
                "value": "cambodia",
                "label": "Cambodia"
            },
            {
                "id": 129,
                "value": "cameroon",
                "label": "Cameroon"
            },
            {
                "id": 13,
                "value": "canada",
                "label": "Canada"
            },
            {
                "id": 1059,
                "value": "cape-verde",
                "label": "Cape Verde"
            },
            {
                "id": 15,
                "value": "chile",
                "label": "Chile"
            },
            {
                "id": 16,
                "value": "china",
                "label": "China"
            },
            {
                "id": 103,
                "value": "colombia",
                "label": "Colombia"
            },
            {
                "id": 17,
                "value": "costa-rica",
                "label": "Costa Rica"
            },
            {
                "id": 98,
                "value": "croatia",
                "label": "Croatia"
            },
            {
                "id": 18,
                "value": "cuba",
                "label": "Cuba"
            },
            {
                "id": 2567,
                "value": "curacao",
                "label": "Curacao"
            },
            {
                "id": 19,
                "value": "cyprus",
                "label": "Cyprus"
            },
            {
                "id": 20,
                "value": "czech-republic",
                "label": "Czech Republic"
            },
            {
                "id": 21,
                "value": "denmark",
                "label": "Denmark"
            },
            {
                "id": 136,
                "value": "dominica",
                "label": "Dominica"
            },
            {
                "id": 22,
                "value": "dominican-republic",
                "label": "Dominican Republic"
            },
            {
                "id": 23,
                "value": "ecuador",
                "label": "Ecuador"
            },
            {
                "id": 24,
                "value": "egypt",
                "label": "Egypt"
            },
            {
                "id": 27,
                "value": "england",
                "label": "England"
            },
            {
                "id": 28,
                "value": "estonia",
                "label": "Estonia"
            },
            {
                "id": 140,
                "value": "fiji",
                "label": "Fiji"
            },
            {
                "id": 31,
                "value": "france",
                "label": "France"
            },
            {
                "id": 143,
                "value": "georgia",
                "label": "Georgia"
            },
            {
                "id": 32,
                "value": "germany",
                "label": "Germany"
            },
            {
                "id": 33,
                "value": "ghana",
                "label": "Ghana"
            },
            {
                "id": 1056,
                "value": "gibraltar",
                "label": "Gibraltar"
            },
            {
                "id": 34,
                "value": "greece",
                "label": "Greece"
            },
            {
                "id": 144,
                "value": "grenada",
                "label": "Grenada"
            },
            {
                "id": 241,
                "value": "guadeloupe",
                "label": "Guadeloupe"
            },
            {
                "id": 35,
                "value": "guatemala",
                "label": "Guatemala"
            },
            {
                "id": 145,
                "value": "guinea",
                "label": "Guinea"
            },
            {
                "id": 148,
                "value": "haiti",
                "label": "Haiti"
            },
            {
                "id": 219,
                "value": "hawaii-usa",
                "label": "Hawaii (USA)"
            },
            {
                "id": 37,
                "value": "hungary",
                "label": "Hungary"
            },
            {
                "id": 38,
                "value": "iceland",
                "label": "Iceland"
            },
            {
                "id": 39,
                "value": "india",
                "label": "India"
            },
            {
                "id": 40,
                "value": "indonesia",
                "label": "Indonesia"
            },
            {
                "id": 41,
                "value": "ireland",
                "label": "Ireland"
            },
            {
                "id": 42,
                "value": "israel",
                "label": "Israel"
            },
            {
                "id": 43,
                "value": "italy",
                "label": "Italy"
            },
            {
                "id": 45,
                "value": "jamaica",
                "label": "Jamaica"
            },
            {
                "id": 46,
                "value": "japan",
                "label": "Japan"
            },
            {
                "id": 47,
                "value": "jordan",
                "label": "Jordan"
            },
            {
                "id": 151,
                "value": "kazakhstan",
                "label": "Kazakhstan"
            },
            {
                "id": 48,
                "value": "kenya",
                "label": "Kenya"
            },
            {
                "id": 49,
                "value": "korea",
                "label": "Korea"
            },
            {
                "id": 240,
                "value": "kosovo",
                "label": "Kosovo"
            },
            {
                "id": 50,
                "value": "kuwait",
                "label": "Kuwait"
            },
            {
                "id": 153,
                "value": "kyrgyzstan",
                "label": "Kyrgyzstan"
            },
            {
                "id": 154,
                "value": "laos",
                "label": "Laos"
            },
            {
                "id": 51,
                "value": "latvia",
                "label": "Latvia"
            },
            {
                "id": 155,
                "value": "lebanon",
                "label": "Lebanon"
            },
            {
                "id": 52,
                "value": "lithuania",
                "label": "Lithuania"
            },
            {
                "id": 161,
                "value": "madagascar",
                "label": "Madagascar"
            },
            {
                "id": 162,
                "value": "malawi",
                "label": "Malawi"
            },
            {
                "id": 54,
                "value": "malaysia",
                "label": "Malaysia"
            },
            {
                "id": 55,
                "value": "malta",
                "label": "Malta"
            },
            {
                "id": 56,
                "value": "martinique",
                "label": "Martinique"
            },
            {
                "id": 167,
                "value": "mauritius",
                "label": "Mauritius"
            },
            {
                "id": 57,
                "value": "mexico",
                "label": "Mexico"
            },
            {
                "id": 169,
                "value": "moldova",
                "label": "Moldova"
            },
            {
                "id": 170,
                "value": "monaco",
                "label": "Monaco"
            },
            {
                "id": 171,
                "value": "mongolia",
                "label": "Mongolia"
            },
            {
                "id": 58,
                "value": "morocco",
                "label": "Morocco"
            },
            {
                "id": 172,
                "value": "mozambique",
                "label": "Mozambique"
            },
            {
                "id": 104,
                "value": "multiple-countries",
                "label": "Multiple Countries"
            },
            {
                "id": 173,
                "value": "myanmar",
                "label": "Myanmar"
            },
            {
                "id": 59,
                "value": "namibia",
                "label": "Namibia"
            },
            {
                "id": 60,
                "value": "nepal",
                "label": "Nepal"
            },
            {
                "id": 61,
                "value": "netherlands",
                "label": "Netherlands"
            },
            {
                "id": 62,
                "value": "new-zealand",
                "label": "New Zealand"
            },
            {
                "id": 63,
                "value": "nicaragua",
                "label": "Nicaragua"
            },
            {
                "id": 175,
                "value": "nigeria",
                "label": "Nigeria"
            },
            {
                "id": 176,
                "value": "northern-cyprus",
                "label": "Northern Cyprus"
            },
            {
                "id": 65,
                "value": "northern-ireland",
                "label": "Northern Ireland"
            },
            {
                "id": 66,
                "value": "norway",
                "label": "Norway"
            },
            {
                "id": 178,
                "value": "pakistan",
                "label": "Pakistan"
            },
            {
                "id": 179,
                "value": "palau",
                "label": "Palau"
            },
            {
                "id": 217,
                "value": "palestine",
                "label": "Palestine"
            },
            {
                "id": 67,
                "value": "panama",
                "label": "Panama"
            },
            {
                "id": 181,
                "value": "paraguay",
                "label": "Paraguay"
            },
            {
                "id": 68,
                "value": "peru",
                "label": "Peru"
            },
            {
                "id": 69,
                "value": "philippines",
                "label": "Philippines"
            },
            {
                "id": 70,
                "value": "poland",
                "label": "Poland"
            },
            {
                "id": 71,
                "value": "polynesia",
                "label": "Polynesia"
            },
            {
                "id": 72,
                "value": "portugal",
                "label": "Portugal"
            },
            {
                "id": 73,
                "value": "puerto-rico",
                "label": "Puerto Rico"
            },
            {
                "id": 74,
                "value": "romania",
                "label": "Romania"
            },
            {
                "id": 75,
                "value": "russia",
                "label": "Russia"
            },
            {
                "id": 183,
                "value": "rwanda",
                "label": "Rwanda"
            },
            {
                "id": 2375,
                "value": "saba",
                "label": "Saba"
            },
            {
                "id": 1380,
                "value": "saint-helena",
                "label": "Saint Helena"
            },
            {
                "id": 211,
                "value": "samoa",
                "label": "Samoa"
            },
            {
                "id": 188,
                "value": "saudi-arabia",
                "label": "Saudi Arabia"
            },
            {
                "id": 77,
                "value": "scotland",
                "label": "Scotland"
            },
            {
                "id": 78,
                "value": "senegal",
                "label": "Senegal"
            },
            {
                "id": 1510,
                "value": "serbia",
                "label": "Serbia"
            },
            {
                "id": 79,
                "value": "singapore",
                "label": "Singapore"
            },
            {
                "id": 1320,
                "value": "sint-maarten",
                "label": "Sint Maarten"
            },
            {
                "id": 191,
                "value": "slovakia",
                "label": "Slovakia"
            },
            {
                "id": 192,
                "value": "slovenia",
                "label": "Slovenia"
            },
            {
                "id": 80,
                "value": "south-africa",
                "label": "South Africa"
            },
            {
                "id": 49,
                "value": "south-korea",
                "label": "South Korea"
            },
            {
                "id": 82,
                "value": "spain",
                "label": "Spain"
            },
            {
                "id": 195,
                "value": "sri-lanka",
                "label": "Sri Lanka"
            },
            {
                "id": 2374,
                "value": "st-barts",
                "label": "St. Barts"
            },
            {
                "id": 2373,
                "value": "st-eustatius",
                "label": "St. Eustatius"
            },
            {
                "id": 184,
                "value": "st-kitts-and-nevis",
                "label": "St. Kitts and Nevis"
            },
            {
                "id": 185,
                "value": "st-lucia",
                "label": "St. Lucia"
            },
            {
                "id": 186,
                "value": "st-vincent-grenadines",
                "label": "St. Vincent & Grenadines"
            },
            {
                "id": 83,
                "value": "sweden",
                "label": "Sweden"
            },
            {
                "id": 84,
                "value": "switzerland",
                "label": "Switzerland"
            },
            {
                "id": 218,
                "value": "tahiti",
                "label": "Tahiti"
            },
            {
                "id": 86,
                "value": "taiwan",
                "label": "Taiwan"
            },
            {
                "id": 199,
                "value": "tajikistan",
                "label": "Tajikistan"
            },
            {
                "id": 108,
                "value": "tanzania",
                "label": "Tanzania"
            },
            {
                "id": 87,
                "value": "thailand",
                "label": "Thailand"
            },
            {
                "id": 201,
                "value": "tonga",
                "label": "Tonga"
            },
            {
                "id": 203,
                "value": "tunisia",
                "label": "Tunisia"
            },
            {
                "id": 89,
                "value": "turkey",
                "label": "Turkey"
            },
            {
                "id": 2756,
                "value": "turks-and-caicos-islands",
                "label": "Turks and Caicos Islands"
            },
            {
                "id": 206,
                "value": "uganda",
                "label": "Uganda"
            },
            {
                "id": 90,
                "value": "ukraine",
                "label": "Ukraine"
            },
            {
                "id": 207,
                "value": "united-arab-emirates",
                "label": "United Arab Emirates"
            },
            {
                "id": 245,
                "value": "united-kingdom",
                "label": "United Kingdom"
            },
            {
                "id": 91,
                "value": "united-states",
                "label": "United States"
            },
            {
                "id": 92,
                "value": "uruguay",
                "label": "Uruguay"
            },
            {
                "id": 208,
                "value": "uzbekistan",
                "label": "Uzbekistan"
            },
            {
                "id": 209,
                "value": "vanuatu",
                "label": "Vanuatu"
            },
            {
                "id": 94,
                "value": "vietnam",
                "label": "Vietnam"
            },
            {
                "id": 95,
                "value": "wales",
                "label": "Wales"
            },
            {
                "id": 214,
                "value": "zambia",
                "label": "Zambia"
            },
            {
                "id": 2793,
                "value": "zanzibar",
                "label": "Zanzibar"
            }
        ],
        "isLocation": true
    },
    {
        "filter": "term_id",
        "label": "Choose a Term",
        "fieldName": "Term",
        "options": [
            {
                "id": 6,
                "value": "academic-year",
                "label": "Academic Year"
            },
            {
                "id": 1,
                "value": "fall",
                "label": "Fall"
            },
            {
                "id": 10,
                "value": "may-term",
                "label": "May Term"
            },
            {
                "id": 2,
                "value": "spring",
                "label": "Spring"
            },
            {
                "id": 12,
                "value": "spring-break",
                "label": "Spring Break"
            },
            {
                "id": 3,
                "value": "summer",
                "label": "Summer"
            },
            {
                "id": 7,
                "value": "throughout-the-year",
                "label": "Throughout the Year"
            },
            {
                "id": 5,
                "value": "trimester",
                "label": "Trimester"
            },
            {
                "id": 4,
                "value": "winter",
                "label": "Winter"
            }
        ],
        "isLocation": false
    },
    {
        "filter": "degree_id",
        "label": "Choose a Subject",
        "fieldName": "Subject",
        "options": [
            {
                "id": 2,
                "value": "accounting",
                "label": "Accounting"
            },
            {
                "id": 443,
                "value": "acting",
                "label": "Acting"
            },
            {
                "id": 159,
                "value": "actuarial-science",
                "label": "Actuarial Science"
            },
            {
                "id": 6,
                "value": "african-studies",
                "label": "African Studies"
            },
            {
                "id": 161,
                "value": "agriculture",
                "label": "Agriculture"
            },
            {
                "id": 183,
                "value": "american-studies",
                "label": "American Studies"
            },
            {
                "id": 241,
                "value": "animal-science",
                "label": "Animal Science"
            },
            {
                "id": 9,
                "value": "anthropology",
                "label": "Anthropology"
            },
            {
                "id": 109,
                "value": "arabic",
                "label": "Arabic"
            },
            {
                "id": 10,
                "value": "archaeology",
                "label": "Archaeology"
            },
            {
                "id": 11,
                "value": "architecture",
                "label": "Architecture"
            },
            {
                "id": 12,
                "value": "art-fine-arts",
                "label": "Art & Fine Arts"
            },
            {
                "id": 13,
                "value": "art-history",
                "label": "Art History"
            },
            {
                "id": 146,
                "value": "arts",
                "label": "Arts"
            },
            {
                "id": 14,
                "value": "asian-studies",
                "label": "Asian Studies"
            },
            {
                "id": 15,
                "value": "astronomy-astrophysics",
                "label": "Astronomy & Astrophysics"
            },
            {
                "id": 364,
                "value": "australian-studies",
                "label": "Australian Studies"
            },
            {
                "id": 169,
                "value": "aviation-aerospace-engineering",
                "label": "Aviation & Aerospace Engineering"
            },
            {
                "id": 16,
                "value": "biochemistry",
                "label": "Biochemistry"
            },
            {
                "id": 253,
                "value": "bioengineering",
                "label": "Bioengineering"
            },
            {
                "id": 17,
                "value": "biology",
                "label": "Biology"
            },
            {
                "id": 18,
                "value": "biomedical-sciences",
                "label": "Biomedical Sciences"
            },
            {
                "id": 267,
                "value": "biotechnology",
                "label": "Biotechnology"
            },
            {
                "id": 419,
                "value": "business",
                "label": "Business"
            },
            {
                "id": 35,
                "value": "engineering-chemical",
                "label": "Chemical Engineering"
            },
            {
                "id": 21,
                "value": "chemistry",
                "label": "Chemistry"
            },
            {
                "id": 22,
                "value": "chinese-language",
                "label": "Chinese Language"
            },
            {
                "id": 140,
                "value": "engineering-civil",
                "label": "Civil Engineering"
            },
            {
                "id": 125,
                "value": "classical-studies",
                "label": "Classical Studies"
            },
            {
                "id": 24,
                "value": "communications",
                "label": "Communications"
            },
            {
                "id": 123,
                "value": "engineering-computer",
                "label": "Computer Engineering"
            },
            {
                "id": 181,
                "value": "computer-programming",
                "label": "Computer Programming"
            },
            {
                "id": 26,
                "value": "computer-science-it",
                "label": "Computer Science & IT"
            },
            {
                "id": 27,
                "value": "conflict-studies",
                "label": "Conflict Studies"
            },
            {
                "id": 185,
                "value": "conservation-and-preservation",
                "label": "Conservation & Preservation"
            },
            {
                "id": 133,
                "value": "continuing-education",
                "label": "Continuing Education"
            },
            {
                "id": 441,
                "value": "cosmetology",
                "label": "Cosmetology"
            },
            {
                "id": 28,
                "value": "counseling",
                "label": "Counseling"
            },
            {
                "id": 29,
                "value": "creative-writing",
                "label": "Creative Writing"
            },
            {
                "id": 383,
                "value": "criminology",
                "label": "Criminology"
            },
            {
                "id": 112,
                "value": "culinary-arts",
                "label": "Culinary Arts"
            },
            {
                "id": 121,
                "value": "culture",
                "label": "Culture"
            },
            {
                "id": 385,
                "value": "dance",
                "label": "Dance"
            },
            {
                "id": 187,
                "value": "dentistry",
                "label": "Dentistry"
            },
            {
                "id": 115,
                "value": "design",
                "label": "Design"
            },
            {
                "id": 119,
                "value": "development-studies",
                "label": "Development Studies"
            },
            {
                "id": 369,
                "value": "earth-sciences",
                "label": "Earth Sciences"
            },
            {
                "id": 31,
                "value": "ecology",
                "label": "Ecology"
            },
            {
                "id": 32,
                "value": "economics",
                "label": "Economics"
            },
            {
                "id": 33,
                "value": "education",
                "label": "Education"
            },
            {
                "id": 122,
                "value": "engineering-electrical",
                "label": "Electrical Engineering"
            },
            {
                "id": 371,
                "value": "engineering",
                "label": "Engineering"
            },
            {
                "id": 124,
                "value": "english",
                "label": "English"
            },
            {
                "id": 36,
                "value": "english-as-a-second-language",
                "label": "English as a Second Language"
            },
            {
                "id": 42,
                "value": "environmental-studies",
                "label": "Environmental Studies"
            },
            {
                "id": 165,
                "value": "ethnic-studies",
                "label": "Ethnic Studies"
            },
            {
                "id": 373,
                "value": "european-studies",
                "label": "European Studies"
            },
            {
                "id": 116,
                "value": "fashion-design-and-merchandising",
                "label": "Fashion Design & Merchandising"
            },
            {
                "id": 193,
                "value": "feminist-gender-and-sexuality-studies",
                "label": "Feminist, Gender, & Sexuality Studies"
            },
            {
                "id": 427,
                "value": "film",
                "label": "Film"
            },
            {
                "id": 138,
                "value": "filmmaking",
                "label": "Filmmaking"
            },
            {
                "id": 44,
                "value": "finance",
                "label": "Finance"
            },
            {
                "id": 45,
                "value": "food-science-nutrition",
                "label": "Food Science"
            },
            {
                "id": 195,
                "value": "foreign-language",
                "label": "Foreign Language"
            },
            {
                "id": 46,
                "value": "forestry",
                "label": "Forestry"
            },
            {
                "id": 48,
                "value": "french",
                "label": "French"
            },
            {
                "id": 118,
                "value": "furniture-design",
                "label": "Furniture Design"
            },
            {
                "id": 105,
                "value": "geography",
                "label": "Geography"
            },
            {
                "id": 50,
                "value": "geology",
                "label": "Geology"
            },
            {
                "id": 49,
                "value": "german",
                "label": "German"
            },
            {
                "id": 197,
                "value": "government",
                "label": "Government"
            },
            {
                "id": 51,
                "value": "graphic-design",
                "label": "Graphic Design"
            },
            {
                "id": 199,
                "value": "health-administration",
                "label": "Health Administration"
            },
            {
                "id": 52,
                "value": "health-sciences",
                "label": "Health Sciences"
            },
            {
                "id": 53,
                "value": "history",
                "label": "History"
            },
            {
                "id": 151,
                "value": "hospitality",
                "label": "Hospitality"
            },
            {
                "id": 55,
                "value": "human-resource-management",
                "label": "Human Resource Management"
            },
            {
                "id": 407,
                "value": "human-rights-advocacy",
                "label": "Human Rights Advocacy"
            },
            {
                "id": 56,
                "value": "humanities",
                "label": "Humanities"
            },
            {
                "id": 137,
                "value": "illustration-animation",
                "label": "Illustration & Animation"
            },
            {
                "id": 442,
                "value": "independent-study",
                "label": "Independent Study"
            },
            {
                "id": 152,
                "value": "industrial-design",
                "label": "Industrial Design"
            },
            {
                "id": 57,
                "value": "information-systems",
                "label": "Information Systems"
            },
            {
                "id": 117,
                "value": "interior-design",
                "label": "Interior Design"
            },
            {
                "id": 153,
                "value": "international-business",
                "label": "International Business"
            },
            {
                "id": 409,
                "value": "international-policy-and-diplomacy",
                "label": "International Policy & Diplomacy"
            },
            {
                "id": 59,
                "value": "international-relations",
                "label": "International Relations"
            },
            {
                "id": 411,
                "value": "interreligious-interethnic-relations",
                "label": "Interreligious & Interethnic Relations"
            },
            {
                "id": 61,
                "value": "italian",
                "label": "Italian"
            },
            {
                "id": 113,
                "value": "japanese",
                "label": "Japanese"
            },
            {
                "id": 444,
                "value": "jewelry-design",
                "label": "Jewelry Design"
            },
            {
                "id": 111,
                "value": "journalism-broadcasting",
                "label": "Journalism & Broadcasting"
            },
            {
                "id": 63,
                "value": "kinesiology-exercise-science",
                "label": "Kinesiology & Exercise Science"
            },
            {
                "id": 64,
                "value": "labor-industrial-relations",
                "label": "Labor & Industrial Relations"
            },
            {
                "id": 69,
                "value": "languages-linguistics",
                "label": "Languages & Linguistics"
            },
            {
                "id": 106,
                "value": "latin-american-studies",
                "label": "Latin American Studies"
            },
            {
                "id": 155,
                "value": "law",
                "label": "Law"
            },
            {
                "id": 365,
                "value": "leadership",
                "label": "Leadership"
            },
            {
                "id": 67,
                "value": "liberal-arts",
                "label": "Liberal Arts"
            },
            {
                "id": 68,
                "value": "library-information-science",
                "label": "Library & Information Science"
            },
            {
                "id": 114,
                "value": "literature",
                "label": "Literature"
            },
            {
                "id": 245,
                "value": "management",
                "label": "Management"
            },
            {
                "id": 209,
                "value": "marine-biology",
                "label": "Marine Biology"
            },
            {
                "id": 71,
                "value": "marketing-ad-pr",
                "label": "Marketing, Advertising, & PR"
            },
            {
                "id": 440,
                "value": "massage-education",
                "label": "Massage Therapy"
            },
            {
                "id": 72,
                "value": "mathematics",
                "label": "Mathematics"
            },
            {
                "id": 34,
                "value": "engineering-mechanical",
                "label": "Mechanical Engineering"
            },
            {
                "id": 110,
                "value": "medicine",
                "label": "Medicine"
            },
            {
                "id": 41,
                "value": "meteorology",
                "label": "Meteorology"
            },
            {
                "id": 108,
                "value": "middle-eastern-studies",
                "label": "Middle Eastern Studies"
            },
            {
                "id": 456,
                "value": "midwifery",
                "label": "Midwifery"
            },
            {
                "id": 74,
                "value": "music",
                "label": "Music"
            },
            {
                "id": 131,
                "value": "music-vocal-performance",
                "label": "Music - Vocal Performance"
            },
            {
                "id": 219,
                "value": "natural-sciences",
                "label": "Natural Sciences"
            },
            {
                "id": 221,
                "value": "neuroscience-and-behavior",
                "label": "Neuroscience & Behavior"
            },
            {
                "id": 75,
                "value": "nursing",
                "label": "Nursing"
            },
            {
                "id": 399,
                "value": "nutrition",
                "label": "Nutrition"
            },
            {
                "id": 377,
                "value": "optometry-and-vision-sciences",
                "label": "Optometry & Vision Sciences"
            },
            {
                "id": 78,
                "value": "pharmaceuticals",
                "label": "Pharmaceuticals"
            },
            {
                "id": 80,
                "value": "philosophy",
                "label": "Philosophy"
            },
            {
                "id": 81,
                "value": "photography",
                "label": "Photography"
            },
            {
                "id": 82,
                "value": "physical-therapy",
                "label": "Physical Therapy"
            },
            {
                "id": 83,
                "value": "physics",
                "label": "Physics"
            },
            {
                "id": 84,
                "value": "political-science-politics",
                "label": "Political Science & Politics"
            },
            {
                "id": 85,
                "value": "portuguese",
                "label": "Portuguese"
            },
            {
                "id": 86,
                "value": "pre-law",
                "label": "Pre-Law"
            },
            {
                "id": 87,
                "value": "pre-med",
                "label": "Pre-Med"
            },
            {
                "id": 88,
                "value": "psychology",
                "label": "Psychology"
            },
            {
                "id": 249,
                "value": "public-health",
                "label": "Public Health"
            },
            {
                "id": 391,
                "value": "public-management",
                "label": "Public Management"
            },
            {
                "id": 457,
                "value": "radiography",
                "label": "Radiography"
            },
            {
                "id": 141,
                "value": "refugee-studies",
                "label": "Refugee Studies"
            },
            {
                "id": 91,
                "value": "religious-studies",
                "label": "Religious Studies"
            },
            {
                "id": 231,
                "value": "russian-and-east-european-studies",
                "label": "Russian & East European Studies"
            },
            {
                "id": 233,
                "value": "russian-language",
                "label": "Russian Language"
            },
            {
                "id": 251,
                "value": "science",
                "label": "Science"
            },
            {
                "id": 452,
                "value": "screenwriting",
                "label": "Screenwriting"
            },
            {
                "id": 257,
                "value": "service-learning",
                "label": "Service Learning"
            },
            {
                "id": 393,
                "value": "social-policy",
                "label": "Social Policy"
            },
            {
                "id": 93,
                "value": "social-sciences",
                "label": "Social Sciences"
            },
            {
                "id": 94,
                "value": "social-work",
                "label": "Social Work"
            },
            {
                "id": 95,
                "value": "sociology",
                "label": "Sociology"
            },
            {
                "id": 96,
                "value": "spanish",
                "label": "Spanish"
            },
            {
                "id": 447,
                "value": "sports",
                "label": "Sports"
            },
            {
                "id": 127,
                "value": "sports-science",
                "label": "Sports Science"
            },
            {
                "id": 97,
                "value": "statistics",
                "label": "Statistics"
            },
            {
                "id": 158,
                "value": "sustainable-development",
                "label": "Sustainable Development"
            },
            {
                "id": 98,
                "value": "technology",
                "label": "Technology"
            },
            {
                "id": 147,
                "value": "tesol",
                "label": "TESOL"
            },
            {
                "id": 148,
                "value": "theater",
                "label": "Theater"
            },
            {
                "id": 100,
                "value": "theology",
                "label": "Theology"
            },
            {
                "id": 239,
                "value": "trade-technical-specialties",
                "label": "Trade & Technical Specialties"
            },
            {
                "id": 149,
                "value": "travel-tourism",
                "label": "Travel & Tourism"
            },
            {
                "id": 397,
                "value": "tv-and-media-production",
                "label": "TV & Media Production"
            },
            {
                "id": 101,
                "value": "urban-regional-planning",
                "label": "Urban & Regional Planning"
            },
            {
                "id": 154,
                "value": "veterinary-medicine-science",
                "label": "Veterinary Medicine & Science"
            },
            {
                "id": 139,
                "value": "visual-arts",
                "label": "Visual Arts"
            },
            {
                "id": 156,
                "value": "web-design",
                "label": "Web Design"
            },
            {
                "id": 102,
                "value": "womens-studies",
                "label": "Women's Studies"
            },
            {
                "id": 103,
                "value": "zoology-wildlife-sciences",
                "label": "Zoology & Wildlife Sciences"
            }
        ],
        "isLocation": false
    }
];

export const headlineAds: Ad[] = [
    {
        "id": 51566,
        "url": "https://www.iesabroad.org/?utm_source=goabroad.com&utm_medium=cpc&utm_campaign=ad-package-2018-19&utm_content=premier-sponsorship",
        "callToActionText": "Study abroad with IES Abroad and redefine your world!",
        "displayedText": "“The faculty and staff at IES Abroad work hard to help students have the best study abroad experience possible. IES Abroad is truly about the students.” Emily C. | Hope College | London Program",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/top/ies-abroad-headline-photo-1524025257.webp",
        "imageAlt": "Student sitting on top of a rock mountain.",
        "providerName": "IES Abroad",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/logo-goabroad-01-1588602002.webp"
    },
    {
        "id": 50919,
        "url": "https://www.aifsabroad.com/?utm_source=goabroad&utm_medium=providerpage&utm_campaign=goabroad",
        "callToActionText": "Change the way you see your world: study abroad with AIFS!",
        "displayedText": "AIFS is recognized as the premium provider of study abroad. Our all-inclusive program fees cover tuition and housing with $800,000 in scholarship and grant funding available each year.",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/top/f41318f9083682bca819a77d1904992b29b2ebc4-2014.webp",
        "imageAlt": "AIFS students on top of a mountain",
        "providerName": "AIFS Abroad",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/UrOWGuqVxged5C5vk6MngAwyNXMXoa97y62ZCjfT.webp"
    },
    {
        "id": 69811,
        "url": "https://www.semesteratsea.org/",
        "callToActionText": "Expand Your World. \r\nA study abroad experience like no other.",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/top/nHYYh56wI3w3ZlASWrO65VS6Kvv6vL6QRa0UCPqq_1753167780.webp",
        "imageAlt": "Semester at Sea",
        "providerName": "Semester at Sea",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/9uLAM7pi6m636mCuhHIiFdJaa3lnBWXVc1uqQeav.webp"
    },
    {
        "id": 70898,
        "url": "https://www.ef.edu/livethelanguage?utm_source=partnership&utm_medium=referral&utm_content=N3US_GOA_25",
        "callToActionText": "Expand your horizons with life-changing language & cultural journeys",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/top/OFHBuDBcXVaQh8FndMvXg5QbaIWrDmcJJPPAVipb.webp",
        "imageAlt": "EF Education First",
        "providerName": "EF Education First",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/RwtSG6KRvOx1yGEyUOVNtTX1IvlkYp0O8t49kh0v.webp"
    },
    {
        "id": 69076,
        "url": "https://www.seamester.com/?utm_source=goabroad&utm_medium=paid_directory&utm_campaign=goabroad_directory&utm_content=type-f_study-abroad_directory-headline-photo-top-providers",
        "callToActionText": "Seamester Study Abroad and Gap Year Voyages",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/top/tDJyBCUQiBMLM63tYDGbYlFdYhdSZ7O2dVDJSvif_1703850048.webp",
        "imageAlt": "Seamester",
        "providerName": "Seamester Study Abroad at Sea",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/seamester-logo-new-1548263537-1613395105.webp"
    },
    {
        "id": 71251,
        "url": "https://www.ashoka.edu.in/summer-term-course/",
        "callToActionText": "Study Arts, Politics, Science & Economics in India this Summer",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/top/Metn0Fz74a14CMRuNPK6BFmZBU4ZWLGuPJ9ubI1A.webp",
        "imageAlt": "Ashoka University",
        "providerName": "Ashoka University",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/rOwPdClASbVRwPdUvQTjemLopiqcXmGNilEmrGhM.webp"
    },
    {
        "id": 71330,
        "url": "https://www.ciee.org/?utm_campaign=study&utm_medium=referral&utm_source=goabroad&utm_content=visit",
        "callToActionText": "Take your educational & cultural journey to the next level!",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/top/6uaWOGvpwFSLlED2buV9u5At0GxcLdLwKmfuZvzT_1779799029.webp",
        "imageAlt": "CIEE College Study Abroad",
        "providerName": "CIEE College Study Abroad",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/XuypAiJXtWIQy9JCGFz20s3XNiLUwKHNhwOCWGOM.webp"
    }
];

export const premierFeature: Ad[] = [
    {
        "id": 57120,
        "url": "https://usac.edu/?utm_source=goabroad&utm_medium=ad&utm_campaign=directory-premier-feature&utm_content=general-ad",
        "callToActionText": "Explore 50+ affordable study abroad programs with USAC!",
        "displayedText": "USAC offers affordable, academic programs at more than 50 locations across 28 countries. Our authentic, non-traditional program locations allow you to immerse in the culture of another country. Combine this with high-quality academics, homestays, field trips, and internships for an unforgettable study abroad experience. In addition, USAC awards more than $2 million in scholarships! Explore our programs.",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/PLF/directoryfeature120x75-1529465693.webp",
        "imageAlt": "study abroad with USAC",
        "providerName": "University Studies Abroad Consortium",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/AeMvAwNjFiSS9IMB5t2ZKNvuwh28C2GVzuzltcgb.webp"
    },
    {
        "id": 59796,
        "url": "https://www.ifsa-butler.org/",
        "callToActionText": "Complete an Internship or Directed Research with IFSA!",
        "displayedText": "Don’t just study abroad – focus on your future by completing an internship, directed research project, or Professional Development Project with IFSA",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/PLF/ifsa-sa-plf-1539740657.webp",
        "imageAlt": "A student hugging her friends in Quito",
        "providerName": "IFSA, Institute for Study Abroad",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/IdZ6QYBgVOtf1mEJhL7ALIg2IILL7UM3qxhAP1G1.webp"
    },
    {
        "id": 61353,
        "url": "http://www.saiprograms.com",
        "callToActionText": "Connecting cultures: SAI Study Abroad in Italy, Spain & France",
        "displayedText": "For 25 years, we have offered life-changing study abroad opportunities in Italy, Spain & France. Where will our programs take you?",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/PLF/sai-premier-feature-1570149863.webp",
        "imageAlt": "Student taking a photo in Italy - SAI Programs",
        "providerName": "SAI Programs",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/goabroad-header-1524529145.webp"
    },
    {
        "id": 69188,
        "url": "https://medicalaid.org/",
        "callToActionText": "Award-Winning Global Health Internships for High-School Students",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/PLF/cpHIsLcPjZzasrovPBD3HeY66NxHzxN6gcYMxXr3_1705455237.webp",
        "imageAlt": "IMA",
        "providerName": "International Medical Aid (IMA)",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/inter2-1457107573.webp"
    },
    {
        "id": 51781,
        "url": "https://rome.johncabot.edu/gobroad-vs-2023",
        "callToActionText": "Study in the historic center of Rome, Italy at John Cabot University!",
        "displayedText": "As an American university offering semester and summer programs, John Cabot University’s 350+ course options allow you to stay on track for graduation while you study at our beautiful Roman campus. Immerse yourself in Italian culture and join our international campus community!",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/PLF/image008-1439947767_1720165948.webp",
        "imageAlt": "study abroad students John Cabot University",
        "providerName": "John Cabot University",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/kJpW9vPaQ0C6kSKYJIQKHyDbJcWp2svSwoLqQnEg.webp"
    },
    {
        "id": 54565,
        "url": "https://www.cyathens.org/255/1/get-started-in-college-year-in-athens/",
        "callToActionText": "Study Abroad in Greece with CYA!",
        "displayedText": "CYA offers unique learning experiences that utilize the landscape of Athens, a city that juxtaposes Ancient Greek ruins with the modern city.",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/PLF/cya-dpf-1498694790_1744339227.webp",
        "imageAlt": "Students roaming around the beautiful places in Greece.",
        "providerName": "College Year in Athens",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/cya-logo-1585015069.webp"
    },
    {
        "id": 71224,
        "url": "https://www.ef.edu/livethelanguage?utm_source=partnership&utm_medium=referral&utm_content=N3US_GOA_25",
        "callToActionText": "Open your world with language learning & cultural adventures",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/PLF/O45AJmVnqbPCkH27CRxxapIZHpZZ7QW3afz1ntK3.webp",
        "imageAlt": "EF Education First",
        "providerName": "EF Education First",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/RwtSG6KRvOx1yGEyUOVNtTX1IvlkYp0O8t49kh0v.webp"
    },
    {
        "id": 71252,
        "url": "https://www.ashoka.edu.in/program/aisrp/",
        "callToActionText": "Conduct Summer Research in Biology, Computer, Environment, & Economics",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/PLF/q5QbmQ5CrPR8dyEf941HbujJ0asy9Ysb7NohpL1f.webp",
        "imageAlt": "Ashoka University",
        "providerName": "Ashoka University",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/rOwPdClASbVRwPdUvQTjemLopiqcXmGNilEmrGhM.webp"
    },
    {
        "id": 70637,
        "url": "http://goabroadchina.com?utm_source=goabroad&utm_medium=referral&utm_campaign=platform",
        "callToActionText": "Learn Chinese at China's Top Universities",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/PLF/QjJgVaymKtvl5jw1tXwYHzcp1hUrvEBu0GVmV4fh.webp",
        "imageAlt": "student in China",
        "providerName": "Go Abroad China Ltd.",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/WtuBJgUnigfCiEeJouYYRrRnJ1dqaRh9FmcJxjMA.webp"
    },
    {
        "id": 58824,
        "url": "https://www.aub.edu.lb/",
        "callToActionText": "Welcome to a World Class Education in the Heart of the Middle East!",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/PLF/osb-1-1506335725_1738892445.webp",
        "imageAlt": "AUB",
        "providerName": "American University of Beirut",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/h4fugW6Iizi06Q1UHFblKFOsrFgFdBnTO6wcx647.webp"
    },
    {
        "id": 69320,
        "url": "https://www.goabroad.com/providers/adelante-abroad/programs/summer-study-abroad-seville-32958",
        "callToActionText": "Summer Study Abroad Program in Seville",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/PLF/v7AGCFknd3eXEkZCnecaWI7hGhcfuXCwRbnClKKK_1784094174.webp",
        "imageAlt": "student in Spain",
        "providerName": "Adelante Abroad",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/1273651849_adelante_color.webp"
    }
];

export const featuredOrganization = {
    "id": 71123,
    "url": "https://www.seamester.com/?utm_source=goabroad&utm_medium=paid_directory&utm_campaign=goabroad_directory&utm_content=type-j_gap-year_directory-organizational-feature-provider-of",
    "callToActionText": "Discover who you are on the ultimate gap adventure! Sail the world!",
    "image": "https://images.goabroad.com/image/upload/c_fill,g_faces:auto,fl_progressive,f_auto,h_350,w_640/v1/images2/a/square/ij0jweP64lvRoiaHSaANPrXCF6ubMtx4DDTwdmBp.webp",
    "imageAlt": "Seamester",
    "providerName": "Seamester Study Abroad at Sea"
};

export const featuredPrograms: FeaturedProgram[] = [
    {
        "id": 63224,
        "image": "https://images.goabroad.com/image/upload/c_fill,f_auto,fl_progressive,g_faces:auto,w_404,h_200/v1/images2/a/LF/england5_1706774895.jpg",
        "imageAlt": "London, United Kingdom",
        "providerName": "AIFS Abroad",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/UrOWGuqVxged5C5vk6MngAwyNXMXoa97y62ZCjfT.jpg",
        "averageRating": 4.53,
        "reviewsCount": 1850,
        "isVerified": true,
        "callToActionText": "Study Abroad and Discover the World with AIFS!",
        "description": "Traveling and seeing the world doesn’t necessarily mean taking a break from your studies. Study abroad with AIFS and broaden your academic knowledge while learning about foreign cultures!Serving more than 1.5 million students since 1964, AIFS is a reco...",
        "webUrl": "https://www.aifsabroad.com/?utm_source=goabroad&utm_medium=directory&utm_campaign=goabroad_weblisting",
        "programUrl": "https://www.goabroad.com/providers/aifs-abroad/programs/study-abroad-discover-world-aifs!-170052"
    },
    {
        "id": 69783,
        "image": "https://images.goabroad.com/image/upload/c_fill,f_auto,fl_progressive,g_faces:auto,w_404,h_200/v1/images2/a/LF/onyDOoPVaGJEhVwsQM5oGoB0xQ8hC4GIrTRq3l2H.jpg",
        "imageAlt": "ISA",
        "providerName": "WorldStrides",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/MBlUGlFaccWWlZXptGDBPPL5KUSR8eKRGDus1SNk.png",
        "averageRating": 4.68,
        "reviewsCount": 1301,
        "isVerified": true,
        "callToActionText": "Research Study Abroad in Geneva, Switzerland",
        "description": "Spend a semester in Switzerland, where stunning Alpine scenery, sparkling lakes, and an international atmosphere create the perfect setting for academic discovery. Study at the University of Geneva, one of Europe’s leading research institutions, and jo...",
        "webUrl": "http://studiesabroad.com/?utm_campaign=online_directories&utm_source=goabroad.com&utm_medium=clicks&utm_term=about_isa",
        "programUrl": "https://www.goabroad.com/providers/worldstrides/programs/research-study-abroad-in-geneva-switzerland-189594"
    },
    {
        "id": 70159,
        "image": "https://images.goabroad.com/image/upload/c_fill,f_auto,fl_progressive,g_faces:auto,w_404,h_200/v1/images2/a/LF/WJwiKdU4bBHxdgfAUA33nHmOVlpsWHsgLC2tMmhJ.jpg",
        "imageAlt": "University Studies Abroad Consortium",
        "providerName": "University Studies Abroad Consortium",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/AeMvAwNjFiSS9IMB5t2ZKNvuwh28C2GVzuzltcgb.png",
        "averageRating": 4.38,
        "reviewsCount": 1680,
        "isVerified": true,
        "callToActionText": "USAC THAILAND: Khon Kaen - Business, Marketing, and More",
        "description": "The colorful, vibrant country of Thailand is considered the \"land of smiles,\" and for good reason: the friendliness and hospitality of the Thai people, 95 percent of whom are Buddhist, will enrich your experience living there. Khon Kaen is located in t...",
        "webUrl": "https://www.goabroad.com/providers/university-studies-abroad-consortium/programs/thailand-khon-kaen-asian-courses-161170",
        "programUrl": "https://www.goabroad.com/providers/university-studies-abroad-consortium/programs/thailand-khon-kaen-asian-courses-161170"
    },
    {
        "id": 70977,
        "image": "https://images.goabroad.com/image/upload/c_fill,f_auto,fl_progressive,g_faces:auto,w_404,h_200/v1/images2/a/LF/pcXiSFlL3q8LTxJa2q8G0CPNDGVr6YBACGPpIXea.jpg",
        "imageAlt": "Nice",
        "providerName": "EF Education First",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/RwtSG6KRvOx1yGEyUOVNtTX1IvlkYp0O8t49kh0v.png",
        "averageRating": 4.23,
        "reviewsCount": 61,
        "isVerified": true,
        "callToActionText": "EF Language Abroad – Nice, France",
        "description": "Learn French in Nice with EF Language Abroad and experience the perfect mix of language learning and Riviera living. EF’s French program in Nice is an unforgettable way to study abroad and live like a local.Located on the sun-soaked Côte d’Azur, EF’s i...",
        "webUrl": "https://www.goabroad.com/providers/ef-international-language-centers/programs/ef-language-abroad-nice-france-198192",
        "programUrl": "https://www.goabroad.com/providers/ef-international-language-centers/programs/ef-language-abroad-nice-france-198192"
    },
    {
        "id": 71078,
        "image": "https://images.goabroad.com/image/upload/c_fill,f_auto,fl_progressive,g_faces:auto,w_404,h_200/v1/images2/a/LF/GiqNnHAjgSYEdI0QNiVQhigVVqHjIo27ij4qXjnl.jpg",
        "imageAlt": "Barcelona",
        "providerName": "Expanish",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/6OpM7iLfaF2VW9Y0JPY5Fyo6uxBYctCAvA1cZRP5.png",
        "averageRating": 4.53,
        "reviewsCount": 92,
        "isVerified": true,
        "callToActionText": "Study Abroad in Barcelona - Summer Session",
        "description": "Spend your summer studying in Barcelona, one of Europe’s most exciting and culturally rich cities. The Expanish Summer Program allows students to earn academic credit while exploring Spanish and Catalan culture through engaging coursework and cultural ...",
        "webUrl": "https://expanish.com/study-abroad/",
        "programUrl": "https://www.goabroad.com/providers/expanish/programs/study-abroad-in-barcelona-summer-session-197391"
    },
    {
        "id": 71128,
        "image": "https://images.goabroad.com/image/upload/c_fill,f_auto,fl_progressive,g_faces:auto,w_404,h_200/v1/images2/a/LF/p8wFlxc0QnLkOEJfMpNEoGMAKDhh3XhH8Zs7kt9Y.jpg",
        "imageAlt": "Seamester",
        "providerName": "Seamester Study Abroad at Sea",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/seamester-logo-new-1548263537-1613395105.jpg",
        "averageRating": 4.67,
        "reviewsCount": 120,
        "isVerified": true,
        "callToActionText": "Seamester Study Abroad and Gap Year Voyages",
        "description": "Seamester is the educational adventure of a lifetime! For more than 40 years, we have offered unparalleled educational voyages where students spend a semester at sea sailing between islands, countries, and even continents. We design our programs to pro...",
        "webUrl": "https://www.seamester.com/?utm_source=goabroad&utm_medium=paid_directory&utm_campaign=goabroad_directory&utm_content=type-i_study-abroad_directory-featured-program-this-months-recomm",
        "programUrl": "https://www.goabroad.com/providers/seamester-study-abroad-at-sea/programs/seamester-study-abroad-and-gap-year-voyages-167821"
    },
    {
        "id": 71153,
        "image": "https://images.goabroad.com/image/upload/c_fill,f_auto,fl_progressive,g_faces:auto,w_404,h_200/v1/images2/a/LF/VXNqIuutswkNfTLkmHbfhnUpe5Z5IyMta914cuRe.jpg",
        "imageAlt": "Scotland",
        "providerName": "Adelante Abroad",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/1273651849_adelante_color.png",
        "averageRating": 4.3,
        "reviewsCount": 501,
        "isVerified": true,
        "callToActionText": "Equine Summer Study in Scotland - Adelante Abroad",
        "description": "Equine Summer Study Abroad is now in its 10th year and sold out. Apply now for next year! Limited to just 16 students, it includes daily English-style riding and coursework in Equine Anatomy & Physiology and Equine Fitness. Ideal for animal science or ...",
        "webUrl": "https://www.goabroad.com/providers/adelante-abroad/programs/equine-summer-study-in-scotland-95827",
        "programUrl": "https://www.goabroad.com/providers/adelante-abroad/programs/equine-summer-study-in-scotland-95827"
    },
    {
        "id": 71477,
        "image": "https://images.goabroad.com/image/upload/c_fill,f_auto,fl_progressive,g_faces:auto,w_404,h_200/v1/images2/a/LF/gJT5H8O82E0jkteXTTQMV4UWNIPDgOTGTWIwol6U.jpg",
        "imageAlt": "Ashoka University campus",
        "providerName": "Ashoka University",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/rOwPdClASbVRwPdUvQTjemLopiqcXmGNilEmrGhM.jpg",
        "averageRating": 4.64,
        "reviewsCount": 25,
        "isVerified": false,
        "callToActionText": "Spend Your Semester Studying Abroad in India | Ashoka",
        "description": "Ashoka is India’s premier Liberal Arts and Sciences University, located in the Delhi NCR capital region.An Ashoka education emphasizes foundational knowledge, rigorous academic research, and hands-on experience. The University provides a world-class in...",
        "webUrl": "https://www.ashoka.edu.in/semester-at-ashoka/",
        "programUrl": "https://www.goabroad.com/providers/ashoka-university/programs/visiting-student-program-194202"
    },
    {
        "id": 71486,
        "image": "https://images.goabroad.com/image/upload/c_fill,f_auto,fl_progressive,g_faces:auto,w_404,h_200/v1/images2/a/LF/R6nC6DjNaGexHwuQarYcdGg1xVjcH9q2B0WzQScd.jpg",
        "imageAlt": "international students at the Great Wall of China",
        "providerName": "Go Abroad China Ltd.",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/WtuBJgUnigfCiEeJouYYRrRnJ1dqaRh9FmcJxjMA.png",
        "averageRating": 4.7,
        "reviewsCount": 559,
        "isVerified": true,
        "callToActionText": "Study Chinese in China | Top Universities & Homestay",
        "description": "Join Go Abroad China's University Chinese Language Program to master Mandarin at China's most prestigious institutions, including Beijing Language and Culture University (BLCU), Peking University, and Fudan University. Designed for all proficiency leve...",
        "webUrl": "https://goabroadchina.com/learn-chinese-at-a-university-college-in-china/?utm_source=goabroad&utm_medium=referral&utm_campaign=platform",
        "programUrl": "https://www.goabroad.com/providers/go-abroad-china/programs/learn-chinese-china-top-universities-103681"
    }
];

export const featuredVideo = {
    "url": "https://www.aifsabroad.com/youtube/?utm_medium=GAhomepaeg&utm_source=GAhomepagevideo",
    "callToActionText": "AIFS Abroad: Award-Winning Study and Internship Abroad Programs Across the Globe",
    "providerName": "AIFS Abroad",
    "videoUrl": "https://youtu.be/819Sp-X1JPU",
    "embedUrl": "https://www.youtube.com/embed/819Sp-X1JPU"
};

export const premierSponsorship: PremierAd[] = [
    {
        "id": 51886,
        "url": "https://www.adelanteabroad.com/study-abroad/",
        "image": "https://images.goabroad.com/image/upload/v1/images2/a/text/09695a0ff9fcac794c0eaa9e73eeb70dbc185182_1746782760.webp",
        "imageAlt": "Adelante study abroad students",
        "providerName": "Adelante Abroad",
        "displayedText": "Study Abroad in Spring, Summer, or Fall in Spain or Scotland with Adelante"
    },
    {
        "id": 59048,
        "url": "https://www.ciee.org/go-abroad/college-study-abroad?utm_campaign=study&utm_medium=referral&utm_source=goabroad&utm_content=programs&utm_term=",
        "image": "https://images.goabroad.com/image/upload/v1/images2/a/text/ciee-125x125-blue-1516613579_1695106757.webp",
        "imageAlt": "CIEE College Study",
        "providerName": "CIEE College Study Abroad",
        "displayedText": "Take your educational & cultural journey to the next level!"
    },
    {
        "id": 67621,
        "url": "https://www.arcosabroad.com",
        "image": "https://images.goabroad.com/image/upload/v1/images2/a/text/JE4bZuudJAyd1QjMlr4CHufVa8k6b1MFbvx2UUUF.webp",
        "imageAlt": "Arcos Abroad in Mexico",
        "providerName": "Arcos Learning Abroad",
        "displayedText": "Connect with your potential. Study abroad with Arcos. "
    },
    {
        "id": 69542,
        "url": "https://www.afsusa.org/study-abroad/?utm_source=goabroad&utm_medium=web&utm_campaign=studyabroad2025",
        "image": "https://images.goabroad.com/image/upload/v1/images2/a/text/i4jeucPBpMdfCG4xQRXWofN0JzVWX9LjpFsN8P5O_1715235821.webp",
        "imageAlt": "AFS-USA",
        "providerName": "AFS-USA",
        "displayedText": "Study abroad in one of over 40 countries with AFS-USA & become a global citizen!"
    },
    {
        "id": 71228,
        "url": "https://www.ef.edu/livethelanguage?utm_source=partnership&utm_medium=referral&utm_content=N3US_GOA_25",
        "image": "https://images.goabroad.com/image/upload/v1/images2/a/text/wIvwhjMdK9zouj2fKAmKcTGjlRv6lYTugyKUeawP.webp",
        "imageAlt": "EF Education First",
        "providerName": "EF Education First",
        "displayedText": "Open your world with language learning & cultural adventures"
    }
];

export const programReviews: Review[] = [
    {
        "id": 120137,
        "title": "The best experience of my life",
        "review": "I stayed in Beijing for a month during this summer, and it was absolutely amazing. I had the chance to have Mrs Snow as a teacher, she was a true life saver and helped me and my classmates as much as she could. Thanks to her, I made amazing progress and felt listened and supported by her in my difficulties, she was absolutely amazing !\r\n\r\nBeijing was also a great choice of city, so authentic and welcoming for foreigners ! There was so much things to visit, and to discover, it was truly the most wonderful thing experience ! I couldn’t have imagined or asked for better honestly, and if I have the occasion to re-do, I wouldn’t even question my choice !",
        "programName": "LTL Language School || Learn Chinese in China",
        "programUrl": "https://www.goabroad.com/providers/live-the-language-school/programs/ltl-language-school-learn-chinese-8-cities-190027",
        "overallRating": 5,
        "dateAdded": "August 12, 2026",
        "reviewerName": "Laly Leveque",
        "reviewerCountry": "France"
    },
    {
        "id": 120129,
        "title": "I wouldn't trade it for the world.",
        "review": "It is hard to write a short review for my time in Mexico because of how big of an experience it was-- not only because of how much I learned from professors and community members alike, but also from the sheer amount of fun and changes in perspective I was able to have in the short 4 months. Before I left for this study abroad experience I was terrified; I didn't know the language, or anyone else who was going, I had no frame of reference for what it was going to be like, and I was afraid that I would be so out of my comfort zone that I wouldn't have any fun. However, I felt right at home within the space that the professors and staff of Augsburg have worked so hard to create in order to make every student feel safe and welcome. There is a great emphasis on community and care for one another which can be felt through every aspect of this experience. Of course it was challenging at times, but the challenges were incredibly rewarding and allowed me to learn more about myself, others, and the world than I ever could have hoped (along with the help of my peers, who are now life long friends). I feel so lucky to have been a part of this program and hope that more students will take the leap and allow themselves to be cared for, inspired, and taught by everyone who works hard to make this such a special opportunity.",
        "programName": "Liberal Arts, Language and Social Change in Mexico",
        "programUrl": "https://www.goabroad.com/providers/center-for-global-education-and-experience-augsburg-college/programs/liberal-arts-language-and-social-change-in-mexico-164919",
        "overallRating": 5,
        "dateAdded": "August 12, 2026",
        "reviewerName": "Acacia Seeling",
        "reviewerCountry": "United States"
    },
    {
        "id": 120128,
        "title": "Memorable Moments with My FUBiS Classmates",
        "review": "I really enjoyed spending time with my classmates during the FUBiS program. Of course, taking classes together was an important part of the experience, but what I remember most are the moments we shared outside the classroom. Visiting the Olympic Park together was especially interesting because we were able to see an important part of Berlin while also spending time as a group. I also really enjoyed our trip to Potsdam. Walking around the city, seeing new places, and talking with my classmates made the trip feel very special. One of my favorite moments was going to a beer garden together after exploring Potsdam. We had time to relax, talk, laugh, and get to know each other better in a more casual atmosphere. These experiences made my time at FUBiS much more enjoyable and memorable, and I think they were a great opportunity to become closer to the people I met during the program.",
        "programName": "Study Abroad in Berlin with FUBiS - Winter and Summer",
        "programUrl": "https://www.goabroad.com/providers/freie-universitat-berlin-international-summer-and-winter-university-fubis/programs/summer-and-winter-studies-at-the-heart-of-germany-43465",
        "overallRating": 5,
        "dateAdded": "August 12, 2026",
        "reviewerName": "Myeong Kuk Kong",
        "reviewerCountry": "South Korea"
    },
    {
        "id": 120122,
        "title": "I loved my time abroad!",
        "review": "Going abroad was such an amazing experience that I definitely reccomend to everyone! This program in Chile was so immersive and very supportive throughout my time. Worldstrides planned great excursions for us that made it very fun with always something to look forward to!",
        "programName": "Study Abroad in Chile with WorldStrides",
        "programUrl": "https://www.goabroad.com/providers/worldstrides/programs/study-abroad-in-valparaiso-vina-del-mar-chile-122",
        "overallRating": 5,
        "dateAdded": "August 12, 2026",
        "reviewerName": "liv acree",
        "reviewerCountry": "United States"
    },
    {
        "id": 120121,
        "title": "Ni Hao",
        "review": "I studied Mandarin at Peking University for 4 months through GAC. I arrived knowing only \"ni hao.\" My homestay family was amazing – they only spoke Chinese, so I had to practice every single day. My teacher was patient and made classes fun. By month three, I could order food, take the subway, and have real conversations with locals. The GAC team organized weekend trips to the Summer Palace and the Great Wall. I came back to Belgium with confidence and a second family in Beijing. Highly recommend.",
        "programName": "GAC Chinese Language Immersion Program",
        "programUrl": "https://www.goabroad.com/providers/go-abroad-china/programs/chinese-language-immersion-program-105671",
        "overallRating": 5,
        "dateAdded": "August 12, 2026",
        "reviewerName": "Clara Van Buren",
        "reviewerCountry": "Belgium"
    },
    {
        "id": 120120,
        "title": "Wonderful and Supportive Abroad Experience",
        "review": "SIT Portugal was a great study-abroad opportunity, where I was able to further my academics, gain cultural experiences, and explore new places. The support provided by SIT was wonderful! They were accessible and always answered questions, whether it was about needing help with school assignments or trying to find a doctor. Some of my favorite experiences abroad were the excursions within Portugal, to Porto (and the Douro Valley), São Miguel, and Alentejo. These trips included trying new foods, going for hikes, and exploring scenic areas. The trips were always well organized and action-packed. SIT Portugal also gave me so many wonderful friends; the cohort system allows you to live and go to classes with all of the people in your program. Making it easy to commute, grocery shop, and cook together. I truly felt that SIT Portugal provided us with all the tools to feel comfortable living in another country, making it enjoyable to try new things and explore. For example, in the first week we did a Portuguese cooking class, which helped us work on our cooking skills and learn to make traditional Portuguese food. The academics abroad were serious, but the amount of structured class time forced you to stay organized and plan activities, which I found incredibly beneficial. Additionally, the ISP period (Independent Study Project) is about the last month of the program, during which you have no classes. This period was great for so many reasons; first, it taught you how to manage your time on your own. It was also a great time to take a longer trip or travel to a couple of places since there was less structure (though you have to make sure you plan time to work as well!). Also, the project is completely your own, and you are able to research something that interests you. Overall, I found that SIT Portugal provided me with a wonderful abroad experience where I learned a ton, travelled, and had enough balance to do social things and explore.",
        "programName": "SIT Study Abroad: Portugal: Sustainability & Enviro Justice",
        "programUrl": "https://www.goabroad.com/providers/sit-study-abroad/programs/portugal-environmental-justice-summer-196287",
        "overallRating": 5,
        "dateAdded": "August 12, 2026",
        "reviewerName": "Claire Pfanstiel",
        "reviewerCountry": "United States"
    },
    {
        "id": 120110,
        "title": "I took the 120 Hours online TEFL course this year",
        "review": "I will try to keep my experience short and helpful to others. The learning environment of the course is excellent, it’s smooth and responsive, loading quickly. The content is great value because there is a large quantity of information in each unit with video. Activities are helpful. One thing they should look at is how to allow quiz repeat attempts without answering the exact same questions if I was correct the first time. The course is strong.",
        "programName": "Accredited 120-Hour TEFL/TESOL Course $39 with certificate",
        "programUrl": "https://www.goabroad.com/providers/studytefl/programs/accredited-120-hour-tefl-tesol-course-for-29-sale-price-197876",
        "overallRating": 5,
        "dateAdded": "August 11, 2026",
        "reviewerName": "Sven Andersson",
        "reviewerCountry": "Sweden"
    },
    {
        "id": 120094,
        "title": "Unforgettable Summer!",
        "review": "Overall, I really enjoyed the summer courses. The teachers were very nice, and the courses very interesting. The field trips and class excursions helped me a lot in learning about local history and culture.",
        "programName": "Study Abroad in Berlin with FUBiS - Winter and Summer",
        "programUrl": "https://www.goabroad.com/providers/freie-universitat-berlin-international-summer-and-winter-university-fubis/programs/summer-and-winter-studies-at-the-heart-of-germany-43465",
        "overallRating": 5,
        "dateAdded": "August 10, 2026",
        "reviewerName": "Doreen Li",
        "reviewerCountry": "China"
    },
    {
        "id": 120093,
        "title": "Steady Progress with Schönberg Education",
        "review": "The 1:1 online lessons are engaging, well structured, and tailored to my learning pace.\r\nWhat I appreciate most about Schönberg Education is the combination of high-quality teaching and flexibility. The course fits easily into my schedule, and I’ve been very happy with the progress I’ve made so far. I would definitely recommend Schönberg Education to anyone interested in learning Chinese.",
        "programName": "Online Chinese Learning 1-on-1 - Schönberg Education",
        "programUrl": "https://www.goabroad.com/providers/wuxi-schnberg-education-technology-coltd/programs/online-chinese-learning-1-on-1-schonberg-education-200088",
        "overallRating": 5,
        "dateAdded": "August 10, 2026",
        "reviewerName": "Jane W",
        "reviewerCountry": "Germany"
    },
    {
        "id": 120092,
        "title": "Exactly what I was searching for...",
        "review": "I've been learning this school for a few months now, and it has improved my Mandarin very efficiently. I was self-learning for a couple of years off and on, and it felt like language learning was taking forever. When I started my classes with Teacher Sun Jane, she helped me in areas I struggled with, such as Pronunciation, and I noticed I improved very quickly. If you're serious about learning Mandarin, the program I would recommend. I am almost 25, and I wish I had started this program much younger!",
        "programName": "Schönberg Education-Language Training Institute",
        "programUrl": "https://www.goabroad.com/providers/wuxi-schnberg-education-technology-coltd/programs/schonberg-education-language-training-institute-198176",
        "overallRating": 5,
        "dateAdded": "August 10, 2026",
        "reviewerName": "Paolla W",
        "reviewerCountry": "Poland"
    }
];

export const programReviewsCount = 17363;

export const interviews: Interview[] = [
    {
        "id": 3498,
        "name": "Destiny Benway",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/rltxskwbmkhgwveeujlx.jpg",
        "providerName": "Seamester Study Abroad at Sea",
        "type": 1,
        "excerpt": "I’ve always loved traveling, especially anywhere connected to the ocean. Throughout college, I worked during the school year so I could spend my break...",
        "url": "https://www.goabroad.com/interviews/destiny-benway"
    },
    {
        "id": 3468,
        "name": "Maria Huerta",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/mhjwycawtcz2enozcnig.png",
        "providerName": "European Centre for Career Education",
        "type": 1,
        "excerpt": "What inspired me to go abroad was not just curiosity, but the need to understand the systems that shape people's lives beyond borders.",
        "url": "https://www.goabroad.com/interviews/maria-huerta"
    },
    {
        "id": 3483,
        "name": "Andrew Messersmith",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/andrew-messersmith-1781662019.jpg",
        "providerName": "College Year in Athens",
        "type": 1,
        "excerpt": "What inspired me to go abroad was all of the different opportunities that my university provides. I believe that spending a semester abroad can be an ...",
        "url": "https://www.goabroad.com/interviews/andrew-messersmith"
    },
    {
        "id": 3487,
        "name": "Jonathan Ulicny",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/fkp88upstgvmzfab4opo.jpg",
        "providerName": "CES Maastricht",
        "type": 1,
        "excerpt": "I was inspired to travel abroad because of my commitment to learning more about international cultures and interacting with individuals across Europe....",
        "url": "https://www.goabroad.com/interviews/jonathan-ulicny"
    },
    {
        "id": 3480,
        "name": "Vanessa Chairez",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/vanessa-chairez-1779949193.jpg",
        "providerName": "Universitat Autònoma de Barcelona",
        "type": 1,
        "excerpt": "I was inspired to go about because it truly is a once in a lifetime experience and we are only this young once, so why not take advantage of that. It ...",
        "url": "https://www.goabroad.com/interviews/vanessa-chairez"
    },
    {
        "id": 3482,
        "name": "",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/-1782987311.jpg",
        "providerName": "Bethel University Global Studies",
        "type": 1,
        "excerpt": "My family has been my motivation and inspiration to go abroad. I come from a family where most of us are complacent with small, everyday life. My fami...",
        "url": "https://www.goabroad.com/interviews/azariah-busby-2026"
    },
    {
        "id": 3449,
        "name": "Kesa Ferguson",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/kesa-ferguson-1774503366.jpg",
        "providerName": "Academic Programs International",
        "type": 1,
        "excerpt": "My brother was my primary inspiration to go abroad; seeing his transformative experience in China showed me how much a global perspective can change a...",
        "url": "https://www.goabroad.com/interviews/kesa-ferguson"
    },
    {
        "id": 3416,
        "name": "Lia-Mara Bösch",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/lia-mara-b-sch-1771464889.jpg",
        "providerName": "StudyInBali",
        "type": 1,
        "excerpt": "What inspired me to go abroad was partly a requirement of my university, as we have to either complete an internship or study abroad for one semester.",
        "url": "https://www.goabroad.com/interviews/lia-mara-bösch"
    },
    {
        "id": 3411,
        "name": "John Peterson",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/taqklrxppdb184sorn2a.webp",
        "providerName": "Instituto Hemingway",
        "type": 1,
        "excerpt": "Going abroad was inspired by my desire to step outside my comfort zone and experience life from a different perspective. I wanted to improve my langua...",
        "url": "https://www.goabroad.com/interviews/john-peterson"
    },
    {
        "id": 3384,
        "name": "José Gonzalo Solís Baca",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/jos-gonzalo-sol-s-baca-1770349122.jpg",
        "providerName": "European Centre for Career Education",
        "type": 1,
        "excerpt": "Traveling has always been a passion of mine, and the opportunity to experience other cultures deeply inspires me. Going abroad allows me to build genu...",
        "url": "https://www.goabroad.com/interviews/jose-gonzalo-solis-baca"
    },
    {
        "id": 3379,
        "name": "Amal Azabova",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/nvpgeemchchqvihprsv8.jpg",
        "providerName": "European Centre for Career Education",
        "type": 1,
        "excerpt": "Although I graduated some time ago and currently live in Prague, I felt a strong desire to return to a structured academic environment. I wanted to re...",
        "url": "https://www.goabroad.com/interviews/amal-azabova"
    },
    {
        "id": 3422,
        "name": "Mikhail Mikhaylov",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/mikhail-mikhaylov-1769591142.jpg",
        "providerName": "Learn Russian in the European Union",
        "type": 1,
        "excerpt": "I wanted to deepen my understanding of the post-Soviet region through direct immersion, especially given my academic focus on conflict mediation. The ...",
        "url": "https://www.goabroad.com/interviews/mikhail-mikhaylov"
    },
    {
        "id": 3417,
        "name": "Elise Monroe",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/elise-monroe-1769571226.jpg",
        "providerName": "Academic Programs Abroad (APA)",
        "type": 1,
        "excerpt": "I was always determined to study abroad because of the stories my dad told me about his own time living overseas. He once spoke French fluently, and I...",
        "url": "https://www.goabroad.com/interviews/elise-monroe"
    },
    {
        "id": 3390,
        "name": "Makayla Ross",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/makayla-ross-1767920758.jpg",
        "providerName": "IES Abroad",
        "type": 1,
        "excerpt": "Studying abroad was not a part of my original 4-year plan. I'd anticipate joining campus clubs, meeting new people and making lifelong friendships, an...",
        "url": "https://www.goabroad.com/interviews/makayla-ross"
    },
    {
        "id": 3376,
        "name": "Grant Dockery",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/grant-dockery-1766052318.jpg",
        "providerName": "IES Abroad",
        "type": 1,
        "excerpt": "This was not my first experience studying abroad. I have always loved traveling and experiencing new cultures (I'm a big foodie). I also adore languag...",
        "url": "https://www.goabroad.com/interviews/grant-dockery"
    },
    {
        "id": 3375,
        "name": "Eddie Kaake",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/eddie-kaake-1766051527.jpg",
        "providerName": "CES Maastricht",
        "type": 1,
        "excerpt": "I had known from a young age that I wanted to study far from home, but due to the illness of one of my parents, I was afraid to make that jump. After ...",
        "url": "https://www.goabroad.com/interviews/eddie-kaake"
    },
    {
        "id": 3367,
        "name": "Jon Shepherd",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/jon-shepherd-1765507856.jpg",
        "providerName": "Bethel University Global Studies",
        "type": 1,
        "excerpt": "My first trip abroad was to Mexico when I was in college, studying Spanish. That experience changed everything for me; it brought the language to life...",
        "url": "https://www.goabroad.com/interviews/jon-shepherd"
    },
    {
        "id": 3356,
        "name": "Anika Freestone",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/anika-freestone-1762941041.jpg",
        "providerName": "Phezulu Pre-Vet",
        "type": 1,
        "excerpt": "I’ve always wanted to go to Africa, or specifically South Africa, to experience and work with its wildlife since I was a little girl. I’ve wanted to e...",
        "url": "https://www.goabroad.com/interviews/anika-freestone"
    },
    {
        "id": 3331,
        "name": "Mounif Ghrayeb",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/mounif-ghrayeb-1758527387.jpg",
        "providerName": "Forum-Nexus Study Abroad",
        "type": 1,
        "excerpt": "I was inspired by a deep curiosity to experience the world beyond textbooks and classrooms. I’ve always believed that education doesn’t end within fou...",
        "url": "https://www.goabroad.com/interviews/mounif-ghrayeb"
    },
    {
        "id": 3332,
        "name": "Janie Kilby",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/janie-kilby-1758527823.jpg",
        "providerName": "Forum-Nexus Study Abroad",
        "type": 1,
        "excerpt": "All three of my older brothers participated in study abroad, and from their experiences and adventures, I discovered my inspiration to have similar ad...",
        "url": "https://www.goabroad.com/interviews/janie-kilby"
    }
];

export const travelResourceAd = {
    "url": "https://medjetassist.com/",
    "image": "https://images.goabroad.com/image/upload/v1/images2/a/DF/TMg90MNInvABzXHkv6VnfMAAiiEmZ8n13M1G9V6m_1755524447.webp",
    "imageAlt": "medjet air transport",
    "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/medjet-logo-1599032952.webp",
    "providerName": "Medjet",
    "callToActionText": "Get to a hospital at HOME + 24/7 crisis response. Top-Rated Program!"
};

export const popularSearches: PopularSearchGroup[] = [
    {
        "caption": "LOCATIONS",
        "items": [
            {
                "name": "Italy",
                "link": "https://www.goabroad.com/study-abroad/search/italy/study-abroad-1"
            },
            {
                "name": "Spain",
                "link": "https://www.goabroad.com/study-abroad/search/spain/study-abroad-1"
            },
            {
                "name": "England",
                "link": "https://www.goabroad.com/study-abroad/search/england/study-abroad-1"
            },
            {
                "name": "Japan",
                "link": "https://www.goabroad.com/study-abroad/search/japan/study-abroad-1"
            },
            {
                "name": "France",
                "link": "https://www.goabroad.com/study-abroad/search/france/study-abroad-1"
            },
            {
                "name": "Australia",
                "link": "https://www.goabroad.com/study-abroad/search/australia/study-abroad-1"
            },
            {
                "name": "South Korea",
                "link": "https://www.goabroad.com/study-abroad/search/south-korea/study-abroad-1"
            },
            {
                "name": "Costa Rica",
                "link": "https://www.goabroad.com/study-abroad/search/costa-rica/study-abroad-1"
            }
        ]
    },
    {
        "caption": "REGIONS",
        "items": [
            {
                "name": "Western Europe",
                "link": "https://www.goabroad.com/study-abroad/search/western-europe/study-abroad-1"
            },
            {
                "name": "Asia",
                "link": "https://www.goabroad.com/study-abroad/search/asia/study-abroad-1"
            },
            {
                "name": "Africa",
                "link": "https://www.goabroad.com/study-abroad/search/africa/study-abroad-1"
            },
            {
                "name": "South America",
                "link": "https://www.goabroad.com/study-abroad/search/south-america/study-abroad-1"
            },
            {
                "name": "Australia & Oceania",
                "link": "https://www.goabroad.com/study-abroad/search/australia-oceania/study-abroad-1"
            },
            {
                "name": "Central America",
                "link": "https://www.goabroad.com/study-abroad/search/central-america/study-abroad-1"
            },
            {
                "name": "North America",
                "link": "https://www.goabroad.com/study-abroad/search/north-america/study-abroad-1"
            },
            {
                "name": "Eastern Europe & Russia",
                "link": "https://www.goabroad.com/study-abroad/search/eastern-europe-russia/study-abroad-1"
            }
        ]
    },
    {
        "caption": "PROGRAM TYPES",
        "items": [
            {
                "name": "Psychology",
                "link": "https://www.goabroad.com/study-abroad/search/psychology/study-abroad-1"
            },
            {
                "name": "Marine Biology",
                "link": "https://www.goabroad.com/study-abroad/search/marine-biology/study-abroad-1"
            },
            {
                "name": "Medicine",
                "link": "https://www.goabroad.com/study-abroad/search/medicine/study-abroad-1"
            },
            {
                "name": "Photography",
                "link": "https://www.goabroad.com/study-abroad/search/photography/study-abroad-1"
            },
            {
                "name": "Nursing",
                "link": "https://www.goabroad.com/study-abroad/search/nursing/study-abroad-1"
            },
            {
                "name": "Pre-Med",
                "link": "https://www.goabroad.com/study-abroad/search/pre-med/study-abroad-1"
            },
            {
                "name": "Culture",
                "link": "https://www.goabroad.com/study-abroad/search/culture/study-abroad-1"
            },
            {
                "name": "Conservation & Preservation",
                "link": "https://www.goabroad.com/study-abroad/search/conservation-and-preservation/study-abroad-1"
            }
        ]
    },
    {
        "caption": "TIMING",
        "items": [
            {
                "name": "Summer",
                "link": "https://www.goabroad.com/study-abroad/search/summer/study-abroad-1"
            },
            {
                "name": "Fall",
                "link": "https://www.goabroad.com/study-abroad/search/fall/study-abroad-1"
            },
            {
                "name": "Spring",
                "link": "https://www.goabroad.com/study-abroad/search/spring/study-abroad-1"
            },
            {
                "name": "Academic Year",
                "link": "https://www.goabroad.com/study-abroad/search/academic-year/study-abroad-1"
            }
        ]
    },
    {
        "caption": "TRENDING",
        "items": [
            {
                "name": "Online",
                "link": "https://www.goabroad.comhttps://www.goabroad.com/study-abroad/search/online/study-abroad-1"
            },
            {
                "name": "China",
                "link": "https://www.goabroad.com/study-abroad/search/china/study-abroad-1"
            },
            {
                "name": "Costa Rica",
                "link": "https://www.goabroad.com/study-abroad/search/costa-rica/study-abroad-1"
            },
            {
                "name": "Spain",
                "link": "https://www.goabroad.com/study-abroad/search/spain/study-abroad-1"
            }
        ]
    }
];

export const recentArticles: Article[] = [
    {
        "id": 2282,
        "title": "The 10 Best Countries to Study Abroad in 2027",
        "altText": "Florence, Italy",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/prime-sa-top10-2017-1460629736.png",
        "topic": "Top Destinations",
        "url": "https://www.goabroad.com/articles/study-abroad/top-10-study-abroad-destinations",
        "authorName": "Mariam Cananes",
        "authorUrl": "https://www.goabroad.com/author/mariam-cananes",
        "date": "August 07, 2026"
    },
    {
        "id": 6591,
        "title": "How to Adapt to a New Culture When Studying Abroad: A Student's Guide",
        "altText": "How to Adapt to a New Culture When Studying Abroad",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/RTglh6Ahjebu0Ko0lOCQg3fw5Izt45BDvIssFpxV.jpg",
        "topic": "Culture",
        "url": "https://www.goabroad.com/articles/study-abroad/how-to-adapt-to-a-new-culture-when-studying-abroad",
        "authorName": "GoAbroad Writing Team",
        "authorUrl": "https://www.goabroad.com/author/goabroad-writing-team",
        "date": "August 07, 2026"
    },
    {
        "id": 6393,
        "title": "What Are the Benefits of Studying Abroad?",
        "altText": "benefits of studying abroad",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/zolCNYaxGxZbYGkfDmALvS8oZmSu9leATUPqkdB7.jpg",
        "topic": "",
        "url": "https://www.goabroad.com/articles/study-abroad/benefits-of-studying-abroad",
        "authorName": "Farryl Last",
        "authorUrl": "https://www.goabroad.com/author/farryl-last",
        "date": "July 31, 2026"
    },
    {
        "id": 6606,
        "title": "What You Gain from a Short Study Abroad Trip a Vacation Can’t Give You",
        "altText": "What Short Study Abroad Trips Give You That a Vacation Can’t Photo of L-R",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/ueTFv8Koxzj91pJ7nnH9QZUx6qGTYOKJN06huZCk.jpg",
        "topic": "Travel Inspiration",
        "url": "https://www.goabroad.com/articles/study-abroad/what-short-study-abroad-trips-give-a-vacation-cant",
        "authorName": "Stacie Freeman, MSSW",
        "authorUrl": "https://www.goabroad.com/author/stacie-freeman-mssw",
        "date": "July 30, 2026"
    },
    {
        "id": 6411,
        "title": "14 Things to Do While Studying Abroad",
        "altText": "Things to Do While Studying Abroad",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/OstO7KrmENkaohjoEk2TSH2F36scmchHwVuyTLeI.jpg",
        "topic": "",
        "url": "https://www.goabroad.com/articles/study-abroad/study-abroad-bucket-list",
        "authorName": "Sydney E. Lutz",
        "authorUrl": "https://www.goabroad.com/author/sydney-e-lutz",
        "date": "July 24, 2026"
    },
    {
        "id": 6418,
        "title": "What Exactly Is Study Abroad? What Does It Mean?",
        "altText": "what does studying abroad mean",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/FcgEhG9qc4FTqPuykHXt0hqRDDmkxTTVdV5bSRDV.jpg",
        "topic": "",
        "url": "https://www.goabroad.com/articles/study-abroad/what-is-study-abroad-1",
        "authorName": "Farryl Last",
        "authorUrl": "https://www.goabroad.com/author/farryl-last",
        "date": "July 24, 2026"
    },
    {
        "id": 2082,
        "title": "What to Do When a \"Regular\" Study Abroad Program Doesn't Work for You",
        "altText": "University students discussing a project",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/prime-traditional-study-abroad-1455156647.jpg",
        "topic": "",
        "url": "https://www.goabroad.com/articles/study-abroad/why-a-traditional-study-abroad-program-doesn-t-work-for-you-what-to-do-instead",
        "authorName": "Jennifer Bangoura",
        "authorUrl": "https://www.goabroad.com/author/jennifer-bangoura",
        "date": "July 22, 2026"
    },
    {
        "id": 3064,
        "title": "Survive Culture Shock While Studying Abroad Off-the-Beaten-Path",
        "altText": "Family eating dinner at home",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/prime-surviving-culture-shock-while-studying-abroad-off-the-beaten-path-1486362972.jpg",
        "topic": "Culture Shock Tips",
        "url": "https://www.goabroad.com/articles/study-abroad/surviving-culture-shock-while-studying-abroad-off-the-beaten-path",
        "authorName": "Amanda Thompson",
        "authorUrl": "https://www.goabroad.com/author/amanda-thompson",
        "date": "July 22, 2026"
    },
    {
        "id": 4537,
        "title": "Study Abroad for Older Adults, Seniors, Retirees—5 Great Countries",
        "altText": "old people chatting in the gardens",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/cover-1536652540.jpg",
        "topic": "50+ Travel",
        "url": "https://www.goabroad.com/articles/study-abroad/study-abroad-for-older-adults",
        "authorName": "Petrina Darrah",
        "authorUrl": "https://www.goabroad.com/author/petrina-darrah",
        "date": "July 22, 2026"
    },
    {
        "id": 4528,
        "title": "How to Establish Your Own Study Abroad Goals",
        "altText": "study abroad goals",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/study-abroad-goals-2-1536081803.jpg",
        "topic": "",
        "url": "https://www.goabroad.com/articles/study-abroad/study-abroad-goals",
        "authorName": "Megan Lee",
        "authorUrl": "https://www.goabroad.com/author/megan-lee",
        "date": "July 22, 2026"
    },
    {
        "id": 4748,
        "title": "7 Off the Beaten Path Locations for Jewish Students to Study Abroad",
        "altText": "tourist enjoying the view",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/cover-1544163229.jpg",
        "topic": "Diversity",
        "url": "https://www.goabroad.com/articles/study-abroad/jewish-student-study-abroad-off-beaten-path",
        "authorName": "Madison Jackson",
        "authorUrl": "https://www.goabroad.com/author/madison-jackson",
        "date": "July 22, 2026"
    },
    {
        "id": 3902,
        "title": "10 Best Places to Study Abroad in Asia & South Pacific in 2018",
        "altText": "Two friends reading a map",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/cover-1514614661.jpg",
        "topic": "2018 GoAbroad Report",
        "url": "https://www.goabroad.com/articles/study-abroad/best-places-study-abroad-asia-south-pacific-2018",
        "authorName": "GoAbroad 2018 Official Report",
        "authorUrl": "https://www.goabroad.com/author/goabroad-2018-official-report",
        "date": "July 22, 2026"
    },
    {
        "id": 6603,
        "title": "The Go-To App for Students Traveling Abroad to Download",
        "altText": "The Go-To App for Students Traveling Abroad to Download",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/SveXBiioWSwh1U21Y95DZCnBVrg8SgW50lT4Un7f.jpg",
        "topic": "While Abroad",
        "url": "https://www.goabroad.com/articles/study-abroad/go-to-app-for-students-traveling-abroad",
        "authorName": "Conner Kopischke",
        "authorUrl": "https://www.goabroad.com/author/conner-kopischke",
        "date": "July 22, 2026"
    },
    {
        "id": 3409,
        "title": "5 Awesome Asian American Grants & Scholarships to Study Abroad",
        "altText": "young woman in aviator sunglasses sitting in the sun",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/prime-top-5-asian-american-grants-scholarships-to-study-abroad-1501048030.png",
        "topic": "Scholarships & Funding",
        "url": "https://www.goabroad.com/articles/study-abroad/asian-american-grants-scholarships-study-abroad",
        "authorName": "GoAbroad Writing Team",
        "authorUrl": "https://www.goabroad.com/author/goabroad-writing-team",
        "date": "July 21, 2026"
    },
    {
        "id": 6449,
        "title": "Top 10 Inexpensive Study Abroad Programs",
        "altText": "inexpensive study abroad programs",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/G6VayS7hfKC7Z2vCUbAPCioOdhTHhsI5hnFFTPqs.jpg",
        "topic": "Money Tips",
        "url": "https://www.goabroad.com/articles/study-abroad/top-inexpensive-study-abroad-programs",
        "authorName": "Katrina Bianca Catan",
        "authorUrl": "https://www.goabroad.com/author/katrina-bianca-catan",
        "date": "July 17, 2026"
    },
    {
        "id": 6463,
        "title": "Most Affordable Places to Study Abroad in 2026",
        "altText": "affordable places to study abroad",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/mvXTzYV1ayLTUaSbyQm8VDaM8ZGCroKscmU6IUHn.jpg",
        "topic": "Top Destinations",
        "url": "https://www.goabroad.com/articles/study-abroad/most-affordable-places-to-study-abroad",
        "authorName": "Katrina Bianca Catan",
        "authorUrl": "https://www.goabroad.com/author/katrina-bianca-catan",
        "date": "July 17, 2026"
    },
    {
        "id": 6476,
        "title": "Study Abroad on a Budget with Non-Profit Study Abroad",
        "altText": "Study Abroad on a Budget with NPSA",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/UBEhfM1uOHjlsTATrKGIrnwtcFQ2DrXVLrThrUXr.jpg",
        "topic": "Program Selection Tips",
        "url": "https://www.goabroad.com/articles/study-abroad/low-cost-study-abroad-npsa",
        "authorName": "GoAbroad Writing Team",
        "authorUrl": "https://www.goabroad.com/author/goabroad-writing-team",
        "date": "July 15, 2026"
    },
    {
        "id": 6495,
        "title": "The Best Opportunities to Study Abroad in Scandinavia",
        "altText": "Best Study Abroad Programs in Scandinavia",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/9RWL2jkzBcDcMrjCLN48XMWpEfMKfo8b0GNJFBLq.jpg",
        "topic": "Top Picks",
        "url": "https://www.goabroad.com/articles/study-abroad/best-study-abroad-in-scandinavia",
        "authorName": "GoAbroad Writing Team",
        "authorUrl": "https://www.goabroad.com/author/goabroad-writing-team",
        "date": "July 15, 2026"
    },
    {
        "id": 6541,
        "title": "Study Abroad Visa Requirements: Here’s What You Should Know",
        "altText": "Study Abroad Visa Requirements: Here’s What You Should Know",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/ZupFDuT3RYhn7uF5SivmkkOaaAnqSqbePNOBlD6z.jpg",
        "topic": "Passports and Visas",
        "url": "https://www.goabroad.com/articles/study-abroad/study-abroad-visa-requirements",
        "authorName": "Dana Marie Paler",
        "authorUrl": "https://www.goabroad.com/author/dana-marie-paler",
        "date": "July 15, 2026"
    },
    {
        "id": 6560,
        "title": "Can You Study Abroad After Graduation? Here’s What You Need to Know",
        "altText": "Can You Study Abroad After Graduation? Here’s What You Need to Know",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/21sqx25m1Nrn0H2LGgsNf3RQjxYVt4q7zZ4OoblI.jpg",
        "topic": "General Travel",
        "url": "https://www.goabroad.com/articles/study-abroad/can-you-study-abroad-after-graduation",
        "authorName": "Dana Marie Paler",
        "authorUrl": "https://www.goabroad.com/author/dana-marie-paler",
        "date": "July 15, 2026"
    }
];


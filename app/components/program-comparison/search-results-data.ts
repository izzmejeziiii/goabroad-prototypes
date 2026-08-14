// Content captured from the live Japan search results page
// (https://www.goabroad.com/study-abroad/search/japan/study-abroad-1).
import type {
    Ad,
    Article,
    FilterOption,
    GuideSection,
    Interview,
    PopularSearchGroup,
    PremierAd,
    ProgramResult,
    Review,
    SearchFilter,
} from "./types";

export const breadcrumbs = [
    {
        "label": "Home",
        "link": "https://www.goabroad.com/"
    },
    {
        "label": "Study Abroad",
        "link": "https://www.goabroad.com/study-abroad"
    },
    {
        "label": "Asia",
        "link": "https://www.goabroad.com/study-abroad/search/asia/study-abroad-1"
    },
    {
        "label": "Japan",
        "link": "https://www.goabroad.com/study-abroad/search/japan/study-abroad-1"
    }
];

export const pageMeta = {
    "h1": "Study Abroad Programs in Japan",
    "h2": "97 Study Abroad Programs in Japan"
};

export const currentUrl = "/study-abroad/search/japan/study-abroad-1";

export const guideIntro = "For much of Japan’s history, it has remained isolated from the outside world. In the 19th century, however, the small island country opened its doors to trade and an active foreign policy, and it has never looked back since. Japan's culture, an excellent blend of tradition and innovation, provides a vibrant place for academic and personal growth.\r\n";

export const guideTitle = "How to Study Abroad in Japan";

export const guideSections: GuideSection[] = [
    {
        "id": 28751,
        "title": "Overview",
        "content": "<h3>Prepare to Study Abroad</h3>\r\n<h4>Set goals</h4>\r\n<p>Whatever you’re looking to achieve, use ours as a guide or the base of what you want from your trip!</p>\r\n<ul>\r\n<li dir = \"auto\"><strong>Academic goals are one of the most important things to consider! </strong>Determine which subjects or fields you want to examine more closely or push yourself in.</li>\r\n<li dir = \"auto\"><strong>Being aware of and participating in cultural practices is important. </strong>What kind of things do you hope to learn from or participate in?</li>\r\n<li dir = \"auto\"><strong>Having the unique experience of studying abroad changes people, and rightfully so! </strong>Is there a part of you that you’re pushing out of your comfort zone to grow?</li>\r\n</ul>\r\n<h4>Understand the benefits</h4>\r\n<p>Studying in Japan offers high-quality education and unique cultural experiences, allowing you to learn from leading experts and gain a global perspective to enhance your career prospects.</p>\r\n<ul>\r\n<li dir = \"auto\"><strong>Academic excellence</strong>. Japan is home to many prestigious universities known for their rigorous academic standards.</li>\r\n<li dir = \"auto\"><strong>Cultural immersion of new and old</strong>. Experience Japan's rich traditions and modern innovations firsthand.</li>\r\n<li dir = \"auto\"><strong>Networking opportunities abound</strong>. Build connections with students and professionals from around the world.</li>\r\n</ul>\r\n<h4>Things to know</h4>\r\n<p>There are many things to learn about Japan when visiting. A few essentials that will be helpful anywhere you will be are:</p>\r\n<ul>\r\n<li><strong>Logistics and safety.</strong> Prepare important documents ahead of time and create a flexible, practical packing list to suit the trip. This will help avoid unnecessary stress during your stay.</li>\r\n<li><strong>Social and cultural etiquette.</strong>  Bowing is a crucial gesture in Japan, showing respect, gratitude, and apology. Understanding social and cultural norms, especially regarding the respect for elders, is important in fostering positive interactions.</li>\r\n<li><strong>Visa requirements.</strong> If staying for an extended period, you’ll likely need a visa, so it's essential to check the latest requirements with your embassy or academic program.</li>\r\n<li><strong>Language. </strong>Learning basic Japanese phrases will be helpful in daily conversations, improving your ability to communicate effectively.</li>\r\n</ul>\r\n"
    },
    {
        "id": 28752,
        "title": "Locations",
        "content": "<h3>Choose a Location</h3>\r\n<p>Japanese cities offer a unique blend of culture, lifestyle, and academics, allowing any experience abroad to be incredible and dynamic.</p>\r\n<h4><a href=https://www.goabroad.com/study-abroad/search/japan/tokyo/study-abroad-1 rel=\"\" target=\"_self\" class=\"link\"><ins>Tokyo</ins></a></h4>\r\n<p>Tokyo is a bustling metropolis known for its cutting-edge technology, vibrant culture, and prestigious universities. The city's fast-paced lifestyle and opportunities for entertainment and networking are endless. Tokyo is a great option for those interested in business, tech, and urban studies.</p>\r\n<h4><a href=https://www.goabroad.com/study-abroad/search/japan/kyoto/study-abroad-1 rel=\"\" target=\"_self\" class=\"link\"><ins>Kyoto</ins></a></h4>\r\n<p>With its rich history and numerous temples, Kyoto provides a serene and contemplative environment. Known as Japan's cultural heart, Kyoto offers a slower pace of life, with beautiful gardens, historic sites, and a strong sense of tradition. Great for students who appreciate a deep cultural immersion.</p>\r\n<h4><a href=https://www.goabroad.com/study-abroad/search/japan/osaka/study-abroad-1 rel=\"\" target=\"_self\" class=\"link\"><ins>Osaka</ins></a></h4>\r\n<p>Famous for its friendly locals and delicious cuisine, the city of Osaka is a great place for students interested in business, commerce, and culinary arts. The city's vibrant nightlife, shopping districts, and culinary scene provide a lively backdrop for students.</p>\r\n"
    },
    {
        "id": 28753,
        "title": "Subjects",
        "content": "<h3>Choose a Subject</h3>\r\n<p>Japan offers a diverse offering of academic disciplines, each with unique opportunities and strengths. Here are a few:</p>\r\n<h4><a href=https://www.goabroad.com/study-abroad/search/japan/business/study-abroad-1 rel=\"\" target=\"_self\" class=\"link\"><ins>Business</ins></a></h4>\r\n<p>Japan's strong economy and innovative business practices make it an excellent choice for studying business and management. Students can gain insights into global business strategies, entrepreneurship, and economic policies.</p>\r\n<h4><a href=https://www.goabroad.com/study-abroad/search/japan/technology/study-abroad-1 rel=\"\" target=\"_self\" class=\"link\"><ins>Technology</ins></a></h4>\r\n<p>With its leading role in technological advancements, Japan is perfect for students interested in engineering, computer science, and robotics. The country is home to cutting-edge research facilities and tech giants, offering students hands-on experience with the latest innovations.</p>\r\n<h4><a href=https://www.goabroad.com/study-abroad/search/japan/liberal-arts/study-abroad-1 rel=\"\" target=\"_self\" class=\"link\"><ins>Liberal Arts</ins></a></h4>\r\n<p>Japan's rich cultural history and artistic traditions provide a fertile ground for studying literature, history, and fine arts. Students can explore contemporary culture in addition to traditional arts like calligraphy or a tea ceremony. Immersing in Japan's vibrant arts scene offers a unique perspective on global humanities and creative practices.</p>\r\n"
    },
    {
        "id": 28754,
        "title": "Getting Started",
        "content": "<h3>Tips and Advice</h3>\r\n<p>Follow these steps to get started on your study abroad journey in Japan.</p>\r\n<h4>1. Get matched</h4>\r\n<p>Start by <a href=https://www.goabroad.com/onlineadvisor rel=\"\" target=\"_self\" class=\"link\"><ins>getting matched by our online advisor with programs</ins></a> that fit your goals and interests. Results get emailed to you!</p>\r\n<h4>2. Choose a program</h4>\r\n<p>Explore different programs to find one that aligns with your academic and personal goals. If you haven’t, <a href=https://my.goabroad.com/auth/signin rel=\"\" target=\"_self\" class=\"link\"><ins>sign up for a MyGoAbroad account</ins></a> to save and compare programs side-by-side.</p>\r\n<h4>3. Decide when to go</h4>\r\n<p>Japanese universities often have a slightly different academic calendar compared to other countries, so be sure to pay attention to the dates.</p>\r\n<ul>\r\n<li dir = \"auto\"><strong>Spring semester</strong>. Generally the start of most Japanese universities' academic school year—specifically April.</li>\r\n<li dir = \"auto\"><strong>Fall semester</strong>.  Aligns with many other universities in the Western world, and you can partake in fall festivities like watching Sumo matches in November.</li>\r\n<li dir = \"auto\"><strong>Winter/summer semester</strong>. Depending on where you study, this may be a great opportunity to participate in a shorter study abroad experience.</li>\r\n<li dir = \"auto\"><strong>Academic year</strong>. If you’re interested in committing a whole academic year, there are plenty available leads for that route!</li>\r\n</ul>\r\n<h4>4. Funding &amp; scholarships</h4>\r\n<p>Fill out our <a href=https://www.goabroad.com/mygoabroad/offers/apply rel=\"\" target=\"_self\" class=\"link\"><ins>scholarship and deals application</ins></a> to get matched with funding opportunities for study programs.</p>\r\n<h4>5. Apply</h4>\r\n<p>To apply, head to the program page, click \"Inquire Here\" or \"Apply Now,\" and submit your application. After that, just wait for your program coordinator to get in touch with the next steps!</p>\r\n<h4>6. Get your essentials</h4>\r\n<p>Secure your<a href=https://www.goabroad.com/travel-resources/passports-visas rel=\"\" target=\"_self\" class=\"link\"> <ins>passport and visa</ins></a>, book your<a href=https://www.goabroad.com/travel-resources/flights-transportation rel=\"\" target=\"_self\" class=\"link\"> <ins>flights</ins></a>, purchase <a href=https://insurance.goabroad.com/ rel=\"\" target=\"_self\" class=\"link\"><ins>travel insurance</ins></a>, and plan your<a href=https://www.goabroad.com/travel-resources/accommodations-abroad rel=\"\" target=\"_self\" class=\"link\"> <ins>accommodations</ins></a>. Once everything is set, your adventure awaits!</p>\r\n"
    }
];

export const faqs: GuideSection[] = [
    {
        "id": 13217,
        "title": "Why should I study abroad in Japan?",
        "content": "<p><a href=https://www.goabroad.com/articles/study-abroad/why-study-abroad-in-japan rel=\"\" target=\"_self\" class=\"link\"><ins>Japan</ins></a> is a good place to study abroad for so many reasons. High-quality study abroad programs, valuable cultural exchange, and meeting people from all over the world all make the experience totally worth it.</p>\r\n"
    },
    {
        "id": 13218,
        "title": "Do I need to learn Japanese to study in Japan?",
        "content": "<p>No, you do not need to know Japanese to <a href=https://www.goabroad.com/articles/study-abroad/studying-abroad-in-japan-advice rel=\"\" target=\"_self\" class=\"link\"><ins>study in Japan</ins></a>! There are many English-language study abroad programs hosted in Japan, but picking up new language skills is one of the many perks of studying in Japan. Try out a beginner class when you get there if you don’t speak any Japanese.</p>\r\n"
    },
    {
        "id": 13219,
        "title": "How much does it cost to study abroad in Japan?",
        "content": "<p>It’s not any more expensive to study abroad in Japan than elsewhere in the world. Depending on where you live, though, the flight could get pricey. You can expect to <a href=https://www.goabroad.com/articles/study-abroad/cost-to-study-abroad-in-japan rel=\"\" target=\"_self\" class=\"link\"><ins>spend</ins></a> up to $6,000 for a summer in Japan, and up to $11,000 for a semester program, not including flights, insurance, and visa expenses.</p>\r\n"
    },
    {
        "id": 13220,
        "title": "How can I study abroad in Japan?",
        "content": "<p>It’s easy enough to <a href=https://www.goabroad.com/articles/study-abroad/how-to-study-abroad-in-japan rel=\"\" target=\"_self\" class=\"link\"><ins>study abroad in Japan</ins></a> if your college has a study abroad program there. Otherwise, you’ll want to explore study abroad providers based on your field of study, and ask if they provide transfer credit (they almost always do).</p>\r\n"
    },
    {
        "id": 13221,
        "title": "Do I need a visa to study in Japan?",
        "content": "<p>If you’re studying abroad in Japan for less than 90 days, a tourist visa will suffice, depending on your program and host institution. If you plan to study in Japan for three months or longer, then you’ll need to apply for a student visa.</p>\r\n"
    }
];

export const searchFilters: SearchFilter[] = [
    {
        "filter": "city_id",
        "label": "Choose a Location",
        "fieldName": "Location",
        "options": [
            {
                "id": 2622,
                "value": "aichi",
                "label": "Aichi"
            },
            {
                "id": 2564,
                "value": "aizuwakamatsu",
                "label": "Aizuwakamatsu"
            },
            {
                "id": 2565,
                "value": "akita",
                "label": "Akita"
            },
            {
                "id": 6390,
                "value": "amagasaki",
                "label": "Amagasaki"
            },
            {
                "id": 2651,
                "value": "ami",
                "label": "Ami"
            },
            {
                "id": 2566,
                "value": "asahikawa",
                "label": "Asahikawa"
            },
            {
                "id": 2570,
                "value": "beppu",
                "label": "Beppu"
            },
            {
                "id": 2571,
                "value": "chiba",
                "label": "Chiba"
            },
            {
                "id": 2572,
                "value": "chiryu",
                "label": "Chiryu"
            },
            {
                "id": 6391,
                "value": "chuoko",
                "label": "Chuoko"
            },
            {
                "id": 6392,
                "value": "fuchu",
                "label": "Fuchu"
            },
            {
                "id": 2573,
                "value": "fujinomiya-city",
                "label": "Fujinomiya City"
            },
            {
                "id": 2574,
                "value": "fukuoka",
                "label": "Fukuoka"
            },
            {
                "id": 2575,
                "value": "fukushima",
                "label": "Fukushima"
            },
            {
                "id": 2576,
                "value": "fukuyama",
                "label": "Fukuyama"
            },
            {
                "id": 2577,
                "value": "gifu",
                "label": "Gifu"
            },
            {
                "id": 2578,
                "value": "gotemba",
                "label": "Gotemba"
            },
            {
                "id": 2601,
                "value": "gunma",
                "label": "Gunma"
            },
            {
                "id": 2581,
                "value": "hakuba",
                "label": "Hakuba"
            },
            {
                "id": 2583,
                "value": "hamamatsu",
                "label": "Hamamatsu"
            },
            {
                "id": 562,
                "value": "hikone",
                "label": "Hikone"
            },
            {
                "id": 2584,
                "value": "hirakata",
                "label": "Hirakata"
            },
            {
                "id": 567,
                "value": "hiratsuka",
                "label": "Hiratsuka"
            },
            {
                "id": 564,
                "value": "hiroshima",
                "label": "Hiroshima"
            },
            {
                "id": 2586,
                "value": "hitachi",
                "label": "Hitachi"
            },
            {
                "id": 2595,
                "value": "hokkaido",
                "label": "Hokkaido"
            },
            {
                "id": 2609,
                "value": "hyogo",
                "label": "Hyogo"
            },
            {
                "id": 2649,
                "value": "iizuka",
                "label": "Iizuka"
            },
            {
                "id": 2587,
                "value": "iwata",
                "label": "Iwata"
            },
            {
                "id": 6393,
                "value": "kagoshima",
                "label": "Kagoshima"
            },
            {
                "id": 2590,
                "value": "kainan",
                "label": "Kainan"
            },
            {
                "id": 2625,
                "value": "kanagawa",
                "label": "Kanagawa"
            },
            {
                "id": 568,
                "value": "kanazawa",
                "label": "Kanazawa"
            },
            {
                "id": 2592,
                "value": "kansai",
                "label": "Kansai"
            },
            {
                "id": 2591,
                "value": "kanto",
                "label": "Kanto"
            },
            {
                "id": 569,
                "value": "kasugai",
                "label": "Kasugai"
            },
            {
                "id": 566,
                "value": "kawagoe",
                "label": "Kawagoe"
            },
            {
                "id": 2593,
                "value": "kawasaki",
                "label": "Kawasaki"
            },
            {
                "id": 4199,
                "value": "kitakyushu",
                "label": "Kitakyushu"
            },
            {
                "id": 561,
                "value": "kobe",
                "label": "Kobe"
            },
            {
                "id": 6394,
                "value": "kochi",
                "label": "Kochi"
            },
            {
                "id": 2594,
                "value": "kushiro",
                "label": "Kushiro"
            },
            {
                "id": 593,
                "value": "kyoto",
                "label": "Kyoto"
            },
            {
                "id": 2623,
                "value": "machida",
                "label": "Machida"
            },
            {
                "id": 2597,
                "value": "matsusaka",
                "label": "Matsusaka"
            },
            {
                "id": 2598,
                "value": "mihara",
                "label": "Mihara"
            },
            {
                "id": 6395,
                "value": "mitatoku-tokyo",
                "label": "Mitatoku Tokyo"
            },
            {
                "id": 6396,
                "value": "miyazaki",
                "label": "Miyazaki"
            },
            {
                "id": 2599,
                "value": "morioka",
                "label": "Morioka"
            },
            {
                "id": 8371,
                "value": "muroran",
                "label": "Muroran"
            },
            {
                "id": 2582,
                "value": "nagano",
                "label": "Nagano"
            },
            {
                "id": 2602,
                "value": "nagasaki",
                "label": "Nagasaki"
            },
            {
                "id": 570,
                "value": "nagoya",
                "label": "Nagoya"
            },
            {
                "id": 6397,
                "value": "naha",
                "label": "Naha"
            },
            {
                "id": 563,
                "value": "nakajo",
                "label": "Nakajo"
            },
            {
                "id": 2619,
                "value": "nara",
                "label": "Nara"
            },
            {
                "id": 18293,
                "value": "nasushiobara",
                "label": "Nasushiobara"
            },
            {
                "id": 2603,
                "value": "niigata",
                "label": "Niigata"
            },
            {
                "id": 29768,
                "value": "niihama",
                "label": "Niihama"
            },
            {
                "id": 2628,
                "value": "nikko",
                "label": "Nikko"
            },
            {
                "id": 2604,
                "value": "nishinomiya",
                "label": "Nishinomiya"
            },
            {
                "id": 2606,
                "value": "odawara",
                "label": "Odawara"
            },
            {
                "id": 2624,
                "value": "oita",
                "label": "Oita"
            },
            {
                "id": 2632,
                "value": "okayama",
                "label": "Okayama"
            },
            {
                "id": 565,
                "value": "okazaki",
                "label": "Okazaki"
            },
            {
                "id": 2626,
                "value": "okinawa",
                "label": "Okinawa"
            },
            {
                "id": 2568,
                "value": "onoda",
                "label": "Onoda"
            },
            {
                "id": 2585,
                "value": "osaka",
                "label": "Osaka"
            },
            {
                "id": 20162,
                "value": "rural-areas",
                "label": "Rural Areas"
            },
            {
                "id": 31917,
                "value": "saga",
                "label": "Saga"
            },
            {
                "id": 2607,
                "value": "saitama",
                "label": "Saitama"
            },
            {
                "id": 6398,
                "value": "saitamatan",
                "label": "Saitamatan"
            },
            {
                "id": 2608,
                "value": "sanda",
                "label": "Sanda"
            },
            {
                "id": 2610,
                "value": "sapporo",
                "label": "Sapporo"
            },
            {
                "id": 6399,
                "value": "sasebo",
                "label": "Sasebo"
            },
            {
                "id": 2611,
                "value": "sendai",
                "label": "Sendai"
            },
            {
                "id": 2620,
                "value": "shibata",
                "label": "Shibata"
            },
            {
                "id": 2613,
                "value": "shirakawa",
                "label": "Shirakawa"
            },
            {
                "id": 2614,
                "value": "shizuoka",
                "label": "Shizuoka"
            },
            {
                "id": 2615,
                "value": "suzuka",
                "label": "Suzuka"
            },
            {
                "id": 2616,
                "value": "tachikawa",
                "label": "Tachikawa"
            },
            {
                "id": 6400,
                "value": "takamatsu",
                "label": "Takamatsu"
            },
            {
                "id": 28537,
                "value": "takayama",
                "label": "Takayama"
            },
            {
                "id": 2617,
                "value": "tatsuno",
                "label": "Tatsuno"
            },
            {
                "id": 2618,
                "value": "tenri",
                "label": "Tenri"
            },
            {
                "id": 8834,
                "value": "tokushima",
                "label": "Tokushima"
            },
            {
                "id": 2621,
                "value": "tokuyama",
                "label": "Tokuyama"
            },
            {
                "id": 560,
                "value": "tokyo",
                "label": "Tokyo"
            },
            {
                "id": 2629,
                "value": "toon",
                "label": "Toon"
            },
            {
                "id": 6804,
                "value": "toyama",
                "label": "Toyama"
            },
            {
                "id": 6402,
                "value": "toyota",
                "label": "Toyota"
            },
            {
                "id": 2630,
                "value": "tsukuba",
                "label": "Tsukuba"
            },
            {
                "id": 2631,
                "value": "tsuyama",
                "label": "Tsuyama"
            },
            {
                "id": 31008,
                "value": "utsunomiya",
                "label": "Utsunomiya"
            },
            {
                "id": 2633,
                "value": "yachiyo",
                "label": "Yachiyo"
            },
            {
                "id": 2569,
                "value": "yamaguchi",
                "label": "Yamaguchi"
            },
            {
                "id": 2627,
                "value": "yokohama",
                "label": "Yokohama"
            },
            {
                "id": 2634,
                "value": "yokosuka",
                "label": "Yokosuka"
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
        "id": 583,
        "url": "http://www.kcpinternational.com",
        "callToActionText": "Explore Japan with KCP International Language Institute",
        "displayedText": "Are you interested in intensive Japanese-language education? KCP International Japanese Language School is a highly challenging, affordable way for the dedicated student to perfect your Japanese, for academic credit if you like, in all the excitement of Tokyo. And learning Japanese is just the beginning.\r\n",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/top/c5ece92301630a74cc890c3bdef408ebc3faecc7-2014.webp",
        "imageAlt": "KCP students in Japan",
        "providerName": "KCP International Japanese Language School",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/1329874944_KCP-Logo-normal.webp"
    },
    {
        "id": 61698,
        "url": "https://worldcampus.org/",
        "callToActionText": "Get Unique Access to Japan & Gain your Japanese Families & Friends!",
        "displayedText": "This short-term program offers you a chance to stay in families & experience the culture with locals in 4 to 7 Japanese cities in structured setting.",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/top/img-8857-1577930820.webp",
        "imageAlt": "group of students World Campus International",
        "providerName": "World Campus International, Inc.",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/649bRz6D9OySXJvBjVDXdcdk5Rj2WZrqZ5z0ftX6.webp"
    },
    {
        "id": 68696,
        "url": "https://www.ciee.org/go-abroad/college-study-abroad/locations/asia-pacific/japan?utm_campaign=study&utm_medium=referral&utm_source=goabroad&utm_content=japan&utm_term=",
        "callToActionText": "Study abroad in Japan - one of the oldest countries in the world!",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/top/3foxrH7WvXdWFIufnjJPxfLguDnvElhndJ7qY0OW_1695107394.webp",
        "imageAlt": "CIEE Japan",
        "providerName": "CIEE College Study Abroad",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/XuypAiJXtWIQy9JCGFz20s3XNiLUwKHNhwOCWGOM.webp"
    },
    {
        "id": 70607,
        "url": "http://meijiacademy.com/",
        "callToActionText": "Study Japanese and enjoy Japan's best-kept secret city - Fukuoka!",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/top/27VtVZNlNmTTRe9AXGPiS3PLN3f0ZiTKH5lk7hlF.webp",
        "imageAlt": "Language Programs in Japan - Meiji Academy",
        "providerName": "Meiji Academy",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/dypFvEKMiw1npI7YKQyHX557OZAqHfLGejj01qOc.webp"
    },
    {
        "id": 70832,
        "url": "https://worldstrides.com/en-us/higher-ed",
        "callToActionText": "Study in Japan and surround yourself in the country’s unique culture",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/top/7dnxvXDv2dLbbWSxGXLbdGtylRn3WLEJ34HRS6jB.webp",
        "imageAlt": "Japan",
        "providerName": "WorldStrides",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/MBlUGlFaccWWlZXptGDBPPL5KUSR8eKRGDus1SNk.webp"
    },
    {
        "id": 71418,
        "url": "https://getnomadapp.go.link/universal-link?page=add_promo&promo_code=GOABROAD20&adj_t=1z7z84et_1zlgt17g_1zoc8tap&adj_fallback=https%3A%2F%2Fwww.nomadesim.com%2F%3Futm_source%3Dgoabroad%26utm_medium%3Donline%26utm_campaign%3Dgoabroad&adj_redirect_macos=https%3A%2F%2Fwww.nomadesim.com%2F%3Futm_source%3Dgoabroad%26utm_medium%3Donline%26utm_campaign%3Dgoabroad",
        "callToActionText": "Save 20% on travel data with code GOABROAD20",
        "displayedText": "",
        "image": "https://images.goabroad.com/image/upload/h_200,w_404,c_fill,g_faces:auto,fl_progressive,f_auto/v1/images2/a/top/tsUEq7LmYzcEsUXklz5Ap4NfDynT9p5EepoYeoDC_1776218968.webp",
        "imageAlt": "Nomad eSIM",
        "providerName": "Nomad eSIM",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,h_80,w_80/v1/images2/clients/logos/MAIN/UVKpMe28DE7YjfJNBnSCrpjuDiyCmqmRRCmcjSFH.webp"
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

export const featuredProgram: ProgramResult = {
    "id": 4285,
    "title": "Learn Japanese in Tokyo, Japan",
    "description": "KCP International Japanese Language School, a non-profit educational foundation, is pleased to offer students from around the world a unique oppo...",
    "providerName": "KCP International Japanese Language School",
    "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/1329874944_KCP-Logo-normal.png",
    "averageRating": 4.68,
    "reviewsCount": 62,
    "isVerified": true,
    "image": "https://images.goabroad.com/image/upload/c_fill,f_auto,fl_progressive,g_faces:auto,w_320,h_150/v1/images2/a/LF/kcp-feature-japan-old-1530675159_1750419269.jpg",
    "mobileImage": "https://images.goabroad.com/image/upload/c_fill,f_auto,fl_progressive,g_faces:auto,w_320,h_150/v1/images2/a/LF/kcp-feature-japan-old-1530675159_1750419269.jpg",
    "imageAlt": "Student learning Japanese writing",
    "matchedProgramsCount": 0,
    "topRatedBadge": null,
    "programUrl": "https://www.goabroad.com/providers/kcp-international-japanese-language-school/programs/learn-japanese-in-tokyo-japan-4285",
    "providerUrl": "https://www.goabroad.com/providers/kcp-international-japanese-language-school",
    "webUrl": "http://www.kcpinternational.com"
};

export const searchResults: ProgramResult[] = [
    {
        "id": 187100,
        "title": "CIEE Open Campus Block in Kyoto, Japan",
        "description": "Your Open Campus Block program in Kyoto lasts 6, 12, or 18 weeks and is designed to be completely customizable. You will enroll in CIEE courses a...",
        "providerName": "CIEE College Study Abroad",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/XuypAiJXtWIQy9JCGFz20s3XNiLUwKHNhwOCWGOM.png",
        "averageRating": 4.25,
        "reviewsCount": 4,
        "isVerified": true,
        "image": "https://images.goabroad.com/image/upload/g_faces:auto,c_fill,fl_progressive,f_auto,h_240,w_321/v1/images2/a/listing_photo/e6b34svIHMDXxcT9sBGBpLvcr6SoSdce9vF32H92.jpg",
        "mobileImage": "https://images.goabroad.com/image/upload/g_faces:auto,c_fill,fl_progressive,f_auto,h_240,w_474/v1/images2/a/listing_photo/mobile/e6b34svIHMDXxcT9sBGBpLvcr6SoSdce9vF32H92.jpg",
        "imageAlt": "CIEE Japan",
        "matchedProgramsCount": 25,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/ciee/programs/open-campus-block-kyoto-japan-187100",
        "providerUrl": "https://www.goabroad.com/providers/ciee?directory_id=6&country_id=46#programs",
        "webUrl": "https://www.ciee.org/go-abroad/college-study-abroad/programs/japan/kyoto/open-campus-block?utm_campaign=study&utm_medium=referral&utm_source=goabroad&utm_content=kyoto/open-campus-block"
    },
    {
        "id": 197620,
        "title": "Study Abroad in Tokyo, Japan",
        "description": "Immerse yourself in Tokyo, a city where modern innovation, centuries-old traditions, and world-class academics come together. Study Japanese lang...",
        "providerName": "WorldStrides",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/MBlUGlFaccWWlZXptGDBPPL5KUSR8eKRGDus1SNk.png",
        "averageRating": 3.67,
        "reviewsCount": 6,
        "isVerified": true,
        "image": "https://images.goabroad.com/image/upload/g_faces:auto,c_fill,fl_progressive,f_auto,h_240,w_321/v1/images2/a/listing_photo/dwckvUcP3TLICBtR2AkMIz4FXThw6pfAPRDgNE83.jpg",
        "mobileImage": "https://images.goabroad.com/image/upload/g_faces:auto,c_fill,fl_progressive,f_auto,h_240,w_474/v1/images2/a/listing_photo/mobile/dwckvUcP3TLICBtR2AkMIz4FXThw6pfAPRDgNE83.jpg",
        "imageAlt": "Japan",
        "matchedProgramsCount": 2,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/worldstrides/programs/semester-in-japan-197620",
        "providerUrl": "https://www.goabroad.com/providers/worldstrides?directory_id=6&country_id=46#programs",
        "webUrl": "https://worldstrides.com/en-us/higher-ed/programs/asia/japan/tokyo?utm_campaign=online_directories&utm_source=goabroad.com&utm_medium=clicks&utm_term=about_isa"
    },
    {
        "id": 189318,
        "title": "Meiji Academy - Summer Course in Hokkaido",
        "description": "There’s no better time to see Hokkaido’s breathtaking natural surroundings than the summertime, and it’s made even better when you spend that tim...",
        "providerName": "Meiji Academy",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/dypFvEKMiw1npI7YKQyHX557OZAqHfLGejj01qOc.png",
        "averageRating": 4.86,
        "reviewsCount": 105,
        "isVerified": true,
        "image": "https://images.goabroad.com/image/upload/g_faces:auto,c_fill,fl_progressive,f_auto,h_240,w_321/v1/images2/a/listing_photo/17YCbmftMou16Eco4wfOKVmoo3S4NoJGGkxr9LKd.jpg",
        "mobileImage": "https://images.goabroad.com/image/upload/g_faces:auto,c_fill,fl_progressive,f_auto,h_240,w_474/v1/images2/a/listing_photo/mobile/17YCbmftMou16Eco4wfOKVmoo3S4NoJGGkxr9LKd.jpg",
        "imageAlt": "Language Programs in Japan - Meiji Academy",
        "matchedProgramsCount": 5,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/meiji-academy/programs/summer-in-hokkaido-189318",
        "providerUrl": "https://www.goabroad.com/providers/meiji-academy?directory_id=6&country_id=46#programs",
        "webUrl": "https://meijiacademy.com"
    },
    {
        "id": 4285,
        "title": "Learn Japanese in Tokyo, Japan",
        "description": "KCP International Japanese Language School, a non-profit educational foundation, is pleased to offer students from around the world a unique oppo...",
        "providerName": "KCP International Japanese Language School",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/1329874944_KCP-Logo-normal.png",
        "averageRating": 4.64,
        "reviewsCount": 33,
        "isVerified": true,
        "image": "https://images.goabroad.com/image/upload/g_faces:auto,c_fill,fl_progressive,f_auto,h_240,w_321/v1/images2/a/listing_photo/c748be71d41108fcfc472964bf82006afea02eac.jpg",
        "mobileImage": "https://images.goabroad.com/image/upload/g_faces:auto,c_fill,fl_progressive,f_auto,h_240,w_321/v1/images2/a/listing_photo/c748be71d41108fcfc472964bf82006afea02eac.jpg",
        "imageAlt": "KCP students on a weekend trip in Japan",
        "matchedProgramsCount": 4,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/kcp-international-japanese-language-school/programs/learn-japanese-in-tokyo-japan-4285",
        "providerUrl": "https://www.goabroad.com/providers/kcp-international-japanese-language-school?directory_id=6&country_id=46#programs",
        "webUrl": "http://www.kcpinternational.com"
    },
    {
        "id": 41967,
        "title": "The World Campus - Get Unique Access to Japan!",
        "description": "Take part in short-term summer study programs in different regions across Japan with World Campus International, Inc. This three to nine-week pro...",
        "providerName": "World Campus International, Inc.",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/649bRz6D9OySXJvBjVDXdcdk5Rj2WZrqZ5z0ftX6.png",
        "averageRating": 4.74,
        "reviewsCount": 101,
        "isVerified": true,
        "image": "https://images.goabroad.com/image/upload/g_faces:auto,c_fill,fl_progressive,f_auto,h_240,w_321/v1/images2/a/listing_photo/1fCd5b4bx5S9T11MoRpR8u6kwIU8Lr72C0E2S0i7.jpg",
        "mobileImage": "https://images.goabroad.com/image/upload/g_faces:auto,c_fill,fl_progressive,f_auto,h_240,w_474/v1/images2/a/listing_photo/mobile/1fCd5b4bx5S9T11MoRpR8u6kwIU8Lr72C0E2S0i7.jpg",
        "imageAlt": "study abroad students in Japan",
        "matchedProgramsCount": 1,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/world-campus-international-inc/programs/world-campus-get-unique-access-japan-41967",
        "providerUrl": "https://www.goabroad.com/providers/world-campus-international-inc?directory_id=6&country_id=46#programs",
        "webUrl": "http://www.worldcampus.org"
    },
    {
        "id": 73707,
        "title": "USAC Japan: Nagasaki - Japanese Language, Society & Culture",
        "description": "Japan is a fascinating combination of rich history, interesting culture, and a diverse landscape. As a result, it features distinctive societies ...",
        "providerName": "University Studies Abroad Consortium",
        "providerLogo": "https://images.goabroad.com/image/upload/c_pad,f_auto,w_80,h_80/v1/images2/clients/logos/MAIN/AeMvAwNjFiSS9IMB5t2ZKNvuwh28C2GVzuzltcgb.png",
        "averageRating": 4.47,
        "reviewsCount": 15,
        "isVerified": true,
        "image": "https://images.goabroad.com/image/upload/g_faces:auto,c_fill,fl_progressive,f_auto,h_240,w_321/v1/images2/a/listing_photo/japan-1500011752.jpg",
        "mobileImage": "https://images.goabroad.com/image/upload/g_faces:auto,c_fill,fl_progressive,f_auto,h_240,w_321/v1/images2/a/listing_photo/japan-1500011752.jpg",
        "imageAlt": "USAC students participating in Japanese festival.",
        "matchedProgramsCount": 3,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/university-studies-abroad-consortium/programs/usac-japan-nagasaki-japanese-language-society-culture-73707",
        "providerUrl": "https://www.goabroad.com/providers/university-studies-abroad-consortium?directory_id=6&country_id=46#programs",
        "webUrl": "https://usac.edu/study-abroad-programs/japan/nagasaki?utm_source=goabroad&utm_medium=listings&utm_campaign=visit_site&utm_content=nagasaki"
    },
    {
        "id": 198211,
        "title": "EF - Language Abroad",
        "description": "Step beyond the classroom and into the world with EF Language Abroad. Our immersive programs combine academic excellence with life-changing cultu...",
        "providerName": "EF Education First",
        "providerLogo": "",
        "averageRating": 3.5,
        "reviewsCount": 2,
        "isVerified": true,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 2,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/ef-international-language-centers/programs/ef-language-abroad-198211",
        "providerUrl": "https://www.goabroad.com/providers/ef-international-language-centers?directory_id=6&country_id=46#programs",
        "webUrl": "https://www.ef.edu/ils/?utm_source=GoAbroad&utm_medium=affiliate&utm_campaign=USB_CONVERSION_MULTI_GOABROAD&sfcampaignid=701c400000T4go8AAB&refid=001c400000SwrNHAAZ&utm_content=GOA_ILS_General"
    },
    {
        "id": 173471,
        "title": "IES Abroad Nagoya Summer – Language & Culture",
        "description": "What better way to practice your Japanese language skills and immerse yourself in Japanese life and culture than by studying in Nagoya? This 8-we...",
        "providerName": "IES Abroad",
        "providerLogo": "",
        "averageRating": 5,
        "reviewsCount": 4,
        "isVerified": true,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 7,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/ies-abroad/programs/ies-abroad-nagoya-summer-language-culture-173471",
        "providerUrl": "https://www.goabroad.com/providers/ies-abroad?directory_id=6&country_id=46#programs",
        "webUrl": "https://www.iesabroad.org/programs/nagoya-summer-language-culture?utm_source=goabroad.com&utm_medium=referral&utm_campaign=listings&utm_content=nagoya-summer-language-culture"
    },
    {
        "id": 114560,
        "title": "Short-term Japanese Course & Cultural Activity in Hokkaido",
        "description": "Hokkaido Japanese Language School, located in the center of the bustling and modern city of Sapporo, offers students the chance to study Japanese...",
        "providerName": "JaLS GROUP",
        "providerLogo": "",
        "averageRating": 4.73,
        "reviewsCount": 51,
        "isVerified": true,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 7,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/jals-group/programs/short-term-japanese-courses-cultural-activities-in-sapporo-114560",
        "providerUrl": "https://www.goabroad.com/providers/jals-group?directory_id=6&country_id=46#programs",
        "webUrl": "https://japanese-languageschool.com/hokkaido/"
    },
    {
        "id": 178010,
        "title": "Study Abroad Program in Tokyo, Japan",
        "description": "This summer program is designed to provide a broad introduction to Japanese culture that is relevant to the field of Communication and Art Histor...",
        "providerName": "Santa Barbara City College",
        "providerLogo": "",
        "averageRating": 4.85,
        "reviewsCount": 46,
        "isVerified": true,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 1,
        "topRatedBadge": {
            "badge": "https://images.goabroad.com/image/upload/v1/images2/partners/santa-barbara-city-college1776146522.png",
            "name": "Top Rated Program Study Abroad in Japan 2026"
        },
        "programUrl": "https://www.goabroad.com/providers/santa-barbara-city-college/programs/communication-film-studies-in-tokyo-japan-178010",
        "providerUrl": "https://www.goabroad.com/providers/santa-barbara-city-college?directory_id=6&country_id=46#programs",
        "webUrl": "https://www.sbcc.edu/studyabroad/"
    },
    {
        "id": 190030,
        "title": "LTL Language School | Learn Japanese in Japan",
        "description": "LTL Language School is a perfect fit for students looking to improve their Japanese quickly. Everyone is welcome to our schools, from beginner to...",
        "providerName": "LTL Language School",
        "providerLogo": "",
        "averageRating": 4.95,
        "reviewsCount": 21,
        "isVerified": true,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 1,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/live-the-language-school/programs/ltl-language-school-learn-japanese-in-tokyo-190030",
        "providerUrl": "https://www.goabroad.com/providers/live-the-language-school?directory_id=6&country_id=46#programs",
        "webUrl": "https://ltl-japanese.com/"
    },
    {
        "id": 190152,
        "title": "API: Experience Tokyo, Japan (Scholarships Available)",
        "description": "Come and join API and study in one of the most dynamic and populated locations in the Asian Pacific—Tokyo, Japan! Study at Lakeland University Ja...",
        "providerName": "Academic Programs International",
        "providerLogo": "",
        "averageRating": 4.33,
        "reviewsCount": 3,
        "isVerified": true,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 1,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/api/programs/experience-tokyo-japan-with-api-190152",
        "providerUrl": "https://www.goabroad.com/providers/api?directory_id=6&country_id=46#programs",
        "webUrl": "https://connect.apiabroad.com/results/programs?cities=Tokyo%252C%2520Japan%2523%2524%25231392685764"
    },
    {
        "id": 127152,
        "title": "Middlebury School in Japan",
        "description": "The Middlebury School in Japan offers a deeply immersive linguistic and cultural experience through a rigorous curriculum and adherence to the Mi...",
        "providerName": "Middlebury - C.V. Starr Schools Abroad",
        "providerLogo": "",
        "averageRating": 5,
        "reviewsCount": 1,
        "isVerified": false,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 1,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/middlebury-c-v-starr/programs/middlebury-school-in-japan-127152",
        "providerUrl": "https://www.goabroad.com/providers/middlebury-c-v-starr?directory_id=6&country_id=46#programs",
        "webUrl": "https://www.middlebury.edu/schools-abroad/schools/japan"
    },
    {
        "id": 22717,
        "title": "Short and Long Term Programs with Homestay",
        "description": "This program provides students a great chance to experience \"real Japan\" and improve their Japanese language skills rapidly. They achieve this by...",
        "providerName": "LanguBridge Education Centre",
        "providerLogo": "",
        "averageRating": 5,
        "reviewsCount": 1,
        "isVerified": false,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 1,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/langubridge-education-centre/programs/japanese-homestay-22717",
        "providerUrl": "https://www.goabroad.com/providers/langubridge-education-centre?directory_id=6&country_id=46#programs",
        "webUrl": "http://www.langubridge.org/college-programs/japan-semester/"
    }
];

export const moreSearchResults: ProgramResult[] = [
    {
        "id": 191893,
        "title": "CIEE College First Year Abroad in Kyoto",
        "description": "Your First Year Abroad program in Kyoto lasts 12 weeks and is designed for students from all academic backgrounds. You will enroll in a combinati...",
        "providerName": "CIEE High School Grads Abroad",
        "providerLogo": "",
        "averageRating": 0,
        "reviewsCount": 0,
        "isVerified": false,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 1,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/ciee-high-school-grads-abroad/programs/ciee-first-year-abroad-in-kyoto-191893",
        "providerUrl": "https://www.goabroad.com/providers/ciee-high-school-grads-abroad?directory_id=6&country_id=46#programs",
        "webUrl": "https://www.ciee.org/go-abroad/first-year-abroad/programs/japan/kyoto/first-year-abroad-kyoto?utm_campaign=fya&utm_medium=referral&utm_source=goabroad&utm_content=first-year-abroad-kyoto"
    },
    {
        "id": 188059,
        "title": "Study in Japan – Live Life in the Future",
        "description": "Study Japanese in Tokyo and have an experience you will never forget! Learn the language in an authentic way, which is so much easier when you ar...",
        "providerName": "Global Work & Travel",
        "providerLogo": "",
        "averageRating": 0,
        "reviewsCount": 0,
        "isVerified": true,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 2,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/global-work-travel/programs/study-japanese-in-tokyo-learn-japanese-the-authentic-way-188059",
        "providerUrl": "https://www.goabroad.com/providers/global-work-travel?directory_id=6&country_id=46#programs",
        "webUrl": "https://l.gwat.co/klgwy"
    },
    {
        "id": 151721,
        "title": "Intern Abroad HQ - Affordable Internships From Just 2 weeks!",
        "description": "Are you a student or young professional looking to enhance your career prospects through international work experience and hands-on learning? \n\nA...",
        "providerName": "Intern Abroad HQ",
        "providerLogo": "",
        "averageRating": 4.55,
        "reviewsCount": 84,
        "isVerified": true,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 3,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/intern-abroad-hq-1/programs/affordable-internships-abroad-from-us-520-for-2-weeks!-151721",
        "providerUrl": "https://www.goabroad.com/providers/intern-abroad-hq-1?directory_id=6&country_id=46#programs",
        "webUrl": "https://www.internhq.com/?utm_source=goabroad.com&utm_medium=referral&utm_campaign=GoAbroad%20-%20remote%20internships&utm_content=provider%20page"
    },
    {
        "id": 92696,
        "title": "Japanese Language Course and Immersion in Tokyo, Japan",
        "description": "Learn Japanese in Tokyo, Japan's capital and the country's largest city.\r\n\r\nTokyo is one of the three world finance \"command centers\", along with...",
        "providerName": "Language Vacation",
        "providerLogo": "",
        "averageRating": 0,
        "reviewsCount": 0,
        "isVerified": true,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 2,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/language-vacation/programs/japanese-language-course-and-immersion-in-tokyo-japan-92696",
        "providerUrl": "https://www.goabroad.com/providers/language-vacation?directory_id=6&country_id=46#programs",
        "webUrl": "http://www.languagevacation.com"
    },
    {
        "id": 186525,
        "title": "Term 3: Spring in Asia",
        "description": "This term is a journey that carries us through Japan, Cambodia, Vietnam, and Thailand, where every new location becomes a unique chapter in under...",
        "providerName": "MEI Academy World High School",
        "providerLogo": "",
        "averageRating": 5,
        "reviewsCount": 4,
        "isVerified": false,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 2,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/mei-academy-world-high-school/programs/term-3-spring-in-asia-186525",
        "providerUrl": "https://www.goabroad.com/providers/mei-academy-world-high-school?directory_id=6&country_id=46#programs",
        "webUrl": "https://meiacademy.com/"
    },
    {
        "id": 198929,
        "title": "Japan Mini Semester - Culture, Adventure & Leadership",
        "description": "Step into one of the world’s most dynamic destinations with our 5-week Japan Mini Semester. Designed for students aged 17-22 seeking a meaningful...",
        "providerName": "Pacific Discovery",
        "providerLogo": "",
        "averageRating": 0,
        "reviewsCount": 0,
        "isVerified": true,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 1,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/pacific-discovery/programs/japan-mini-semester-program-198929",
        "providerUrl": "https://www.goabroad.com/providers/pacific-discovery?directory_id=6&country_id=46#programs",
        "webUrl": "https://www.pacificdiscovery.org/programs/japan-mini-semester"
    },
    {
        "id": 200368,
        "title": "CEA CAPA Education Abroad in Tokyo, Japan",
        "description": "Tokyo blends centuries of tradition with cutting-edge innovation, creating an ideal setting for students eager to expand their academic and cultu...",
        "providerName": "CEA",
        "providerLogo": "",
        "averageRating": 0,
        "reviewsCount": 0,
        "isVerified": true,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 1,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/cea-capa-education-abroad/programs/cea-capa-education-abroad-in-tokyo-japan-200368",
        "providerUrl": "https://www.goabroad.com/providers/cea-capa-education-abroad?directory_id=6&country_id=46#programs",
        "webUrl": "http://www.ceastudyabroad.com"
    },
    {
        "id": 187233,
        "title": "Accredited TEFL/TESOL Courses Online & in Japan from ¥7,000",
        "description": "Use the coupon code GoAbroad15 upon checkout to receive 15% off any course.\n\nChoose from a selection of accredited online TEFL courses, with pric...",
        "providerName": "International TEFL and TESOL",
        "providerLogo": "",
        "averageRating": 5,
        "reviewsCount": 5,
        "isVerified": false,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 1,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/itt-international-tefl-and-tesol/programs/accredited-tefl-tesol-courses-from-7-000-in-japan-187233",
        "providerUrl": "https://www.goabroad.com/providers/itt-international-tefl-and-tesol?directory_id=6&country_id=46#programs",
        "webUrl": "https://internationaltefltesol.com/"
    },
    {
        "id": 199758,
        "title": "Study Abroad in Japan (J. F. Oberlin University)",
        "description": "Tokyo is more than a backdrop in this study abroad program—it becomes part of everyday student life. Based at J. F. Oberlin University in Machida...",
        "providerName": "StudyAbroad.com",
        "providerLogo": "",
        "averageRating": 0,
        "reviewsCount": 0,
        "isVerified": true,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 1,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/studyabroadcom/programs/study-abroad-in-japan-j-f-oberlin-university-199758",
        "providerUrl": "https://www.goabroad.com/providers/studyabroadcom?directory_id=6&country_id=46#programs",
        "webUrl": "https://www.studyabroad.com/program/study-in-japan-jf-oberlin-university/?utm_source=goabroad.com&utm_medium=referral&utm_campaign=GAListing&utm_term=VisitWebsite&utm_content=199758"
    },
    {
        "id": 199248,
        "title": "Tokyo Digital Assets, AI & Fintech Experience - 9 Days",
        "description": "Developed in collaboration with the New York Institute of Finance (NYIF), this immersive summer experience in Tokyo is an outstanding opportunity...",
        "providerName": "Westcoast Connection",
        "providerLogo": "",
        "averageRating": 0,
        "reviewsCount": 0,
        "isVerified": false,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 1,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/westcoast-connection/programs/tokyo-digital-assets-ai-fintech-experience-9-days-199248",
        "providerUrl": "https://www.goabroad.com/providers/westcoast-connection?directory_id=6&country_id=46#programs",
        "webUrl": "https://www.westcoastconnection.com/programs/learn/career-experiences/tokyo-fintech-ai-digital-assets-experience-9-days/"
    },
    {
        "id": 199583,
        "title": "Study in Tokyo: Oxford Academia for High School Students",
        "description": "Live and study in Tokyo at Temple University Japan's campus, the oldest and largest American university in Japan. This immersive Oxford Academia ...",
        "providerName": "Oxford Academia",
        "providerLogo": "",
        "averageRating": 0,
        "reviewsCount": 0,
        "isVerified": false,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 1,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/oxford-academia/programs/study-in-tokyo-oxford-academia-for-high-school-students-199583",
        "providerUrl": "https://www.goabroad.com/providers/oxford-academia?directory_id=6&country_id=46#programs",
        "webUrl": "https://oxfordacademia.com/programs/temple-university-tokyo-japan/"
    },
    {
        "id": 190920,
        "title": "Non-Traditional Study Abroad in Japan",
        "description": "Studying abroad with Greenheart Travel’s language school experience in Japan enables you to discover a culture with a rich history and unique tra...",
        "providerName": "Greenheart Travel",
        "providerLogo": "",
        "averageRating": 0,
        "reviewsCount": 0,
        "isVerified": true,
        "image": "",
        "mobileImage": "",
        "imageAlt": "",
        "matchedProgramsCount": 1,
        "topRatedBadge": null,
        "programUrl": "https://www.goabroad.com/providers/greenheart-travel/programs/non-traditional-study-abroad-in-japan-190920",
        "providerUrl": "https://www.goabroad.com/providers/greenheart-travel?directory_id=6&country_id=46#programs",
        "webUrl": "https://greenhearttravel.org/program/teen/high-school-abroad/high-school-gap-year#/tab/overview"
    }
];

export const searchResultsCount = 97;

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
        "id": 119982,
        "title": "It was an amazing experience!",
        "review": "I started going to LTL Osaka in the beginning of July 2026. From the beginning, Hiyori Ito, the Director of Studies, was very helpful and was ready to answer any questions that I had as I arrived in Japan. Hiyori planned one to two weekly events with students that ranged from a field trip or a meal with students. This made it really easy to make friends and experience Japanese culture in a way I wouldn't have had the opportunity without these adventures. Additionally, I learned so much from the teachers at LTL Osaka. Going in, I had finished the first 6 lessons of Genki I textbook, and quickly finished the textbook after about 2-3 weeks. Although the pace is fast, I found it very easy to adjust. I had the privilege of having one-on-one lessons where I was in more control of what I learned, and what I wanted to focus on. Sometimes if I felt that I had not grasped a concept completely, I would just have a review day with a teacher, or if I wanted to just practice my Japanese and have a conversation, that was an option too. I would recommend this school if your goal with the Japanese language is to gain conversational skills, immerse yourself in the culture, learn more about the grammar, or even for those who are traveling. LTL really allows you to customize your learning experience, even when you start, which was one of the main selling points for me when I was considering LTL among other schools. If your goal is to pass the JLPT in as little time as possible, that is still achievable with LTL, however, I think that one would need to do a lot of outside studying as well. Despite all of the teachers at LTL being exceptional, the ones that I would like to highlight are Nanaho, Kagawa, Tanaka, and Junichi. Each one brought their own unique teaching style which really exposed me to the various aspects of the Japanese language and culture. With Nanaho sensei, we focused on vocabulary and she ensured that I understood a grammar point. If I was confused I was not afraid to ask her a question and found it very easy to talk to her. We laughed all the time and she would even join me in dancing to songs on our 10 minute breaks. In Kagawa sensei’s class, we only talked in Japanese. She talked at a slower pace and used vocabulary words that I knew, so that I could understand her. I got a lot of Japanese conversation practice with her, often not using the exercises within a textbook, instead putting them into a real world context. Tanaka sensei really helped me understand and practice short forms in Japanese and we often ended the last hour to thirty minutes focusing on kanji. I remember laughing all the time and having a very positive experience with her. I have to attribute a large part of my flow improvement to Junichi sensei. When first speaking, he noticed that I had trouble with the flow of the Japanese language. He helped me through speech exercises and helped me find the rhythm within the language. All of these teachers were outstanding and I enjoyed having various teachers because each one taught in their own way and helped me improve in many different aspects. Furthermore, I stayed with a host family for the duration of my time at LTL. One of my concerns when going into this journey was whether or not the homestay would be clean and safe. The homestay exceeded my expectations and Hiyori would always ask me about what was happening in the homestay and if I needed anything. I could not recommend this program enough. If you are considering attending LTL Osaka school, I think that this could be the best decision in your Japanese language journey. I would love to return in the future.",
        "programName": "LTL Language School | Learn Japanese in Japan",
        "programUrl": "https://www.goabroad.com/providers/live-the-language-school/programs/ltl-language-school-learn-japanese-in-tokyo-190030",
        "overallRating": 5,
        "dateAdded": "August 04, 2026",
        "reviewerName": "Nicolas Villacorta",
        "reviewerCountry": "United States"
    },
    {
        "id": 119784,
        "title": "Life changing!",
        "review": "Before choosing to go back to school in the fall of 2025, I never would’ve thought in 1 million years I would have the opportunity to be able to study abroad in Japan! A country 4 year old me dreamed of visiting. I got to experience so many exciting things and was surrounded by amazing classmates. Both Dr. Kunz and Garard sensei were some of the most impactful educators I’ve ever had in my life. They brought out my curiosity and drive to wanna learn more about what they were teaching. As a first generation student this opportunity was very life-changing for me and gave me a perspective. I never thought I’d have. I would recommend anyone to take advantage and study abroad!",
        "programName": "Study Abroad Program in Tokyo, Japan",
        "programUrl": "https://www.goabroad.com/providers/santa-barbara-city-college/programs/communication-film-studies-in-tokyo-japan-178010",
        "overallRating": 5,
        "dateAdded": "July 29, 2026",
        "reviewerName": "Roberto Garza",
        "reviewerCountry": "United States"
    },
    {
        "id": 119688,
        "title": "POV: Study Abroad in Tokyo Japan as HOH",
        "review": "First of all, I had a great time there as HOH. HOH mean \"Hard of Hearing\". So to share this, I know it was gonna be not so easy because I was new to the Language that I had practice 3 years ago, but was sure enough to go out with having skill with communication Verbally and Non verbally. And in between all that, I feel accomplished of balancing my academic and Social surrounding.\r\n\r\nI didn't do video, but you find my Instagram Highlight story of my time in the Study Abroad program on \"sinMa15lay\" IG.",
        "programName": "Study Abroad Program in Tokyo, Japan",
        "programUrl": "https://www.goabroad.com/providers/santa-barbara-city-college/programs/communication-film-studies-in-tokyo-japan-178010",
        "overallRating": 5,
        "dateAdded": "July 25, 2026",
        "reviewerName": "Kaitlyn Burnell",
        "reviewerCountry": "United States"
    },
    {
        "id": 119677,
        "title": "Unforgettable Experience",
        "review": "This trip was nothing short of life changing. Tokyo is such a fascinating city and can give you so much knowledge not only about other cultures about also about your own. All class field trips were relevant to class material and gave a wonderful in person experience rather than just reading about it. Definitely study the language a bit more if you can and try to find a friend to go with!",
        "programName": "Study Abroad Program in Tokyo, Japan",
        "programUrl": "https://www.goabroad.com/providers/santa-barbara-city-college/programs/communication-film-studies-in-tokyo-japan-178010",
        "overallRating": 4,
        "dateAdded": "July 24, 2026",
        "reviewerName": "Camille Hassan",
        "reviewerCountry": "United States"
    },
    {
        "id": 119649,
        "title": "Unique+Amazing Experience!",
        "review": "Spending a week in Isa City with World Campus International was one of the most memorable parts of my time in Japan. Staying with a local host family gave me the opportunity to experience Japanese culture in a way that simply wouldn't have been possible as a tourist. From sharing meals together to learning about everyday life, every moment felt authentic and meaningful.\r\n\r\nEach day brought a new experience, whether it was planting rice, visiting local schools and meeting students, exploring historic shrines, learning about traditional wine-making, or taking part in community activities. Every experience helped me better understand the culture while creating memories I'll never forget.\r\n\r\nThe food was incredible, the people were unbelievably welcoming, and the unique experiences were amazing. I would highly recommend this program to anyone looking for an immersive, hands-on cultural experience that they'll remember for years to come.",
        "programName": "The World Campus - Get Unique Access to Japan!",
        "programUrl": "https://www.goabroad.com/providers/world-campus-international-inc/programs/world-campus-get-unique-access-japan-41967",
        "overallRating": 5,
        "dateAdded": "July 24, 2026",
        "reviewerName": "Asher DeVillena",
        "reviewerCountry": "United States"
    },
    {
        "id": 119622,
        "title": "An unforgettable learning experience!",
        "review": "Getting the opportunity to learn in Japan will be an experience that will never be forgotten. Learning about the course topics first-hand really helped my learning process and gave me unforgettable memories. I am super grateful for all the close friends and memories I made!",
        "programName": "Study Abroad Program in Tokyo, Japan",
        "programUrl": "https://www.goabroad.com/providers/santa-barbara-city-college/programs/communication-film-studies-in-tokyo-japan-178010",
        "overallRating": 5,
        "dateAdded": "July 24, 2026",
        "reviewerName": "Alana Allen",
        "reviewerCountry": "United States"
    },
    {
        "id": 119328,
        "title": "Core memories and life changing experiences.",
        "review": "I came into the homestay program a little nervous what to expect and if I would even enjoy it. However on the first night when I was assigned my family and walking up to greet them I know that I would love every second of it. I truly can not express in this review how dear to me my host family is. Every night we sat down at the dinner table I felt like one of their own children and I am sincerely grateful for everything they shared with me. I had travelled around Japan for 2 weeks with prior with the Shirane Foundation and experience the culture of Japan for a touristy perspective but this homestay opened me up to see the true beauty of Japan in a way very few visitor get to see. From the simple thing of the unique bathroom to the everyday mannerism. All in all this review does not give justice to the wonderful experience I had and the amazing people I had the honor of meeting and share a few days of my life with.",
        "programName": "The World Campus - Get Unique Access to Japan!",
        "programUrl": "https://www.goabroad.com/providers/world-campus-international-inc/programs/world-campus-get-unique-access-japan-41967",
        "overallRating": 5,
        "dateAdded": "July 16, 2026",
        "reviewerName": "Briar Dohner",
        "reviewerCountry": "United States"
    },
    {
        "id": 119277,
        "title": "The most unique experience of my life.",
        "review": "I came into the home-stay completely unsure of what to expect but that aspect made this experience so great. As a first time visitor to Japan I was super nervous to immerse myself into Japanese culture and a brand new host family. It seemed like something I would never do and honestly it felt unreal. However, as soon as I met my host family I was showered with so much care and comfort. They made me feel like family from day one. I actually met most of my host family's sisters and brothers day one then later I met a lot of their friends and their families. It was amazing to be able to speak to such a wide variety of people! I was learning so much about Japanese culture and customs. Everyday was so unique and my host family always did their best to make my time as enjoyable as they could. For example, other than taking me to meet so much of their family, they took me to shrines, parks, and different cities in the area. It truly felt like I was in a new world and my host family was giving me the opportunity to experience it all. I can not recommend this experience enough. Being with my host family was such an invaluable experience I will never forget.\r\n\r\nAdditionally, another aspect that made this experience so great was the activities I did with World Campus International. Everyday morning after an afternoon with my host family we were taken to do different activities in the home-stay area - immersing myself deeper in Japanese culture. Some of my favorite activities were going to an OSEN (Japanese bath house) . I have never been so relaxed after taking a bath. It was an experience I can not imagine having anywhere else. Furthermore, going to a Junior-High school was such a great experience. I got to meet students such as myself and learn what it meant to live and learn in Japan. I made a lot of friends that I still talk to today. Then I had a lot of fun at a Park Golf activity we did. We had the chance to golf with Japanese locals that were REALLY GOOD at golf. The locals were super nice and it was great to learn a little about the golf world from a different perspective. The locals I played with gave me a lot of tips to improve my game and like everything on this trip it was just amazing to do this experience. \r\n\r\nFirstly, none of this would be possible without World Campus International so Thank you to them. All the staff made me feel involved and immersed in every activity. Making sure everyone knew exactly how what we were doing that day contributed to Japanese culture. A lot of thanks goes to them as well for making sure we were in the right places when we needed to be. Secondly, this experience may be scary at first but it is truly remarkable. I can not recommend this program enough. I have gained a better understanding of Japanese culture than I would of just visiting cities. I was taught more things then I can count and I feel I gained the understanding required to come back on my own! If you are looking for the experience of your life then please apply for this experience. Lastly, I recommend to anyone applying to the program to be very open minded. This program will challenge you to step completely outside your comfort zone. If you embrace this fact it will elevate your trip, without a doubt. \r\n\r\nThank you World Campus International!",
        "programName": "The World Campus - Get Unique Access to Japan!",
        "programUrl": "https://www.goabroad.com/providers/world-campus-international-inc/programs/world-campus-get-unique-access-japan-41967",
        "overallRating": 5,
        "dateAdded": "July 15, 2026",
        "reviewerName": "Dazzel Moore",
        "reviewerCountry": "United States"
    },
    {
        "id": 119256,
        "title": "Best week ever",
        "review": "Spending a week in Isa City with World Campus International was easily the highlight of my time in Japan.Staying with a local host family allowed me to experience the culture on a deeply personal level. Every single day was packed with unforgettable experiences: planting rice in the local fields, visiting schools to connect with local students, exploring historic shrines, and learning about the fascinating traditional wine-making process\r\n\r\nThe food was delicious, the cultural immersion was unmatched, and I left with incredibly close friends from all over the world. I cannot recommend this program enough to anyone looking for a unique, hands-on, and heartwarming adventure",
        "programName": "The World Campus - Get Unique Access to Japan!",
        "programUrl": "https://www.goabroad.com/providers/world-campus-international-inc/programs/world-campus-get-unique-access-japan-41967",
        "overallRating": 5,
        "dateAdded": "July 14, 2026",
        "reviewerName": "Ernesto Carlos Martens Romero",
        "reviewerCountry": "Mexico"
    },
    {
        "id": 119562,
        "title": "It was great experience!",
        "review": "It was great, especially when we had a tour guide who explained the culture to us. Make sure you have a working credit/debit & Pin number before going! I couldn't get cash out of an ATM on the last week!",
        "programName": "Study Abroad Program in Tokyo, Japan",
        "programUrl": "https://www.goabroad.com/providers/santa-barbara-city-college/programs/communication-film-studies-in-tokyo-japan-178010",
        "overallRating": 5,
        "dateAdded": "July 11, 2026",
        "reviewerName": "Alana",
        "reviewerCountry": ""
    }
];

export const programReviewsCount = 754;

export const interviews: Interview[] = [
    {
        "id": 3227,
        "name": "Burim Shala",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/burim-shala-1748513532.jpg",
        "providerName": "Meiji Academy",
        "type": 1,
        "excerpt": "I have always been fascinated by Japanese culture, language, and the unique way of life in Japan. I wanted to improve my Japanese skills in an immersi...",
        "url": "https://www.goabroad.com/interviews/burim-shala"
    },
    {
        "id": 3138,
        "name": "Alana Sanchez",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/alana-sanchez-1727330070.jpg",
        "providerName": "Santa Barbara City College",
        "type": 1,
        "excerpt": "Ever since I was little, I knew I wanted to travel. Both of my parents traveled as a part of their jobs. I had always heard stories and seen photos of...",
        "url": "https://www.goabroad.com/interviews/alana-sanchez"
    },
    {
        "id": 3073,
        "name": "Grace Conant",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/grace-conant-1712198054.jpg",
        "providerName": "IES Abroad",
        "type": 1,
        "excerpt": "I have always had a love and interest in travel abroad. Being a double major in Global Studies and Japanese, it was a no brainer for me with my Japane...",
        "url": "https://www.goabroad.com/interviews/grace-conant"
    },
    {
        "id": 2725,
        "name": "Helena Raichartová",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/helena-raichartov.jpg",
        "providerName": "World Campus International, Inc.",
        "type": 1,
        "excerpt": "I've always wanted to travel and experience different cultures. I like communicating with people and finding out more about any culture that is not my...",
        "url": "https://www.goabroad.com/interviews/world-campus-international-inc-alumni-interview-with-helena-raichartov"
    },
    {
        "id": 2497,
        "name": "Kate Lucas",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/kate-lucas-1581924038.jpg",
        "providerName": "IES Abroad",
        "type": 1,
        "excerpt": "I've wanted to go abroad to Japan since I began studying the language in high school. I thought of it as the goal I was working toward, an adventure t...",
        "url": "https://www.goabroad.com/interviews/kate-lucas-2019-program-participant"
    },
    {
        "id": 2452,
        "name": "Ilyana Raymond",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/hs-1574933089.jpg",
        "providerName": "University Studies Abroad Consortium",
        "type": 1,
        "excerpt": "I spoke to my academic adviser, and my majors at the time were Art and Art History. Because of this, she heavily encouraged me to study abroad. When I...",
        "url": "https://www.goabroad.com/interviews/ilyana-raymond-2019-program-participant"
    },
    {
        "id": 2382,
        "name": "Jacob Scarani",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/jacob-scarani-1566377865.jpg",
        "providerName": "IES Abroad",
        "type": 1,
        "excerpt": "I always wanted to study abroad even before I entered college as I wanted to see the world. My family was never wealthy enough to take me overseas so ...",
        "url": "https://www.goabroad.com/interviews/jacob-scarani-2019-program-participant"
    },
    {
        "id": 2078,
        "name": "Yusi Wang",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/hs-yusiwang-1544772063.jpg",
        "providerName": "World Campus International, Inc.",
        "type": 1,
        "excerpt": "I was inspired to go abroad to Japan because I wanted to explore the country that I have seen in my Japanese textbooks and heard about from my teacher...",
        "url": "https://www.goabroad.com/interviews/yusi-wang-2016-program-participant"
    },
    {
        "id": 1790,
        "name": "Sam Turcot",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/hs-turcot-1525773108.jpg",
        "providerName": "CIS Abroad",
        "type": 1,
        "excerpt": "I have always wanted to go abroad and I love to travel. My parents have been supportive of my passions and they knew how much I wanted to go on this t...",
        "url": "https://www.goabroad.com/interviews/sam-turcot-2017-program-participant"
    },
    {
        "id": 1703,
        "name": "Betsy Colon",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/hs-colon-1513825005.jpg",
        "providerName": "CIS Abroad",
        "type": 1,
        "excerpt": "I had never traveled before and I was very interested in learning a new language. I thought going abroad would be the best way to achieve that!",
        "url": "https://www.goabroad.com/interviews/betsy-colon-2017-program-participant"
    },
    {
        "id": 1667,
        "name": "Maya Best",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/hs-best-1510802872.jpg",
        "providerName": "IES Abroad",
        "type": 1,
        "excerpt": "I participated in a high school exchange program the summer after graduating high school and stayed with a host family for a week in Japan. That exper...",
        "url": "https://www.goabroad.com/interviews/maya-best-2017-program-participant"
    },
    {
        "id": 1280,
        "name": "Tatianna Banci",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/hs-banci-1473151160.png",
        "providerName": "IES Abroad",
        "type": 1,
        "excerpt": "I am an East Asian studies major and I really like learning languages. I believe that the only way you can truly become fluent in a foreign language i...",
        "url": "https://www.goabroad.com/interviews/tatianna-banci-2016-program-participant"
    },
    {
        "id": 923,
        "name": "Wim Naessens",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/hs-naessens-1443598729.gif",
        "providerName": "World Campus International, Inc.",
        "type": 1,
        "excerpt": "",
        "url": "https://www.goabroad.com/interviews/wim-naessens-2015-program-participant"
    },
    {
        "id": 765,
        "name": "Ashley Bell",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/hs-bell-1436500649.jpg",
        "providerName": "IES Abroad",
        "type": 1,
        "excerpt": "It has always been a dream of mine to study abroad. I also am studying a language, so I decided to apply to go for an entire academic year to really i...",
        "url": "https://www.goabroad.com/interviews/ies-abroad-alumni-interview-with-ashley-bell"
    },
    {
        "id": 710,
        "name": "Emma Rattenborg",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/hs-rattenborg-1434620016.jpg",
        "providerName": "Semester at Sea",
        "type": 1,
        "excerpt": "As a comparative cultural studies major, I felt that having a cross-cultural experience was perfect for me. Not only would I be able to sail to six co...",
        "url": "https://www.goabroad.com/interviews/emma-rattenborg-2015-program-participant"
    },
    {
        "id": 596,
        "name": "Peta Waite",
        "photo": "https://images.goabroad.com/image/upload/h_120,w_120,c_fill,g_faces:auto,f_auto,fl_progressive/v1/images2/interviews/hs-waite-1429083650.jpg",
        "providerName": "JaLS GROUP",
        "type": 1,
        "excerpt": "At the time I studied with Hokkaido Japanese Language School (JaLS) I was mid-way through writing my Masters thesis, and I had just relocated long-ter...",
        "url": "https://www.goabroad.com/interviews/peta-waite-2014-program-participant"
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
        "caption": "RELATED LOCATIONS",
        "items": [
            {
                "name": "South Korea",
                "link": "https://www.goabroad.com/study-abroad/search/south-korea/study-abroad-1"
            },
            {
                "name": "China",
                "link": "https://www.goabroad.com/study-abroad/search/china/study-abroad-1"
            },
            {
                "name": "Taiwan",
                "link": "https://www.goabroad.com/study-abroad/search/taiwan/study-abroad-1"
            },
            {
                "name": "Indonesia",
                "link": "https://www.goabroad.com/study-abroad/search/indonesia/study-abroad-1"
            },
            {
                "name": "Philippines",
                "link": "https://www.goabroad.com/study-abroad/search/philippines/study-abroad-1"
            }
        ]
    },
    {
        "caption": "PROGRAM TYPES",
        "items": [
            {
                "name": "Culture",
                "link": "https://www.goabroad.com/study-abroad/search/culture/study-abroad-1"
            },
            {
                "name": "Business",
                "link": "https://www.goabroad.com/study-abroad/search/business/study-abroad-1"
            },
            {
                "name": "History",
                "link": "https://www.goabroad.com/study-abroad/search/history/study-abroad-1"
            },
            {
                "name": "Economics",
                "link": "https://www.goabroad.com/study-abroad/search/economics/study-abroad-1"
            },
            {
                "name": "Communications",
                "link": "https://www.goabroad.com/study-abroad/search/communications/study-abroad-1"
            }
        ]
    },
    {
        "caption": "TIMING",
        "items": [
            {
                "name": "Fall",
                "link": "https://www.goabroad.com/study-abroad/search/fall/study-abroad-1"
            },
            {
                "name": "Spring",
                "link": "https://www.goabroad.com/study-abroad/search/spring/study-abroad-1"
            },
            {
                "name": "Summer",
                "link": "https://www.goabroad.com/study-abroad/search/summer/study-abroad-1"
            },
            {
                "name": "Academic Year",
                "link": "https://www.goabroad.com/study-abroad/search/academic-year/study-abroad-1"
            },
            {
                "name": "Throughout the Year",
                "link": "https://www.goabroad.com/study-abroad/search/throughout-the-year/study-abroad-1"
            }
        ]
    },
    {
        "caption": "TRENDING",
        "items": [
            {
                "name": "Tokyo",
                "link": "https://www.goabroad.com/study-abroad/search/japan/tokyo/study-abroad-1"
            },
            {
                "name": "Hokkaido",
                "link": "https://www.goabroad.com/study-abroad/search/japan/hokkaido/study-abroad-1"
            },
            {
                "name": "Osaka",
                "link": "https://www.goabroad.com/study-abroad/search/japan/osaka/study-abroad-1"
            },
            {
                "name": "Kyoto",
                "link": "https://www.goabroad.com/study-abroad/search/japan/kyoto/study-abroad-1"
            },
            {
                "name": "Hiroshima",
                "link": "https://www.goabroad.com/study-abroad/search/japan/hiroshima/study-abroad-1"
            }
        ]
    }
];

export const recentArticles: Article[] = [
    {
        "id": 5560,
        "title": "How to Study Abroad in Japan",
        "altText": "how to study abroad in japan",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/how-to-study-abroad-in-japan-featured-image-1607744938.jpg",
        "topic": "How to",
        "url": "https://www.goabroad.com/articles/study-abroad/how-to-study-abroad-in-japan",
        "authorName": "Allie Roos",
        "authorUrl": "https://www.goabroad.com/author/allie-roos",
        "date": "June 03, 2026"
    },
    {
        "id": 580,
        "title": "Top 10 Things You Need To Know Before Visiting Japan",
        "altText": "Yamaga City Hot Springs Japan",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/prime-japan-1457679112.jpg",
        "topic": "Culture",
        "url": "https://www.goabroad.com/articles/study-abroad/things-to-know-before-visiting-japan",
        "authorName": "Keith Bouchard",
        "authorUrl": "https://www.goabroad.com/author/keith-bouchard",
        "date": "May 20, 2026"
    },
    {
        "id": 4898,
        "title": "The Pros & Cons of Study Abroad in Japan",
        "altText": "japan",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/cover-1550477922.jpg",
        "topic": "East Asia",
        "url": "https://www.goabroad.com/articles/study-abroad/pros-cons-study-abroad-japan",
        "authorName": "Samantha Harper",
        "authorUrl": "https://www.goabroad.com/author/samantha-harper",
        "date": "May 14, 2026"
    },
    {
        "id": 827,
        "title": "8 Best Places to Study Abroad in Japan",
        "altText": "best places to study abroad in japan",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/KgLfYMN7Qpsb1WOgxRN9vUpcjZgmL6fxHkMjusIh.jpg",
        "topic": "Travel Inspiration",
        "url": "https://www.goabroad.com/articles/study-abroad/best-places-to-study-abroad-in-japan",
        "authorName": "Julie Ball",
        "authorUrl": "https://www.goabroad.com/author/julie-ball",
        "date": "May 13, 2026"
    },
    {
        "id": 5302,
        "title": "9 Best Reasons to Study Abroad in Japan This Year",
        "altText": "Shibuya, Japan",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/hs-1573102455.jpg",
        "topic": "Travel Inspiration",
        "url": "https://www.goabroad.com/articles/study-abroad/why-study-abroad-in-japan",
        "authorName": "Jasmine Harding",
        "authorUrl": "https://www.goabroad.com/author/jasmine-harding",
        "date": "May 13, 2026"
    },
    {
        "id": 2658,
        "title": "5 Challenges You Will Face Studying Abroad in Japan",
        "altText": "Crowded train platform in Japan.",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/prime-5-challenges-you-will-face-studying-abroad-in-japan-1471851649.jpg",
        "topic": "",
        "url": "https://www.goabroad.com/articles/study-abroad/5-challenges-you-will-face-studying-abroad-in-japan",
        "authorName": "Suzanne Bhagan",
        "authorUrl": "https://www.goabroad.com/author/suzanne-bhagan",
        "date": "April 29, 2026"
    },
    {
        "id": 4272,
        "title": "7 Best Study Abroad Programs in Japan in 2026",
        "altText": "Meguro River, Matsuno, Japan",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/cover-1527145831.jpg",
        "topic": "East Asia",
        "url": "https://www.goabroad.com/articles/study-abroad/best-study-abroad-programs-in-japan",
        "authorName": "GoAbroad Writing Team",
        "authorUrl": "https://www.goabroad.com/author/goabroad-writing-team",
        "date": "April 29, 2026"
    },
    {
        "id": 5506,
        "title": "10 Sensei-tional Scholarships to Study Abroad in Japan",
        "altText": "two people walking down a street in kyoto, japan",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/cover-1593600271.jpg",
        "topic": "Money Tips",
        "url": "https://www.goabroad.com/articles/study-abroad/scholarships-to-study-abroad-in-japan",
        "authorName": "Andi Sciacca",
        "authorUrl": "https://www.goabroad.com/author/andi-sciacca",
        "date": "April 29, 2026"
    },
    {
        "id": 5587,
        "title": "The BEST Studying Abroad in Japan Advice",
        "altText": "studying abroad in japan advice",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/studying-abroad-in-japan-advice-featured-photo-1612450429.jpg",
        "topic": "East Asia",
        "url": "https://www.goabroad.com/articles/study-abroad/studying-abroad-in-japan-advice",
        "authorName": "Farryl Last",
        "authorUrl": "https://www.goabroad.com/author/farryl-last",
        "date": "April 29, 2026"
    },
    {
        "id": 5643,
        "title": "How Much Does it Cost to Study Abroad in Japan?",
        "altText": "how much does it cost to study abroad in japan",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/how-much-does-it-cost-to-study-abroad-in-japan-featured-image-1631332545.jpg",
        "topic": "Money Tips",
        "url": "https://www.goabroad.com/articles/study-abroad/cost-to-study-abroad-in-japan",
        "authorName": "Farryl Last",
        "authorUrl": "https://www.goabroad.com/author/farryl-last",
        "date": "April 29, 2026"
    },
    {
        "id": 6018,
        "title": "What to Pack for Study Abroad in Japan",
        "altText": "people wearing coats walking near shrine and trees with red leaves",
        "photo": "https://images.goabroad.com/image/upload/g_faces:auto,h_200,w_404,c_fill,fl_progressive,f_auto/v1/images2/program_content/KGFgl8CLQCmURAxMOp9rCuEdapwIPsHQUK41kHoQ.jpg",
        "topic": "Packing Tips",
        "url": "https://www.goabroad.com/articles/study-abroad/what-to-pack-for-study-abroad-in-japan",
        "authorName": "Munira Maricar",
        "authorUrl": "https://www.goabroad.com/author/munira-maricar",
        "date": "April 29, 2026"
    }
];

export const advancedFilters: Record<string, FilterOption[]> = {
    "ageRanges": [
        {
            "label": "0-8",
            "value": 1,
            "filterKey": "age_range_id"
        },
        {
            "label": "9-13",
            "value": 2,
            "filterKey": "age_range_id"
        },
        {
            "label": "14-17",
            "value": 3,
            "filterKey": "age_range_id"
        },
        {
            "label": "18-20",
            "value": 5,
            "filterKey": "age_range_id"
        },
        {
            "label": "21-25",
            "value": 6,
            "filterKey": "age_range_id"
        },
        {
            "label": "26-30",
            "value": 7,
            "filterKey": "age_range_id"
        },
        {
            "label": "31-35",
            "value": 8,
            "filterKey": "age_range_id"
        },
        {
            "label": "36+",
            "value": 9,
            "filterKey": "age_range_id"
        },
        {
            "label": "Open to All Ages",
            "value": 10,
            "filterKey": "age_range_id"
        }
    ],
    "countries": [
        {
            "label": "Afghanistan",
            "value": 110,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Albania",
            "value": 111,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Algeria",
            "value": 112,
            "filterKey": "participant_country_id"
        },
        {
            "label": "American Samoa",
            "value": 1322,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Andorra",
            "value": 113,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Angola",
            "value": 114,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Anguilla",
            "value": 2233,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Antarctica",
            "value": 220,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Antigua & Barbuda",
            "value": 115,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Argentina",
            "value": 3,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Armenia",
            "value": 1,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Aruba",
            "value": 2109,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Australia",
            "value": 4,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Austria",
            "value": 5,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Azerbaijan",
            "value": 116,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Bahamas",
            "value": 117,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Bahrain",
            "value": 6,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Bangladesh",
            "value": 107,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Barbados",
            "value": 118,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Belarus",
            "value": 119,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Belgium",
            "value": 7,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Belize",
            "value": 8,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Benin",
            "value": 121,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Bermuda",
            "value": 9,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Bhutan",
            "value": 122,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Bolivia",
            "value": 10,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Bonaire",
            "value": 3059,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Bosnia & Herzegovina",
            "value": 123,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Botswana",
            "value": 124,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Brazil",
            "value": 11,
            "filterKey": "participant_country_id"
        },
        {
            "label": "British Virgin Islands",
            "value": 243,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Brunei",
            "value": 125,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Bulgaria",
            "value": 12,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Burkina Faso",
            "value": 126,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Burundi",
            "value": 127,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Cambodia",
            "value": 128,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Cameroon",
            "value": 129,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Canada",
            "value": 13,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Cape Verde",
            "value": 1059,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Cayman Islands",
            "value": 1321,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Central African Republic",
            "value": 130,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Chad",
            "value": 131,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Channel Islands",
            "value": 1504,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Chile",
            "value": 15,
            "filterKey": "participant_country_id"
        },
        {
            "label": "China",
            "value": 16,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Colombia",
            "value": 103,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Comoros",
            "value": 132,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Cook Islands",
            "value": 215,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Costa Rica",
            "value": 17,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Croatia",
            "value": 98,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Cuba",
            "value": 18,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Curacao",
            "value": 2567,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Cyprus",
            "value": 19,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Czech Republic",
            "value": 20,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Democratic Republic of Congo",
            "value": 213,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Denmark",
            "value": 21,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Djibouti",
            "value": 135,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Dominica",
            "value": 136,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Dominican Republic",
            "value": 22,
            "filterKey": "participant_country_id"
        },
        {
            "label": "East Timor",
            "value": 253,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Ecuador",
            "value": 23,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Egypt",
            "value": 24,
            "filterKey": "participant_country_id"
        },
        {
            "label": "El Salvador",
            "value": 25,
            "filterKey": "participant_country_id"
        },
        {
            "label": "England",
            "value": 27,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Equatorial Guinea",
            "value": 137,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Eritrea",
            "value": 138,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Estonia",
            "value": 28,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Ethiopia",
            "value": 139,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Fiji",
            "value": 140,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Finland",
            "value": 29,
            "filterKey": "participant_country_id"
        },
        {
            "label": "France",
            "value": 31,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Gabon",
            "value": 141,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Gambia",
            "value": 142,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Georgia",
            "value": 143,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Germany",
            "value": 32,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Ghana",
            "value": 33,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Gibraltar",
            "value": 1056,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Greece",
            "value": 34,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Greenland",
            "value": 216,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Grenada",
            "value": 144,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Guadeloupe",
            "value": 241,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Guam (USA)",
            "value": 251,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Guatemala",
            "value": 35,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Guinea",
            "value": 145,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Guinea - Bissau",
            "value": 146,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Guyana",
            "value": 147,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Haiti",
            "value": 148,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Hawaii (USA)",
            "value": 219,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Honduras",
            "value": 109,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Hungary",
            "value": 37,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Iceland",
            "value": 38,
            "filterKey": "participant_country_id"
        },
        {
            "label": "India",
            "value": 39,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Indonesia",
            "value": 40,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Iran",
            "value": 149,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Iraq",
            "value": 150,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Ireland",
            "value": 41,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Isle of Man",
            "value": 2119,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Israel",
            "value": 42,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Italy",
            "value": 43,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Ivory Coast",
            "value": 44,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Jamaica",
            "value": 45,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Japan",
            "value": 46,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Jordan",
            "value": 47,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Kazakhstan",
            "value": 151,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Kenya",
            "value": 48,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Kiribati",
            "value": 152,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Kosovo",
            "value": 240,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Kuwait",
            "value": 50,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Kyrgyzstan",
            "value": 153,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Laos",
            "value": 154,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Latvia",
            "value": 51,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Lebanon",
            "value": 155,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Lesotho",
            "value": 156,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Liberia",
            "value": 157,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Libya",
            "value": 158,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Liechtenstein",
            "value": 159,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Lithuania",
            "value": 52,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Luxembourg",
            "value": 53,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Macedonia",
            "value": 160,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Madagascar",
            "value": 161,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Malawi",
            "value": 162,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Malaysia",
            "value": 54,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Maldives",
            "value": 163,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Mali",
            "value": 164,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Malta",
            "value": 55,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Marshall Islands",
            "value": 165,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Martinique",
            "value": 56,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Mauritania",
            "value": 166,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Mauritius",
            "value": 167,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Mexico",
            "value": 57,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Micronesia",
            "value": 168,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Moldova",
            "value": 169,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Monaco",
            "value": 170,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Mongolia",
            "value": 171,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Montenegro",
            "value": 1511,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Montserrat",
            "value": 1119,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Morocco",
            "value": 58,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Mozambique",
            "value": 172,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Multiple Countries",
            "value": 104,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Myanmar",
            "value": 173,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Namibia",
            "value": 59,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Nauru",
            "value": 174,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Nepal",
            "value": 60,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Netherlands",
            "value": 61,
            "filterKey": "participant_country_id"
        },
        {
            "label": "New Caledonia",
            "value": 1816,
            "filterKey": "participant_country_id"
        },
        {
            "label": "New Zealand",
            "value": 62,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Nicaragua",
            "value": 63,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Niger",
            "value": 64,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Nigeria",
            "value": 175,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Niue",
            "value": 221,
            "filterKey": "participant_country_id"
        },
        {
            "label": "North Korea",
            "value": 120,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Northern Cyprus",
            "value": 176,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Northern Ireland",
            "value": 65,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Northern Mariana Islands (USA)",
            "value": 2072,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Norway",
            "value": 66,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Oman",
            "value": 177,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Pakistan",
            "value": 178,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Palau",
            "value": 179,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Palestine",
            "value": 217,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Panama",
            "value": 67,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Papua New Guinea",
            "value": 180,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Paraguay",
            "value": 181,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Peru",
            "value": 68,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Philippines",
            "value": 69,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Poland",
            "value": 70,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Polynesia",
            "value": 71,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Portugal",
            "value": 72,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Puerto Rico",
            "value": 73,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Qatar",
            "value": 182,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Republic of Congo",
            "value": 133,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Reunion",
            "value": 3058,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Romania",
            "value": 74,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Russia",
            "value": 75,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Rwanda",
            "value": 183,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Saba",
            "value": 2375,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Saint Helena",
            "value": 1380,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Samoa",
            "value": 211,
            "filterKey": "participant_country_id"
        },
        {
            "label": "San Marino",
            "value": 76,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Sao Tome and Principe",
            "value": 187,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Saudi Arabia",
            "value": 188,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Scotland",
            "value": 77,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Senegal",
            "value": 78,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Serbia",
            "value": 1510,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Seychelles",
            "value": 189,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Sierra Leone",
            "value": 190,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Singapore",
            "value": 79,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Sint Maarten",
            "value": 1320,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Slovakia",
            "value": 191,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Slovenia",
            "value": 192,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Solomon Islands",
            "value": 193,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Somalia",
            "value": 194,
            "filterKey": "participant_country_id"
        },
        {
            "label": "South Africa",
            "value": 80,
            "filterKey": "participant_country_id"
        },
        {
            "label": "South Korea",
            "value": 49,
            "filterKey": "participant_country_id"
        },
        {
            "label": "South Sudan",
            "value": 2878,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Spain",
            "value": 82,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Sri Lanka",
            "value": 195,
            "filterKey": "participant_country_id"
        },
        {
            "label": "St. Barts",
            "value": 2374,
            "filterKey": "participant_country_id"
        },
        {
            "label": "St. Eustatius",
            "value": 2373,
            "filterKey": "participant_country_id"
        },
        {
            "label": "St. Kitts and Nevis",
            "value": 184,
            "filterKey": "participant_country_id"
        },
        {
            "label": "St. Lucia",
            "value": 185,
            "filterKey": "participant_country_id"
        },
        {
            "label": "St. Vincent & Grenadines",
            "value": 186,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Sudan",
            "value": 196,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Suriname",
            "value": 197,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Swaziland",
            "value": 198,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Sweden",
            "value": 83,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Switzerland",
            "value": 84,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Syria",
            "value": 85,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Tahiti",
            "value": 218,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Taiwan",
            "value": 86,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Tajikistan",
            "value": 199,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Tanzania",
            "value": 108,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Thailand",
            "value": 87,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Tibet",
            "value": 88,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Togo",
            "value": 200,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Tonga",
            "value": 201,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Trinidad & Tobago",
            "value": 202,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Tunisia",
            "value": 203,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Turkey",
            "value": 89,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Turkmenistan",
            "value": 204,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Turks and Caicos Islands",
            "value": 2756,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Tuvalu",
            "value": 205,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Uganda",
            "value": 206,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Ukraine",
            "value": 90,
            "filterKey": "participant_country_id"
        },
        {
            "label": "United Arab Emirates",
            "value": 207,
            "filterKey": "participant_country_id"
        },
        {
            "label": "United Kingdom",
            "value": 245,
            "filterKey": "participant_country_id"
        },
        {
            "label": "United States",
            "value": 91,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Uruguay",
            "value": 92,
            "filterKey": "participant_country_id"
        },
        {
            "label": "US Virgin Islands",
            "value": 242,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Uzbekistan",
            "value": 208,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Vanuatu",
            "value": 209,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Vatican",
            "value": 2002,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Venezuela",
            "value": 93,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Vietnam",
            "value": 94,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Wales",
            "value": 95,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Western Sahara",
            "value": 210,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Yemen",
            "value": 96,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Zambia",
            "value": 214,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Zanzibar",
            "value": 2793,
            "filterKey": "participant_country_id"
        },
        {
            "label": "Zimbabwe",
            "value": 97,
            "filterKey": "participant_country_id"
        }
    ],
    "participants": [
        {
            "label": "Solo",
            "value": 1,
            "filterKey": "is_open_to_solos"
        },
        {
            "label": "Couples",
            "value": 1,
            "filterKey": "is_open_to_couples"
        },
        {
            "label": "Family",
            "value": 1,
            "filterKey": "is_open_to_families"
        },
        {
            "label": "Group",
            "value": 1,
            "filterKey": "is_open_to_groups"
        }
    ],
    "educationStatus": [
        {
            "label": "University Freshman (1st Year)",
            "value": 1,
            "filterKey": "education_status_id"
        },
        {
            "label": "University Sophomore (2nd Year)",
            "value": 2,
            "filterKey": "education_status_id"
        },
        {
            "label": "University Junior (3rd Year)",
            "value": 3,
            "filterKey": "education_status_id"
        },
        {
            "label": "University Senior (4th Year)",
            "value": 4,
            "filterKey": "education_status_id"
        },
        {
            "label": "University 5th Year or More",
            "value": 5,
            "filterKey": "education_status_id"
        },
        {
            "label": "High School Freshman (1st Year)",
            "value": 6,
            "filterKey": "education_status_id"
        },
        {
            "label": "High School Sophomore (2nd Year)",
            "value": 7,
            "filterKey": "education_status_id"
        },
        {
            "label": "High School Junior (3rd Year)",
            "value": 8,
            "filterKey": "education_status_id"
        },
        {
            "label": "High School Senior (4th Year)",
            "value": 9,
            "filterKey": "education_status_id"
        },
        {
            "label": "High School 5th Year or More",
            "value": 10,
            "filterKey": "education_status_id"
        },
        {
            "label": "No schooling completed",
            "value": 11,
            "filterKey": "education_status_id"
        },
        {
            "label": "Grade school to 8th grade",
            "value": 12,
            "filterKey": "education_status_id"
        },
        {
            "label": "Some high school, no diploma",
            "value": 13,
            "filterKey": "education_status_id"
        },
        {
            "label": "High school graduate, diploma or the equivalent (for example: GED)",
            "value": 14,
            "filterKey": "education_status_id"
        },
        {
            "label": "Some college credit, no degree",
            "value": 15,
            "filterKey": "education_status_id"
        },
        {
            "label": "Trade/technical/vocational training",
            "value": 16,
            "filterKey": "education_status_id"
        },
        {
            "label": "Associate degree",
            "value": 17,
            "filterKey": "education_status_id"
        },
        {
            "label": "Bachelor’s degree",
            "value": 18,
            "filterKey": "education_status_id"
        },
        {
            "label": "Master’s degree",
            "value": 19,
            "filterKey": "education_status_id"
        },
        {
            "label": "Professional degree",
            "value": 20,
            "filterKey": "education_status_id"
        },
        {
            "label": "Doctorate degree",
            "value": 21,
            "filterKey": "education_status_id"
        }
    ],
    "accomodations": [
        {
            "label": "Group living",
            "value": 1,
            "filterKey": "typical_living_id"
        },
        {
            "label": "Home-stays",
            "value": 2,
            "filterKey": "typical_living_id"
        },
        {
            "label": "Independent living",
            "value": 3,
            "filterKey": "typical_living_id"
        },
        {
            "label": "Apartment/Flat",
            "value": 4,
            "filterKey": "typical_living_id"
        },
        {
            "label": "Other",
            "value": 5,
            "filterKey": "typical_living_id"
        },
        {
            "label": "Dormitory",
            "value": 7,
            "filterKey": "typical_living_id"
        },
        {
            "label": "Guest House",
            "value": 9,
            "filterKey": "typical_living_id"
        }
    ],
    "languages": [
        {
            "label": "Afrikaans",
            "value": 42,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Albanian",
            "value": 54,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Arabic",
            "value": 1,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Armenian",
            "value": 80,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Aymara",
            "value": 49,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Bengali",
            "value": 52,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Bosnian",
            "value": 79,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Bulgarian",
            "value": 38,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Cantonese",
            "value": 44,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Catalan",
            "value": 46,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Cebuano",
            "value": 72,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Chinese",
            "value": 2,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Croatian",
            "value": 3,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Czech",
            "value": 4,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Danish",
            "value": 5,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Dutch",
            "value": 37,
            "filterKey": "languages_used_id"
        },
        {
            "label": "English",
            "value": 6,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Estonian",
            "value": 40,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Ewe",
            "value": 64,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Fante",
            "value": 65,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Farsi",
            "value": 45,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Finnish",
            "value": 7,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Flemish",
            "value": 56,
            "filterKey": "languages_used_id"
        },
        {
            "label": "French",
            "value": 8,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Ga",
            "value": 66,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Georgian",
            "value": 47,
            "filterKey": "languages_used_id"
        },
        {
            "label": "German",
            "value": 9,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Greek",
            "value": 10,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Hebrew",
            "value": 11,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Hindi",
            "value": 12,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Hungarian",
            "value": 13,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Icelandic",
            "value": 76,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Indonesian",
            "value": 36,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Irish",
            "value": 14,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Italian",
            "value": 15,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Jamaican",
            "value": 67,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Japanese",
            "value": 16,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Korean",
            "value": 17,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Kurdish",
            "value": 81,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Laotian",
            "value": 57,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Latin",
            "value": 18,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Latvian",
            "value": 78,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Lithuanian",
            "value": 71,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Malayalam",
            "value": 77,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Malaysian",
            "value": 35,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Maya",
            "value": 75,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Mongolian",
            "value": 69,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Nepali",
            "value": 33,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Norwegian",
            "value": 19,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Persian",
            "value": 60,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Polish",
            "value": 20,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Portuguese",
            "value": 21,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Quechua",
            "value": 41,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Romanian",
            "value": 53,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Russian",
            "value": 22,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Sanskrit",
            "value": 23,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Scottish Gaelic",
            "value": 50,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Serbian",
            "value": 55,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Serbo-Croatian",
            "value": 39,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Sign Language",
            "value": 74,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Sinhalese",
            "value": 70,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Slovak",
            "value": 58,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Slovenian",
            "value": 48,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Spanish",
            "value": 24,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Swahili",
            "value": 25,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Swedish",
            "value": 26,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Syriac",
            "value": 73,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Tagalog",
            "value": 31,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Tamil",
            "value": 59,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Thai",
            "value": 27,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Tibetan",
            "value": 61,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Turkish",
            "value": 28,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Twi",
            "value": 63,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Ukrainian",
            "value": 29,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Urdu",
            "value": 62,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Vietnamese",
            "value": 32,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Waray",
            "value": 34,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Wolof",
            "value": 68,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Xhosa",
            "value": 43,
            "filterKey": "languages_used_id"
        },
        {
            "label": "Yiddish",
            "value": 51,
            "filterKey": "languages_used_id"
        }
    ],
    "programApplications": [
        {
            "label": "Written Application",
            "value": 1,
            "filterKey": "application_process_id"
        },
        {
            "label": "Letters of Reference",
            "value": 2,
            "filterKey": "application_process_id"
        },
        {
            "label": "Phone/Video Interview",
            "value": 3,
            "filterKey": "application_process_id"
        },
        {
            "label": "In-Person Interview Required",
            "value": 4,
            "filterKey": "application_process_id"
        },
        {
            "label": "In-Person Interview when Feasible",
            "value": 5,
            "filterKey": "application_process_id"
        },
        {
            "label": "Physical Exam/Health Records",
            "value": 6,
            "filterKey": "application_process_id"
        },
        {
            "label": "Transcript",
            "value": 7,
            "filterKey": "application_process_id"
        },
        {
            "label": "Resume",
            "value": 8,
            "filterKey": "application_process_id"
        },
        {
            "label": "Other",
            "value": 9,
            "filterKey": "application_process_id"
        },
        {
            "label": "Online Application",
            "value": 11,
            "filterKey": "application_process_id"
        },
        {
            "label": "Essay",
            "value": 13,
            "filterKey": "application_process_id"
        },
        {
            "label": "Disciplinary Clearance Form",
            "value": 15,
            "filterKey": "application_process_id"
        },
        {
            "label": "Background Check",
            "value": 16,
            "filterKey": "application_process_id"
        },
        {
            "label": "Travel Insurance",
            "value": 17,
            "filterKey": "application_process_id"
        },
        {
            "label": "Deposit",
            "value": 18,
            "filterKey": "application_process_id"
        },
        {
            "label": "Application Fee",
            "value": 19,
            "filterKey": "application_process_id"
        }
    ],
    "verificationStatus": [
        {
            "label": "Verified",
            "value": "5",
            "filterKey": "verification_status_id"
        },
        {
            "label": "Not Verified",
            "value": "1,2,3,4",
            "filterKey": "verification_status_id"
        }
    ],
    "creditEligibility": [
        {
            "label": "Eligible for Credits",
            "value": "1",
            "filterKey": "credit_available"
        },
        {
            "label": "Not Eligible for Credits",
            "value": "0",
            "filterKey": "credit_available"
        }
    ],
    "programCostIncludes": [
        {
            "label": "Tuition & Fees",
            "value": 1,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Accommodation / Housing for Program Duration",
            "value": 2,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Some Accommodation",
            "value": 3,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "All Program Activity Costs",
            "value": 4,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Some Program Activity Costs",
            "value": 5,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Wifi Costs",
            "value": 6,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Medical / Accident Insurance",
            "value": 7,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Travel Insurance",
            "value": 8,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Weekday Meals (Breakfast, Lunch, Dinner)",
            "value": 9,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Weekend Meals (Breakfast, Lunch, Dinner)",
            "value": 10,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Some Meals / Partial Meal Plan",
            "value": 11,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Welcome Dinner",
            "value": 12,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Group Meals",
            "value": 13,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Airport Transfer (Pick-Up)",
            "value": 14,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Airport Transfer (Drop-Off)",
            "value": 15,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "In-Country Transportation To & From Project",
            "value": 16,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Public Transportation Pass",
            "value": 17,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Visa Fees",
            "value": 18,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "International SIM Card",
            "value": 19,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Domestic Airfare",
            "value": 20,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "International Airfare",
            "value": 21,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Required Equipment",
            "value": 22,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Some Equipment",
            "value": 23,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Guide / Chaperone",
            "value": 24,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "On-Site / In-Country Staff Support",
            "value": 25,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Pre-Departure Orientation",
            "value": 26,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "In-Country Orientation",
            "value": 27,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Training",
            "value": 28,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Laundry",
            "value": 29,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Academic Advising",
            "value": 30,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Financial Aid Counseling",
            "value": 31,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Assistance Booking Travel",
            "value": 32,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Student Union Fees",
            "value": 33,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Transcript Fees",
            "value": 34,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Use of Gym",
            "value": 35,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Language Lessons",
            "value": 36,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Cultural Training / Program / Orientation",
            "value": 37,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Micro-Credential(s) / Certification(s)",
            "value": 38,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Background Check Fees",
            "value": 39,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Vaccination Costs",
            "value": 40,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Textbooks / Reading Materials",
            "value": 41,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Course Materials",
            "value": 42,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "TEFL Certification",
            "value": 43,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Job Search Support",
            "value": 44,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Teaching Practicum",
            "value": 45,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Alumni / Networking Membership",
            "value": 46,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "TEFL Course Tuition",
            "value": 47,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Academic Credit",
            "value": 48,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Letter of Recommendation",
            "value": 49,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Certificate of Completion",
            "value": 50,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Souvenirs",
            "value": 51,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "TESOL Certification",
            "value": 52,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Emergency Support",
            "value": 53,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Internship Placement",
            "value": 54,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "Job Placement",
            "value": 55,
            "filterKey": "cost_include_description_id"
        },
        {
            "label": "No Inclusions",
            "value": 56,
            "filterKey": "cost_include_description_id"
        }
    ]
};

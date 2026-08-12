export type ImageSize = {
    w: number;
    h: number;
    label?: string;
    note?: string;
};

export type SpecField = {
    label: string;
    headline?: string;
    notes: string[];
};

export type AdSpec = {
    id: string;
    code: string;
    name: string;
    imageSizes: ImageSize[];
    quickFacts: string[];
    fields: SpecField[];
    autoPulled?: string[];
    tips: string[];
    /** Snapshot-tool ad ids whose live captures this card shows. Defaults
        to [id]; set explicitly when one card covers several placements. */
    snapshotIds?: string[];
};

export type AdSection = {
    id: string;
    title: string;
    navLabel: string;
    description: string;
    ads: AdSpec[];
};

export type PageType = {
    name: string;
    points: string[];
};

/* The eleven GoAbroad program directories — the hero stat and the Directory
   Landing Page overview bullet are both derived from this list. */
export const directories = [
    "Study Abroad",
    "Intern Abroad",
    "Volunteer Abroad",
    "Teach Abroad",
    "TEFL Courses",
    "Gap Year",
    "Degrees Abroad",
    "Language Schools",
    "Jobs Abroad",
    "High School Abroad",
    "Adventure Travel",
];

export const pageTypes: PageType[] = [
    {
        name: "Homepage",
        points: [
            "Links to each of our different directories through the navigation bar",
            "Visited by the largest number of users every month",
            "Average user is interested in going abroad with an intent to learn about their options — they might not know exactly what they want to do yet",
            "Users can click to a Directory Page to complete a search, navigate directly to a search results page, or click to a Provider Page to view an organizational profile or visit a client's website",
        ],
    },
    {
        name: "Directory Landing Page",
        points: [
            "Main directory page where users choose a field/subject, destination, or term/duration to filter programs by",
            "User is specifically interested in this type of opportunity and arrived directly from a search engine or another GoAbroad page",
            `GoAbroad has ${directories.length} distinct directories: ${directories.slice(0, -1).join(", ")}, and ${directories[directories.length - 1]}`,
        ],
    },
    {
        name: "Search Results Page",
        points: [
            "Similar to a Google search results page",
            "List of program results that match a user's selected filters",
            "Program results have a title, description text, organization name, and review rating (if the program has reviews)",
            "Users can click to the full program listing — and if the listing is linked, directly to the client's website",
        ],
    },
    {
        name: "Provider Page",
        points: [
            "Organizational profile of a GoAbroad partner that provides international programs",
            "Every profile includes an “About Us” section, FAQs, links to all program listings and reviews (if available), and a “Contact Provider” button",
            "Premium providers also have social media links, a media gallery, and logo — plus upgraded enhancements like a customized cover photo — with call-to-action links directly to their website",
        ],
    },
    {
        name: "Program Listing",
        points: [
            "Detailed description of a specific program",
            "All listings contain program details (location, accommodation, inclusions, FAQs, etc.), program reviews, and an “Inquire Here” button leading to GoAbroad's lead capture form",
            "Premium Listings (also called Linked Listings) add call-to-action links (Apply Now and/or Visit Website) to the client's website, plus the organization's logo, photos, and videos",
        ],
    },
];

export type BestPractice = {
    title: string;
    text: string;
};

export const bestPractices: BestPractice[] = [
    {
        title: "Keep your brand consistent",
        text: "Use the same name across all of your platforms — whether you use an abbreviation or the full name, your brand name should be consistent on GoAbroad, your website, and your social media.",
    },
    {
        title: "Use high-quality photos",
        text: "Always use high-quality photos; see detailed size and pixel requirements in each spec below.",
    },
    {
        title: "Speak to your audience",
        text: "Put yourself in the shoes of your target market when crafting text and choosing images; use short phrases with clear language that is easy to understand alongside compelling visuals.",
    },
];

export const adSections: AdSection[] = [
    {
        id: "homepage",
        title: "Homepage Advertising Specs",
        navLabel: "Homepage",
        description:
            "The busiest page on GoAbroad. Homepage traffic hasn't picked a directory yet, so these placements reach users who may not have considered your type of program.",
        ads: [
            {
                id: "ad-a",
                code: "Ad A",
                name: "Homepage Premier Feature",
                imageSizes: [{ w: 400, h: 300, note: "minimum · 4:3 ratio" }],
                quickFacts: ["65-char description", "400 × 300 px image min"],
                fields: [
                    {
                        label: "Title",
                        headline: "Auto-populated",
                        notes: [
                            "Will automatically populate with your organization name",
                        ],
                    },
                    {
                        label: "Description",
                        headline: "65 characters max",
                        notes: [
                            "Use “&” instead of “and”",
                            "Limit use of punctuation to save characters",
                            "Content should be in one single sentence",
                            "Mention the destination(s) of your program",
                        ],
                    },
                    {
                        label: "Button",
                        notes: [
                            "Choose the page on your website this should link to",
                            "Text content and color cannot be changed",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "400 × 300 px minimum (or 4:3 ratio)",
                        notes: [
                            "Focal point should be on the right since the button and text will be aligned on the left",
                            "The image cannot have any text, graphics, or logo overlay — just a photo, please!",
                        ],
                    },
                ],
                tips: [
                    "Craft content and choose an image that can resonate with a wide variety of users. Since traffic on the homepage hasn't yet selected a directory, you'll be visible to users who may not have previously considered your program offerings.",
                    "Make your text incredibly clear so users can easily understand what you offer. Other ads in this rotation might be promoting everything from volunteering with sea turtles to paid teaching positions to full degree programs.",
                ],
            },
            {
                id: "ad-b",
                code: "Ad B",
                name: "Homepage Feature",
                imageSizes: [{ w: 282, h: 150, note: "minimum · 3:2 ratio" }],
                quickFacts: ["60-char title", "282 × 150 px image min"],
                fields: [
                    {
                        label: "Title",
                        headline: "60 characters max (if linked to your website)",
                        notes: [
                            "Linked to program listing: title will automatically display the program listing title",
                            "Linked to your website: use an action word to evoke action from users",
                            "Shouldn't include your company / university name (this is automatically pulled into the feature)",
                            "Use “&” instead of “and” and limit use of punctuation",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "282 × 150 px minimum (or 3:2 ratio)",
                        notes: [
                            "Image cannot have any text, graphics, or logo overlay on the original file",
                            "Sides of the image will be cropped on narrower screens",
                        ],
                    },
                ],
                autoPulled: [
                    "Provider Name — from Public Name on account",
                    "Review Count — from total reviews for active program listings",
                    "Verification Icon — from client account status",
                    "Logo — from your logo in Client Account",
                ],
                tips: [
                    "Craft content and choose an image that can resonate with a wide variety of users — homepage traffic hasn't selected a directory yet.",
                    "You only have a short amount of text so make it incredibly clear. Ensure a user can quickly understand your program.",
                    "Pick an image that will still resonate with users with text overlay.",
                ],
            },
            {
                id: "ad-c",
                code: "Ad C",
                name: "Homepage Organizational Feature",
                imageSizes: [{ w: 1400, h: 400, note: "or 1.91:1 ratio" }],
                quickFacts: ["80-char title", "1400 × 400 px banner"],
                fields: [
                    {
                        label: "Title",
                        headline: "80 characters max",
                        notes: [
                            "Use “&” instead of “and” and limit use of punctuation",
                            "Don't include Provider Name; it will be automatically appended at the end of the title",
                            "Color of text cannot be changed",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "1400 × 400 px (or 1.91:1 ratio)",
                        notes: [
                            "Only one image should be submitted",
                            "Images with subject/s on 70% of the right side are preferred",
                            "Image width on the mobile version will be cropped, so keep this in mind",
                            "Image cannot have any text, graphics, or logo overlay",
                            "Choose a high quality image that relates to your organization's mission",
                        ],
                    },
                    {
                        label: "Button",
                        notes: [
                            "Choose the page on your website this should link to",
                            "Text content and color cannot be changed",
                        ],
                    },
                ],
                tips: [
                    "Group photos in front of a landscape or interesting destination work especially well — they look nice as a banner image as well as the cropped mobile version.",
                    "Mention the destination(s) of your program offerings to entice users.",
                ],
            },
            {
                id: "ad-e",
                code: "Ad E",
                name: "Homepage Video",
                imageSizes: [],
                quickFacts: ["80-char title", "Video under 3 minutes"],
                fields: [
                    {
                        label: "Title",
                        headline: "80 characters max",
                        notes: [
                            "Write one short sentence",
                            "Make it an action statement to evoke action!",
                        ],
                    },
                    {
                        label: "Thumbnail Image",
                        headline: "Auto-pulled from video link",
                        notes: ["Video auto-plays when the user scrolls"],
                    },
                    {
                        label: "Button",
                        notes: [
                            "Linked to selected website URL",
                            "Text content and color cannot be changed",
                        ],
                    },
                ],
                tips: [
                    "Keep your video under three minutes — shorter is better if possible!",
                    "Make your description about the video to encourage people to click and watch.",
                    "Use high quality footage and quick edits to keep users watching.",
                    "Make sure your video link has a good thumbnail image.",
                ],
            },
        ],
    },
    {
        id: "directory",
        title: "Directory Landing Page Advertising Specs",
        navLabel: "Directory Landing Page",
        description:
            "Users here have already picked a type of experience — study, intern, volunteer, teach, and more. Tie your content to the directory they're browsing.",
        ads: [
            {
                id: "ad-f",
                code: "Ad F",
                name: "Directory Headline Photo",
                imageSizes: [{ w: 240, h: 240 }],
                quickFacts: ["70-char title", "240 × 240 px image"],
                fields: [
                    {
                        label: "Title",
                        headline: "70 characters max",
                        notes: [
                            "Should include an action word",
                            "Use “&” instead of “and” and limit use of punctuation",
                            "Should mention destination(s) of program",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "240 × 240 px",
                        notes: [
                            "Image cannot have any text, graphics, or logo overlay on the original file",
                            "Choose a high quality image that relates to the feature",
                            "Keep in mind the title, logo, and button will be overlaid on the image",
                        ],
                    },
                    {
                        label: "Button",
                        notes: [
                            "Choose the page on your website this should link to",
                            "Text content and color cannot be changed",
                        ],
                    },
                ],
                tips: [
                    "Use an image with a focus area that will not be impacted by the design of the ad.",
                    "Showcase the specific program opportunity you want to strategically promote and use text and a title that's specific to the directory.",
                    "Rather than just mentioning your brand, tie your content back to the type of experience the user is searching for.",
                    "If you offer something unique or niche, now's the time to mention it! Users click through carousel images proactively and skim the text, so be as clear as possible.",
                ],
            },
            {
                id: "ad-g",
                code: "Ad G",
                name: "Premier Sponsorship",
                imageSizes: [{ w: 100, h: 100, note: "minimum" }],
                quickFacts: ["65-char description", "100 × 100 px image min"],
                fields: [
                    {
                        label: "Title",
                        headline: "Auto-pulled from Public Name",
                        notes: [
                            "Choose the page on your website you'd like to link to",
                            "Color of text cannot be changed",
                        ],
                    },
                    {
                        label: "Description",
                        headline: "65 characters max",
                        notes: [
                            "One short sentence with an action statement works best",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "100 × 100 px minimum",
                        notes: [
                            "Default image is your logo",
                            "Image cannot have any text, graphics, or logo overlay",
                            "Choose an image that relates to the directory",
                        ],
                    },
                ],
                tips: [
                    "Choose an image that looks great as a thumbnail — high contrast, one or two subjects at most, and eye-catching even on a small scale.",
                    "Relate the content to the directory you're promoting.",
                    "Keep it simple and short!",
                ],
            },
            {
                id: "ad-h",
                code: "Ad H",
                name: "Directory Premier Feature",
                imageSizes: [{ w: 240, h: 240 }],
                quickFacts: ["70-char title", "240 × 240 px image"],
                fields: [
                    {
                        label: "Title",
                        headline: "70 characters max",
                        notes: [
                            "Start with an action word to evoke action!",
                            "Use “&” instead of “and” and limit use of punctuation",
                            "Content should be one single sentence",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "240 × 240 px",
                        notes: [
                            "Image cannot have any text, graphics, or logo overlay",
                            "Choose a high quality image that relates to the feature",
                            "Keep in mind that the title and logo will be overlaid on the image",
                        ],
                    },
                    {
                        label: "Link",
                        notes: [
                            "Choose the page on your website this should link to",
                        ],
                    },
                ],
                autoPulled: [
                    "Logo — from the logo associated with your GoAbroad account",
                ],
                tips: [
                    "Showcase the specific opportunity you're promoting by using a title that's specific to the directory.",
                    "Rather than just mentioning your brand, tie it back to the type of experience the user is searching for.",
                ],
            },
            {
                id: "ad-i",
                code: "Ad I",
                name: "Directory Featured Program",
                imageSizes: [{ w: 240, h: 150 }],
                quickFacts: ["70-char title", "240 × 150 px image"],
                fields: [
                    {
                        label: "Title",
                        headline: "70 characters max",
                        notes: [
                            "Title will automatically display the program listing title, OR you can customize it",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "240 × 150 px",
                        notes: [
                            "Image cannot have any text, graphics, or logo overlay",
                            "Sides of the image will be cropped on narrower screens",
                            "Choose a high quality image that relates to the feature",
                        ],
                    },
                    {
                        label: "Button",
                        notes: [
                            "Will automatically be linked to the Visit Website URL from the selected program listing",
                        ],
                    },
                ],
                autoPulled: [
                    "Review Count/Rating — from total reviews & overall rating on Provider Page",
                    "Logo — from your logo in Client Account",
                    "Provider Name — from your GoAbroad registered name",
                    "Verification Icon — from your verification status",
                ],
                tips: [
                    "Showcase the specific opportunity you're promoting by using a title that's specific to the directory.",
                ],
            },
            {
                id: "ad-j",
                code: "Ad J",
                name: "Directory Organizational Feature",
                imageSizes: [{ w: 1000, h: 350, note: "or 1.91:1 ratio" }],
                quickFacts: ["80-char title", "1000 × 350 px banner"],
                fields: [
                    {
                        label: "Title",
                        headline: "80 characters max",
                        notes: [
                            "Use “&” instead of “and” and limit use of punctuation",
                            "Don't include Provider Name; it will be automatically appended at the end of the title",
                            "Color of text cannot be changed",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "1000 × 350 px (or 1.91:1 ratio)",
                        notes: [
                            "Only one image should be submitted",
                            "Images with subject/s on 70% of the right side are preferred",
                            "Keep in mind that your logo, title, and button will be overlaid on the image",
                            "Image width on the mobile version will be cropped",
                            "Image file cannot have any text, graphics, or logo overlay on the original file",
                        ],
                    },
                    {
                        label: "Button",
                        notes: [
                            "Static part of the ad — text and color cannot be changed",
                            "Choose the page on your website you want it linked to",
                        ],
                    },
                ],
                tips: [
                    "Choose an image without any incredibly bright areas and with limited contrast so the white text pops out.",
                    "Keep your title simple and clear — don't try to do too much with such few characters.",
                ],
            },
            {
                id: "ad-l",
                code: "Ad L",
                name: "Directory Video",
                imageSizes: [],
                quickFacts: ["80-char title", "Video under 3 minutes"],
                fields: [
                    {
                        label: "Title",
                        headline: "80 characters max",
                        notes: [
                            "Write one short sentence",
                            "Make it an action statement to evoke action!",
                            "Linked to a page on your website on mobile",
                        ],
                    },
                    {
                        label: "Thumbnail Image",
                        headline: "Auto-pulled from video link",
                        notes: [],
                    },
                    {
                        label: "Button (desktop only)",
                        notes: [
                            "Static part of the ad — graphic or color cannot be changed",
                            "Linked to selected website URL",
                        ],
                    },
                ],
                tips: [
                    "Keep your video under three minutes — shorter is better if possible!",
                    "Make your title about the video to encourage people to click and watch.",
                    "Use high quality footage and quick edits to keep users watching.",
                    "Make sure your video link has a good thumbnail image.",
                ],
            },
        ],
    },
    {
        id: "search-results",
        title: "Search Results Page Advertising Specs",
        navLabel: "Search Results Page",
        description:
            "Users are actively comparing programs here. Tie your ad to the specific results page — mention the type of opportunity, destination, or subject area.",
        ads: [
            {
                id: "ad-m",
                code: "Ad M",
                name: "Results Headline Photo",
                imageSizes: [{ w: 240, h: 240 }],
                quickFacts: ["70-char title", "240 × 240 px image"],
                fields: [
                    {
                        label: "Title",
                        headline: "70 characters max",
                        notes: [
                            "Should start with an action word to evoke action!",
                            "Use “&” instead of “and” and limit use of punctuation",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "240 × 240 px",
                        notes: [
                            "Keep in mind that logo, title, and button will be overlaid on the image",
                            "Image cannot have any text, graphics, or logo overlay",
                            "Logo will automatically pull from your account",
                        ],
                    },
                    {
                        label: "Link",
                        notes: [
                            "Let us know which page on your website the title should link to",
                        ],
                    },
                ],
                tips: [
                    "Rather than just mentioning your brand, tie it back to the specific results page you're on (mention the type of opportunity, destination, subject area, etc.).",
                    "If you offer something unique or niche, now's the time to mention it! Users click through these carousel images proactively and skim the text.",
                ],
            },
            {
                id: "ad-n",
                code: "Ad N",
                name: "Results Feature",
                imageSizes: [
                    { w: 320, h: 150, label: "Desktop" },
                    { w: 380, h: 150, label: "Mobile" },
                ],
                quickFacts: ["#1 results spot", "320/380 × 150 px images"],
                fields: [
                    {
                        label: "Title & Description",
                        headline: "Auto-pulled",
                        notes: [
                            "Will automatically pull the program listing title and description",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "320 × 150 px (desktop) · 380 × 150 px (mobile)",
                        notes: [
                            "Image cannot have any text, graphics, or logo overlay",
                            "Choose a high quality image that relates to the feature",
                        ],
                    },
                    {
                        label: "Buttons",
                        notes: [
                            "Decide which program listing on GoAbroad you would like to link your feature to",
                            "Visit Website will automatically be linked to the Visit Website URL from the selected program listing",
                            "Static part of the ad — text and color cannot be changed",
                        ],
                    },
                ],
                autoPulled: [
                    "Review Count/Rating — from total reviews & overall rating on Provider Page",
                    "Logo — from logo in your GoAbroad account",
                    "Provider Name — from Public Name associated with GoAbroad account",
                    "Verification Icon — from account verification status",
                ],
                tips: [
                    "Rather than just mentioning your brand, tie it back to the specific results page you're on (mention the type of opportunity, destination, subject area, etc.).",
                    "Users are skimming these listings so be as clear as possible about what you offer. You have an advantage by being in the #1 results listing spot on the page.",
                    "Choose an image that looks good as a smaller square as well as a rectangle with the title overlaid — consider higher contrast and one to two subjects.",
                ],
            },
            {
                id: "ad-o",
                code: "Ad O",
                name: "Listing Photo",
                imageSizes: [
                    { w: 320, h: 150, label: "Desktop" },
                    { w: 380, h: 150, label: "Mobile" },
                ],
                quickFacts: ["Auto title & description", "320/380 × 150 px images"],
                fields: [
                    {
                        label: "Link",
                        notes: [
                            "Decide which program listing should be your default listing for the specific results page (if you offer more than one on that results page)",
                        ],
                    },
                    {
                        label: "Title & Description",
                        headline: "Auto-pulled",
                        notes: [
                            "Automatically pulls from program listing title and first characters of description",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "320 × 150 px (desktop) · 380 × 150 px (mobile)",
                        notes: [
                            "Image cannot have any text, graphics, or logo overlay",
                            "Choose an image that's directly related to your chosen listing for the results page — e.g. on the “Volunteer Abroad in Teaching” page, a photo of a school or students makes sense",
                        ],
                    },
                    {
                        label: "Buttons",
                        notes: [
                            "Static part of the ad — text and color cannot be changed",
                            "View Program will take a user to your program listing",
                            "Visit Website will take a user to the page on your website associated with the program listing",
                        ],
                    },
                ],
                autoPulled: [
                    "Review Count/Rating — from total reviews & overall rating on Provider Page",
                    "Provider Name — from Public Name on account",
                    "Verification Icon — from GoAbroad account verification status",
                ],
                tips: [
                    "Choose an image that looks good as a smaller square as well as a rectangle with the title overlaid — consider higher contrast and one to two subjects.",
                    "Take a look at the existing Listing Photos on the results page where you'll be adding one — do you have any images that would stand out to a user?",
                ],
            },
            {
                id: "ad-p",
                code: "Ad P",
                name: "Listing Logo",
                imageSizes: [],
                quickFacts: ["Uses your logo on file", "Auto title & description"],
                fields: [
                    {
                        label: "Link",
                        notes: [
                            "Decide which program listing should be your default listing for the specific results page (if you offer more than one on that results page)",
                        ],
                    },
                    {
                        label: "Title & Description",
                        headline: "Auto-pulled",
                        notes: [
                            "Automatically pulls from program listing title and from first characters of the program listing description",
                        ],
                    },
                    {
                        label: "Buttons",
                        notes: [
                            "Static part of the ad — text and color cannot be changed",
                            "View Program takes user to your program listing",
                            "Visit Website takes user to the page on your website associated with the program listing",
                        ],
                    },
                ],
                autoPulled: [
                    "Review Count/Rating — from total reviews & overall rating on Provider Page",
                    "Logo — from logo associated with GoAbroad account",
                    "Provider Name — from Public Name on account",
                    "Verification Icon — from GoAbroad account verification status",
                ],
                tips: [
                    "We'll use the logo we already have on file for you — all you have to do is ensure the listing you're boosting is the one you want and the links go to the exact page you want to direct users.",
                ],
            },
            {
                id: "ad-q",
                code: "Ad Q",
                name: "Hot Jobs Listing",
                imageSizes: [],
                quickFacts: ["Fully auto-pulled from your listing"],
                fields: [
                    {
                        label: "Title & Description",
                        headline: "Auto-pulled",
                        notes: ["Automatically pulled from your listing"],
                    },
                    {
                        label: "Image",
                        headline: "Auto-pulled",
                        notes: [
                            "Automatically pulled from the primary listing photo",
                        ],
                    },
                ],
                tips: [
                    "Create one listing specifically for your Hot Jobs promotion and keep it as up-to-date as possible.",
                ],
            },
            {
                id: "ad-r",
                code: "Ad R",
                name: "Results Page Flyer Ad",
                imageSizes: [{ w: 100, h: 100, note: "minimum" }],
                quickFacts: ["65-char description", "100 × 100 px image min"],
                fields: [
                    {
                        label: "Title",
                        headline: "Auto-pulled from Public Name",
                        notes: [
                            "Choose the page on your website you'd like to link to",
                            "Color of text cannot be changed",
                        ],
                    },
                    {
                        label: "Description",
                        headline: "65 characters max",
                        notes: [
                            "One short sentence with an action statement works best",
                            "Should mention destination(s) of program",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "100 × 100 px minimum",
                        notes: [
                            "Default image is your logo",
                            "Image cannot have any text, graphics, or logo overlay",
                            "Choose an image that relates to the directory and location or subject",
                        ],
                    },
                ],
                tips: [
                    "Choose an image that looks great as a thumbnail — high contrast, one or two subjects at most, and something the eye can easily understand.",
                    "Mention the specific results page that you're promoting your organization on.",
                    "Keep the text simple and short.",
                ],
            },
        ],
    },
    {
        id: "premium-listing",
        title: "Premium Listing Features",
        navLabel: "Premium Listing Features",
        description:
            "Cover photos that give your listings and provider page a customized, branded look across desktop and mobile.",
        ads: [
            {
                id: "ad-t-d",
                code: "Ad T / Ad D",
                name: "Listing Cover Photo / Customized Listing Cover Photo",
                imageSizes: [
                    { w: 1440, h: 500, label: "Desktop" },
                    { w: 430, h: 320, label: "Mobile" },
                ],
                quickFacts: ["1440 × 500 px desktop", "430 × 320 px mobile"],
                fields: [
                    {
                        label: "Image",
                        headline: "1440 × 500 px (desktop) · 430 × 320 px (mobile)",
                        notes: [
                            "Image cannot have any text, graphics, or logo overlay",
                            "Choose a high quality image that relates to your organization",
                            "No collage photos allowed!",
                            "Consider placement of text and buttons when selecting the image",
                        ],
                    },
                ],
                tips: [
                    "For Ad T: choose an image that showcases your organization and opportunities, since the same photo will be used across all of your listings!",
                    "For Ad D: choose an image that perfectly reflects your specific program destination and experience.",
                ],
            },
            {
                id: "ad-k",
                code: "Ad K",
                name: "Customized Provider Page Cover Photo",
                imageSizes: [
                    { w: 1440, h: 500, label: "Desktop" },
                    { w: 430, h: 320, label: "Mobile" },
                ],
                quickFacts: ["1440 × 500 px desktop", "430 × 320 px mobile"],
                fields: [
                    {
                        label: "Image",
                        headline: "1440 × 500 px (desktop) · 430 × 320 px (mobile)",
                        notes: [
                            "Image cannot have any text, graphics, or logo overlay",
                            "Choose a high quality image that relates to your organization — no collage photos allowed!",
                            "Consider the overlay of text and buttons when selecting the image",
                        ],
                    },
                ],
                autoPulled: [
                    "Program Title — from program listing title",
                    "Reviews — from program listing",
                    "Logo — from your logo in your account",
                    "Provider Name — from Public Name associated with GoAbroad account",
                    "Verification Icon — from account verification status",
                ],
                tips: [
                    "Group photos in front of a landscape or interesting destination work especially well because they look nice as a banner image as well as the cropped mobile version.",
                    "Think about what imagery represents all your program destinations and/or your brand as a whole.",
                ],
            },
        ],
    },
    {
        id: "travel-resource",
        title: "Travel Resource Advertising",
        navLabel: "Travel Resources",
        description:
            "Placements across GoAbroad's travel resources — insurance, scholarships, embassies, and more. Great for products and services travelers need alongside their program.",
        ads: [
            {
                id: "ad-gg",
                code: "GG",
                name: "Travel Resource Homepage Headline Photo",
                imageSizes: [
                    { w: 365, h: 350, label: "Desktop" },
                    { w: 335, h: 430, label: "Mobile" },
                ],
                quickFacts: ["70-char title", "140-char description"],
                fields: [
                    {
                        label: "Title",
                        headline: "70 characters max",
                        notes: [
                            "Can mention company name and/or describe your product",
                            "Use “&” instead of “and”",
                            "Avoid using all caps",
                        ],
                    },
                    {
                        label: "Description",
                        headline: "140 characters max",
                        notes: [
                            "Content should be in one single paragraph",
                            "Include who your product is geared towards and basic information about what it includes",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "365 × 350 px (desktop) · 335 × 430 px (mobile)",
                        notes: [
                            "Image cannot have any text, graphics, or logo overlay",
                            "Choose a high quality image that displays your product if possible",
                        ],
                    },
                    {
                        label: "Button",
                        notes: [
                            "Static part of the ad — text and color cannot be changed",
                            "Let us know which page on your website this should link to",
                        ],
                    },
                ],
                tips: [
                    "Mention why your product is important — some users may not realize they need additional insurance, support, or resources outside of their program.",
                    "Choose an image that will look enticing on both desktop and mobile, considering the overlay of title, logo, description, and button for mobile users.",
                    "Make the text simple and easy to understand so users aren't overwhelmed.",
                ],
            },
            {
                id: "ad-hh",
                code: "HH",
                name: "Travel Resources Headline Photo",
                imageSizes: [
                    { w: 365, h: 350, label: "Desktop" },
                    { w: 335, h: 430, label: "Mobile" },
                ],
                quickFacts: ["70-char title", "140-char description"],
                fields: [
                    {
                        label: "Title",
                        headline: "70 characters max",
                        notes: [
                            "Can mention company name and/or describe your product",
                            "Use “&” instead of “and”",
                            "Avoid using all caps",
                        ],
                    },
                    {
                        label: "Description",
                        headline: "140 characters max",
                        notes: [
                            "Content should be in one single sentence",
                            "Include who your product is geared towards and basic information about what it includes",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "365 × 350 px (desktop) · 335 × 430 px (mobile)",
                        notes: [
                            "Image cannot have any text, graphics, or logo overlay",
                            "Choose a high quality image that displays your product if possible",
                        ],
                    },
                    {
                        label: "Button",
                        notes: [
                            "Static part of the ad — text and color cannot be changed",
                            "Let us know which page on your website this should link to",
                        ],
                    },
                ],
                tips: [
                    "Mention why your product is important — some users may not realize they need additional insurance, support, or resources outside of their program.",
                    "Choose an image that will look enticing on both desktop and mobile, considering the overlay of title, logo, description, and button for mobile users.",
                    "Make the text simple and easy to understand.",
                ],
            },
            {
                id: "ad-ii",
                code: "II",
                name: "Travel Resource Feature",
                imageSizes: [
                    { w: 410, h: 350, label: "Desktop" },
                    { w: 380, h: 375, label: "Mobile" },
                ],
                quickFacts: ["70-char title", "Logo auto-pulled"],
                fields: [
                    {
                        label: "Title",
                        headline: "70 characters max",
                        notes: [
                            "Use “&” instead of “and” and limit use of punctuation",
                            "Color of text cannot be changed",
                            "No need to include your name, since the logo will be automatically pulled from your account",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "410 × 350 px (desktop) · 380 × 375 px (mobile)",
                        notes: [
                            "Keep in mind that your logo, title, and button will be centered vertically and horizontally as an overlay on the image",
                            "Choose a high quality image that relates to the feature",
                            "Image file cannot have any text, graphics, or logo overlay on the original file",
                        ],
                    },
                    {
                        label: "Button",
                        notes: [
                            "Static part of the ad — text and color cannot be changed",
                            "Choose the page on your website you want it linked to",
                        ],
                    },
                ],
                tips: [
                    "Choose an image without any incredibly bright areas and with limited contrast so the white text pops out.",
                    "Consider how your logo will look on top of the image and what parts it will block (based on the shape of your logo).",
                    "Keep your title simple and clear — don't try to do too much with such few characters.",
                ],
            },
            {
                id: "ad-jj-ll",
                code: "JJ / LL",
                name: "Travel Resource Listing / Travel Insurance Listing Feature",
                snapshotIds: ["ad-jj", "ad-ll"],
                imageSizes: [
                    { w: 275, h: 270, label: "Desktop" },
                    { w: 380, h: 180, label: "Mobile" },
                ],
                quickFacts: ["70-char title", "200-char description"],
                fields: [
                    {
                        label: "Link",
                        notes: ["Choose a URL on your website to link to"],
                    },
                    {
                        label: "Title",
                        headline: "70 characters max",
                        notes: [
                            "Should use an action word",
                            "Cannot include your name (this will be automatically pulled from your account)",
                            "Use “&” instead of “and” and limit use of punctuation",
                        ],
                    },
                    {
                        label: "Description",
                        headline: "200 characters max",
                        notes: [
                            "Mention the service you provide and why users should choose you",
                            "Keep it to one single concise paragraph",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "275 × 270 px (desktop) · 380 × 180 px (mobile)",
                        notes: [
                            "Image cannot have any text, graphics, or logo overlay",
                            "Choose a high quality image that relates to the feature",
                        ],
                    },
                    {
                        label: "Button",
                        notes: [
                            "Static part of the ad — text and color cannot be changed",
                        ],
                    },
                ],
                autoPulled: [
                    "Logo — from logo in your GoAbroad account",
                    "Provider Name — from Public Name associated with GoAbroad account",
                ],
                tips: [
                    "Rather than just mentioning your brand, tie it back to the specific type of resource.",
                    "If you offer something unique or niche, now's the time to mention it! Users are skimming these listings so be as clear as possible about what you offer.",
                    "Choose an image that looks good as a smaller square as well as a rectangle with the title overlaid — consider higher contrast and one to two subjects.",
                ],
            },
            {
                id: "ad-kk",
                code: "KK",
                name: "Travel Insurance Headline Photo",
                imageSizes: [
                    { w: 365, h: 350, label: "Desktop" },
                    { w: 335, h: 430, label: "Mobile" },
                ],
                quickFacts: ["70-char title", "140-char description"],
                fields: [
                    {
                        label: "Title",
                        headline: "70 characters max",
                        notes: [
                            "Can mention company name and/or describe your product",
                            "Use “&” instead of “and”",
                            "Avoid using all caps",
                        ],
                    },
                    {
                        label: "Description",
                        headline: "140 characters max",
                        notes: [
                            "Content should be in one single sentence",
                            "Include who your product is geared towards and basic information about what it includes",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "365 × 350 px (desktop) · 335 × 430 px (mobile)",
                        notes: [
                            "Image cannot have any text, graphics, or logo overlay",
                            "Choose a high quality image that displays your product if possible",
                        ],
                    },
                    {
                        label: "Button",
                        notes: [
                            "Static part of the ad — text and color cannot be changed",
                            "Let us know which page on your website this should link to",
                        ],
                    },
                ],
                tips: [],
            },
            {
                id: "ad-mm",
                code: "MM",
                name: "Scholarship Homepage Headline Photo",
                imageSizes: [
                    { w: 390, h: 350, label: "Desktop" },
                    { w: 375, h: 430, label: "Mobile" },
                ],
                quickFacts: ["70-char title", "140-char description"],
                fields: [
                    {
                        label: "Title",
                        headline: "70 characters max",
                        notes: [
                            "Mention your organization or university name as well as the type of scholarship",
                            "Use “&” instead of “and”",
                            "Avoid using all caps",
                        ],
                    },
                    {
                        label: "Description",
                        headline: "140 characters max",
                        notes: [
                            "Content should be in a single paragraph",
                            "Include deadlines and eligibility if possible",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "390 × 350 px (desktop) · 375 × 430 px (mobile)",
                        notes: [
                            "Image cannot have any text, graphics, or logo overlay",
                            "Choose a high quality image",
                        ],
                    },
                    {
                        label: "Button",
                        notes: [
                            "Static part of the ad — text and color cannot be changed",
                            "Let us know which page on your website this should link to",
                        ],
                    },
                ],
                tips: [
                    "Include the number of scholarships you are awarding as well as the highest dollar amount that a user could be given.",
                    "Link to a clear landing page on your website that includes all of the scholarship information.",
                ],
            },
            {
                id: "ad-nn",
                code: "NN",
                name: "Embassy Directory Feature",
                imageSizes: [{ w: 380, h: 220, note: "desktop & mobile" }],
                quickFacts: ["70-char title", "380 × 220 px image"],
                fields: [
                    {
                        label: "Title",
                        headline: "70 characters max",
                        notes: [
                            "Limit use of punctuation",
                            "Color of text cannot be changed",
                            "No need to include your name, since the ad will also feature your logo!",
                        ],
                    },
                    {
                        label: "Image",
                        headline: "380 × 220 px (desktop & mobile)",
                        notes: [
                            "Keep in mind that your logo, title, and button will be centered vertically and horizontally as an overlay on the image",
                            "Choose a high quality image that relates to the feature",
                            "Image file cannot have any text, graphics, or logo overlay on the original file",
                        ],
                    },
                    {
                        label: "Button",
                        notes: [
                            "Come up with an enticing call to action for your button text!",
                            "Choose the page on your website you want it linked to",
                        ],
                    },
                ],
                autoPulled: ["Logo — from your account"],
                tips: [
                    "Choose an image without any incredibly bright areas and with limited contrast so the white text pops out.",
                    "Consider how your logo will look on top of the image and what parts it will block (based on the shape of your logo).",
                    "Keep your title simple and clear — don't try to do too much with such few characters.",
                ],
            },
        ],
    },
];

/* Counts ad types rather than cards: combined cards like "Ad T / Ad D" and
   "JJ / LL" cover one ad type per slash-separated code. */
export const totalAdCount = adSections.reduce(
    (sum, section) =>
        sum +
        section.ads.reduce((n, ad) => n + ad.code.split("/").length, 0),
    0,
);

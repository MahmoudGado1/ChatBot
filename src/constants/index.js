import { facebook, instagram,  twitter } from "../assets/icons";
export const footerLinks = [
  {
    title: "Services",
    links: [
      { name: "Customer Support Chatbot", link: "/chat-1" },
      { name: "Sales Assistant Chatbot", link: "/chat-2" },
      { name: "HR Assistant Chatbot", link: "/chat-3" },
      { name: "IT Helpdesk Chatbot", link: "/chat-4" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "About Us", link: "/about" },
      { name: "FAQs", link: "/faqs" },
      { name: "How It Works", link: "/how-it-works" },
      { name: "Privacy Policy", link: "/privacy-policy" },
      { name: "Terms of Service", link: "/terms-of-service" },
    ],
  },
  {
    title: "Get in Touch",
    links: [
      { name: "support@yourwebsite.com", link: "mailto:support@yourwebsite.com" },
      { name: "+1 (123) 456-7890", link: "tel:+11234567890" },
      { name: "Visit Us", link: "/contact-us" },
    ],
  },
];

export const socialMedia = [
  { src: facebook, alt: "Facebook logo", link: "https://facebook.com/yourwebsite" },
  { src: twitter, alt: "Twitter logo", link: "https://twitter.com/yourwebsite" },
  { src: instagram, alt: "Instagram logo", link: "https://instagram.com/yourwebsite" },
];
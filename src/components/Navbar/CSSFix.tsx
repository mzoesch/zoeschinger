import styles from '@s/navbar/navbar.module.css';

// Only for tailwindcss darkmode 'class' feature
// Here ONLY adding colors of dark and light mode

export const navbar: string = `
${styles.navbar}
bg-gray-100
darK:bg-gray-700
`;

export const navbarLinksOtherMobile: string = `
${styles.navbar_links_current_mobile}
text-gray-300 hover:bg-gray-700 hover:text-white
`;

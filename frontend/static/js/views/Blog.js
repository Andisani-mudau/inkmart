import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Blogs");
    }

    async getHtml() {
        try {
            // Internal JSON data representing the blogs with placeholder images
            const blogs = [
                {
                    "id": 1,
                    "title": "Understanding JavaScript Closures",
                    "summary": "A deep dive into closures, one of JavaScript's most powerful features.",
                    "image": "https://via.placeholder.com/300x200"
                },
                {
                    "id": 2,
                    "title": "A Guide to CSS Flexbox",
                    "summary": "Learn how to create flexible and responsive layouts with Flexbox.",
                    "image": "https://via.placeholder.com/300x200"
                },
                {
                    "id": 3,
                    "title": "Introduction to React Hooks",
                    "summary": "Simplify your React code with Hooks for state and lifecycle management.",
                    "image": "https://via.placeholder.com/300x200"
                }
                // Add more blog objects as needed
            ];

            // Generate HTML for each blog card dynamically
            const blogCards = blogs.map(blog => `
                <div class="card">
                    <div class="image">
                        <img src="${blog.image}" alt="${blog.title}">
                    </div>
                    <div class="content">
                        <h2>${blog.title}</h2>
                        <p>${blog.summary}</p>
                    </div>
                    <a href="/blog/${blog.id}" class="cardLink" data-link>Read Blog</a>
                </div>
            `).join('');

            // Return the complete HTML structure with dynamically generated blog cards
            return `
                <div class="index_3 blog">
                    <div class="holder">
                        ${blogCards}
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error processing blog data:', error);
            return `<div class="error">Failed to load blogs. Please try again later.</div>`;
        }
    }
}

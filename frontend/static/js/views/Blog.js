import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Blogs");
    }

    async getHtml() {
        try {
            // Fetch external JSON data representing the blogs
            const response = await fetch('static/data/blogs.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const blogs = await response.json();

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

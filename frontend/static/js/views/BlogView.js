import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        console.log('Received postId:', this.postId);
        this.setTitle("Viewing blog");
    }

    async getHtml() {
        try {
            // Fetch all blogs data
            const response = await fetch('/static/data/blogs.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const blogs = await response.json();

            //console.log('All blogs:', blogs);
            //console.log('Looking for blog with id:', this.postId);

            // Convert this.postId to number for comparison
            const blog = blogs.find(b => b.id === parseInt(this.postId));
            //console.log('Found blog:', blog);

            if (!blog) {
                return `<div class="error">Blog not found. ID: ${this.postId}</div>`;
            }

            // Generate HTML based on the found blog data
            return `
                <div class="card-view-holder">
                    <div class="card-view">
                        <div class="image">
                            <img src="${blog.image}" alt="${blog.title}">
                        </div>
                        <div class="content">
                            <h2>${blog.title}</h2>
                            <p>${blog.content || blog.summary}</p>
                        </div>
                        <a href="/blog" class="cardLink" data-link><i class='bx bx-arrow-back'></i> Back to Blogs</a>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error fetching blog data:', error);
            return `<div class="error">Failed to load the blog. Please try again later.</div>`;
        }
    }
}
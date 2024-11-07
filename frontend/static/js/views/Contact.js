import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Contact Us");
    }

    async getHtml() {
        return `
            <div class="container index_5">
                <div class="newsLetter">
                    <div class="newsLatterHeading">
                      <h2>Talk to us</h2>
                      <p>Have something to say? Let us know, we will reply back to you as soon as possible.</p>
                    </div>
                    <form id="contact-form" class="contactForm">
                      <input type="email" name="email" id="contact-email" placeholder="Enter your email address" required>
                      <textarea name="message" id="contact-message" placeholder="Enter your message" required></textarea>
                      <button type="submit">Submit</button>
                    </form>
                    <div id="contact-response" style="margin-top: 10px;"></div>
                </div>
                
                <div class="rating-container">
                    <h1>Customer Feedback</h1>
                    <form id="rating-form">
                        <!-- Star Rating -->
                        <div class="star-rating">
                            <input type="radio" name="rating" id="rating-5" value="5" required>
                            <label for="rating-5" class="bx bxs-star"></label>

                            <input type="radio" name="rating" id="rating-4" value="4">
                            <label for="rating-4" class="bx bxs-star"></label>

                            <input type="radio" name="rating" id="rating-3" value="3">
                            <label for="rating-3" class="bx bxs-star"></label>

                            <input type="radio" name="rating" id="rating-2" value="2">
                            <label for="rating-2" class="bx bxs-star"></label>

                            <input type="radio" name="rating" id="rating-1" value="1">
                            <label for="rating-1" class="bx bxs-star"></label>
                        </div>
                        <!-- Email Input -->
                        <input type="email" id="rating-email" name="email" placeholder="Enter your email" required>

                        
                        <textarea id="comments" name="comments" rows="4" placeholder="Write your feedback here" required></textarea>

                        <!-- Submit Button -->
                        <button type="submit">Submit</button>
                    </form>
                    <div id="rating-response" style="margin-top: 10px;"></div>
                </div>

                <div class="newsLetter">
                    <div class="newsLatterHeading">
                        <h2>Subscribe to our newsletter!</h2>
                        <p>Get notified about tips, tricks, and blogs on how to best use your office environment.</p>
                    </div>
                    <form id="newsletter-form">
                        <input type="email" name="email" id="newsletter-email" placeholder="Enter your email address" required>
                        <button type="submit">Sign Up</button>
                    </form>
                    <div id="newsletter-response" style="margin-top: 10px;"></div>
                </div>

                <div class="icons">
                    <a href="#">
                      <div class="layer">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span class="fab fa-facebook-f"></span>
                      </div>
                    <div class="text">Facebook</div>
                    </a>
                    <a href="#">
                        <div class="layer">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span class="fab fa-twitter"></span>
                        </div>
                        <div class="text">Twitter</div>
                    </a>
                    <a href="#">
                        <div class="layer">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span class="fab fa-instagram"></span>
                        </div>
                    <div class="text">Instagram</div>
                    </a>
                    <a href="#">
                        <div class="layer">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span class="fab fa-linkedin-in"></span>
                        </div>
                        <div class="text">Linkedin</div>
                    </a>
                    <a href="#">
                        <div class="layer">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span class="fab fa-youtube"></span>
                        </div>
                        <div class="text">YouTube</div>
                    </a>
                  </div>
                </div>
            </div>
        `;
    }

    async afterRender() {
        // Handle Contact Form Submission
        const contactForm = document.getElementById('contact-form');
        const contactResponse = document.getElementById('contact-response');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            contactResponse.textContent = 'Sending...';

            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;

            try {
                const response = await fetch('/send-contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, message })
                });

                if (response.ok) {
                    contactResponse.textContent = 'Message sent successfully!';
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    contactResponse.textContent = `Error: ${errorData.error}`;
                }
            } catch (error) {
                contactResponse.textContent = 'An unexpected error occurred.';
                console.error('Error:', error);
            }
        });

        // Handle Rating Form Submission
        const ratingForm = document.getElementById('rating-form');
        const ratingResponse = document.getElementById('rating-response');

        ratingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            ratingResponse.textContent = 'Submitting your feedback...';

            const rating = document.querySelector('input[name="rating"]:checked').value;
            const email = document.getElementById('rating-email').value;
            const comments = document.getElementById('comments').value;

            try {
                const response = await fetch('/send-rating', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ rating, email, comments })
                });

                if (response.ok) {
                    ratingResponse.textContent = 'Thank you for your feedback!';
                    ratingForm.reset();
                } else {
                    const errorData = await response.json();
                    ratingResponse.textContent = `Error: ${errorData.error}`;
                }
            } catch (error) {
                ratingResponse.textContent = 'An unexpected error occurred.';
                console.error('Error:', error);
            }
        });

        // Handle Newsletter Form Submission
        const newsletterForm = document.getElementById('newsletter-form');
        const newsletterResponse = document.getElementById('newsletter-response');

        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            newsletterResponse.textContent = 'Subscribing...';

            const email = document.getElementById('newsletter-email').value;

            try {
                const response = await fetch('/send-newsletter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });

                if (response.ok) {
                    newsletterResponse.textContent = 'Successfully subscribed to the newsletter!';
                    newsletterForm.reset();
                } else {
                    const errorData = await response.json();
                    newsletterResponse.textContent = `Error: ${errorData.error}`;
                }
            } catch (error) {
                newsletterResponse.textContent = 'An unexpected error occurred.';
                console.error('Error:', error);
            }
        });
    }
}
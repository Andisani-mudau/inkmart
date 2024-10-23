import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    async getHtml() {

        return `

            <div class="container index_5">
                <div class="newsLetter">
                    <div class="newsLatterHeading">
                      <h2>Talk to us</h2>
                      <p>Have something to say? Let us know, we will reply abck to you as soon as possible.</p>
                    </div>
                    <form action="" method="post" class="contactForm">
                      <input type="email" name="email" id="" placeholder="Enter your email address">
                      <textarea type="text" name="text" id="" placeholder="Enter your message"></textarea>
                      <button type="submit">Submit</button>
                    </form>
                </div>
                
                <div class="rating-container">
                    <h1>Customer Feedback</h1>
                    <form  id="rating-form" action="/submitRating" method="POST">
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
                        <input type="email" id="email" name="email" placeholder="Enter your email" required>

                        
                        <textarea id="comments" name="comments" rows="4" placeholder="Write your feedback here" required></textarea>

                        <!-- Submit Button -->
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div class="newsLetter">
                  <div class="newsLatterHeading">
                    <h2>Subscribe to our news letter!</h2>
                    <p>Get notified about tips, tricks and blogs on how to best use your office environment.</p>
                  </div>
                  <form action="" method="post">
                    <input type="email" name="email" id="" placeholder="Enter your email address">
                    <button type="submit">Sign Up</button>
                  </form>
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
    
}

// Handle form submission using JavaScript (fetch API)
document.addEventListener('DOMContentLoaded', () => {
    const ratingForm = document.getElementById('rating-form');
    if (ratingForm) {
        ratingForm.addEventListener('submit', function(event) {
            event.preventDefault();  // Prevent the default form submission

            const email = document.getElementById('email')?.value;
            const rating = document.querySelector('input[name="rating"]:checked')?.value;
            const comments = document.getElementById('comments')?.value;

            if (!email || !rating) {
                alert('Please fill in all required fields.');
                return;
            }

            const formData = {
                email: email,
                rating: rating,
                comments: comments
            };

            // Submit to your backend using fetch
            fetch('/api/submitRating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert('Feedback submitted successfully');
                // Reset form if submission is successful
                ratingForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your feedback. Please try again.');
            });
        });
    }
});
